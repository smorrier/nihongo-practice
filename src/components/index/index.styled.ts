import styled from 'styled-components'

const DontKnowContainer = styled.div`
	display: flex;
	width: 100% !important;
	justify-content: space-between;
`

const DontKnow = styled.button`
	background-color: var(--buttonColor);
	border-radius: var(--buttonRadius);
	font-size: 24px;
	padding: 12px 16px;
	color: inherit;
	border: none;
	cursor: pointer;
`

const IconContainer = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;
`

export {
	DontKnowContainer,
	DontKnow,
	IconContainer,
}