export function copyObjectProperties(target, source) {
  for (const propertyName in source) {
    let propertyDescriptor = Object.getOwnPropertyDescriptor(source, propertyName);
    Object.defineProperty(target, propertyName, propertyDescriptor);
  }
}