//Libs
import { useState, useEffect } from "react";
//Components
import Title from "./components/Title";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";
//styles
import styles from "./index.css";
const App = () => {
	const [quiz, setQuiz] = useState(null);
	const [chosenAswerItems, setChosenAswerItems] = useState([]);
	const [unansweredQuestionIds, setUnansweredQuestionIds] = useState(null);
	const [showAnswer, setShowAnswer] = useState(false);

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

	useEffect(() => {
		if (unansweredQuestionIds) {
			if (
				unansweredQuestionIds.length <= 0 &&
				chosenAswerItems.at.length >= 1
			) {
				//scroll to answered block
				setShowAnswer(true);
				const answerBlock = document.getElementById("answer-block");
				answerBlock?.scrollIntoView({ behavior: "smooth" });
			}
			//scroll to highest unAnsweredQuestionIds
			const highestId = Math.min(...unansweredQuestionIds);
			const highestElement = document.getElementById(highestId);
			highestElement?.scrollIntoView({ behavior: "smooth" });
		}
	}, [unansweredQuestionIds, showAnswer, chosenAswerItems]);

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
			{showAnswer && (
				<AnswerBlock
					answerOptions={quiz?.answers}
					chosenAnswers={chosenAswerItems}
				/>
			)}
		</div>
	);
};

export default App;
