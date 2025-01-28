import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import postLogin from '../api/post-login.js';
import useAuth from '../hooks/use-auth.js';
import '../styles.css';

const LoginForm = () => {
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		if (!formData.username || !formData.password) {
			setError("Please fill in all fields.");
			return;
		}

		setLoading(true);
		postLogin(formData.username, formData.password)
			.then((response) => {
				window.localStorage.setItem("token", response.token);
				window.localStorage.setItem("userId", response.user_id);
				setAuth({
					token: response.token,
				});
				navigate(location.state?.from || "/");
			})
			.catch(() => {
				setError("Invalid username or password.");
				setLoading(false);
			});
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className="login-container">
			<h1>Welcome back!</h1>
			<p className="login-subtitle">Login below</p>

			<form onSubmit={handleSubmit}>
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
				<div className="form-group">
					<label htmlFor="username">USERNAME</label>
					<input
						type="username"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						placeholder="Enter username"
						autoComplete="username"
						required
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

				<button type="submit" disabled={loading}>{loading ? "LOGGING IN..." : "LOG IN"}</button>

				<p className="signup-prompt">
					New to Present Pal? <Link to="/signup">Sign up here</Link>
				</p>
			</form>
		</div>
	);
};

export default LoginForm;
