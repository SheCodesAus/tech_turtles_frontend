import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import postList from "../api/post-list";

const CreateListForm = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		budget: "",
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[id]: id === "budget" ? parseInt(value) || "" : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMessage("");

		if (!formData.name || !formData.budget) {
			setErrorMessage("Please fill in all required fields");
			setIsLoading(false);
			return;
		}

		const listData = {
			...formData,
			budget: parseInt(formData.budget),
		};

		try {
			const response = await postList(listData);
			if (response.id) {
				navigate(`/list/${response.id}`);
			} else {
				throw new Error("Failed to create list");
			}
		} catch (err) {
			console.error("Error creating list:", err);
			setErrorMessage(err.message || "Failed to create list. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};



	// const [listName, setListName] = useState('');
	// const [budget, setBudget] = useState('');
	return (
		<div className="min-h-screen bg-white p-6">
			<div className="max-w-4xl mx-auto bg-white rounded-lg p-8">
				<div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
					<h1 className="text-3xl font-bold mb-4" style={{ color: '#5B4B8A' }}>
						Create New Gift Shopping List
					</h1>
					<p className="text-gray-600">
						Plan ahead and organize your gift giving experience
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					{errorMessage && <div className="error-message">{errorMessage}</div>}
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								List Name
							</label>
							<input
								id="name"
								type="text"
								value={formData.name}
								onChange={handleChange}
								className="w-full px-4 py-2 border rounded-md"
								style={{ ':focus': { borderColor: '#5B4B8A', outline: 'none' } }}
								placeholder="Enter your list name"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Description
							</label>
							<textarea
								id="description"
								rows={3}
								value={formData.description}
								onChange={handleChange}
								className="w-full px-4 py-2 border rounded-md"
								style={{ ':focus': { borderColor: '#5B4B8A', outline: 'none' } }}
								placeholder="Enter your description"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Budget
							</label>
							<input
								id="budget"
								type="number"
								value={formData.budget}
								onChange={handleChange}
								className="w-full px-4 py-2 border rounded-md"
								style={{ ':focus': { borderColor: '#5B4B8A', outline: 'none' } }}
								placeholder="Enter your budget"
							/>
						</div>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							style={{ backgroundColor: '#5B4B8A' }}
							className="px-6 py-2 text-white rounded-md transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
							disabled={isLoading}
						>
							{isLoading ? "Creating List..." : "Create List"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
export default CreateListForm;
