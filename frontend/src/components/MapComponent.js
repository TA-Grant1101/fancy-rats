// import React, { useState } from 'react';
// import axios from 'axios';
// import AppMap from './Maps';


// const MapComponent = () => {
//   const [zipCode, setZipCode] = useState('');
//   const [jobs, setJobs] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`/clients/search?zipCode=${zipCode}`);
//       setJobs(response.data);
//       // Implement logic to display job markers on the map

      
//     } catch (error) {
//       console.error('Error fetching job data:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={zipCode}
//         onChange={(e) => setZipCode(e.target.value)}
//         placeholder="Enter zip code"
//       />
//       <button onClick={handleSearch}>Search Jobs</button>
//       <AppMap/>
//     </div>
//   );
// };

// export default MapComponent;