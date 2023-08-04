import { DontKnow, DontKnowContainer, Question, QuestionsContainer } from "@/components/index";
import { Response, ResponsesContainer } from "@/components/index/components/responses";
import { SettingsLink } from "@/components/index/index.styled";
import { QuestionProvider, useQuestion } from "@/context/Questions/useQuestions";
import { SettingsProvider } from "@/context/useSettings";
import React, { ReactElement } from "react";

const Index = (): ReactElement | null => {
	const { question, goNext, guess } = useQuestion()

	const onDontKnowClick = () => {
		goNext()
	}

	if(!question) {
		return null
	}

	return <QuestionsContainer>
		<Question>{question?.question}</Question>
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
				<DontKnow onClick={onDontKnowClick}>Don&apost know</DontKnow>
			</DontKnowContainer>
		</ResponsesContainer>
	</QuestionsContainer>
}

const WrappedIndex = (): ReactElement => {
	return (
		<SettingsProvider>
			<QuestionProvider>
				<Index />
			</QuestionProvider>
		</SettingsProvider>
	)
}

export default WrappedIndex