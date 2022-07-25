export const requiredField = (value) => {
  if (value) {
    return undefined  
  } else {
    return 'Field is required!'
  }
}


export const MaxLengthCreator = (maxLength) => {
  return (value) => {
    return value && value.length > maxLength ? `Must be ${maxLength} characters or less` : undefined
  }
}