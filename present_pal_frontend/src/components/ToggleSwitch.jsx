import { useState } from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ onToggle }) => {
	const [isChecked, setIsChecked] = useState(true);

	return (
		<button
			className={`toggle-btn ${isChecked ? 'toggled' : ''}`}
			onClick={() => {
				onToggle();
				setIsChecked(!isChecked);
			}}>
			<div className="thumb"></div>
		</button>
	);
};

export default ToggleSwitch;
