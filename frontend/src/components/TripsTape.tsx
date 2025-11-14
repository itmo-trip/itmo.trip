import { Box } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import Trip from "./Trip";
import type {ITrip} from "../models/ITrip.ts";

interface TripsTapeProps {
    trips: ITrip[]
}

export const TripsTape: React.FC<TripsTapeProps> = (props) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box sx={{ width: "100%" }}>
                <Masonry columns={{ xs: 1, md: 2 }} spacing={2}>
                    {props.trips.map((tr, index) => (
                        <div key={index}>
                            <Trip tripData={tr} />
                        </div>
                    ))}
                </Masonry>
            </Box>
        </Box>
    );
}
