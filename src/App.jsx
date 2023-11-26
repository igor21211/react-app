import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';



function App() {

	const [items, setItems] = useState([]);

	useEffect(()=>{
		const data = JSON.parse(localStorage.getItem('data'));
		if(data){
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}

	}, []);

	useEffect(()=> {
		if(items.length){
			localStorage.setItem('data', JSON.stringify(items));
		}
	},[items]);

	const addItem = (item) => {
		setItems(oldItems => [...oldItems, {
			post: item.post,
			title: item.title,
			date: new Date(item.date),
			id: Math.max(...oldItems.map(i=>i.id)) + 1
		}]);
	};






	return (
		<div className="app">
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList items={items}/>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem}/>
			</Body>
		</div>
	);
}

export default App;
