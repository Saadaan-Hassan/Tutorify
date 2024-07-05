import { db } from "../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to show time, e.g. the actual time, yesterday, or the actual date if the message was sent more than a 2 days ago and show time in 12-hour clock format
export const getTimeString = (timestamp) => {
	const date = timestamp.toDate();
	const now = new Date();
	const diff = now - date;
	let hours = date.getHours();
	let minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	if (diff < 86400000) {
		// Less than 24 hours ago
		hours = hours % 12;
		hours = hours ? hours : 12; // 12-hour clock format
		minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero for minutes less than 10
		const time = hours + ":" + minutes + " " + ampm;
		return time;
	} else if (diff < 172800000) {
		// Yesterday
		return "Yesterday";
	} else {
		// More than 2 days ago
		const month = date.toLocaleString("default", { month: "short" });
		const day = date.getDate();
		const time = month + " " + day;
		return time;
	}
};

// Funtion to show date in the format like "Today", "Yesterday", or the actual date if the message was sent more than 2 days ago
export const getDateString = (timestamp) => {
	const date = timestamp.toDate();
	const now = new Date();
	const diff = now - date;

	if (diff < 86400000) {
		// Less than 24 hours ago
		return "Today";
	} else if (diff < 172800000) {
		// Yesterday
		return "Yesterday";
	} else {
		// More than 2 days ago
		const month = date.toLocaleString("default", { month: "short" });
		const day = date.getDate();
		const year = date.getFullYear();
		const dateString = month + " " + day + ", " + year;
		return dateString;
	}
};

// Function to calculate the distance between two coordinates using the Haversine formula
export const haversineDistance = (coords1, coords2) => {
	const toRad = (x) => (x * Math.PI) / 180;
	const R = 6371; // Radius of the Earth in km

	const dLat = toRad(coords2.latitude - coords1.latitude);
	const dLon = toRad(coords2.longitude - coords1.longitude);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(coords1.latitude)) *
			Math.cos(toRad(coords2.latitude)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	return distance; // distance in km
};

const currencySymbols = {
	Afghanistan: "؋",
	Albania: "L",
	Algeria: "د.ج",
	Andorra: "€",
	Angola: "Kz",
	Argentina: "$",
	Armenia: "֏",
	Australia: "$",
	Austria: "€",
	Azerbaijan: "₼",
	Bahamas: "$",
	Bahrain: ".د.ب",
	Bangladesh: "৳",
	Barbados: "$",
	Belarus: "Br",
	Belgium: "€",
	Belize: "$",
	Benin: "CFA",
	Bhutan: "Nu.",
	Bolivia: "Bs.",
	"Bosnia and Herzegovina": "KM",
	Botswana: "P",
	Brazil: "R$",
	Brunei: "$",
	Bulgaria: "лв",
	"Burkina Faso": "CFA",
	Burundi: "FBu",
	Cambodia: "៛",
	Cameroon: "CFA",
	Canada: "$",
	"Cape Verde": "Esc",
	"Central African Republic": "CFA",
	Chad: "CFA",
	Chile: "$",
	China: "¥",
	Colombia: "$",
	Comoros: "CF",
	Congo: "FC",
	"Costa Rica": "₡",
	Croatia: "kn",
	Cuba: "₱",
	Cyprus: "€",
	"Czech Republic": "Kč",
	Denmark: "kr",
	Djibouti: "Fdj",
	Dominica: "$",
	"Dominican Republic": "RD$",
	"East Timor": "$",
	Ecuador: "$",
	Egypt: "£",
	"El Salvador": "$",
	"Equatorial Guinea": "CFA",
	Eritrea: "Nfk",
	Estonia: "€",
	Eswatini: "E",
	Ethiopia: "Br",
	Fiji: "$",
	Finland: "€",
	France: "€",
	Gabon: "CFA",
	Gambia: "D",
	Georgia: "₾",
	Germany: "€",
	Ghana: "₵",
	Greece: "€",
	Grenada: "$",
	Guatemala: "Q",
	Guinea: "FG",
	"Guinea Bissau": "CFA",
	Guyana: "$",
	Haiti: "G",
	Honduras: "L",
	Hungary: "Ft",
	Iceland: "kr",
	India: "₹",
	Indonesia: "Rp",
	Iran: "﷼",
	Iraq: "ع.د",
	Ireland: "€",
	Israel: "₪",
	Italy: "€",
	"Ivory Coast": "CFA",
	Jamaica: "$",
	Japan: "¥",
	Jordan: "JD",
	Kazakhstan: "₸",
	Kenya: "KSh",
	Kiribati: "$",
	"North Korea": "₩",
	"South Korea": "₩",
	Kuwait: "د.ك",
	Kyrgyzstan: "с",
	Laos: "₭",
	Latvia: "€",
	Lebanon: "ل.ل",
	Lesotho: "L",
	Liberia: "$",
	Libya: "ل.د",
	Liechtenstein: "CHF",
	Lithuania: "€",
	Luxembourg: "€",
	Madagascar: "Ar",
	Malawi: "MK",
	Malaysia: "RM",
	Maldives: "ރ.",
	Mali: "CFA",
	Malta: "€",
	"Marshall Islands": "$",
	Mauritania: "UM",
	Mauritius: "₨",
	Mexico: "$",
	Micronesia: "$",
	Moldova: "L",
	Monaco: "€",
	Mongolia: "₮",
	Montenegro: "€",
	Morocco: "د.م.",
	Mozambique: "MT",
	Myanmar: "K",
	Namibia: "$",
	Nauru: "$",
	Nepal: "रू",
	Netherlands: "€",
	"New Zealand": "$",
	Nicaragua: "C$",
	Niger: "CFA",
	Nigeria: "₦",
	"North Macedonia": "ден",
	Norway: "kr",
	Oman: "ر.ع.",
	Pakistan: "₨",
	Palau: "$",
	Panama: "B/.",
	"Papua New Guinea": "K",
	Paraguay: "₲",
	Peru: "S/",
	Philippines: "₱",
	Poland: "zł",
	Portugal: "€",
	Qatar: "ر.ق",
	Romania: "lei",
	Russia: "₽",
	Rwanda: "FRw",
	"Saint Kitts and Nevis": "$",
	"Saint Lucia": "$",
	"Saint Vincent and the Grenadines": "$",
	Samoa: "T",
	"San Marino": "€",
	"Sao Tome and Principe": "Db",
	"Saudi Arabia": "﷼",
	Senegal: "CFA",
	Serbia: "дин.",
	Seychelles: "₨",
	"Sierra Leone": "Le",
	Singapore: "$",
	Slovakia: "€",
	Slovenia: "€",
	"Solomon Islands": "SI$",
	Somalia: "Sh.so.",
	"South Africa": "R",
	Spain: "€",
	"Sri Lanka": "Rs",
	Sudan: "SDG",
	Suriname: "$",
	Sweden: "kr",
	Switzerland: "CHF",
	Syria: "£S",
	Taiwan: "NT$",
	Tajikistan: "SM",
	Tanzania: "TSh",
	Thailand: "฿",
	Togo: "CFA",
	Tonga: "T$",
	"Trinidad and Tobago": "$",
	Tunisia: "DT",
	Turkey: "₺",
	Turkmenistan: "m",
	Tuvalu: "$",
	Uganda: "USh",
	Ukraine: "₴",
	"United Arab Emirates": "د.إ",
	"United Kingdom": "£",
	"United States": "$",
	Uruguay: "$U",
	Uzbekistan: "лв",
	Vanuatu: "VT",
	"Vatican City": "€",
	Venezuela: "Bs.F",
	Vietnam: "₫",
	Yemen: "﷼",
	Zambia: "ZK",
	Zimbabwe: "Z$",
};

// Function to get the currency symbol for a country
export const getCurrencySymbol = (country) => {
	return currencySymbols[country];
};

// Function to update the user's push token in the database and AsyncStorage
export const updateUserPushToken = async (userId, pushToken) => {
	try {
		const userRef = doc(db, "users", userId);
		await updateDoc(userRef, {
			pushToken,
		});

		// Update AsyncStorage
		const user = await AsyncStorage.getItem("user");
		if (user) {
			const userData = JSON.parse(user);
			userData.pushToken = pushToken;
			await AsyncStorage.setItem("user", JSON.stringify(userData));
		}
	} catch (error) {
		console.error("Error updating push token: ", error);
	}
};

// Function to remove the user's push token in the database and AsyncStorage
export const removeUserPushToken = async (userId) => {
	try {
		const userRef = doc(db, "users", userId);
		await updateDoc(userRef, {
			pushToken: "",
		});

		// Update AsyncStorage
		const user = await AsyncStorage.getItem("user");
		if (user) {
			const userData = JSON.parse(user);
			userData.pushToken = "";
			await AsyncStorage.setItem("user", JSON.stringify(userData));
		}
	} catch (error) {
		console.error("Error removing push token: ", error);
	}
};

const sendNotification = async (recipientToken, title, body) => {
	try {
		// Check if the recipient token is valid
		if (!recipientToken) {
			throw new Error("Recipient token is invalid");
		}

		// Set up the notification
		const message = {
			to: recipientToken,
			sound: "default",
			title: title,
			body: body,
			data: { data: "goes here" },
			_displayInForeground: true,
		};

		// Send the notification
		const response = await fetch("https://exp.host/--/api/v2/push/send", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Accept-encoding": "gzip, deflate",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});

		const data = await response.json();
		if (data.error) {
			throw new Error(`Error sending notification: ${data.error}`);
		}
	} catch (error) {
		console.error("Error sending notification:", error);
		throw error;
	}
};

// Function to send a push notification to a user
export const notifyOtherUsers = async (newUserId, newUserRole, otherUsers) => {
	await Promise.all(
		otherUsers.map(async (user) => {
			if (
				user?.role !== newUserRole &&
				user?.pushToken &&
				user.uid !== newUserId
			) {
				await sendNotification(
					user.pushToken,
					"New User Alert",
					`A new ${
						newUserRole === "Student" ? "student" : "tutor"
					} has joined the app!`
				);
			}
		})
	);
};
