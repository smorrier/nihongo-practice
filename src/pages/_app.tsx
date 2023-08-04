import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ScreenSizeProvider, useScreenSize } from '@/context/useScreenSize'
import { ThemeProvider } from 'styled-components'
import '../styles/globals.css'

function ScreenThemeProvider(props: any) {
	const { screenSize } = useScreenSize()
	return (
		<ThemeProvider theme={{ screenSize }}>
			{props.children}
		</ThemeProvider>
	)
}

export default function App({ Component, pageProps }: AppProps) {
	return <ScreenSizeProvider>
		<ScreenThemeProvider>
			<Component {...pageProps} />
		</ScreenThemeProvider>
	</ScreenSizeProvider>
}