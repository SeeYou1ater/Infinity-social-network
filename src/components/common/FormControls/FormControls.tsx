import React from "react";
import './FormControls.css';



type FormControlPropsType = {
  input: any
  meta: {
    touched: boolean
    error: string
  }
  formType: string
  props: {
    placeholder: string
    type: string
    validate?: (value: number | string) => string | undefined
  }
}

export const FormControl: React.FC<FormControlPropsType> = ({input, meta, formType, ...props}) => {
  let hasError = meta.touched && meta.error
  return (
    <div className={`form-controls ${hasError && 'error'}`}>
        {React.createElement(formType, {...input, ...props})}
      {hasError && <p>{meta.error}</p>}              
    </div>
  )
}

