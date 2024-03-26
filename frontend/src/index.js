import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Map from './components/Maps.js';
import MapComponent from './components/MapComponent.js';
import TestApp from './components/TestMapComponent';
import { Marker } from '@react-google-maps/api';
import AppMap from './components/Maps.js';
import NavBar from './components/NavBarComponent.js';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
    <App />
    {/* <Map /> */}
    {/* <MapComponent/> */}
    <TestApp/>
    {/* <AppMap/> */}
    
   
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
