export const getCardsFromSet = (set) => {
	let cards = [];
	set.words.map(({
		id: wordId,
		foreignWord,
		phoneticSpelling,
		uses
	}) => uses.map(use => cards.push({
		foreignWord,
		phoneticSpelling,
		...use,
		id: `${wordId}${use.id}`
	})));
	return cards;
}