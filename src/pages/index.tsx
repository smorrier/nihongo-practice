import { DontKnow, DontKnowContainer, Question, QuestionsContainer } from "@/components/index";
import { Response, ResponsesContainer } from "@/components/index/components/responses";
import { SettingsLink } from "@/components/index/index.styled";
import { QuestionProvider, useQuestion } from "@/context/Questions/useQuestions";
import React, { ReactElement } from "react";

const Index = (): ReactElement | null => {
	const { question, respond, guess, goNext } = useQuestion()

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
				<SettingsLink href='settings'>Settings</SettingsLink>
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