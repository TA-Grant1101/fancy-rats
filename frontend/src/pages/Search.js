import React, { useState, useEffect } from 'react';

const JobList = () => {
    const [jobs, setJobList] = useState([]);

    useEffect(() => {
        fetch('/search?id=1')
        .then(response => response.json())
        .then(data => {setJobList(data);});
    }, []);

    console.log(jobs);

    return (
        <div>
            <h1>List of Jobs</h1>
            <table>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.id}</td>
                            <td>{job.username}</td>
                            <td>{job.animal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobList;