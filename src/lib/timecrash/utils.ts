export function formatUnixTimestamp(timestamp) {
	// Convert seconds to milliseconds if needed
	if (timestamp.toString().length === 10) {
		timestamp *= 1000;
	}

	const date = new Date(timestamp);

	const options = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	};

	return date.toLocaleString('en-GB', options);
}

export function secondsToDurationString(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const newSeconds = Math.floor(seconds) % 60;
	const milliseconds = (seconds * 1000) % 1000;
	const durationString = `${String(minutes).padStart(2, '0')}:${String(Math.round(newSeconds)).padStart(2, '0')}:${String(Math.round(milliseconds)).padStart(3, '0')}`;
	return durationString;
}
