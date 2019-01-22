export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getModifierOperator(modifier) {
  if (modifier < 0) {
    // This is an en dash, NOT a "normal dash".
    // This makes the minus sign appear more pronounced on the statblock.
    return '–';
  }
  return '+';
}

export function getModifierNumber(modifier) {
  if (modifier < 0) {
    return Math.abs(modifier).toString();
  }
  return modifier.toString();
}
