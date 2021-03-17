import { useEffect, useMemo, useState } from 'react'
import s from '../styles/Home.module.css'

const Home = () => {
	const [isEven, setIsEven] = useState(null)
	const [selectedDigit, setSelectedDigit] = useState(null)
	const [today, setToday] = useState('')
	const todayIsEven = new Date().getDate() % 2 === 0
	const dateOptions = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	}
	const eventDigits = '0, 2, 4, 6, 8'
	const oddDigits = '1, 3, 5, 7, 9'
	const evenDays = []
	const oddDays = []

	useEffect(() => {
		const date = new Date()
			.toLocaleDateString(undefined, dateOptions)
			.toString()
		setToday(date[0].toUpperCase() + date.slice(1))
		const getSelectedDigit = localStorage.getItem('selectedDigit')
		if (getSelectedDigit) {
			const parseNumber = parseInt(getSelectedDigit)
			const isNumberEven = parseNumber % 2 === 0
			setIsEven(isNumberEven)
			setSelectedDigit(parseNumber)
		}
	}, [])

	const currentWeek = useMemo(() => {
		const days = [
			'Domingo',
			'Lunes',
			'Martes',
			'Miércoles',
			'Jueves',
			'Viernes',
			'Sábado',
		]
		let curr = new Date()
		let week = [{ day: curr.getDate(), nameDay: days[curr.getDay()] }]

		for (let i = 0; i < 6; i++) {
			const tomorrow = new Date(curr)
			tomorrow.setDate(tomorrow.getDate() + 1)
			week.push({ day: tomorrow.getDate(), nameDay: days[tomorrow.getDay()] })
			curr = tomorrow
		}

		return week
	}, [])

	const handleClick = number => {
		const isNumberEven = number % 2 === 0
		setIsEven(isNumberEven)
		setSelectedDigit(number)
		localStorage.setItem('selectedDigit', number)
	}

	const leaveHome = day => {
		const allDaysDefined = [...evenDays, ...oddDays]
		const isDefined = allDaysDefined.some(element => element === day)
		switch (isEven) {
			case true:
				const dayInEventDays = evenDays.some(element => element === day)
				return dayInEventDays ? true : isDefined ? false : null
			case false:
				const dayInOddDays = oddDays.some(element => element === day)
				return dayInOddDays ? true : isDefined ? false : null
		}
	}

	const getDayObject = leaveFromHome =>
		leaveFromHome
			? { text: 'Puedes salir.', icon: '😎', border: s.daysList__itemGreen }
			: leaveFromHome === false
			? { text: 'Quédate en casa.', icon: '❌', border: s.daysList__itemRed }
			: isEven !== null
			? { text: 'Aún no está definido', icon: '❔', border: null }
			: {
					text: 'Ingresa el último dígito de tu cédula ↑',
					icon: '❔',
					border: null,
			  }

	const share = e => {
		e.preventDefault()
		if (!navigator.share) {
			alert('Tu navegador no soporta la Web Share API')
			return
		}

		navigator
			.share({
				title: 'Pico y cédula en Cali',
				text:
					'🏡 Mantente al tanto de los cambios en el pico y cédula en la ciudad de Cali.',
				url: document.location.href,
			})
			.then(() => {
				return
			})
			.catch(error => {
				return
			})
	}

	return (
		<div>
			<div className={s.container}>
				<header className={s.header}>
					<div className={s.header__logo}>
						<h1 className={s.header__logo__h1}>Pico y Cédula Cali</h1>
						<img
							className={s.header__logo__img}
							width="4rem"
							height="4rem"
							src="/icons/icon-72x72.png"
							alt="Pico y cédula CALI"
						/>
					</div>
					<h2 className={s.header__date}>{today}</h2>
				</header>
				<section className={s.cardsContainer}>
					<article className={s.card}>
						<div className={s.card__date}>
							<span className={s.card__date__span}>{today}</span>
						</div>
						<div className={s.card__content}>
							<h3 className={s.card__content__title}>
								Pueden salir personas cuya cédula termina en:
							</h3>
							<p className={s.card__content__digits}>
								🛒 {todayIsEven ? eventDigits : oddDigits} 🛒
							</p>
						</div>
					</article>
					<article className={s.card}>
						<div className={s.card__date}>
							<span className={s.card__date__span}>{today}</span>
						</div>
						<div className={s.card__content}>
							<h3 className={s.card__content__title}>
								NO pueden salir personas cuya cédula termina en:
							</h3>
							<p className={s.card__content__digits}>
								❗ {todayIsEven ? oddDigits : eventDigits} ❗
							</p>
						</div>
					</article>
				</section>
				<nav className={s.nav}>
					<h2 className={s.nav__digitsTitle}>
						<span className={s.idCardIcon}></span>Último dígito de tu cédula:
					</h2>
					<div className={s.nav__buttons}>
						{new Array(10).fill(null).map((item, i) => (
							<button
								className={`${s.nav__buttons__button} ${
									selectedDigit === i && s.navButtonActive
								}`}
								onClick={() => handleClick(i)}
								key={i}
							>
								{i}
							</button>
						))}
					</div>
				</nav>
				<main className={s.main}>
					<section>
						<ul className={s.daysList}>
							{currentWeek.map((day, i) => {
								const dataDay = getDayObject(leaveHome(day.day))
								return (
									<li key={day.nameDay}>
										<div className={`${s.daysList__item} ${dataDay.border}`}>
											<span>{dataDay.icon}</span>
											<span>{`${day.nameDay} ${day.day}: ${dataDay.text}`}</span>
											{i === 0 ? (
												<span className={s.daysList__item__today}>Hoy</span>
											) : null}
										</div>
									</li>
								)
							})}
						</ul>
					</section>
					{process.browser && window.navigator.share ? (
						<a onClick={share} className={s.share}>
							Compartir
						</a>
					) : null}
					<section className={s.adsContainer}>
						<a
							className={s.adsContainer__salsa}
							href="https://go.hotmart.com/T46570356K?src=pico"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/img/salsa.png"
								width="336"
								height="280"
								className={s.adsContainer__salsa__img}
								alt="Aprende a bailar con dos, de los mejores exponentes de las SALSA."
							/>
						</a>
					</section>
				</main>
			</div>
			<footer className={s.footer}>
				<div className={s.footer__container}>
					<span>
						Desarrollado por:{' '}
						<a
							href="https://www.instagram.com/juandagarciaa/"
							target="_blank"
							rel="noopener noreferrer"
							className={s.footer__link}
						>
							@JuandaGarcia
						</a>
					</span>
					<img className={s.footer__hand} src="/img/hand.png" alt="Mano" />
				</div>
			</footer>
		</div>
	)
}

export default Home
