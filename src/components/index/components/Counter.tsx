import { useQuestion } from '@/context/Questions/useQuestions'
import styled from 'styled-components'

const CounterWrapper = styled.div`
	width: calc(100% - 22px);
	height: 10px;
	margin: 0 11px;
	margin-top: 24px;
	margin-bottom: 10px;
	border: 1px solid #FFFFFF99;
	border-radius: 3px;
`

const CounterInner = styled.div<{ width?: number }>`
	width: ${(props) => props.width}%;
	background-color: green;
	height: 100%;
	border-radius: inherit;
    transition: width 0.35s ease-in-out;
	margin-bottom: 1px;
`

export default function Counter() {
	const { totalQuestions, questionsAnswered } = useQuestion()

	return (<CounterWrapper>
		<CounterInner width={(questionsAnswered / totalQuestions) * 100} />
	</CounterWrapper>)
}