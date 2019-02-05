export default function validateTextInput(textInput, errorMessages) {
  if (textInput.required && textInput.value === '') {
    let prettyName = textInput.getAttribute('pretty-name');
    let fieldName = prettyName ? prettyName : textInput.name;
    errorMessages.add(textInput, `${fieldName} cannot be blank.`);
  }
}