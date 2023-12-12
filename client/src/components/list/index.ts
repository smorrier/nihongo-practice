import styled from 'styled-components';
import Table from '../Table';

const TableWrapper = styled.div`
	max-height: calc(100% - 60px);
	overflow-y: auto;
`

const ListTable = styled(Table)`
	width: 100%;
`

export {
	ListTable,
	TableWrapper,
}