import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
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
	vocabId: string | number,
	type: string,
	answer: string,
	potentialAnswers: Array<Partial<PotentialAnswer>>,
	question: string,
	guess?: string,
	wasCorrect: boolean,
}
export type PotentialAnswer = { answer: string, question: string } & VocabEntry 

const defaultVocab: Array<VocabEntry> = set1

const QuestionContext = createContext<{ 
	question?: Question,
	respond: (x: string) => boolean,
	goNext: (x?: string) => void
}>({ respond: (x) => Boolean(x), goNext: () => {} })

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
	const [question, setQuestion] = useState<Question>({ vocabId: '', answer: '', potentialAnswers: [], question: '', type: '', wasCorrect: false})
	const [questionResponseMap, setQuestionResponseMap] = useState<{ 
		[key: string | number]: { 
			[reseponseType: string]: boolean 
		}
	}>({})

	useEffect(() => {
		setVocab([setData[parseInt(settings.set || "1") - 1][0], setData[parseInt(settings.set || "1") - 1][1], setData[parseInt(settings.set || "1") - 1][2], setData[parseInt(settings.set || "1") - 1][3]])
	}, [settings])

	const totalAnswered = useMemo(() => Object.values(questionResponseMap).reduce((accum, element) => accum + Object.keys(element).length, 0), [questionResponseMap])
	const totalQuestions = useMemo(() => {
		return vocab.length * Object.keys(QuestionTypes).length
	}, [vocab])

	const generateQuestion = () => {
		if(totalQuestions == totalAnswered) {
			return;
		}

		const questionType = randomQuestionType()
		const randomIndex = (vocab: Array<VocabEntry>): number => {
			const arr = Object.keys(vocab)
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

		const cloneVocab = { ...vocab }
		const cloneVocab2 = { ...cloneVocab }
		let index
		while(true) {
			index = randomIndex(cloneVocab2)
			console.log({ index })
			if(questionResponseMap[vocab[index].id]?.[questionType]) {
				delete cloneVocab2[index]
			} else {
				break;
			}
		}

		const { answer, question, english, romaji } = getQuestionAnswerByIndex(index)

		let potentialAnswers = []
		
		potentialAnswers.push({ answer, english, romaji })

		delete cloneVocab[index]

		for(let i = 0; i < 3; i++ ) {
			const index = randomIndex(cloneVocab)
			const { answer, english, romaji } = getQuestionAnswerByIndex(index)
			potentialAnswers.push({ answer, english, romaji })
			delete cloneVocab[index]
		}

		setQuestion({
			vocabId: vocab[index].id,
			answer,
			potentialAnswers: potentialAnswers.sort(() => (Math.random() > .5) ? 1 : -1),
			type: questionType,
			question,
			wasCorrect: false
		})
	}

	useEffect(() => {
		generateQuestion()
	}, [vocab])

	useEffect(() => {
		if(totalQuestions == totalAnswered) {
			setQuestionResponseMap({})
		}
	}, [totalQuestions, totalAnswered])

	const respond = (guess: string) => {
		const wasCorrect = guess === question?.answer
		setQuestion({ ...question, wasCorrect, guess })
		if(wasCorrect) {
			const copy = { ...questionResponseMap }
			copy[question.vocabId] = { ...(copy[question.vocabId] || {}) }
			copy[question.vocabId][question.type] = true
			setQuestionResponseMap(copy)
		}
		return wasCorrect
	}

	const goNext = (guess?: string) => {
		setQuestion({ ...question, guess })
		generateQuestion()
	}
	
	return <QuestionContext.Provider value={{ question, respond, goNext }}>
		{children}
	</QuestionContext.Provider>
}
