const vocabSets = [
	require('./1.json'),
	require('./2.json'),
	require('./3.json'),
	require('./4.json'),
	require('./5.json'),
	require('./6.json'),
	require('./7.json'),
	require('./8.json'),
	require('./9.json'),
	require('./10.json'),
	require('./11.json'),
	require('./12.json'),
	require('./13.json'),
	require('./14.json'),
	require('./15.json'),
	require('./16.json'),
]
const vocabSetOptions = vocabSets.map((el, i) => `${i + 1}`)

export {
	vocabSetOptions
}

export default vocabSets