
import React from 'react';

const Modal = ({ isOpen, onClose, onSave, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black bg-opacity-50"
				onClick={onClose}
			/>
			<div className="relative bg-white rounded-lg shadow-lg w-full h-full md:w-[500px] md:h-auto md:max-h-[90vh] overflow-y-auto p-6">
				{title && <h2 className="text-lg font-semibold pt-4 pb-4">{title}</h2>}
				<div className="flex flex-col space-y-4">
					{children}
				</div>
				<div className="flex justify-end space-x-4 mt-6">
					<button
						onClick={onClose}
						className="px-4 py-1 text-gray-700 hover:bg-gray-100"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							onSave();
							onClose();
						}}
						className="px-4 py-1 bg-pink-400 text-gray-950 hover:bg-pink-600"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
