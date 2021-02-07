import Head from 'next/head'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<title>Pico y cédula en Cali</title>
				<meta
					name="description"
					content="🏡 Mantente al tanto de los cambios en el pico y cédula en la ciudad de Cali."
				/>
				<meta
					name="keywords"
					content="Pico y cedúla en Cali, que día puedo salir en Cali, puedo salir de casa, puedo salir de casa hoy"
				/>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="Pico y cedúla en Cali" />
				<meta
					name="author"
					content="Juan David García Rincón, juandagarciadev@gmail.com"
				/>
				<meta property="og:title" content="Pico y cédula en Cali" />
				<meta
					property="og:description"
					content="🏡 Mantente al tanto de los cambios en el pico y cédula en la ciudad de Cali."
				/>
				<meta property="og:image" content="/img/mini.png" />
				<meta property="og:url" content="/" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Pico y cédula en Cali" />
				<meta name="twitter:site" content="@JuandaGarciaDev" />
				<meta name="twitter:creator" content="@JuandaGarciaDev" />
				<meta name="twitter:image:alt" content="Pico y cédula en Cali" />
				<meta property="og:site_name" content="Pico y cédula en Cali" />
				<meta name="geo.placename" content="Colombia" />
				<meta name="geo.region" content="CO" />
				<meta name="geo.position" content="3.435310;-76.544787" />
				<meta name="ICBM" content="3.435310, -76.544787" />
				<link rel="manifest" href="/manifest.json" />
				<link
					href="/icons/icon-16x16.png"
					rel="icon"
					type="image/png"
					sizes="16x16"
				/>
				<link
					href="/icons/icon-32x32.png"
					rel="icon"
					type="image/png"
					sizes="32x32"
				/>
				<link rel="apple-touch-icon" href="/icon-152x152.png"></link>
				<meta name="theme-color" content="#6418fb" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}
