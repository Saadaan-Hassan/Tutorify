import React, { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
	const [locationEnabled, setLocationEnabled] = useState(false);

	useEffect(() => {
		const checkLocationPermission = async () => {
			let { status } = await Location.getForegroundPermissionsAsync();
			setLocationEnabled(status === "granted");
		};
		checkLocationPermission();
	}, []);

	return (
		<LocationContext.Provider value={{ locationEnabled, setLocationEnabled }}>
			{children}
		</LocationContext.Provider>
	);
};

export const useLocation = () => useContext(LocationContext);
