import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const MapComponent = ({
	latitude,
	longitude,
	address,
	width = "100%",
	height = "500px",
}: {
	latitude: number;
	longitude: number;
	address: string;
	width?: string;
	height?: string;
}) => {
	return (
		<MapContainer
			// @ts-ignore
			center={[latitude, longitude]}
			zoom={13}
			style={{ height, width, zIndex: 10 }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				// @ts-ignore
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={[latitude, longitude]}>
				<Popup>{address ?? "Location"}</Popup>
			</Marker>
		</MapContainer>
	);
};

export default MapComponent;
