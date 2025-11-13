import React, {useEffect, useState} from "react";
import {CircularProgress, InputAdornment, TextField, Typography} from "@mui/material";
import Map, {Marker} from "react-map-gl/maplibre";
import RoomIcon from "@mui/icons-material/Room";

const mapStyle = {
    version: 8,
    sources: {
        "osm-tiles": {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
        },
    },
    layers: [
        {
            id: "osm-tiles-layer",
            type: "raster",
            source: "osm-tiles",
            minzoom: 0,
            maxzoom: 19,
        },
    ],
} as any;

interface LocationFieldProps {
    value: string;
    coords: [number, number] | null;
    onAddressChange: (address: string) => void;
    onCoordsChange: (coords: [number, number]) => void;
}

export const LocationField: React.FC<LocationFieldProps> = ({
                                                                value,
                                                                coords,
                                                                onAddressChange,
                                                                onCoordsChange,
                                                            }) => {
    const [loading, setLoading] = useState(false);


    const handleAddressBlur = async () => {
        if (!value.trim()) return;
        try {
            setLoading(true);
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                value
            )}&countrycodes=ru&limit=1`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                onCoordsChange([lat, lon]);
                await handleMapClickInternal(lat, lon)
            }
        } catch (err) {
            console.error("Ошибка геокодирования:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddressBlur();
        }
    };

    const handleMapClick = async (e: any) => {
        const {lat, lng} = e.lngLat;
        await handleMapClickInternal(lat, lng)
    };

    const handleMapClickInternal = async (lat: number, lng: number) => {
        onCoordsChange([lat, lng]);
        try {
            setLoading(true);
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.display_name) {
                onAddressChange(data.display_name);
            }
        } catch (err) {
            console.error("Ошибка обратного геокодирования:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{width: "100%"}}>
            <TextField
                fullWidth
                placeholder={value ? undefined : "Поиск адреса"}
                variant="outlined"
                size="small"
                value={value}
                onChange={(e) => onAddressChange(e.target.value)}
                onBlur={handleAddressBlur}
                onKeyDown={handleKeyDown}
                disabled={loading}
                sx={{mb: 1}}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {loading && <CircularProgress size={18}/>}
                        </InputAdornment>
                    ),
                }}
            />
            <div style={{height: 200, width: "100%", borderRadius: 8, overflow: "hidden"}}>
                <Map
                    initialViewState={{
                        longitude: coords ? coords[1] : 30.3158,
                        latitude: coords ? coords[0] : 59.9391,
                        zoom: 11,
                    }}
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                    onClick={handleMapClick}
                    minZoom={6}
                    maxZoom={16}
                >
                    {coords && (
                        <Marker latitude={coords[0]} longitude={coords[1]} anchor="bottom">
                            <RoomIcon color="error"/>
                        </Marker>
                    )}
                </Map>
            </div>
            {coords && (
                <Typography variant="caption" color="text.secondary">
                    {coords[0].toFixed(5)}, {coords[1].toFixed(5)}
                </Typography>
            )}
        </div>
    );
};
