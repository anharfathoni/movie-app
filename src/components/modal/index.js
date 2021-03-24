import React, { useState, useEffect } from "react";
import "styles/modal.css";

function Modal({ open, children, onClose }) {
  const [state, setState] = useState(open);

  useEffect(() => {
    var modal = document.getElementById("simpleModal");
    window.onclick = function (event) {
      if (event.target === modal) {
        onClose();
      }
    };
  }, [onClose]);

  useEffect(() => {
    setState(open);
  }, [open]);

  return (
    <div id='simpleModal' className={state ? "modal" : "displayNone"}>
      <div className='modal-content'>
        <span className='close' onClick={onClose} data-testid='btn-close-modal'>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

export default Modal;
