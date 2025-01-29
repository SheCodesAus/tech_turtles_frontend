import { useState } from 'react';
import postSignup from '../api/post-signup';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css';

const SignupForm = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		dateOfBirth: ''
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match!");
			return;
		}

		if (formData.password.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		}

		if (formData.username.length < 6) {
			setError("Username must be at least 6 characters long");
			return;
		}

		setLoading(true);

		try {
			await postSignup(
				formData.username,
				formData.email,
				formData.password
			);

			alert("Registration successful! Please log in.");
			navigate("/login");
		} catch (err) {
			console.error(err);
			setError(err.message || "Sign up failed! Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className="signup-container">
			<h1>Create New Account</h1>

			<p className="login-text">
				Already Registered?{' '}
				<Link to="/login">Log in</Link>
			</p>

			<form onSubmit={handleSubmit}>
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
				<div className="form-group">
					<label htmlFor="username">USERNAME</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
						autoComplete="username"
						minLength={3}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="email">EMAIL</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						autoComplete="email"
						minLength={8}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">PASSWORD</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						autoComplete="password"
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">CONFIRM PASSWORD</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="dateOfBirth">DATE OF BIRTH</label>
					<input
						type="date"
						id="dateOfBirth"
						name="dateOfBirth"
						value={formData.dateOfBirth}
						onChange={handleChange}
						required
					/>
				</div>

				<button type="submit" disabled={loading}>{loading ? "SIGNING UP..." : "SIGN UP"}</button>
			</form>
		</div>
	);
};

export default SignupForm;
