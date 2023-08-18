import Icon from "@/components/Icon";
import { Counter, DontKnow, DontKnowContainer, IconContainer, Question, QuestionsContainer } from "@/components/index";
import { Response, ResponsesContainer } from "@/components/index/components/responses";
import { QuestionProvider, useQuestion } from "@/context/Questions/useQuestions";
import { faCog, faList } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { ReactElement } from "react";

const Index = (): ReactElement | null => {
	const { question, respond, goNext } = useQuestion()
	const guess = question?.guess

	const onDontKnowClick = () => {
		if(guess || guess != undefined) {
			return goNext()
		}
		respond('')
	}

	if(!question) {
		return null
	}

	return <QuestionsContainer>
		<Question>
			{question?.question}
		</Question>
		<Counter />
		<ResponsesContainer>
			{question.potentialAnswers.map((x: any, index) => {
				return (
					<Response
						key={`${x}-${index}`}
						response={x}
					>
						{x}
					</Response>
				)
			})}
			<DontKnowContainer>
				<IconContainer>
					<Link href='settings'>
						<Icon icon={faCog} />
					</Link>
					<Link href='list'>
						<Icon icon={faList} />
					</Link>
				</IconContainer>
				<DontKnow onClick={onDontKnowClick}>Don&apos;t know</DontKnow>
			</DontKnowContainer>
		</ResponsesContainer>
	</QuestionsContainer>
}

const WrappedIndex = (): ReactElement => {
	return (
		<QuestionProvider>
			<Index />
		</QuestionProvider>
	)
}

export default WrappedIndex