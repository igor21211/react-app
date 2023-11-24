import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';

function App() {
	const data = [
		{
			title: 'i must to study now and learn React',
			text: 'React JS',
			date: new Date()
		},
		{
			title: 'i must to study now and learn Java',
			text: 'Java ES',
			date: new Date()
		}
	];
	return (
		<>
			<h1>Project</h1>
			<p>description</p>
			<Button />
			<CardButton>
				<JournalItem 
					title={data[0].title}
					text={data[0].text}
					date={data[0].date} />
			</CardButton>
			<CardButton>
				<JournalItem 
					title={data[0].title}
					text={data[0].text}
					date={data[0].date} />
			</CardButton>
		</>
	);
}

export default App;
