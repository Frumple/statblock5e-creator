export default function validateIntegerInput(integerInput, errorMessages) {
  if (integerInput.value === '') {
    let prettyName = integerInput.getAttribute('pretty-name');
    let fieldName = prettyName ? prettyName : integerInput.name;
    errorMessages.add(integerInput, `${fieldName} must be a valid number.`);
  }
}