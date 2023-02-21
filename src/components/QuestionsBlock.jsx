//components
import QuestionBlock from "./QuestionBlock";

const QuestionsBlock = ({ quizItem }) => {
	return (
		<>
			<h2 className='question-title' id={quizItem.id}>
				{quizItem.text}
			</h2>
			<div className='questions-container'>
				{quizItem.questions.map((question, index) => {
					return <QuestionBlock key={index} question={question} />;
				})}
			</div>
		</>
	);
};

export default QuestionsBlock;
