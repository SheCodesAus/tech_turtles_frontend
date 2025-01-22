
const Button = ({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    fullWidth = false,
    className = '',
    children,
    ...props
}) => {
    const buttonClasses = [
        'button',
        `button--${variant}`,
        `button--${size}`,
        fullWidth ? 'button--full-width' : '',
        className
    ].join(' ');

    return (
        <button
            className={buttonClasses}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;