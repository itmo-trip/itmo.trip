import Box from '@mui/material/Box';
import {trips} from "../TestData.ts";
import Masonry from '@mui/lab/Masonry';
import {useEffect, useState} from "react";
import {useAppBarAction} from "../AppBarContext.tsx";
import MyTrip from "./MyTrip.tsx";
import {UserInfo} from "./UserInfo.tsx";
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import NewTripModal from "./NewTripModal.tsx";
import type {ITrip} from "../models/ITrip.ts";
import {MeService} from "../api/generated";

interface MyTripsTapeProps {
    trips: ITrip[]
    userId: string
}

export const MyTripsTape: React.FC<MyTripsTapeProps> = (props) => {
    const [newTripOpen, setNewTripOpen] = useState(false);

    const {setAction, reset} = useAppBarAction();
    useEffect(() => {
        setAction({
            actionName: "Все поездки",
            link: `/`,
        });

        return () => reset();
    }, [setAction, reset]);

    useEffect(() => {
        fetchAndSetUserId()
    }, []);

    const fetchAndSetUserId = async () => {
        const meResponse = await MeService.getApiV1Me();
        props.userId = meResponse.id;
        return ;
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, width: '100%'}}>
            <Grid container spacing={2} justifyContent="space-between" marginRight={2}>
                <Grid size={{md: 6, xs: 12}} sx={{order: {xs: 2, md: 1}}}>
                    <Button
                        variant="outlined"
                        onClick={() => setNewTripOpen(true)}
                        sx={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 2,
                            fontSize: 13
                        }}
                    >
                        Создать поездку
                    </Button>
                </Grid>
                <Grid size={{md: 6, xs: 12}} sx={{order: {xs: 1, md: 2}}}>
                    <UserInfo author={trips[0].author}/>
                </Grid>
            </Grid>


            <Box sx={{width: '100%', marginRight: 12}}>
                <Masonry
                    columns={{xs: 1, md: 2}}
                    spacing={2}
                >
                    {props.trips.filter(tr => tr.author.id === props.userId).map((tr, index) => (
                        <div key={index}>
                            <MyTrip tripData={tr} />
                        </div>
                    ))}
                </Masonry>
            </Box>

            {newTripOpen &&
                <NewTripModal
                    isOpen={newTripOpen}
                    close={() => setNewTripOpen(false)}
                />}
        </Box>
    );
}