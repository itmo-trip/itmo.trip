import Box from '@mui/material/Box';
import {trips} from "../TestData.ts";
import Masonry from '@mui/lab/Masonry';
import {useEffect} from "react";
import {useAppBarAction} from "../AppBarContext.tsx";
import MyTrip from "./MyTrip.tsx";
import {UserInfo} from "./UserInfo.tsx";
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";

export default function MyTripsTape() {

    // useEffect(() => {
    //     getTrips()
    // }, [])
    //
    // const getTrips = async () => {
    //     const trips = await TripsService.getApiV1Trips();
    // }


    const {setAction, reset} = useAppBarAction();
    useEffect(() => {
        setAction({
            actionName: "Все объявления",
            link: `/`,
        });

        return () => reset();
    }, [setAction, reset]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, width: '100%'}}>
            <Grid container spacing={2} justifyContent="space-between" marginRight={2}>
                <Grid size={{md: 6, xs: 12}} sx={{ order: { xs: 2, md: 1 } }}>
                    <Button
                        variant="outlined"
                        onClick={() => console.log('Create trip')}
                        sx={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 2,
                            fontSize: 13
                        }}
                    >
                        Создать объявление
                    </Button>
                </Grid>
                <Grid size={{md: 6, xs: 12}} sx={{ order: { xs: 1, md: 2 } }}>
                    <UserInfo author={trips[0].author}/>
                </Grid>
            </Grid>


            <Box sx={{width: '100%', marginRight: 12}}>
                <Masonry
                    columns={{xs: 1, md: 2}}
                    spacing={2}
                >
                    <div key={0}>
                        <MyTrip tripData={trips[0]}/>
                    </div>
                    <div key={1}>
                        <MyTrip tripData={trips[0]}/>
                    </div>
                    <div key={2}>
                        <MyTrip tripData={trips[0]}/>
                    </div>
                    {/*{trips.map((tr, index) => (*/}
                    {/*    <div key={index}>*/}
                    {/*        <Trip tripData={tr} />*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </Masonry>
            </Box>
        </Box>
    );
}