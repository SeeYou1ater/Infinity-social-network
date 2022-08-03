import React from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";
import './FormControls.css';

export type FormControlInputType = {
   input: WrappedFieldInputProps
   meta: WrappedFieldMetaProps
   formType: 'input'
   props: {
     className: string
     name: string
     placeholder: string
   }
 }

export const FormControl: React.FC<FormControlInputType> = ({input, meta, formType, ...props}) => {
  let hasError = meta.touched && meta.error
  return (
    <div className={`form-controls ${hasError && 'error'}`}>
        {React.createElement(formType, {...input, ...props})}
      {hasError && <p>{meta.error}</p>}              
    </div>
  )
}

