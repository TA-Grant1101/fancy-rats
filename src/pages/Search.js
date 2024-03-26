import React, { useState, useEffect } from 'react';

const JobList = () => {
    const [jobs, setJobList] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [id, setId] = useState('');
    const [animal, setAnimal] = useState('');


    useEffect(() => {
        fetch(`/searchAll`)
        .then(response => response.json())
        .then(data => {
            setJobData(data);
            setJobList(data);})
        .catch(error => console.error('Error fetching data:', error));
    }, []);


    const handleInputChangeID = (event) => {setId(event.target.value);};
    const handleInputChangeAnimal = (event) => {setAnimal(event.target.value);};

    const handleSubmit = (event) => {
        event.preventDefault();
        const returnedJobList = [];
        
        if (id){
            for (let i = 0; i < jobData.length; i++){
                if(jobData[i].id == id){returnedJobList.push(jobData[i]);
                }};}

        if (animal){
            for (let i = 0; i < jobData.length; i++){
                if(jobData[i].animal === animal){returnedJobList.push(jobData[i]);
                }};}

        setJobList(returnedJobList);}


    return (
        <div>
            <h1>List of Jobs</h1>
            <form onSubmit={handleSubmit}>
                <label>ID: </label>
                <input 
                    type="text" 
                    name="id" 
                    value={id} 
                    onChange={handleInputChangeID} 
                    placeholder="Enter ID"/>

                <label><br></br>Animal: </label>
                <input 
                    type="text" 
                    name="animal" 
                    value={animal} 
                    onChange={handleInputChangeAnimal} 
                    placeholder="Enter Animal Species"/>

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