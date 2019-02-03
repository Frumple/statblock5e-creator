export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatModifier(modifier) {
  let operator = formatModifierOperator(modifier);
  let number = formatModifierNumber(modifier);

  return `${operator}${number}`;
}

export function formatModifierOperator(modifier) {
  if (modifier < 0) {
    // This is an EN dash (U+2013).
    // This stands out more than a normal minus sign.
    return '–';
  }
  return '+';
}

export function formatModifierNumber(modifier) {
  if (modifier < 0) {
    return Math.abs(modifier).toString();
  }
  return modifier.toString();
}
