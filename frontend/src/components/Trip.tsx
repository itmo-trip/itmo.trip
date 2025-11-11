import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import {AccessTime, CalendarToday, DirectionsCar, LocationOn, Repeat} from "@mui/icons-material";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import {Box} from "@mui/material";
import {TripMap} from "./TripMap.tsx";
import type {ITrip} from "../models/ITrip.ts";
import type {FC} from "react";
import {TripAuthor} from "./TripAuthor.tsx";

const StyledCard = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

interface TripProps {
    tripData: ITrip
}

const Trip: FC<TripProps> = (props) => {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
        null,
    );

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };


    return (
        <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: 2,
                    transform: 'translateY(-2px)'
                }
            }}
        >

            {/* Трип */}
            <CardContent sx={{flexGrow: 1, p: 2}}>
                {/* Заголовок маршрута */}
                <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 0.5}}>
                    <LocationOn sx={{color: 'primary.main', mr: 0.6, fontSize: 20, ml: -0.4}}/>
                    <Typography variant="h6" component="div" sx={{fontWeight: 'bold', mt: 0.3}}>
                        {'Площадь восстания'} → {'ИТМО (Кронверский)'}
                    </Typography>
                </Box>

                {/* Дата и время прибытия */}
                <Grid container justifyContent={'flex-start'} gap={2} alignItems={'center'}>
                    <Grid container sx={{ml: 0}}>
                        <CalendarToday sx={{color: 'text.secondary', mr: 1, mt: 0.32, fontSize: 14}}/>
                        <Box>
                            <Typography variant="body1" fontWeight="medium">
                                {formatDate(new Date(props.tripData.arrival_time))}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container>
                        <Box sx={{display: 'flex', alignItems: 'center', flex: 1}}>
                            <AccessTime sx={{color: 'text.secondary', mr: 0.5, fontSize: 18}}/>
                            <Box>
                                <Typography variant="body1" fontWeight="medium">
                                    Прибытие: {formatTime(new Date(props.tripData.arrival_time))}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                 {/*Карта с маршрутом*/}
                <Box sx={{height: 100, ml: 0.6, mt: 1}}>
                    <TripMap
                        departureCoords={props.tripData.departure_coords}
                        arrivalCoords={props.tripData.arrival_coords}
                        departureAddress='ТЦ Галерея'
                        arrivalAddress='ИТМО на Кронве'
                    />
                </Box>

                <Grid container justifyContent={'flex-start'} gap={2} alignItems={'center'} sx={{mt: 1}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}} gap={0.5}>
                        {props.tripData.transport_type === 'Общественный транспорт' ?
                            <DirectionsBusIcon sx={{color: 'text.secondary', mb: 0.2, ml: -0.2, fontSize: 18}}/> :
                            <DirectionsCar sx={{color: 'text.secondary', mb: 0.25, ml: -0.2, fontSize: 18}}/>
                        }
                        <Typography variant="body2" color="text.secondary">
                            {props.tripData.transport_type}
                        </Typography>
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'center'}} gap={0.5}>
                        <Repeat sx={{color: 'text.secondary', fontSize: 18}}/>
                        <Typography variant="body2" color="text.secondary">
                            {props.tripData.trip_frequency}
                        </Typography>
                    </Box>
                </Grid>

                {props.tripData.comment && (
                    <Box
                        sx={{
                            mt: 1.5,
                            p: 1.5,
                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: 1.5,
                            border: '1px solid',
                            borderColor: 'divider',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: -1,
                                top: 8,
                                bottom: 8,
                                width: 3,
                                backgroundColor: '#11d6b0',
                                borderRadius: 1.5,
                            }
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{
                                fontStyle: 'italic',
                                lineHeight: 0.8
                            }}
                        >
                            {props.tripData.comment}
                        </Typography>
                    </Box>
                )}

            </CardContent>

            <TripAuthor author={props.tripData.author}/>
        </StyledCard>
    )
}

export default Trip