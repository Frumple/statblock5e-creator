export function getModifierOperator(modifier) {
  if (modifier < 0) {
    // This is an en dash, NOT a "normal dash".
    // This makes the minus sign appear more pronounced on the statblock.
    return '–';
  }
  return '+';
}

export function getModifierValue(modifier) {
  if (modifier < 0) {
    return Math.abs(modifier).toString();
  }
  return modifier.toString();
}
