import React, { forwardRef } from "react";

const Input = forwardRef(({ label, textarea, ...props }, ref) => {
  return (
    <div className="Input-container">
      <label>{label}</label>
      {textarea ? (
        <textarea ref={ref} {...props} />
      ) : (
        <input ref={ref} {...props} />
      )}
    </div>
  );
});

export default Input;
