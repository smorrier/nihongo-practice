import styled from 'styled-components';

const QuestionsContainer = styled.div`
	margin: auto;
	width: ${(props) => {
		return props.theme.screenSize == 'mobile' ? '100%' : '50%'
	}};
`

export default QuestionsContainer