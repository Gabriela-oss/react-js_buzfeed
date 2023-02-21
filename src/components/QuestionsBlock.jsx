//Libs
import { forwardRef } from "react";
//components
import QuestionBlock from "./QuestionBlock";

const QuestionsBlock = (
	{
		quizItem,
		setChosenAswerItems,
		chosenAswerItems,
		setUnansweredQuestionIds,
		unansweredQuestionIds,
	},
	ref
) => {
	return (
		<>
			<h2 ref={ref} className='question-title'>
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

export default forwardRef(QuestionsBlock);
