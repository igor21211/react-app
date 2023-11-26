import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';


function JournalList({items}) {
	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	if (items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}
	

	return	<>
		{items.sort(sortItems).map(el => (
			<CardButton key={el.id}>
				<JournalItem 
					title={el.title}
					post={el.post}
					date={el.date}
				/>
			</CardButton>
		))}
	</>;
}
export default JournalList;