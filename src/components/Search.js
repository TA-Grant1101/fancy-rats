import React, { useState, useEffect } from 'react';
import EventBus from "../common/EventBus";

const API_URL = "http://localhost:3000/api";

const JobList = () => {
    const [jobs, setJobList] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [id, setId] = useState('');
    const [zipCode, setZipCode] = useState('');


    useEffect(() => {
    async function fetchData() {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const response = await fetch(API_URL + '/jobs', {
                headers: {
                    'Authorization': 'Bearer ' + user.accessToken,
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            setJobData(json);
            setJobList(json);
        } catch (error) {
            const _content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            setJobData(_content);

            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        }
    }
    fetchData();
}, []);


    const handleInputChangeID = (event) => {setId(event.target.value);};
    const handleInputChangeZipCode = (event) => {setZipCode(event.target.value);};

    const handleSubmit = (event) => {
        event.preventDefault();
        let returnedJobList = [];
        console.log(jobData);
        
        if (id){
            for (let i = 0; i < jobData.length; i++){
                if(jobData[i].id == id){returnedJobList.push(jobData[i]);
                }};}

        if (zipCode){
            for (let i = 0; i < jobData.length; i++){
                if(jobData[i].zipCode === zipCode){returnedJobList.push(jobData[i]);
                }}; }
        
        

        

        if(returnedJobList.length === 0){returnedJobList = jobData;}
               
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

                <label><br></br>Filter jobs by zip code: </label>
                <input 
                    type="text" 
                    name="zipCode" 
                    value={zipCode} 
                    onChange={handleInputChangeZipCode} 
                    placeholder="Enter Zip Code"/>

                <button type="submit">Submit</button>
            </form>
            {<table>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.id}</td>
                            <td>{job.zipCode}</td>
                            <td>{job.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    );
}

export default JobList;