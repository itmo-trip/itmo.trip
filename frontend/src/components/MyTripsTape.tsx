import Box from '@mui/material/Box';
import Filter from "./Filter.tsx";
import Trip from "./Trip.tsx";
import { trips } from "../TestData.ts";
import Masonry from '@mui/lab/Masonry';
import {useEffect} from "react";
import {useAppBarAction} from "../AppBarContext.tsx";

export default function MyTripsTape() {

    // useEffect(() => {
    //     getTrips()
    // }, [])
    //
    // const getTrips = async () => {
    //     const trips = await TripsService.getApiV1Trips();
    // }


    const { setAction,  reset } = useAppBarAction();
    useEffect(() => {
        setAction({
            actionName: "Все объявления",
            link: `/`,
        });

        return () => reset();
    }, [setAction, reset]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Filter/>
            <Box sx={{ width: '100%' }}>
                <Masonry
                    columns={{ xs: 1, md: 2 }}
                    spacing={2}
                >
                        {trips.map((tr, index) => (
                            <div key={index}>
                                <Trip tripData={tr} />
                            </div>
                        ))}
                </Masonry>
            </Box>
        </Box>
    );
}