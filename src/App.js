//Libs
import { useState, useEffect } from "react";
//Components
import Title from "./components/Title";
import QuestionsBlock from "./components/QuestionsBlock";
//styles
import styles from "./index.css";
const App = () => {
	const [quiz, setQuiz] = useState(false);
	const [chosenAswerItems, setChosenAswerItems] = useState([]);
	const [unansweredQuestionIds, setUnansweredQuestionIds] = useState([]);

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:8000/quiz");
			const json = await response.json();
			console.log(json);
			setQuiz(json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const unansweredIds = quiz?.content?.map(({ id }) => id);
		setUnansweredQuestionIds(unansweredIds);
	}, [quiz]);

	console.log(quiz);
	console.log(unansweredQuestionIds);

	return (
		<div className='app'>
			<Title title={quiz?.title} subtitle={quiz?.subtitle} />
			{quiz &&
				quiz?.content.map((contentItem) => (
					<QuestionsBlock
						key={contentItem.id}
						quizItem={contentItem}
						setChosenAswerItems={setChosenAswerItems}
						chosenAswerItems={chosenAswerItems}
						setUnansweredQuestionIds={setUnansweredQuestionIds}
						unansweredQuestionIds={unansweredQuestionIds}
					/>
				))}
		</div>
	);
};

export default App;
