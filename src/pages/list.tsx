
import { Container, PracticeLink, Select } from "@/components/settings";
import { sets } from "@/context/ActiveSet/useActiveSet";
import { SettingsProvider, useSettings } from "@/context/useSettings";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import setData from "@/context/ActiveSet/vocabSets"
import Table from "@/components/Table";

const List = (): ReactElement | null => {
	const { settings } = useSettings()
	const [set, setSet] = useState(settings)

	useEffect(() => {
		setSet(settings.set)
	}, [settings.set])

	const activeSet = useMemo(() => {
		return setData[set || '0'] || []
	}, [set])

	const onChange = (e: any) => {
		setSet(e.target.value)
	}

	return <Container>
		<label>Set</label>
		<Select value={set} name='set' onChange={onChange}>
			<option />
			{sets.map((set) => (<option key={set}>{set}</option>))}
		</Select>
		<Table>
			<thead>
				<tr>
					<th>English</th>
					{settings.allowRomaji == 'yes' &&<th>Romaji</th>}
					<th>Hiragana</th>
				</tr>
			</thead>
			<tbody>
				{activeSet.map((vocab, index) => {
					return (
						<tr key={`vocab-list-${index}`}>
							<td>{vocab.english}</td>
							<td>{vocab.romaji}</td>
							<td>{vocab.hiragana}</td>
						</tr>
					)
				})}
			</tbody>
		</Table>
		<PracticeLink href='/'>Back to Practice</PracticeLink>
	</Container>
}

const WrappedList = () => (<SettingsProvider><List/></SettingsProvider>)

export default WrappedList