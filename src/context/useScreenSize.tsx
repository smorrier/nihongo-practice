import React, { createContext, useContext, useEffect, useState } from 'react'

const ScreenSizeContext = createContext('')

export function useScreenSize() {
	const screenSize =  useContext(ScreenSizeContext)
	
	return {
		screenSize,
	}
}

interface Props{
	children: any
}

export function ScreenSizeProvider({ children }:Props) {
	//Responsiveness
	const [screenSize, setScreenSize] = useState('')

	useEffect(() => {

		function getScreenSize(w: number) {

			if (w > 1200) {
				return 'desktop'

			} else if (w > 950) {
				return 'tablet'
			}
			else {
				return 'mobile'
			}

		}

		const listener = () => {
			setScreenSize(getScreenSize(window.innerWidth))
		}

		window.addEventListener('resize', listener)
		listener()

		return () => window.removeEventListener('resize', listener)
	}, [])
	
	return <ScreenSizeContext.Provider value={screenSize}>
		{children}
	</ScreenSizeContext.Provider>
}
