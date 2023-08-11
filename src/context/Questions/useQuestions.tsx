import React, { createContext, useContext, useEffect, useState } from 'react'
import set1 from './vocabSets/1.json'
import set2 from './vocabSets/2.json'
import set3 from './vocabSets/3.json'
import set4 from './vocabSets/4.json'
import { SettingsProvider, useSettings } from '../useSettings'
const setData = [set1, set2, set3, set4]
export const sets = ['1', '2', '3', '4']

export enum QuestionTypes {
	EnglishToHiragana = 'EnglishToHiragana',
	HiraganaToEnglish = 'HiraganaToEnglish'
}
interface VocabEntry {
	id: string | number,
	hiragana: string,
	romaji: string,
	english: string
}
interface Question {
	type: string,
	answer: string,
	potentialAnswers: Array<Partial<PotentialAnswer>>,
	question: string,
	wasCorrect: boolean,
}
export type PotentialAnswer = { answer: string, question: string } & VocabEntry 

const defaultVocab: Array<VocabEntry> = set1

const QuestionContext = createContext<{ 
	question?: Question,
	guess?: string,
	respond: (x: string) => boolean,
	goNext: (x?: string) => void
}>({ guess: '', respond: (x) => Boolean(x), goNext: () => {} })

export function useQuestion() {
	return {
		...useContext(QuestionContext)
	}
}

interface Props{
	children: any
}

const randomQuestionType = () => {
	const entries = Object.keys(QuestionTypes)
	const random = Math.floor(Math.random() * entries.length)
	return (QuestionTypes as any)[entries[random]]
}

export function QuestionProvider({ children }:Props) {
	return (
		<SettingsProvider>
			<InnerQuestionProvider>
				{children}
			</InnerQuestionProvider>
		</SettingsProvider>
	)
}

function InnerQuestionProvider({ children }:Props) {
	const { settings } = useSettings()
	const [vocab, setVocab] = useState(defaultVocab)
	const [guess, setGuess] = useState<string | undefined>()
	const [question, setQuestion] = useState<Question>({ answer: '', potentialAnswers: [], question: '', type: '', wasCorrect: false})
	const [questionCount, setQuestionCount] = useState<number>(0)
	const [questionResponseMap, setQuestionResponseMap] = useState<{ 
		[key: string | number]: { 
			[reseponseType: string]: boolean 
		}
	}>({})

	useEffect(() => {
		setVocab(setData[parseInt(settings.set || "1") - 1])
	}, [settings])

	useEffect(() => {
		const questionType = randomQuestionType()
		const cloneVocab = { ...vocab }
		const randomIndex = (): number => {
			const arr = Object.keys(cloneVocab)
			return parseInt(arr[Math.floor(Math.random() * arr.length)])
		}
		const getQuestionAnswerByIndex = (index: number): PotentialAnswer => {
			let answer = ''
			let question = ''
			if(questionType == QuestionTypes.EnglishToHiragana) {
				question = vocab[index].english
				answer = vocab[index].hiragana
			} else if (questionType == QuestionTypes.HiraganaToEnglish) {
				question = vocab[index].hiragana
				answer = vocab[index].english
			}

			return {
				answer,
				question,
				...vocab[index],
			}
		}

		let index = randomIndex()
		while(questionResponseMap[vocab[index].id]?.[questionType]) {
			index = randomIndex()
		}

		const { answer, question, english, romaji } = getQuestionAnswerByIndex(index)

		let potentialAnswers = []
		
		potentialAnswers.push({ answer, english, romaji })

		delete cloneVocab[index]

		for(let i = 0; i < 3; i++ ) {
			const index = randomIndex()
			const { answer, english, romaji } = getQuestionAnswerByIndex(index)
			potentialAnswers.push({ answer, english, romaji })
			delete cloneVocab[index]
		}

		setQuestion({
			answer,
			potentialAnswers: potentialAnswers.sort(() => (Math.random() > .5) ? 1 : -1),
			type: questionType,
			question,
			wasCorrect: false
		})
	}, [questionResponseMap, questionCount, vocab])

	const respond = (guess: string) => {
		setGuess(guess)
		const wasCorrect = guess === question?.answer
		setQuestion({ ...question, wasCorrect })
		return wasCorrect
	}

	const goNext = (guess?: string) => {
		setGuess(guess)
		setQuestionCount(questionCount + 1)
	}
	
	return <QuestionContext.Provider value={{ question, guess, respond, goNext }}>
		{children}
	</QuestionContext.Provider>
}
