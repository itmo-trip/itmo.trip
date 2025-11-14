import type {IAuthor} from "../models/IAuhor.ts";
import {type FC} from "react";
import {Avatar, Box, Chip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

interface TripAuthorProps {
    author: IAuthor;
}

export const UserInfo: FC<TripAuthorProps> = (props) => {
    return (
        <Box
            sx={{
                p: 2,
                border: 1,
                borderColor: 'divider',
                backgroundColor: 'background.default',
                boxSizing: 'border-box',
                display: 'flex',
                borderRadius: 2,
                minWidth: '400px'
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between',
                gap: 2,
                width: '100%',
            }}>
                <Box sx={{display: 'flex', alignItems: 'space-between', gap: 2}}>
                    <Avatar
                        src={props.author.avatar}
                        sx={{width: 50, height: 50, flexShrink: 0}}
                    >
                        {!props.author.avatar && props.author.name.charAt(0).toUpperCase()}
                    </Avatar>

                    <Grid container flexDirection="column" width='100%' minWidth={0}>
                        <Grid container direction={"row"} spacing={1.5}>
                            <Typography variant="subtitle1">
                                {props.author.name}
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                                flex: 1
                            }}>
                                <Chip
                                    label={`${props.author.courseNumber} курс`}
                                    size="small"
                                    variant="filled"
                                />
                                <Chip
                                    label={props.author.facultyName}
                                    size="small"
                                    variant="outlined"
                                />
                                {props.author.tg_username && (
                                    <Chip
                                        label={`${props.author.tg_username}`}
                                        size="small"
                                        variant="outlined"
                                        clickable
                                        color="primary"
                                        style={{color: '#2e7d32'}}
                                        onClick={() => Utils.openUserTelegramReference(props.author.tg_username)}
                                    />
                                )}
                            </Box>
                        </Grid>

                        <Grid container direction={"row"} justifyContent='flex-start'>
                            <Box>
                                {props.author.bio && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontStyle: 'italic',
                                            lineHeight: 1.3,
                                            width: '100%',
                                            textAlign: "justify"
                                        }}
                                    >
                                        {props.author.bio}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>

                </Box>

                <Grid>
                    <IconButton
                        size="small"
                        onClick={() => console.log('Edit profile')}
                        sx={{
                            border: 'none',
                            width: 30,
                            height:30,
                            borderRadius: 3,
                            // color: '#1a73e8',
                            '&:focus': { outline: 'none' },
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                            marginRight: -0.8
                        }}
                    >
                        <ModeEditOutlineIcon fontSize="small"/>
                    </IconButton>
                </Grid>
            </Box>
        </Box>
    )
}