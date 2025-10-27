// logically the same, now just a module

export function Write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function Read(key) {
  var value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
}

export function Delete(key) {
  localStorage.removeItem(key);
}
