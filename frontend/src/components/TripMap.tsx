import React from 'react';
import Map, {Marker} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import DateTimeUtils from "../services/DateTimeUtils.ts";

// Тип для координат
type Coordinates = [latitude: number, longitude: number];

interface TripMapProps {
    departureCoords: Coordinates;
    arrivalCoords: Coordinates;
    tripDateTime: Date; // Для построения маршрута в Яндекс Картах
    isPublicTransport: boolean; // Для построения маршрута в Яндекс Картах
}

// Компонент для атрибуции
const AttributionOverlay: React.FC<{ onYandexClick: () => void }> = ({onYandexClick}) => (
    <div
        style={{
            position: 'absolute',
            bottom: '4px',
            right: '6px',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            color: '#333',
            zIndex: 1000,
            lineHeight: 1.4
        }}
    >
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onYandexClick();
            }}
            style={{
                textDecoration: 'none',
                color: '#1a73e8',
                fontWeight: 700,
                fontSize: 12
            }}
        >
            Построить маршрут в Яндекс Картах
        </a>{' '}
        | ©{' '}
        <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            style={{color: '#000000', textDecoration: 'none'}}
        >
            OpenStreetMap contributors
        </a> | {' '}
        <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            style={{color: '#000000', textDecoration: 'none'}}
        >
            MapLibre
        </a>
    </div>
);

export const TripMap: React.FC<TripMapProps> = (props) => {
    // Центр карты
    const initialViewState = {
        longitude: (props.departureCoords[1] + props.arrivalCoords[1]) / 2,
        latitude: (props.departureCoords[0] + props.arrivalCoords[0]) / 2,
        zoom: 9.5
    };

    // Функция для открытия маршрута в Яндекс.Картах
    const openInYandexMaps = () => {
        const [depLat, depLng] = props.departureCoords;
        const [arrLat, arrLng] = props.arrivalCoords;
        const transportType = props.isPublicTransport ? 'mt' : 'auto';
        const dateTimeType = 'arrival';
        const dateTimeWithoutMs = DateTimeUtils.toDateTimeString(props.tripDateTime);

        const url = `https://yandex.ru/maps/?rtext=${depLat},${depLng}~${arrLat},${arrLng}&routes[timeDependent][type]=${dateTimeType}&routes[timeDependent][time]=${dateTimeWithoutMs}&rtt=${transportType}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Стиль карты (OpenStreetMap тайлы)
    const mapStyle = {
        version: 8,
        sources: {
            'osm-tiles': {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '© OpenStreetMap contributors'
            }
        },
        layers: [
            {
                id: 'osm-tiles-layer',
                type: 'raster',
                source: 'osm-tiles',
                minzoom: 0,
                maxzoom: 19
            }
        ]
    } as any;

    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <Map
                initialViewState={initialViewState}
                mapStyle={mapStyle}
                attributionControl={false}
            >
                {/* Маркеры */}
                <Marker longitude={props.departureCoords[1]} latitude={props.departureCoords[0]} color="#1976d2"/>
                <Marker
                    longitude={props.arrivalCoords[1]}
                    latitude={props.arrivalCoords[0]}
                    color="#11d6b0"
                />
            </Map>

            <AttributionOverlay onYandexClick={openInYandexMaps}/>
        </div>
    );
};
