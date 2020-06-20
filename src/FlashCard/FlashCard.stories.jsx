import React from 'react';
import { FlashCard } from './';
import { getCardsFromSet } from '../utils/getCardsFromSet';

const Cards = getCardsFromSet(require('../TestSet.json'));
const TestCard = Cards[0];

export default { title: 'AhUevo/FlashCard' }

export const Basic = () => {
	return (<FlashCard
		card={TestCard}
	/>)
}