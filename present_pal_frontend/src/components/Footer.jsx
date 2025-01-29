function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <a href='#'><img src='/logos/logo-pink-bg.png' alt="PresentPal Logo"/></a>
            </div>
            <div className="footer-content">
                <nav>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        {/* <li><a href="/about">About Us</a></li> */}
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </nav>
                <p>&copy; {new Date().getFullYear()} PresentPal. All Rights Reserved.</p>
            </div>

        </footer>

    );
}

export default Footer;