
import { styled } from "styled-components";

const Container = styled.div`
	width: ${(props) => {
		return props.theme.screenSize == 'mobile' ? '100wv' : '50vw'
	}};
	margin: 20px auto;
	display: flex;
	flex-direction: column;
	gap: 12px;
	label {
		font-size: 18px !important;
		margin-bottom: -4px;
	}
`

const Select = styled.select`
	padding: 4px 10px;
	border: none!important;
	border-radius: var(--buttonRadius);
	width: 100%;
`

const PracticeLink = styled.a`
	color: #417deb;
	margin: auto 0;
	padding: 16px 0;
	cursor: pointer;
`

export {
	Container,
	Select,
	PracticeLink
}