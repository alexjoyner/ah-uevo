import React, { useState, useEffect } from 'react';
import { Card, Button } from 'ro-ui-atoms';
import { MdFlip } from 'react-icons/md';
import { AiOutlineCheck, AiOutlineClose, AiOutlineInfoCircle } from 'react-icons/ai';
import './FlashCard.css'

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
		<Button
			style={{ marginLeft: 'auto' }}
			data-testid="use-details-btn"
			onClick={() => setUseDetailsShown(!useDetailsShown)}>
			<AiOutlineInfoCircle />
		</Button>
	)
	const getControlButtons = () => (<>
		<Button style={{ marginRight: 'auto' }} data-testid="incorrect-btn" onClick={onIncorrect}><AiOutlineClose /></Button>
		<Button data-testid="card-flip-btn" onClick={flipCard}><MdFlip /></Button>
		<Button style={{ marginLeft: 'auto' }} data-testid="correct-btn" onClick={onCorrect}><AiOutlineCheck /></Button>
	</>)

	return (
		<Card data-testid="flashcard">
			{({ Header, Footer, Body }) => (
				<>
					<Header>
						<span className="HeaderText" style={{ marginRight: '8px' }}>{foreignSideShown ? foreignWord : englishWord}</span>
						{foreignSideShown && <span className="HeaderText">(<span>{phoneticSpelling}</span>)</span>}
						{getUseCaseDetailsBtn()}
					</Header>
					<Body className="FlashCardBody">
						{foreignSideShown ? foreignSentence : englishSentence}
						<div>{useDetailsShown && useDetails}</div>
					</Body>
					<Footer>{getControlButtons()}</Footer>
				</>
			)}
		</Card>
	);
}

export { FlashCard };