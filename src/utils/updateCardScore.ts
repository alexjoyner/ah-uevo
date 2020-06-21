import { getScores } from './getScores';

export const updateCardScore = (id, numOfPoints) => {
	const scores = getScores();
	let index = -1;
	scores.map((score, i) => {
		if (score.id === id) {
			index = i;
		}
	})
	if (index === -1) {
		return localStorage.setItem('scores', JSON.stringify([...scores, { id, score: numOfPoints }]))
	}
	scores[index].score += numOfPoints;
	return localStorage.setItem('scores', JSON.stringify([...scores]))
}