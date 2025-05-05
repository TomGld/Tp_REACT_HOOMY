import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const Device = ({ dataDevices, onClick }) => {
    const { id } = useParams();
    const location = useLocation();
    const showDelete = location.pathname === `/rooms/${id}/add-device`;
    console.log(dataDevices);
    return (
        <div className="max-w-3xl mx-auto mb-8">
            {Array.isArray(dataDevices) && dataDevices.length > 0 ? (
                <ul className="space-y-3 text-gray-700">
                    {dataDevices.map((device) => (
                        <li
                            key={device.id}
                            className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-md shadow-sm"
                        >
                            <div>
                                <span className="font-semibold block">{device.label}</span>
                                <span className="text-sm text-gray-500">Ref: {device.reference}</span>
                            </div>

                            {showDelete && (
                                <RiDeleteBin6Fill
                                    onClick={()=>onClick(device.id)}
                                    className="text-red-500 cursor-pointer hover:text-red-700 transition ml-4"
                                    size={20}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 italic text-center">No devices found for this room.</p>
            )}
        </div>
    );
};

export default Device;