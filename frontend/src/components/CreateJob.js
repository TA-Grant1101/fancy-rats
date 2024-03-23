import React, { useState, useEffect } from "react";
import { Button, TextField }  from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import EventBus from "../common/EventBus";
import dayjs from "dayjs";

const API_URL = "http://localhost:3000/api";

export default function CreateJob() {
    const [content, setContent] = useState( '');
    const [formData, setFormData] = useState({
        startDate: dayjs(),
        endDate: dayjs(),
        zipCode: '',
        payRate: '',
        totalHours: '',
        description: ''
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

    const handleStartDateChange = (e) => {
        setFormData({ ...formData, startDate: e });
    };

    const handleEndDateChange = (e) => {
        setFormData({ ...formData, endDate: e });
    };

    return (
        <div className="container">
            <header className="jumbotron">
                <pre>{content}</pre>
            </header>
            <form  onSubmit={handleSubmit}>
                <TextField
                    label="Zip Code"
                    variant="outlined"
                    fullWidth
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Pay Rate"
                    variant="outlined"
                    fullWidth
                    name="payRate"
                    value={formData.payRate}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Number of Hours"
                    variant="outlined"
                    fullWidth
                    name="totalHours"
                    value={formData.totalHours}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <DatePicker
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleStartDateChange}
                    label="Start Date"
                    disablePast
                    required
                />
                <DatePicker
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleEndDateChange}
                    label="End Date"
                    disablePast
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </div>
    );
};
