import { styled } from "styled-components"

const Container = styled.div`
	width: ${(props) => {
		return props.theme.screenSize == 'mobile' ? '100wv' : '50vw'
	}};
	padding: 20px 0;
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 12px;
	label {
		font-size: 18px !important;
		margin-bottom: -4px;
	}
	height: 100vh;
`

export default Container