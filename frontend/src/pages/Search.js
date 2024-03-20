import React, { useState, useEffect } from 'react';

const JobList = () => {
    const [jobs, setJobList] = useState([]);
    const [id, setId] = useState('');
    const [animal, setAnimal] = useState('');

    useEffect(() => {
        fetch(`/searchAll`)
        .then(response => response.json())
        .then(data => {setJobList(data);})
        .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    
    const findByAnimal = (animalName) =>{
        fetch(`/searchBySomething?animal=${animalName}`)
            .then(response => response.json())
            .then(data => {setJobList(data);})
            .catch(error => console.error('Error fetching data:', error));
    };


    const findById = (idNumber) =>{
        fetch(`/searchBySomething?id=${idNumber}`)
            .then(response => response.json())
            .then(data => {setJobList(data);})
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleInputChangeID = (event) => {setId(event.target.value);};
    const handleInputChangeAnimal = (event) => {setAnimal(event.target.value);};

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {findById(id);}
        if (animal) {findByAnimal(animal);}
    };
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