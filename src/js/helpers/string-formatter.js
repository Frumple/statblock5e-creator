export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function escapeHtml(string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function formatModifier(modifier) {
  const operator = formatModifierOperator(modifier);
  const number = formatModifierNumber(modifier);

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

export function formatIntegerWithOrdinalIndicator(integer) {
  const ordinals = ['st', 'nd', 'rd', 'th'];

  const lastTwoDigits = integer % 100;
  const lastDigit = integer % 10;

  const endsWithElevenToNineteen = lastTwoDigits >= 11 && lastTwoDigits <= 19;
  const endsWithOneTwoOrThree = lastDigit >= 1 && lastDigit <= 3;

  const ordinal = (!endsWithElevenToNineteen && endsWithOneTwoOrThree) ? ordinals[lastDigit - 1] : ordinals[3];

  return `${integer}${ordinal}`;
}

export function formatSpellSlotQuantity(spellSlotQuantity) {
  return (spellSlotQuantity === 1) ? `${spellSlotQuantity} slot` : `${spellSlotQuantity} slots`;
}

export function trimTrailingPeriods(string) {
  return string.replace(/\.+$/, '');
}

export function nullIfEmptyString(string) {
  return string === '' ? null : string;
}
