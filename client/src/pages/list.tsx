
import { PracticeLink } from "@/components/settings";
import { SettingsProvider, useSettings } from "@/context/useSettings";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import setData, { vocabSetOptions } from "@/context/ActiveSet/vocabSets";
import { ListTable, TableWrapper } from "@/components/list";
import Container from "@/components/Container";
import Select from "@/components/Select";
import Input from "@/components/Input";

const List = (): ReactElement | null => {
	const { settings } = useSettings()
	const [set, setSet] = useState<string>('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		setSet(settings.set)
	}, [settings.set])

	const activeSet = useMemo(() => {
		let _activeSet = setData[parseInt(set || "1") - 1] || []
		if(!set) {
			_activeSet = setData.reduce((accum, x) => [...accum, ...x])
		}
		_activeSet.sort((a, b) => a.english < b.english ? -1 : 1)
		if(search) {
			var normalizeSearch = search.toLowerCase()
			return _activeSet.filter(({ english, hiragana, romaji }) => {
				if(settings.allowRomaji && romaji.toLowerCase().includes(normalizeSearch)) {
					return true
				}
				return english.toLowerCase().includes(normalizeSearch) || hiragana.includes(normalizeSearch)
			})
		}
		return _activeSet
	}, [set, search, settings])

	const onChange = (e: any) => {
		setSet(e.target.value)
	}

	return <Container>
		<label>Set</label>
		<Select value={set} name='set' onChange={onChange}>
			<option value="">All</option>
			{vocabSetOptions.map((set) => (<option key={set}>{set}</option>))}
		</Select>
		<label>Search</label>
		<Input value={search} name='search' onChange={(e) => setSearch(e.target.value)} />
		<TableWrapper>
			<ListTable>
				<thead>
					<tr>
						<th>English</th>
						{settings.allowRomaji == 'yes' && <th>Romaji</th>}
						<th>Hiragana</th>
					</tr>
				</thead>
				<tbody>
					{activeSet.map((vocab, index) => {
						return (
							<tr key={`vocab-list-${index}`}>
								<td>{vocab.english}</td>
								{(settings.allowRomaji || 'yes') == 'yes' && <td>{vocab.romaji}</td>}
								<td>{vocab.hiragana}</td>
							</tr>
						)
					})}
				</tbody>
			</ListTable>
		</TableWrapper>
		<PracticeLink href='/'>Back to Practice</PracticeLink>
	</Container>
}

const WrappedList = () => (<SettingsProvider><List/></SettingsProvider>)

export default WrappedList