import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import {AccessTime, DirectionsCar, LocationOn, Repeat, Telegram } from "@mui/icons-material";
import {Avatar, Box, Chip, Paper } from "@mui/material";
import {Map} from "./Map.tsx";
import type {ITrip} from "../models/ITrip.ts";
import type {FC} from "react";

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
        <Grid size={{xs: 12, md: 6}}>
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

                {/* Основной контент поездки */}
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    {/* Заголовок маршрута */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOn sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {'Площадь восстания'} → {'ИТМО (Кронверский)'}
                        </Typography>
                    </Box>

                    {/* Карта с маршрутом */}
                    <Box sx={{ height: 200, position: 'relative' }}>
                        <Map
                            departureCoords={props.tripData.departure_coords}
                            arrivalCoords={props.tripData.arrival_coords}
                            departureAddress='ТЦ Галерея'
                            arrivalAddress='ИТМО на Кронве'
                        />
                    </Box>

                    {/* Время и транспорт */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTime sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />
                            <Typography variant="body2" color="text.secondary">
                                {new Date(props.tripData.arrival_time).toLocaleTimeString('ru-RU', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <DirectionsCar sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />
                            <Typography variant="body2" color="text.secondary">
                                {props.tripData.transport_type}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Repeat sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />
                            <Typography variant="body2" color="text.secondary">
                                {props.tripData.trip_frequency}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Комментарий */}
                    {props.tripData.comment && (
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 1.5,
                                mb: 2,
                                backgroundColor: 'grey.50'
                            }}
                        >
                            <Typography variant="body2" color="text.primary">
                                {props.tripData.comment}
                            </Typography>
                        </Paper>
                    )}
                </CardContent>

                {/* Блок автора */}
                <Box
                    sx={{
                        p: 2,
                        borderTop: 1,
                        borderColor: 'divider',
                        backgroundColor: 'background.default'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Аватар автора */}
                        {props.tripData.author.avatar ? (
                            <Avatar
                                src={props.tripData.author.avatar}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    border: 2,
                                    borderColor: 'background.paper'
                                }}
                            />
                        ) : (
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: 'primary.main',
                                    border: 2,
                                    borderColor: 'background.paper'
                                }}
                            >
                                {props.tripData.author.name.charAt(0).toUpperCase()}
                            </Avatar>
                        )}

                        {/* Информация об авторе */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                                {props.tripData.author.name}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip
                                    label={`${props.tripData.author.courseNumber} курс`}
                                    size="small"
                                    variant="outlined"
                                />
                                <Chip
                                    label={props.tripData.author.facultyName}
                                    size="small"
                                    variant="outlined"
                                />
                                {props.tripData.author.tg_username && (
                                    <Chip
                                        icon={<Telegram />}
                                        label={`${props.tripData.author.tg_username}`}
                                        size="small"
                                        variant="outlined"
                                        clickable
                                    />
                                )}
                            </Box>
                        </Box>
                    </Box>

                    {/* Био автора (если есть) */}
                    {props.tripData.author.bio && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                mt: 1,
                                display: 'block',
                                fontStyle: 'italic'
                            }}
                        >
                            {props.tripData.author.bio}
                        </Typography>
                    )}
                </Box>
            </StyledCard>
        </Grid>
        )
}

export default Trip