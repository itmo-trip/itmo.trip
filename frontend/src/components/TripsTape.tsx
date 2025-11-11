import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Filter from "./Filter.tsx";
import Trip from "./Trip.tsx";
import {trips} from "../TestData.ts";

export default function TripsTape() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 4, }}>
            <Filter/>
            <Grid container spacing={2} columns={12}>
                {trips.map(tr =>
                    <Trip tripData={tr} />
                )}
            </Grid>
        </Box>
    );
}
