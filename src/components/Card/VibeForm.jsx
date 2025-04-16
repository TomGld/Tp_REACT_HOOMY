import React from 'react';
import { useDispatch } from 'react-redux';
import { ICONES_URL, LOGOS_URL } from '../../constants/apiConstant';
import { fetchVibeDetail } from '../../services/profileVibeService';

const VibeForm = ({ vibe }) => {
    const dispatch = useDispatch();
    const [label, setLabel] = React.useState(vibe.label || 'Inconnu');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetchVibeDetail(label, vibe.id); // Appel de la méthode
        } catch (error) {
            console.error('Error updating label:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[200px]">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
                <div className="relative flex flex-col items-center mb-4">
                    <div className="w-[100px] h-[100px] bg-gray-200 rounded-full overflow-hidden flex items-center justify-center shadow-md">
                        <img
                            src={vibe.image?.imagePath ? `${ICONES_URL}/${vibe.image.imagePath}` : `${LOGOS_URL}/logoSmallX2.png`}
                            alt={label}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className="mt-4 text-[#1c1c3c] text-[18px] font-semibold text-center bg-gray-100 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter label"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition duration-200"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default VibeForm;