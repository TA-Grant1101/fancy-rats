import React, { useState, useEffect } from 'react';

const JobList = () => {
    const [jobs, setJobList] = useState([]);
    const [id, setId] = useState('');

    useEffect(() => {
        fetch(`/search`)
        .then(response => response.json())
        .then(data => {setJobList(data);})
        .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    const findById = (idNumber) =>{
        fetch(`/search?id=${idNumber}`)
            .then(response => response.json())
            .then(data => {setJobList(data);})
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleInputChange = (event) => {
        setId(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {findById(id);}
    };

    return (
        <div>
            <h1>List of Jobs</h1>
            <form onSubmit={handleSubmit}>
                <label>Search By Id<br></br></label>
                <input 
                    type="text" 
                    name="id" 
                    value={id} 
                    onChange={handleInputChange} 
                    placeholder="Enter ID"/>
                <button type="submit">Submit</button>
            </form>
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