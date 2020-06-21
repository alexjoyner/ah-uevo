import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FlashCard } from '.';
import { getCardsFromSet } from '../utils/getCardsFromSet';

const Cards = getCardsFromSet(require('../TestSet.json'));
const TestCard = Cards[0];

test('Displays the foreign side correctly', () => {
	render(<FlashCard card={TestCard} />)

	expect(screen.getByText(TestCard.foreignWord)).toBeInTheDocument();
	expect(screen.getByText(TestCard.phoneticSpelling)).toBeInTheDocument();
	expect(screen.getByText(TestCard.foreignSentence)).toBeInTheDocument();
	expect(screen.queryByText(TestCard.englishSentence)).toBeNull();
	expect(screen.queryByText(TestCard.englishWord)).toBeNull();
});

test('Displays the english side properly', () => {
	render(<FlashCard card={TestCard} initOnForeignSide={false} />)

	expect(screen.getByText(TestCard.englishSentence)).toBeInTheDocument();
	expect(screen.getByText(TestCard.englishWord)).toBeInTheDocument();

	expect(screen.queryByText(TestCard.foreignWord)).toBeNull();
	expect(screen.queryByText(TestCard.phoneticSpelling)).toBeNull();
	expect(screen.queryByText(TestCard.foreignSentence)).toBeNull();
})

test('Allows flipping the card to toggle rendered side', () => {
	render(<FlashCard card={TestCard} />)

	expect(screen.getByText(TestCard.foreignWord)).toBeInTheDocument();
	expect(screen.queryByText(TestCard.englishWord)).toBeNull();

	fireEvent.click(screen.getByTestId('card-flip-btn'));

	expect(screen.getByText(TestCard.englishWord)).toBeInTheDocument();
	expect(screen.queryByText(TestCard.foreignWord)).toBeNull();

	fireEvent.click(screen.getByTestId('card-flip-btn'));

	expect(screen.getByText(TestCard.foreignWord)).toBeInTheDocument();
	expect(screen.queryByText(TestCard.englishWord)).toBeNull();
})

test('User can show/hide the use case details', () => {
	render(<FlashCard card={TestCard} />)

	expect(screen.queryByText(TestCard.useDetails)).toBeNull();

	fireEvent.click(screen.getByTestId('use-details-btn'));

	expect(screen.getByText(TestCard.useDetails)).toBeInTheDocument();

	fireEvent.click(screen.getByTestId('use-details-btn'));

	expect(screen.queryByText(TestCard.useDetails)).toBeNull();
})

test('Calls onCorrect when user click correct button', () => {
	const onCorrect = jest.fn();
	render(<FlashCard card={TestCard} onCorrect={onCorrect} />)
	expect(onCorrect).not.toHaveBeenCalled();
	fireEvent.click(screen.getByTestId('correct-btn'))
	expect(onCorrect).toBeCalledTimes(1);
})

test('Calls onIncorrect when user click incorrect button', () => {
	const onIncorrect = jest.fn();
	render(<FlashCard card={TestCard} onIncorrect={onIncorrect} />)
	expect(onIncorrect).not.toHaveBeenCalled();
	fireEvent.click(screen.getByTestId('incorrect-btn'))
	expect(onIncorrect).toBeCalledTimes(1);
})