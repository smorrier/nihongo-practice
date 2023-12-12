import styled from 'styled-components'

const ResponsesContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	> * {
		width: ${(props) => props.theme.screenSize != 'mobile' ? 'calc(50% - 5px)' :'100%' } !important;
		&:last-child {
			width: 100%!important;
		}
	}
	margin: 0 10px;
`

export default ResponsesContainer