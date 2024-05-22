import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [otherUsers, setOtherUsers] = useState([]);

	return (
		<UserContext.Provider value={{ user, setUser, otherUsers, setOtherUsers }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
