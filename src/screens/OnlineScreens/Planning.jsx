import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BigCollapse from '../../components/Planning/BigCollapse';

const Planning = () => {
    
    
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="flex justify-center items-start min-h-screen bg-white-primary p-4">
            <div className="w-full max-w-2xl space-y-6">
                {/* Calendar */}
                <Calendar
                    locale="fr"
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileClassName={({ date }) =>
                        date.toDateString() === selectedDate.toDateString()
                            ? 'bg-purple text-white rounded-lg'
                            : 'text-purple-title'
                    }
                    next2Label={null}
                    prev2Label={null}
                    nextLabel={<span className="text-orange-primary font-bold">›</span>}
                    prevLabel={<span className="text-orange-primary font-bold">‹</span>}
                />
                <BigCollapse selectedDate={selectedDate} />
            </div>
        </div>
    );
};

export default Planning;