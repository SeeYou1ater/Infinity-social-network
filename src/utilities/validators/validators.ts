export const requiredField = (value: string): string | undefined => {
  if (value) {
    return undefined  
  } else {
    return 'Field is required!'
  }
}


export const MaxLengthCreator = (maxLength: number) => {
  return (value: string): string | undefined => {
    return value && value.length > maxLength ? `Must be ${maxLength} characters or less` : undefined
  }
}