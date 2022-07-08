import React from "react";
import './FormControls.css';

export const FormControl = ({input, meta, formType,  ...props}) => {
  let hasError = meta.touched && meta.error
  return (
    <div className={`form-controls ${hasError && 'error'}`}>
        {React.createElement(formType, {...input, ...props})}
      {hasError && <p>{meta.error}</p>}              
    </div>
  )
}

