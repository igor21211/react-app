import style from './Logo.module.css';

function Logo() {
	return (
		<img className={style.logo} src="/logo.svg" alt="logo" />
	);
}

export default Logo;