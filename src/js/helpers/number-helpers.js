export function convertToInteger(string) {
  const integer = parseInt(string, 10);
  return isNaN(integer) ? null : integer;
}

export function formatIntegerWithCommas(integer) {
  return integer.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}