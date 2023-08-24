
import Container from "@/components/Container";
import Select from "@/components/Select";
import { PracticeLink } from "@/components/settings";
import { sets } from "@/context/ActiveSet/useActiveSet";
import { SettingsProvider, useSettings } from "@/context/useSettings";
import React, { ReactElement } from "react";

const Settings = (): ReactElement | null => {
	const { settings, setSettings } = useSettings()
	const onChange = (e: any) => {
		setSettings({ ...settings, [e.target.name]: e.target.value })
	}
	
	if(!Object.keys(settings).length) {
		return null
	}

	return <Container>
		<label>Set</label>
		<Select value={settings.set as string} name='set' onChange={onChange}>
			<option />
			{sets.map((set) => (<option key={set}>{set}</option>))}
		</Select>
		<label>Show Romaji</label>
		<Select value={settings.allowRomaji as string} name='allowRomaji' onChange={onChange}>
			<option value='yes'>Yes</option>
			<option value='no'>No</option>
		</Select>
		<PracticeLink href='/'>Back to Practice</PracticeLink>
	</Container>
}

const WrappedSettings = () => (<SettingsProvider><Settings/></SettingsProvider>)

export default WrappedSettings