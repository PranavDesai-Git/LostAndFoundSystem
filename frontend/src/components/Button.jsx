import './Button.css';

function Button({ text, onClick, variant = 'primary', type = 'button', disabled = false }) {
  return (
    <button
      type={type}
      className={`custom-btn ${variant === 'primary' ? 'btn-primary' : 'btn-outline'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;