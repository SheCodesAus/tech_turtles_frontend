import React from 'react';
import SignupForm from '../components/SignupForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles.css";

function SignUpPage() {
    return (
        <div className="signup-page">
            <Header />
            <SignupForm />
            <Footer />
        </div>
    );
}

export default SignUpPage;