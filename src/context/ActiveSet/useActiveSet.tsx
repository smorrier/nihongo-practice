import React, { createContext, useContext, useEffect, useState } from 'react'
import { SettingsProvider, useSettings } from '../useSettings'
import setData from './vocabSets'
import { VocabEntry } from '../Questions/useQuestions.type'
export const sets = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

const defaultVocab: Array<VocabEntry> = setData[0]

const ActiveSetContext = createContext<{ 
	activeSet: Array<VocabEntry>,
}>({ activeSet: [] })

export function useActiveSet() {
	return useContext(ActiveSetContext)
}

interface Props{
	children: any
}

export function ActiveSetProvider({ children }: { children: any }) {
	return (
		<SettingsProvider>
			<InnerActiveSetProvider>
				{children}
			</InnerActiveSetProvider>
		</SettingsProvider>
	)
}

function InnerActiveSetProvider({ children }:Props) {
	const { settings } = useSettings()
	const [activeSet, setActiveSet] = useState(defaultVocab)

	useEffect(() => {
		setActiveSet(setData[parseInt(settings.set || "1") - 1])
	}, [settings])
	
	return <ActiveSetContext.Provider value={{ activeSet }}>
		{children}
	</ActiveSetContext.Provider>
}
