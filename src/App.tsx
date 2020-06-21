import React, { useState } from "react"
import { FlashCard } from './FlashCard/index.jsx';
import { updateCardScore } from './utils/updateCardScore';
import { getScores } from './utils/getScores';
import { getCardsFromSet } from './utils/getCardsFromSet';
import 'normalize.css';
import './App.css'

const getNextCard = (cards, lastCardId) => {
	const scores: [{ id: number, score: number }] = getScores();
	const scoreIds = scores.map(({ id }) => id);
	const unscoredCards = cards.filter(card => scoreIds.indexOf(card.id) === -1);
	if (unscoredCards.length > 0) {
		return unscoredCards[0];
	}
	const sortedScores = scores.sort((a, b) => a.score - b.score);
	const sortedSet = sortedScores.map(score => cards.filter(card => card.id === score.id)[0]);
	const nextCards = sortedSet.filter(card => card.id !== lastCardId);
	if (nextCards.length > 0) {
		return nextCards[0];
	}
	console.error('Next Card could not be found');
}


const App = ({ set }) => {
	const cards = getCardsFromSet(set);
	const [card, setCard] = useState(getNextCard(cards, null))
	const handleCorrect = () => {
		updateCardScore(card.id, 1);
		setCard(getNextCard(cards, card.id));
	}
	const handleIncorrect = () => {
		updateCardScore(card.id, -1);
		setCard(getNextCard(cards, card.id));
	}
	return (<>
		<h1>{set.name}</h1>
		<div className="FlashCardContainer">
			<FlashCard card={card} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />
		</div>
	</>)
}


export default App;
