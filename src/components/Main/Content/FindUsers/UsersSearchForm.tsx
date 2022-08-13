import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react"
import { FilterType } from "../../../../redux/usersReducer";

const userSearchValidate = (values : any) => {
  const errors: any = {};
  return errors;
}

type UsersSearchFormPropsType = {
  onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<UsersSearchFormPropsType> = (props) => {

  const submit = (values: FilterType, { setSubmitting }: { setSubmitting: ( isSubmitting: boolean) => void}) => {
    props.onFilterChanged(values)
  }

  return (
    <Formik
       initialValues={{ term: '' }}
       validate={userSearchValidate}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" />
           <button type="submit" disabled={isSubmitting}>
             Find
           </button>
         </Form>
       )}
     </Formik>
  )
}

export default UsersSearchForm


