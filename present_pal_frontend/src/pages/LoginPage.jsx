import React from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/App';
import Footer from '../components/Footer';
import "../styles.css";

function LoginPage() {
    return (
        <div className="login-page">
            <Header />
            <LoginForm />
            <Footer />
        </div>
    );
}

export default LoginPage;