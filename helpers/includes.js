export function includes(collection, value) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i] === value) {
        return true;
      }
    }
    return false;
  } else if (typeof collection === "string") {
    return collection.indexOf(value) !== -1;
  }
  return false;
}
