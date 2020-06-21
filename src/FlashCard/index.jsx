import React, { useState, useEffect } from 'react';
import { Card } from 'ro-ui-atoms';

const FlashCard = ({
	card,
	initOnForeignSide = true,
	onCorrect,
	onIncorrect
}) => {
	const {
		foreignWord,
		phoneticSpelling,
		foreignSentence,
		englishWord,
		englishSentence,
		useDetails = '',
	} = card;
	const [foreignSideShown, setForeignSideShown] = useState(initOnForeignSide);
	const [useDetailsShown, setUseDetailsShown] = useState(false);
	useEffect(() => {
		setForeignSideShown(initOnForeignSide);
		return () => null;
	}, [card])
	const flipCard = () => {
		setForeignSideShown(!foreignSideShown);
	}
	return (
		<Card data-testid="flashcard">
			{useDetailsShown ? (
				<button data-testid="hide-use-details" onClick={() => setUseDetailsShown(false)}>Hide Use Details</button>
			) : (
					<button data-testid="show-use-details" onClick={() => setUseDetailsShown(true)}>Show Use Details</button>
				)}
			{
				foreignSideShown ? (
					<>
						<div>{foreignWord}</div>
						<div>{phoneticSpelling}</div>
						<div>{foreignSentence}</div>
					</>
				) : (
						<>
							<div>{englishWord}</div>
							<div>{englishSentence}</div>
						</>
					)
			}
			<div>{useDetailsShown && useDetails}</div>
			<button data-testid="incorrect-btn" onClick={onIncorrect}>Incorrect</button>
			<button data-testid="card-flip-btn" onClick={flipCard}>Flip</button>
			<button data-testid="correct-btn" onClick={onCorrect}>Correct</button>
		</Card >
	)
}

export { FlashCard };