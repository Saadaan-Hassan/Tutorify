import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [otherUsers, setOtherUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	return (
		<UserContext.Provider
			value={{ user, setUser, otherUsers, setOtherUsers, loading, setLoading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
