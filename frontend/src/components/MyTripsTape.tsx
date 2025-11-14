import Box from '@mui/material/Box';
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
import type {IAuthor} from "../models/IAuhor.ts";

interface MyTripsTapeProps {
    trips: ITrip[]
    userId: string
    onUpdateTrip: () => Promise<void>;
}

export const MyTripsTape: React.FC<MyTripsTapeProps> = (props) => {
    const [newTripOpen, setNewTripOpen] = useState(false);
    const [_, setToastMessage] = useState('');
    const [userId, setUserId] = useState("");
    const [author, setAuthor] = useState<IAuthor | undefined>(undefined);

    const {setAction, reset} = useAppBarAction();
    useEffect(() => {
        setAction({
            actionName: "Все поездки",
            link: `/`,
        });

        return () => reset();
    }, [setAction, reset]);

    useEffect(() => {
        setUserProfile()
    }, []);


    const setUserProfile = async () => {
        const me = await MeService.getApiV1Me()
        setUserId(me.id)
        console.log(me)
        const author: IAuthor = {
            id: me.id,
            name: me.first_name,
            avatar: me.avatar_url!,
            courseNumber: 1,
            facultyName: me.faculty,
            tg_username: me.social_network_username!,
            bio: me.bio!
        }
        setAuthor(author)
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, width: '100%'}}>
            <Grid container spacing={2} justifyContent="space-between" marginRight={2}
                  sx={{ width: '100%' }}
            >
                <Grid size={{md: 6, xs: 12}} sx={{order: {xs: 2, md: 1, width: '100%'}}} >
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
                {author && <Grid size={{md: 6, xs: 12}} sx={{order: {xs: 1, md: 2}, width: '100%'}}>
                    <UserInfo author={author}/>
                </Grid>}
            </Grid>


            {(props.userId || userId) &&
                <Box sx={{width: '100%', marginRight: 12}}>
                <Masonry
                    columns={{xs: 1, md: 2}}
                    spacing={2}
                >
                    {props.trips.filter(tr => tr.author.id === props.userId || tr.author.id === userId).map((tr, index) => (
                        <div key={index}>
                            <MyTrip tripData={tr} onDeleteTrip={props.onUpdateTrip}/>
                        </div>
                    ))}
                </Masonry>
            </Box>}

            {newTripOpen &&
                <NewTripModal
                    isOpen={newTripOpen}
                    close={() => {
                        setNewTripOpen(false)
                        setToastMessage("Новая поездка успешно добавлена!")
                    }}
                    onNewTrip={props.onUpdateTrip}
                />}
        </Box>
    );
}