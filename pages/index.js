import { useMemo, useState } from 'react'
import cn from 'classnames'
import s from '../styles/Home.module.css'

const Home = () => {
	const [isEven, setIsEven] = useState(null)
	const [selectedDigit, setSelectedDigit] = useState(null)
	const dateOptions = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	}
	const evenDays = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28]
	const oddDays = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27]
	const days = [
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado',
		'Domingo',
	]

	const currentWeek = useMemo(() => {
		let curr = new Date()
		let week = []

		for (let i = 1; i <= 7; i++) {
			let first = curr.getDate() - curr.getDay() + i
			let day = new Date(curr.setDate(first)).getDate()
			week.push(day)
		}

		return week
	}, [])

	const handleClick = number => {
		const isNumberEven = number % 2 == 0
		setIsEven(isNumberEven)
		setSelectedDigit(number)
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
						<h1 className={s.header__logo__h1}>Pico y Cédula en Cali</h1>
						<img
							className={s.header__logo__img}
							src="/img/sanitizer.png"
							alt="Pico y cédula en CALI"
						/>
					</div>
					<span>
						{/* {new Date().toLocaleDateString(undefined, dateOptions)} */}
					</span>
				</header>
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
								const dataDay = getDayObject(leaveHome(day))
								return (
									<li key={day}>
										<div className={cn(s.daysList__item, dataDay.border)}>
											<span>{dataDay.icon}</span>
											<span>{`${days[i]} ${day}: ${dataDay.text}`}</span>
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
				<span>
					Desarrollado por:{' '}
					<a
						href="https://www.instagram.com/juandagarciaa/"
						target="_blank"
						rel="noopener noreferrer"
					>
						@JuandaGarciaa
					</a>
				</span>
				<img src="/" alt="Mano" />
			</footer>
		</div>
	)
}

export default Home
