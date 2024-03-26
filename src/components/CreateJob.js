import React, { useState, useEffect } from "react";
import { Button, TextField, Container, Grid }  from '@mui/material';
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
    // const [zipCodeError, setZipCodeError] = useState(false);
    // const [totalHoursError, setTotalHoursError] = useState(false);
    // const [payRateError, setPayRateError] = useState(false);
    const [errors, setErrors] = useState({
        zipCodeError:false,
        totalHoursError: false,
        payRateError: false,
    });
    // const [emptyFields, setEmptyFields] = useState(true);

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

    const noErrors = () => Object.values(errors).every((value) => (!value));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(noErrors) {
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
        } else {
            setContent(JSON.stringify(errors));
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
            <Container maxWidth="md">
                <header className="jumbotron">
                    <h3>Create Job Posting</h3>
                </header>
            </Container>
            <Container maxWidth="md" >
                <form  onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Zip Code"
                                variant="outlined"
                                fullWidth
                                name="zipCode"
                                value={formData.zipCode}
                                error={errors.zipCodeError}
                                helperText={errors.zipCodeError ? 'Invalid Zip Code' : ''}
                                onChange={(event) => {
                                    const zipcode = event.target.value;
                                    const regExZip = /^\d{5}$/;
                                    setErrors({
                                        ...errors,
                                        zipCodeError: !regExZip.test(zipcode)
                                    });
                                    setFormData({ ...formData, zipCode: zipcode });
                                    // setEmptyFields(false);
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Number of Hours"
                                variant="outlined"
                                fullWidth
                                name="totalHours"
                                value={formData.totalHours}
                                error={errors.totalHoursError}
                                helperText={errors.totalHoursError ? 'Invalid number' : ''}
                                onChange={(event) => {
                                    const hours = event.target.value;
                                    setErrors({
                                        ...errors,
                                        totalHoursError: isNaN(Number(hours)) || hours <= 0
                                    });
                                    setFormData({ ...formData, totalHours: hours });
                                    // setEmptyFields(false);
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Pay Rate"
                                variant="outlined"
                                fullWidth
                                name="payRate"
                                value={formData.payRate}
                                error={errors.payRateError}
                                helperText={errors.payRateError ? 'Invalid Pay Rate' : ''}
                                onChange={(event) => {
                                    const pay = event.target.value;
                                    setErrors({
                                        ...errors,
                                        payRateError: isNaN(Number(pay)) || pay <= 0
                                    });
                                    setFormData({ ...formData, payRate: pay });
                                    // setEmptyFields(false);
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleStartDateChange}
                                label="Start Date"
                                disablePast
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleEndDateChange}
                                label="End Date"
                                minDate={formData.startDate}
                                disablePast
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" disabled={!noErrors()}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <div>
                <pre>{content}</pre>
            </div>
        </div>
    );
};
