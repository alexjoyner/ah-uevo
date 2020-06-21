import React from 'react';
import App from './App';

export default { title: 'AhUevo/App' }

const TestSet = require('./TestSet.json');
export const AppWithTestSet = () => {
	return (<App
		set={TestSet}
	/>)
}