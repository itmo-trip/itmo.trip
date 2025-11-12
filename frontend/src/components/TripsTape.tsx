import Box from '@mui/material/Box';
import Filter from "./Filter.tsx";
import Trip from "./Trip.tsx";
import { trips } from "../TestData.ts";
import Masonry from '@mui/lab/Masonry';

export default function TripsTape() {
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