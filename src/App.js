//Libs
import { useState, useEffect } from "react";
//Components
import Title from "./components/Title";
import QuestionsBlock from "./components/QuestionsBlock";
//styles
import styles from "./index.css";
const App = () => {
	const [quiz, setQuiz] = useState(false);
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

	return (
		<div className='app'>
			<Title title={quiz?.title} subtitle={quiz?.subtitle} />
			{quiz &&
				quiz?.content.map((contentItem) => (
					<QuestionsBlock key={contentItem.id} quizItem={contentItem} />
				))}
		</div>
	);
};

export default App;
