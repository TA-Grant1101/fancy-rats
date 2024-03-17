import React, { useState, useEffect } from 'react';

const JobList = () => {
    const [jobs, getJobList] = useState([]);

    useEffect(() => {
        fetch('/search')
            .then(response => response.json())
            .then(data => {
                console.log('Data received from server:', data); // Add this line for logging
                getJobList(data);
            })
            .catch(error => console.error('Error fetching jobs:', error)); // Updated error message
    }, []);

    return (
        <div>
            <h1>List of Jobs</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job.id}>{job.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default JobList;