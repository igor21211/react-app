import { useState } from 'react';
import './Button.css';

function Button() {

	const [text, setText] =  useState('Сохранить');

	const clicked = () => {
		setText('Закрыть');
		console.log('Ok');
	};

	return (
		<button onClick={clicked} className="button">{text}</button>
	);
}

export default Button;
