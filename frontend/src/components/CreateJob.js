import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import EventBus from "../common/EventBus";

const API_URL = "http://localhost:3000/api";

export default function CreateJob() {
    const [content, setContent] = useState( '');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect( () => {
        async function fetchData() {
            const user = JSON.parse(localStorage.getItem('user'));
            try {
                const response = await fetch(API_URL + '/jobs', {
                    headers: {
                        'Authorization': 'Bearer ' + user.accessToken,
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json()
                setContent(JSON.stringify(json, ' ', 2));
            } catch (error) {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert('Form data submitted: ' + formData)
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const response = await fetch(API_URL + '/jobs', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const json = await response.json()
            setContent(JSON.stringify(json, ' ', 2));
        } catch (error) {
            const _content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            setContent(_content);

            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container">
            <header className="jumbotron">
                <pre>{content}</pre>
            </header>
            <form  onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </div>
    );
};
