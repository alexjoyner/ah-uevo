import React from 'react';
import { render } from '@testing-library/react';
import { FlashCard } from './';

describe('FlashCard', () => {
	it('should display text', () => {
		const { getByText } = render(<FlashCard>Hello World</FlashCard>);
		expect(getByText('Hello World')).toBeInTheDocument();
	});
});
