import React, { useState } from 'react';
import mockLog from './mock.js';
import './RightDiv.css';

function RightDiv({ log }) {
    const [selectedUser, setSelectedUser] = useState('~zod');  // default selected user is ~zod
    const dataToDisplay = log || mockLog;

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    }

    return (
        <div className="right-container">
            <div className="user-selection">
                <label>
                    <input 
                        type="radio" 
                        value="~zod" 
                        checked={selectedUser === '~zod'} 
                        onChange={handleUserChange}
                    />
                    ~zod
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="~bud" 
                        checked={selectedUser === '~bud'} 
                        onChange={handleUserChange}
                    />
                    ~bud
                </label>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Intention</th>
                        <th>Toggle</th>
                    </tr>
                </thead>
                <tbody>
                    {dataToDisplay.map((entry, index) => (
                        <tr key={index}>
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
