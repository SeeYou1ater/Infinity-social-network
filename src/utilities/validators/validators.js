export const requiredField = (value) => {
  if (value) {
    return undefined  
  } else {
    return 'Field is required!'
  }
}


export const MaxLengthCreator = (maxLength) => {
  return (value) => {
    if (value.length <= maxLength) {
      return undefined  
    } else {
        return `Max length is ${maxLength} symbols!`
    }
  }
}