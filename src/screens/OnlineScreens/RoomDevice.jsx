import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import selectDeviceData from '../../store/device/deviceSelector';
import { fetchDevices } from '../../store/device/deviceSlice';
import axios from 'axios';
import { DEVICES_URL, ROOMS_URL } from '../../constants/apiConstant';
import { useParams } from 'react-router-dom';
import Device from '../../components/Device';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import PageLoader from '../../components/Loader/PageLoader';
import { fetchRoomDetails, fetchRooms } from '../../store/room/roomSlice';
import selectRoomData from '../../store/room/roomSelector';
import ButtonBack from '../../components/Ui/ButtonBack';
import ButtonSave from '../../components/Ui/ButtonSave';


const RoomDevice = () => {
    const dispatch = useDispatch();
    const { devices, loading } = useSelector(selectDeviceData);
    const { roomDetails } = useSelector(selectRoomData);
    const [selectedType, setSelectedType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const { id } = useParams();
    const [roomId] = useState(id);

    const roomDevices = roomDetails?.devices || [];
    const roomlabel = roomDetails?.label || [];

    useEffect(() => {
        dispatch(fetchDevices());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchRoomDetails(roomId))
    }, [dispatch, roomId]);


    const filteredDevices = devices.filter(
        device => device.type === selectedType && !device.room
    );

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            const selectedDevice = filteredDevices.find(device => device.label === selectedLabel);

            if (!selectedDevice) {
                console.log("Aucun objet sélectionné.");
                return;
            }

            const data = {
                room: `/api/rooms/${roomId}`,
            };

            const headers = {
                'Content-Type': 'application/merge-patch+json',
                Accept: 'application/json',
            };

            axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';

            const response = await axios.patch(`${DEVICES_URL}/${selectedDevice.id}`, data);
            console.log("Réponse du serveur :", response);

            if (response.status === 200) {
                console.log("Objet ajouté avec succès !");
            }

            console.log("Réponse du serveur :", response.data);
        } catch (error) {
            console.log(`Erreur lors de la soumission : ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (deviceId) => {
        try {
            setIsLoading(true);
            console.log("ID de l'objet à supprimer :", deviceId);

            const data = {
                room: null,
            };

            const headers = {
                'Content-Type': 'application/merge-patch+json',
                Accept: 'application/json',
            };

            axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';

            const response = await axios.patch(`${DEVICES_URL}/${deviceId}`, data);
            console.log("Réponse du serveur :", response);

            if (response.status === 200) {
                console.log("Objet ajouté avec succès !");
                await dispatch(fetchDevices());
            }

            console.log("Réponse du serveur :", response.data);
        } catch (error) {
            console.log(`Erreur lors de la soumission : ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        loading ? <PageLoader /> : (
            <div className="min-h-screen bg-white-primary py-10 px-4">
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">

                    <div className="flex justify-between items-center mb-4">
                        <ButtonBack />
                        <span className="text-lg font-semibold text-gray-700">
                            {roomlabel}
                        </span>
                        <ButtonSave
                            handleSubmit={() => handleSubmit()}
                            isLoading={isLoading}
                            selectedType={selectedType}
                            selectedLabel={selectedLabel}
                        />
                    </div>

                    <h2 className="text-xl font-semibold text-gray-700">
                        Quel objet souhaitez-vous ajouter ?
                    </h2>

                    {/* Select Type */}
                    <div className="flex flex-col">
                        <label htmlFor="deviceType" className="text-sm font-medium text-gray-600 mb-1">
                            Sélectionner le type d’objet :
                        </label>
                        <select
                            id="deviceType"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                        >
                            <option value="">-- Choisissez un type --</option>
                            {[...new Set(devices.map(device => device.type))].map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Select Label */}
                    <select
                        id="deviceLabel"
                        disabled={!selectedType}
                        value={selectedLabel}
                        onChange={(e) => setSelectedLabel(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                    >
                        <option value="">-- Choisissez un objet --</option>
                        {loading ? (
                            <option disabled>Chargement...</option>
                        ) : (
                            filteredDevices.map(device => (
                                <option key={device.id} value={device.label}>{device.label}</option>
                            ))
                        )}
                    </select>

                    {/* Connected Devices */}
                    {isLoading ? (
                        <ButtonLoader />
                    ) : (
                        <div>
                            {roomDevices.length > 0 ? (
                                    <Device
                                        dataDevices={roomDevices} // send ONE device here, not the full roomDevices array
                                        onClick={handleDelete}
                                    />
                            ) : (
                                <p className="text-gray-500 text-sm">Aucun objet connecté à cette pièce.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        ));
};

export default RoomDevice