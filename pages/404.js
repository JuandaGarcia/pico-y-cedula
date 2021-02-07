import Link from 'next/link'
import s from '../styles/NotFound.module.css'

const NotFound = () => {
	return (
		<div className={s.container}>
			<img className={s.container__img} src="/img/404.png" alt="404" />
			<h1 className={s.container__title}>404 página no encontrada 😑</h1>
			<Link href="/">
				<a className={s.container__link}>Ir al Inicio</a>
			</Link>
		</div>
	)
}

export default NotFound
