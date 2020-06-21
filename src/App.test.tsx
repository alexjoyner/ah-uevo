import React from 'react';
import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import { LocalStorageMock } from '@react-mock/localstorage';

const TestSet = require('./TestSet.json');

const renderAppWithStorage = (initStorage = {}, props) => {
	render(
		<LocalStorageMock items={initStorage}>
			<App {...props} />
		</LocalStorageMock>
	);
}

it('should display 1 and only 1 flashcard', () => {
	renderAppWithStorage(null, { set: TestSet });
	expect(screen.getAllByTestId('flashcard').length).toBe(1);
});

it('should display the set name', () => {
	renderAppWithStorage(null, { set: TestSet });
	expect(screen.getByText('Test Set')).toBeInTheDocument();
})
describe('what card the app should be initialized with', () => {
	describe('when there is a card that has not been scored yet', () => {
		it('should start app with the first non scored card it finds', () => {
			renderAppWithStorage(null, { set: TestSet });
			expect(screen.getByText('Mis padres vienen de Mexico.')).toBeInTheDocument();
		})
	})
	describe('when all cards in set have been scored', () => {
		const savedScores = JSON.stringify([{
			id: '1A',
			score: 10
		}, {
			id: '1B',
			score: 1
		}])
		it('should start app with the lowest scored card', () => {
			renderAppWithStorage({ scores: savedScores }, { set: TestSet });
			expect(screen.getByText('Esta mesa está hecha de plástico.')).toBeInTheDocument();
		})
	})
})

it('should add score to that card in scores when the user clicks correct', () => {
	renderAppWithStorage(null, {
		set: TestSet
	});
	expect(JSON.parse(localStorage.getItem('scores'))).toEqual([]);
	fireEvent.click(screen.getByTestId('correct-btn'));
	expect(JSON.parse(localStorage.getItem('scores'))[0].score).toEqual(1);
})
it('should subtract score to that card in scores when the user clicks incorrect', () => {
	renderAppWithStorage(null, {
		set: TestSet
	});
	expect(JSON.parse(localStorage.getItem('scores'))).toEqual([]);
	fireEvent.click(screen.getByTestId('incorrect-btn'));
	expect(JSON.parse(localStorage.getItem('scores'))[0].score).toEqual(-1);
})
describe('what card is selected next after correct/incorrect event', () => {
	describe('when there is a card that has not been scored yet', () => {
		it('should start app with the next non scored card it finds - CASE: User Clicked Correct Button', () => {
			renderAppWithStorage(null, { set: TestSet });
			fireEvent.click(screen.getByTestId('correct-btn'));
			expect(screen.getByText('Esta mesa está hecha de plástico.')).toBeInTheDocument();
		})
		it('should start app with the next non scored card it finds - CASE: User Clicked Incorrect Button', () => {
			renderAppWithStorage(null, { set: TestSet });
			fireEvent.click(screen.getByTestId('incorrect-btn'));
			expect(screen.getByText('Esta mesa está hecha de plástico.')).toBeInTheDocument();
		})
	})
	describe('when all cards in set have been scored', () => {
		const savedScores = JSON.stringify([{
			id: '1A',
			score: 1
		}, {
			id: '1B',
			score: 1
		}])
		it('should get the next card with the lowest score THAT ISN\'T the current card', () => {
			renderAppWithStorage({ scores: savedScores }, { set: TestSet });
			expect(screen.getByText('Mis padres vienen de Mexico.')).toBeInTheDocument();
			fireEvent.click(screen.getByTestId('incorrect-btn'));
			expect(screen.getByText('Esta mesa está hecha de plástico.')).toBeInTheDocument();
		})
	})
})

test('when card changes, the displayed card side will be the initial side', () => {
	renderAppWithStorage(null, { set: TestSet });
	// make sure the first card in the set is shown
	expect(screen.getByText('Mis padres vienen de Mexico.')).toBeInTheDocument();
	fireEvent.click(screen.getByTestId('card-flip-btn'));
	// flipped card should be on the english side
	expect(screen.getByText('My parents are from Mexico.')).toBeInTheDocument();
	fireEvent.click(screen.getByTestId('correct-btn'));
	// next card should be back on the translated side
	expect(screen.getByText('Esta mesa está hecha de plástico.')).toBeInTheDocument();
})