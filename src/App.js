//Libs
import { useState, useEffect, createRef } from "react";
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

	const refs = unansweredQuestionIds?.reduce((acc, id) => {
		acc[id] = createRef();
		return acc;
	}, {});

	const answerRef = createRef();

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
		if (chosenAswerItems.length > 0) {
			if (showAnswer) {
				//scroll to answered block
				answerRef.current.scrollIntoView({ behavior: "smooth" });
			}
			if (
				unansweredQuestionIds.length <= 0 &&
				chosenAswerItems.at.length >= 1
			) {
				setShowAnswer(true);
			} else {
				//scroll to highest unAnsweredQuestionIds
				const highestId = Math.min(...unansweredQuestionIds);
				refs[highestId].current.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [unansweredQuestionIds, showAnswer, chosenAswerItems, answerRef, refs]);

	return (
		<div className='app'>
			<Title title={quiz?.title} subtitle={quiz?.subtitle} />
			{refs &&
				quiz?.content?.map((contentItem) => (
					<QuestionsBlock
						key={contentItem.id}
						quizItem={contentItem}
						setChosenAswerItems={setChosenAswerItems}
						chosenAswerItems={chosenAswerItems}
						setUnansweredQuestionIds={setUnansweredQuestionIds}
						unansweredQuestionIds={unansweredQuestionIds}
						ref={refs[contentItem.id]}
					/>
				))}
			{showAnswer && (
				<AnswerBlock
					answerOptions={quiz?.answers}
					chosenAnswers={chosenAswerItems}
					ref={answerRef}
				/>
			)}
		</div>
	);
};

export default App;
