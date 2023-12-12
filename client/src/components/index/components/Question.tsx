import styled from 'styled-components'

const Question = styled.div`
	text-align: center;
	font-size: ${(props) => props.theme.screenSize != 'mobile' ? '40px' :' 30px' };
	padding: ${(props) => props.theme.screenSize != 'mobile' ? '70px 0' :' 30px 10px' };
	padding-bottom: 0;
`

export default Question