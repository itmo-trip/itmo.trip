import React from 'react';
import {YMaps, Map, Placemark, Polyline} from '@pbe/react-yandex-maps';

interface MapComponentProps {
    departureCoords: [number, number];
    arrivalCoords: [number, number];
    departureAddress: string;
    arrivalAddress: string;
}

export const TripMap: React.FC<MapComponentProps> = ({
                                                              departureCoords,
                                                              arrivalCoords,
                                                              departureAddress,
                                                              arrivalAddress
                                                          }) => {
    // Вычисляем центр карты между двумя точками
    const center = [
        (departureCoords[0] + arrivalCoords[0]) / 2,
        (departureCoords[1] + arrivalCoords[1]) / 2
    ];

    const routeGeometry = [departureCoords, arrivalCoords];

    return (
        <YMaps>
            <Map
                state={{
                    center: center as [number, number],
                    zoom: 10,
                    controls: ['zoomControl']
                }}
                width="100%"
                height="100%"
                modules={['control.ZoomControl']}
            >
                {/* Маршрут линией */}
                <Polyline
                    geometry={routeGeometry}
                    options={{
                        strokeColor: '#1976d2',
                        strokeWidth: 4,
                        strokeOpacity: 0.7
                    }}
                />

                {/* Точка отправления */}
                <Placemark
                    geometry={departureCoords}
                    properties={{
                        balloonContent: `
                            <div>
                                <strong>📍 Отправление</strong><br/>
                                ${departureAddress}
                            </div>
                        `
                    }}
                    options={{
                        preset: 'islands#blueCircleIcon',
                        iconColor: '#1976d2'
                    }}
                />

                {/* Точка прибытия */}
                <Placemark
                    geometry={arrivalCoords}
                    properties={{
                        balloonContent: `
                            <div>
                                <strong>🎯 Прибытие</strong><br/>
                                ${arrivalAddress}
                            </div>
                        `
                    }}
                    options={{
                        preset: 'islands#greenCircleIcon',
                        iconColor: '#2e7d32'
                    }}
                />
            </Map>
        </YMaps>
    );
};
