import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { SettingsProvider, useSettings } from '../useSettings'
import { PotentialAnswer, Question, QuestionTypes, VocabEntry } from './useQuestions.type'
import setData from './vocabSets'

export const sets = ['1', '2', '3', '4', '5']

const defaultVocab: Array<VocabEntry> = setData[0]

const QuestionContext = createContext<{ 
	question?: Question,
	respond: (x: string) => boolean,
	goNext: () => void,
	questionsAnswered: number,
	totalQuestions: number
}>({ respond: (x) => Boolean(x), goNext: () => {}, questionsAnswered: 0, totalQuestions: 0 })

export function useQuestion() {
	return useContext(QuestionContext)
}

export function QuestionProvider({ children }: { children: any }) {
	return (
		<SettingsProvider>
			<InnerQuestionProvider>
				{children}
			</InnerQuestionProvider>
		</SettingsProvider>
	)
}

function InnerQuestionProvider({ children }: { children: any }) {
	const { settings } = useSettings()
	const [vocab, setVocab] = useState(defaultVocab)
	const [questionsAnswered, setQuestionsAnswered] = useState(0)
	const [series, setSeries] = useState<Array<{ type: string, word: VocabEntry, index: number }>>([])
	const generateQuestionSeries = () => {
		const series: any = []
		vocab.map((word, index) => {
			Object.values(QuestionTypes).map((type) => {
				series.push({ type, word, index })
			})
		})
		setSeries(series.sort(() => (Math.random() > .5) ? 1 : -1))
	}
	const totalQuestions = useMemo(() => Object.values(QuestionTypes).length * vocab.length, [vocab])
	const reset = () => {
		generateQuestionSeries()
		setQuestionsAnswered(0)
	}
	useEffect(generateQuestionSeries, [vocab])

	const [question, setQuestion] = useState<Question>({ vocabId: '', answer: '', potentialAnswers: [], question: '', type: '', wasCorrect: false})

	useEffect(() => {
		setVocab(setData[parseInt(settings.set || "1") - 1])
	}, [settings])

	const generateQuestion = () => {
		if(series.length) {
			const word = series[series.length - 1]
			const questionType = word.type
			const randomIndex = (vocab: Array<VocabEntry>): number => {
				const arr = Object.keys(vocab)
				return parseInt(arr[Math.floor(Math.random() * arr.length)])
			}
			const getQuestionAnswerByIndex = (word: VocabEntry): PotentialAnswer => {
				if(questionType == QuestionTypes.EnglishToHiragana) {
					return {
						answer: word.hiragana,
						question: word.english,
						...word,
					}
				} else {
					return {
						answer: word.english,
						question: word.hiragana,
						...word,
					}
				}

			}

			const cloneVocab = { ...vocab }

			let potentialAnswers = []
			
			potentialAnswers.push(getQuestionAnswerByIndex(word.word))

			delete cloneVocab[word.index]

			for(let i = 0; i < 3; i++ ) {
				const index = randomIndex(cloneVocab)
				potentialAnswers.push(getQuestionAnswerByIndex(cloneVocab[index]))
				delete cloneVocab[index]
			}

			setQuestion({
				vocabId: word.word.id,
				answer: potentialAnswers[0].answer,
				question: potentialAnswers[0].question,
				potentialAnswers: potentialAnswers.sort(() => (Math.random() > .5) ? 1 : -1),
				type: questionType,
				wasCorrect: false
			})
		}
	}

	useEffect(() => {
		generateQuestion()
	}, [series])

	const respond = (guess: string) => {
		const wasCorrect = guess === question?.answer
		if(wasCorrect) {
			setQuestionsAnswered(questionsAnswered + 1)
		}
		setQuestion({ ...question, wasCorrect, guess })
		return wasCorrect
	}

	const goNext = () => {
		const newSeries = [...series]
		if(question.wasCorrect) {
			newSeries.pop()
		} else {
			newSeries.sort(() => (Math.random() > .5) ? 1 : -1)
		}
		if(newSeries.length) {
			setSeries(newSeries)
		} else {
			reset()
		}
	}
	
	return <QuestionContext.Provider value={{ question, respond, goNext, questionsAnswered, totalQuestions }}>
		{children}
	</QuestionContext.Provider>
}
