import React from "react";

const QuestionBlock = ({
	question,
	setChosenAswerItems,
	chosenAswerItems,
	setUnansweredQuestionIds,
	unansweredQuestionIds,
	quizItemId,
}) => {
	const handleClick = () => {
		setChosenAswerItems((prev) => [...prev, question.text]);
		setUnansweredQuestionIds(
			unansweredQuestionIds.filter((id) => id != quizItemId)
		);
	};

	const validPick =
		!chosenAswerItems?.includes(question.text) &&
		!unansweredQuestionIds?.includes(quizItemId);

	return (
		<button
			className='question-block'
			onClick={handleClick}
			disabled={validPick}
		>
			<img src={question.image} alt={question.alt} />
			<h3>{question.text}</h3>
			<p>
				<a href={question.url}>{question.credit}</a>
				<a href='https://www.unsplash.com'>Unsplash</a>
			</p>
		</button>
	);
};

export default QuestionBlock;
