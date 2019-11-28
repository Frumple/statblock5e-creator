export function convertToInteger(string) {
  const integer = parseInt(string, 10);
  return isNaN(integer) ? null : integer;
}