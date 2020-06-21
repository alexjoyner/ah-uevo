import React, { useState, useEffect } from 'react';
import { Card, Button } from 'ro-ui-atoms';
import { MdFlip } from 'react-icons/md';

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
	const getUseCaseDetailsBtn = () => (
		<>
			{useDetailsShown ? (
				<Button data-testid="hide-use-details" onClick={() => setUseDetailsShown(false)}>Hide Use Details</Button>
			) : (
					<Button data-testid="show-use-details" onClick={() => setUseDetailsShown(true)}>Show Use Details</Button>
				)}
		</>
	)
	const getControlButtons = () => (<>
		<Button data-testid="incorrect-btn" onClick={onIncorrect}>Incorrect</Button>
		<Button data-testid="card-flip-btn" onClick={flipCard}><MdFlip /></Button>
		<Button data-testid="correct-btn" onClick={onCorrect}>Correct</Button>
	</>)
	const getForeignSide = () => (
		<Card data-testid="flashcard">
			{({ Header, Footer, Body }) => (
				<>
					<Header>
						<span>{foreignWord}</span>
						--(<span>{phoneticSpelling}</span>)
						<span>{getUseCaseDetailsBtn()}</span>
					</Header>
					<Body>
						{foreignSentence}
						<div>{useDetailsShown && useDetails}</div>
					</Body>
					<Footer>{getControlButtons()}</Footer>
				</>
			)}
		</Card>
	);
	const getEnglishSide = () => (
		<Card data-testid="flashcard">
			{({ Header, Footer, Body }) => (
				<>
					<Header>
						<span>{englishWord}</span>
						<span>{getUseCaseDetailsBtn()}</span></Header>
					<Body>
						{englishSentence}
						<div>{useDetailsShown && useDetails}</div>
					</Body>
					<Footer>{getControlButtons()}</Footer>
				</>
			)}
		</Card>
	);

	return foreignSideShown ? getForeignSide() : getEnglishSide();
}

export { FlashCard };