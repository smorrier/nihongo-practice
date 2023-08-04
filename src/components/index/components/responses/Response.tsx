import { PotentialAnswer, QuestionTypes, useQuestion } from '@/context/Questions/useQuestions';
import { useSettings } from '@/context/useSettings';
import { ButtonHTMLAttributes, ReactElement, useMemo } from 'react';
import styled from 'styled-components';

const _Button = styled.button<{ guess: boolean | string }>`
	background-color: var(--buttonColor);
	border-radius: var(--buttonRadius);
	border: none;
	text-align: center;
	font-weight: 600;
	font-size: 36px;
	color: inherit;
	cursor: pointer;
	padding: ${(props) => props.theme.screenSize != 'mobile' ? '50px' : '8px' } !important;
	${(props) => {
		console.log(props.guess)
		if(props.guess == 'correct') {
			return `background-color: #428d53!important;`
		} else if (props.guess == 'incorrect'){
			return `background-color: #843535!important;`
		}
	}}
	.romaji {
		font-weight: 400;
		font-size: 12px;
		opacity: .6;
	}
`

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> { response: PotentialAnswer }

export default function Response({ response, ...props }: IProps): ReactElement {
	const { respond, guess, question, goNext } = useQuestion()
	const { settings } = useSettings()
	const onClick = (e: any) => {
		if(guess) {
			return goNext()
		}
		props.onClick?.(e)
		respond(response.answer)
	}

	const correctClass = useMemo(() => {
		if(guess == response.answer) {
			if(question?.wasCorrect) {
				return 'correct'
			} else {
				return 'incorrect'
			}
		}
		if(guess && question?.answer == response.answer) {
			return 'correct'
		}
		return ''
	}, [guess, response, question])

	const romaji = useMemo(() => {
		if(settings.allowRomaji == 'no') {
			return ''
		}
		return response.romaji
	}, [response, question])

	return (
		<_Button {...props} onClick={onClick} guess={correctClass}>
			{response.answer}
			{question?.type == QuestionTypes.EnglishToHiragana && <div className='romaji'>{romaji}</div>}
		</_Button>
	)
}