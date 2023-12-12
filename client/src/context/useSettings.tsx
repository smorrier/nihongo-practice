import React, { createContext, useContext, useEffect, useState } from 'react'

const SettingsContext = createContext<{ 
	settings: any,
	setSettings: (x: any) => void,
}>({ settings: {}, setSettings: () => {} })

export function useSettings() {
	return useContext(SettingsContext)
}

interface Props{
	children: any
}

export function SettingsProvider({ children }:Props) {
	const [settings, setSettings] = useState<any>({})

	useEffect(() => {
		setSettings(JSON.parse((localStorage.getItem('settings')) || JSON.stringify({ set: "1", allowRomaji: "yes"})))
	}, [])

	useEffect(() => {
		if(Object.keys(settings).length) {
			localStorage.setItem('settings', JSON.stringify(settings))
		}
	}, [settings])
	
	return <SettingsContext.Provider value={{ settings, setSettings }}>
		{children}
	</SettingsContext.Provider>
}
