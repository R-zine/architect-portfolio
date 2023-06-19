import React from 'react';
import { useEffect } from 'react';
import CountUp from 'react-countup';

const Card = ({ num, text, id }) => {
	return (
		<div className="Card" style={{ '--animation-order': id }}>
			<CountUp
				className="number"
				end={num}
				suffix="+"
				separator=" "
				delay={0.8 * id}
			/>
			<div className="cardText">{text}</div>
		</div>
	);
};

export default Card;
