// import React, { useMemo } from 'react';
// import { GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
// // import { useMemo } from 'react';
// import { MarkerClusterer } from '@react-google-maps/api';

// const libraries = ['places'];
// const mapContainerStyle = {
//   width: '50vw',
//   height: '50vh',
// };
// const center = {
//   lat: 38.651590, // default latitude
//   lng: -90.259900, // default longitude
// };
// const adresses = 
//   {
//     lat: 38.621639, 
//     lng: -90.364988
//   }
  
 

// const AppMap = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyCKrx1avXtWxA37dFN1JmVrxXlk-ugHv3g',
//     libraries,
//   });
//   // const center = useMemo(() => ({ lat:38.621639, lng:-90.364988 }), []);
  
//   if (loadError) {
//     return <div>Error loading maps</div>;
//   }

//   if (!isLoaded) {
//     return <div>Loading maps</div>;
//   }

//   return (
//     <div>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={13}
//         center={center}
        
//       >
        
//         <Marker position={{lat:38.6348, lng:-90.2336}}/>
//         <Marker position={{lat:38.6426, lng:-90.3237}}/>
//       </GoogleMap>
        
//     </div>
//   );
// };

// export default AppMap;