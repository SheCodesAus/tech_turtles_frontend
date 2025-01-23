import { useState } from 'react';

const ToggleSwitch = () => {
	const [isChecked, setIsChecked] = useState(false);

	return (
		<button
			className={`toggle-btn ${isChecked ? 'toggled' : ''}`}
			onClick={() => setIsChecked(!isChecked)}>
			<div className="thumb"></div>
		</button>
	);
};

export default ToggleSwitch;
