import { useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
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
	const evenDays = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28]
	const oddDays = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27]

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
		const curr = new Date()
		const first = curr.getDate() - curr.getDay()
		let week = []

		for (let i = 0; i < 7; i++) {
			const day = new Date(curr.setDate(first + i))
			week.push({ day: day.getDate(), nameDay: days[day.getDay()] })
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

	return (
		<div>
			<div className={s.container}>
				<header className={s.header}>
					<div className={s.header__logo}>
						<h1 className={s.header__logo__h1}>Pico y Cédula Cali</h1>
						<img
							className={s.header__logo__img}
							src="/img/logo.png"
							alt="Pico y cédula CALI"
						/>
					</div>
					<h2 className={s.header__date}>{today}</h2>
				</header>
				<section className={s.cardsContainer}>
					<article className={s.card}>
						<div className={s.card__date}>
							<span>{today}</span>
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
							<span>{today}</span>
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
								className={cn(s.nav__buttons__button, {
									[s.navButtonActive]: selectedDigit === i,
								})}
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
										<div className={cn(s.daysList__item, dataDay.border)}>
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
					<section className={s.adsContainer}>
						<a
							className={s.adsContainer__salsa}
							href="https://go.hotmart.com/T46570356K?src=pico"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/img/salsa.png"
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
