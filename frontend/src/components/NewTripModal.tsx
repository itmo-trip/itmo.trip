import {useState, type FC, useEffect} from "react";
import {
    LocationsService,
    LocationTypesService,
    TransportTypesService,
    type TripRequest,
    TripsService
} from "../api/generated";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, MenuItem, Select, Step, StepLabel, Stepper,
    TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import DateTimeUtils from "../services/DateTimeUtils.ts";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocationField} from "./LocationField.tsx";
import Utils from "../services/Utils.ts";

interface NewTripProps {
    isOpen: boolean;
    close: any;
}

interface NewTripState {
    arrival_time?: Date;
    departure_time?: Date;
    transport_type_id?: number;
    comment?: string;
}

interface TransportType {
    id: number,
    name: string
}

interface LocationType {
    id: number,
    code: string
}

interface LocationPoint {
    alias: string;
    address: string;
    latitude: number | undefined;
    longitude: number | undefined;
    type_id: number | undefined;
}

const steps = ["Отправление", "Прибытие", "Дополнительно"];

const NewTripModal: FC<NewTripProps> = (props) => {
    const [newTripState, setNewTripState] = useState<NewTripState>({
        arrival_time: undefined,
        departure_time: new Date(),
        transport_type_id: undefined,
        comment: "",
    })

    const [activeStep, setActiveStep] = useState(0);
    const [errors, setErrors] = useState<string[]>();

    const [transportTypes, setTransportTypes] = useState<TransportType[]>();
    const [locationTypes, setLocationTypes] = useState<LocationType[]>();

    const [departurePoint, setDeparturePoint] = useState<LocationPoint>({
        alias: "",
        address: "",
        latitude: 59.9388,
        longitude: 30.3150,
        type_id: undefined
    });
    const [arrivalPoint, setArrivalPoint] = useState<LocationPoint>({
        alias: "",
        address: "",
        latitude: 59.9388,
        longitude: 30.3150,
        type_id: undefined
    });


    const fetchTransportTypes = async () => {
        const response = await TransportTypesService.getApiV1TransportTypes();
        const transportTypes: TransportType[] = response.map(tr => ({
            id: tr.id,
            name: tr.name_ru
        }));

        setTransportTypes(transportTypes);
    }

    const fetchLocationTypes = async () => {
        const response = await LocationTypesService.getApiV1LocationTypes();
        const locationTypes: LocationType[] = response.map(lt => ({
            id: lt.id,
            code: lt.code
        }));
        setLocationTypes(locationTypes);
    }

    useEffect(() => {
        fetchTransportTypes()
        fetchLocationTypes()
    }, []);

    const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

    const handleSubmit = async () => {
        if (!newTripState.transport_type_id || !departurePoint.type_id || !arrivalPoint.type_id) {
            setErrors(['Пожалуйста, заполните все необходимые поля'])
            return
        }

        try {
            const departureLocationResponse = await LocationsService.postApiV1Locations({
                latitude: departurePoint.latitude!,
                location_type_id: departurePoint.type_id,
                longitude: departurePoint.longitude!,
                name: departurePoint.alias
            })

            const arrivalLocationResponse = await LocationsService.postApiV1Locations({
                latitude: arrivalPoint.latitude!,
                location_type_id: arrivalPoint.type_id,
                longitude: arrivalPoint.longitude!,
                name: arrivalPoint.alias
            })

            const tripRequest: TripRequest = {
                arrival_location_id: arrivalLocationResponse.id,
                arrival_time: newTripState.arrival_time?.toISOString(),
                departure_location_id: departureLocationResponse.id,
                departure_time: newTripState.departure_time?.toISOString(),
                transport_type_id: newTripState.transport_type_id,
                comment: newTripState.comment,

                status: "ACTIVE"
            }

            await TripsService.postApiV1Trips(tripRequest)
            clearModal()
            props.close()
        } catch (e) {
            setErrors(['Ошибка создания новой поездки'])
        }
    }

    const clearModal = () =>
        setNewTripState({
            arrival_time: undefined,
            departure_time: undefined,
            transport_type_id: 0,
            comment: "",
        });

    // @ts-ignore
    return (
        <div>
            <Dialog fullWidth
                    maxWidth="sm"
                    open={props.isOpen} onClose={props.close} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Новая поездка
                </DialogTitle>
                <DialogContent>
                    {errors && (
                        <p style={{color: "red", marginBottom: "0"}}>{errors}</p>
                    )}
                    <Stepper activeStep={activeStep} alternativeLabel sx={{mb: 3}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === 0 && (
                        <Grid container spacing={2} direction="column">
                            <Grid>
                            <TextField
                                required
                                fullWidth
                                placeholder={departurePoint?.alias || 'Название локации'}
                                variant="outlined"
                                size="small"
                                value={departurePoint.alias}
                                onChange={(e) =>
                                    setDeparturePoint(prevState => ({
                                    ...prevState,
                                    alias: e.target.value
                                }))}
                                sx={{mb: 1}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Select
                                required
                                fullWidth
                                displayEmpty
                                value={departurePoint.type_id ?? ""}
                                onChange={(e) =>
                                    setDeparturePoint((prevState) => ({
                                        ...prevState,
                                        type_id: e.target.value,
                                    }))
                                }
                            >
                                <MenuItem value="" disabled>
                                    Локация
                                </MenuItem>

                                {locationTypes?.map((tt) => (
                                    <MenuItem key={tt.id} value={tt.id}>
                                        {Utils.getLocationTypeName(tt.code)}
                                    </MenuItem>
                                ))}
                            </Select>
                            </Grid>
                            <LocationField
                                value={departurePoint.address}
                                coords={[departurePoint.latitude!, departurePoint.longitude!]}
                                onCoordsChange={(coords: [number, number]) => setDeparturePoint(prevState => ({
                                    ...prevState,
                                    latitude: coords[0],
                                    longitude: coords[1]
                                }))}
                                onAddressChange={(addr: string) => setDeparturePoint(prevState => ({
                                    ...prevState,
                                    address: addr
                                }))}
                            />
                        </Grid>
                    )}

                    {activeStep === 1 && (
                        <Grid container spacing={2} direction="column">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TextField
                                    size="small"
                                    id="datetime-local"
                                    label="Время прибытия"
                                    type="datetime-local"
                                    variant='standard'
                                    value={DateTimeUtils.toISOString(newTripState.departure_time) ?? ''}
                                    onChange={(e) => {
                                        setNewTripState(prevState => ({
                                            ...prevState,
                                            arrival_time: e.target.value === ''
                                                ? undefined
                                                : new Date(e.target.value)
                                        }))
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </LocalizationProvider>
                            <Grid>
                            <TextField
                                required
                                fullWidth
                                placeholder={arrivalPoint?.alias || 'Название локации'}
                                variant="outlined"
                                size="small"
                                value={arrivalPoint.alias}
                                onChange={(e) => setArrivalPoint(prevState => ({
                                    ...prevState,
                                    alias: e.target.value
                                }))}
                                sx={{mb: 1}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Select
                                required
                                fullWidth
                                displayEmpty
                                value={arrivalPoint.type_id ?? ""}
                                onChange={(e) =>
                                    setArrivalPoint((prevState) => ({
                                        ...prevState,
                                        type_id: e.target.value,
                                    }))
                                }
                            >
                                <MenuItem value="" disabled>
                                    Тип локации
                                </MenuItem>

                                {locationTypes?.map((tt) => (
                                    <MenuItem key={tt.id} value={tt.id}>
                                        {Utils.getLocationTypeName(tt.code)}
                                    </MenuItem>
                                ))}
                            </Select>
                            </Grid>
                            <LocationField
                                value={arrivalPoint.address}
                                coords={[arrivalPoint.latitude!, arrivalPoint.longitude!]}
                                onCoordsChange={(coords: [number, number]) => setArrivalPoint(prevState => ({
                                    ...prevState,
                                    latitude: coords[0],
                                    longitude: coords[1]
                                }))}
                                onAddressChange={(addr: string) => setArrivalPoint(prevState => ({
                                    ...prevState,
                                    address: addr
                                }))}
                            />
                        </Grid>
                    )}
                    {activeStep === 2 && (
                        <Grid container spacing={2} direction="column">
                            <Select
                                required
                                fullWidth
                                displayEmpty
                                value={newTripState.transport_type_id ?? ""}
                                onChange={(e) =>
                                    setNewTripState((prevState) => ({
                                        ...prevState,
                                        transport_type_id: e.target.value,
                                    }))
                                }
                            >
                                <MenuItem value="" disabled>
                                    Тип транспорта
                                </MenuItem>

                                {transportTypes?.map((tt) => (
                                    <MenuItem key={tt.id} value={tt.id}>
                                        {tt.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextField
                                fullWidth
                                placeholder={newTripState.comment ? undefined : 'Комментарий'}
                                variant="outlined"
                                size="small"
                                minRows={3}
                                value={newTripState.comment}
                                onChange={(e) => setNewTripState(prevState => ({
                                    ...prevState,
                                    comment: e.target.value
                                }))}
                                sx={{mb: 1}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Назад
                    </Button>
                    {activeStep === steps.length - 1 ? (
                        <Button variant="outlined" color="primary" onClick={() => handleSubmit()}>
                            Создать
                        </Button>
                    ) : (
                        <Button variant="outlined" color="primary" onClick={handleNext}>
                            Далее
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewTripModal