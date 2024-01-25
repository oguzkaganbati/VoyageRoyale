// DENE!!

// import React, { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import { Grid, Container } from "@mui/material";
// import CarDetailsCard from "../../components/Card/CarDetailsCard";
// import { Car } from "../../models/CarModel/response";

// interface Position {
//   id: number;
//   latitude: number;
//   longitude: number;
//   city: string;
// }

// const Location: React.FC = () => {
//   const [positions, setPositions] = useState<Position[]>([]);
//   const [cars, setCars] = useState<Car[]>([]);
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null);

//   useEffect(() => {
//     const fetchPositions = async () => {
//       try {
//         const response = await axios.get<Position[]>(
//           "http://localhost:8080/api/positions/getAll"
//         );
//         setPositions(response.data);
//       } catch (error) {
//         console.error("Error fetching positions:", error);
//       }
//     };

//     const fetchCars = async () => {
//       try {
//         const response = await axios.get<Car[]>(
//           "http://localhost:8080/api/cars/getAll"
//         );
//         setCars(response.data);
//       } catch (error) {
//         console.error("Error fetching cars:", error);
//       }
//     };

//     fetchPositions();
//     fetchCars();
//   }, []);

//   const handleLocationClick = (position: Position) => {
//     // Find the car associated with the clicked position
//     const car = cars.find((c) => c.positionName === position.id.toString());
//     setSelectedCar(car || null);
//   };

//   return (
//     <Container>
//       <Grid
//         container
//         style={{
//           textAlign: "center",
//           justifyContent: "center",
//           paddingLeft: 50,
//         }}
//       >
//         <Grid item sm={12}>
//           <MapContainer
//             center={[38.9637, 35.2433]}
//             zoom={5}
//             style={{ height: "600px", width: "100%", marginTop: "8px" }}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {positions.map((position) => (
//               <Marker
//                 key={position.id}
//                 position={[position.latitude, position.longitude]}
//                 eventHandlers={{
//                   click: () => handleLocationClick(position),
//                 }}
//               >
//                 {selectedCar && (
//                   <Popup style={{ maxWidth: "400px", padding: "10px" }}>
//                     <CarDetailsCard carDetails={selectedCar} />
//                   </Popup>
//                 )}
//               </Marker>
//             ))}
//           </MapContainer>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Location;

import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Grid, Container } from "@mui/material";
import CarDetailsCard from "../../components/Card/CarDetailsCard";
import { Car } from "../../models/CarModel/response";

interface Position {
  id: number;
  latitude: number;
  longitude: number;
  city: string;
  carDetails: Car;
}

const Location: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get<Position[]>(
          "http://localhost:8080/api/positions/getAll"
        );
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);

  const handleLocationClick = (position: Position) => {
    setSelectedPosition(position);
  };

  return (
    <Container>
      <Grid
        container
        style={{
          textAlign: "center",
          justifyContent: "center",
          paddingLeft: 50,
        }}
      >
        <Grid item sm={12}>
          <MapContainer
            center={[38.9637, 35.2433]}
            zoom={5}
            style={{ height: "600px", width: "100%", marginTop: "8px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {positions.map((position) => (
              <Marker
                key={position.id}
                position={[position.latitude, position.longitude]}
                eventHandlers={{
                  click: () => handleLocationClick(position),
                }}
              >
                {selectedPosition && selectedPosition.id === position.id && (
                  <Popup style={{ maxWidth: "150px", padding: "10px" }}>
                    <CarDetailsCard carDetails={selectedPosition.carDetails} />
                  </Popup>
                )}
              </Marker>
            ))}
          </MapContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Location;
