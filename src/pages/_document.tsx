import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
		<title>Japanese thing</title>
        <meta property="og:title" content="Japanese" key="title" />
	  </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
