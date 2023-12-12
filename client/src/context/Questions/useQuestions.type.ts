export enum QuestionTypes {
	EnglishToHiragana = 'EnglishToHiragana',
	HiraganaToEnglish = 'HiraganaToEnglish'
}

export interface VocabEntry {
	id: string | number,
	hiragana: string,
	romaji: string,
	english: string
}

export interface Question {
	vocabId: string | number,
	type: string,
	answer: string,
	potentialAnswers: Array<Partial<PotentialAnswer>>,
	question: string,
	guess?: string,
	wasCorrect: boolean,
}

export type PotentialAnswer = { answer: string, question: string } & VocabEntry 