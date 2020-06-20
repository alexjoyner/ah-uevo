export const getScores = () => {
	const rawScores = localStorage.getItem('scores');
	if (rawScores) return JSON.parse(rawScores);
	localStorage.setItem('scores', JSON.stringify([]));
	return [];
}
