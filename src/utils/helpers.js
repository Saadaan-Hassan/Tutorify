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
