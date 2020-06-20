export const getCardsFromSet = (set) => {
	let cards = [];
	set.words.map(({
		foreignWord,
		phoneticSpelling,
		uses
	}) => uses.map(use => cards.push({
		foreignWord,
		phoneticSpelling,
		...use
	})));
	return cards;
}