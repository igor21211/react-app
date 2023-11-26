import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import classNames from 'classnames';
import {INITIAL_STATE, formReducer} from './JournalForm.state.js';



function JournalForm({onSubmit}) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;

	useEffect(()=> {
		let timerId;
		if(!isValid.title|| !isValid.post || !isValid.date){
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
	}, [isFormReadyToSubmit]);
	
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
				<input type="text" onChange={onChange} value={values.title} name="title" className={classNames(styles['input-title'], {
					[styles['invalid']] : !isValid.title
				})} />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date"  className={styles['form-label']}>
					<img src="/date.svg" alt="date" />
					<span>Дата</span>
				</label>
				<input type="date" value={values.date} onChange={onChange} name="date" id="date" className={classNames(styles['input'], {
					[styles['invalid']] : !isValid.date
				})} />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/dir.svg" alt="directory" />
					<span>Метки</span>
				</label>
				<input className={styles['input']}  onChange={onChange} type="text" value={values.tag} id="tag" name='tag'  />
			</div>
			<textarea name="post" value={values.post} onChange={onChange} id="" cols="30" rows="10"  className={classNames(styles['input'], {
				[styles['invalid']] : !isValid.post
			})}></textarea>
			<Button text={'Сохранить'}/>
		</form>
	);
}

export default JournalForm;