import React from 'react';
import { useLocation } from 'react-router-dom';


function LogComponent() {
    const location = useLocation();
    const logEntry = location.state?.logEntry;

    if (!logEntry) {
        return <div className="log-container">No log entry selected</div>;
    }

    return (
        <div className="log-container">
            <table className="centered-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Intention</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{new Date(logEntry.when).toLocaleDateString()}</td>
                        <td>{logEntry.intention}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default LogComponent;
