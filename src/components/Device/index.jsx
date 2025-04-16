import React from 'react'

const Device = ({dataDevices}) => {
    const data = dataDevices
    return (
        <>
            {/* Devices List */}
            <div className="max-w-3xl mx-auto mb-8">
                {Array.isArray(data) && data.length > 0 ? (
                    <ul className="space-y-3 text-gray-700">
                        {data.map((device) => (
                            <li
                                key={device['@id']}
                                className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-md shadow-sm"
                            >
                                <span className="font-semibold">{device.label}</span>
                                <span className="text-sm text-gray-500">Ref: {device.reference}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic text-center">No devices found for this room.</p>
                )}
            </div>
        </>
    )
}

export default Device