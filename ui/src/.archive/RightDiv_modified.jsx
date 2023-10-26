
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import mockLog from './mock.js';
import './RightDiv.css';

function RightDiv({ log }) {
    const navigate = useNavigate();
    const dataToDisplay = log || mockLog;

    // State to store the selected log entry
    const [selectedLogEntry, setSelectedLogEntry] = useState(null);

    const handleRowClick = (entry) => {
        setSelectedLogEntry(entry);
        navigate('/apps/yijing/log', { state: { logEntry: entry } }); // Passing the selected log entry as state
    };

    return (
        <div className="right-container">
            <table>
                <tbody>
                    {dataToDisplay.map((entry, index) => (
                        <tr key={index} onClick={() => handleRowClick(entry)}>
                            <td>{new Date(entry.when).toLocaleDateString()}</td>
                            <td>{entry.intention}</td>
                            <td>
                                <input type="radio" className="toggle-radio" id={`toggle-${index}`} />
                                <label htmlFor={`toggle-${index}`} className="toggle-label"></label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RightDiv;
