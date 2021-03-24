import React from "react";

function Button({
  text = "Click",
  onClick,
  loading = false,
  disabled = false,
}) {
  return (
    <button
      id='button'
      onClick={onClick}
      disabled={disabled || loading}
      className={disabled ? "button-disabled" : null}
    >
      {loading ? <i className='fa fa-spinner fa-spin'></i> : text}
    </button>
  );
}

export default Button;
