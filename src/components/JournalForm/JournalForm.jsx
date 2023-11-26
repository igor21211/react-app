import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer, useRef } from 'react';
import classNames from 'classnames';
import {INITIAL_STATE, formReducer} from './JournalForm.state.js';
import Input from '../Input/Input.jsx';



function JournalForm({onSubmit}) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const postRef = useRef();
	const dateRef = useRef();

	const focusError = (isValid) => {
		switch(true){
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(()=> {
		let timerId;
		if(!isValid.title|| !isValid.post || !isValid.date){
			focusError(isValid);
			timerId = setTimeout(()=> {
				dispatchForm({type: 'RESET_VALIDITY'});
			},2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(()=> {
		if(isFormReadyToSubmit){
			onSubmit(values);
			dispatchForm({type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit, values, onSubmit]);
	
	const onChange = (e) => {
		dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	}; 
    

	/* 	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input type="text" name="title" style={{border: formValidState.title ? undefined : '1px solid red'}} />
			<input type="date" name="date" style={{border: formValidState.date ? undefined : '1px solid red'}} />
			<input type="text" name='tag'  />
			<textarea name="post" id="" cols="30" rows="10"  style={{border: formValidState.post ? undefined : '1px solid red'}}></textarea>
			<Button text={'Сохранить'}/>
		</form>
	); */

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input type="text" onChange={onChange} isValid={isValid.title} ref={titleRef} value={values.title} name="title" appearance="title" />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date"  className={styles['form-label']}>
					<img src="/date.svg" alt="date" />
					<span>Дата</span>
				</label>
				<Input type="date" value={values.date} isValid={isValid.date} ref={dateRef} onChange={onChange} name="date" id="date"/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/dir.svg" alt="directory" />
					<span>Метки</span>
				</label>
				<Input className={styles['input']}  onChange={onChange}  type="text" value={values.tag} id="tag" name='tag'  />
			</div>
			<textarea name="post" value={values.post} ref={postRef} onChange={onChange} id="" cols="30" rows="10"  className={classNames(styles['input'], {
				[styles['invalid']] : !isValid.post
			})}></textarea>
			<Button text={'Сохранить'}/>
		</form>
	);
}

export default JournalForm;