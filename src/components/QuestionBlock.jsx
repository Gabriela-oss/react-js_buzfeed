import React from "react";

const QuestionBlock = ({ question }) => {
	return (
		<button className='question-block'>
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
