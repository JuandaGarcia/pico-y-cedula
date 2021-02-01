import { useCallback, useMemo, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home = () => {
	const [isEven, setIsEven] = useState(null)
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
		console.log('es par:' + isNumberEven)
		setIsEven(isNumberEven)
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

	return (
		<div className={styles.container}>
			<header>
				<img src="/" alt="Pico y cédula en CALI" />
			</header>
			<nav>
				<h2>
					<span></span>Último dígito de tu cédula:
				</h2>
				{new Array(10).fill(null).map((item, i) => (
					<button onClick={() => handleClick(i)} key={i}>
						{i}
					</button>
				))}
			</nav>
			<main>
				<section>
					<ul>
						{currentWeek.map((day, i) => {
							const leaveFromHome = leaveHome(day)
							console.log(leaveFromHome)
							return (
								<li key={day}>
									<div>
										<span>{`${
											leaveFromHome
												? '✅'
												: leaveFromHome === false
												? '❌'
												: '❔'
										}${days[i]} ${day}: ${
											leaveFromHome
												? 'Puedes salir.'
												: leaveFromHome === false
												? 'Quédate en casa.'
												: isEven !== null
												? 'Aún no está definido'
												: 'Ingresa el último dígito de tu cédula ↑'
										}`}</span>
										<span></span>
									</div>
								</li>
							)
						})}
					</ul>
				</section>
				<section>
					<span>Anuncios</span>
					<span></span>
				</section>
			</main>
			<footer>
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
