import React from 'react';
import SignupForm from '../components/SignupForm';
import App from '../components/App';
import Footer from '../components/Footer';
import "../styles.css";

function SignUpPage() {
    return (
        <div className="signup-page">
            <App />
            <SignupForm />
            <Footer />
        </div>
    );
}

export default SignUpPage;