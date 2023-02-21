//components
import QuestionBlock from "./QuestionBlock";

const QuestionsBlock = ({
	quizItem,
	setChosenAswerItems,
	chosenAswerItems,
	setUnansweredQuestionIds,
	unansweredQuestionIds,
}) => {
	return (
		<>
			<h2 className='question-title' id={quizItem.id}>
				{quizItem.text}
			</h2>
			<div className='questions-container'>
				{quizItem.questions.map((question, index) => {
					return (
						<QuestionBlock
							key={index}
							quizItemId={quizItem.id}
							setChosenAswerItems={setChosenAswerItems}
							question={question}
							chosenAswerItems={chosenAswerItems}
							setUnansweredQuestionIds={setUnansweredQuestionIds}
							unansweredQuestionIds={unansweredQuestionIds}
						/>
					);
				})}
			</div>
		</>
	);
};

export default QuestionsBlock;
