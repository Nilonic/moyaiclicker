// Storage.module.js
// Part of Moyai Clicker V2 Source Code
// Under the MIT License

let DB;
let DBReadyResolve;
const DBReady = new Promise((resolve) => (DBReadyResolve = resolve));

const request = window.indexedDB.open("GameDB", 1);

request.onerror = (event) => {
  console.error(`Database error: ${event.target.error?.message}`);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  if (!db.objectStoreNames.contains("gameData")) {
    db.createObjectStore("gameData", { keyPath: "Key" });
  }
};

request.onsuccess = (event) => {
  DB = event.target.result;
  console.log("Database opened successfully");
  DBReadyResolve();
};

async function getStore(mode = "readonly") {
  await DBReady;
  const transaction = DB.transaction(["gameData"], mode);
  return transaction.objectStore("gameData");
}

export async function Write(key, value) {
  const store = await getStore("readwrite");
  return new Promise((resolve, reject) => {
    const req = store.put({ Key: key, Value: value });
    req.onerror = (e) => reject(e.target.error);
    req.onsuccess = () => resolve();
  });
}

export async function Read(key) {
  const store = await getStore("readonly");
  return new Promise((resolve, reject) => {
    const req = store.get(key);
    req.onerror = (e) => reject(e.target.error);
    req.onsuccess = (e) => resolve(e.target.result ? e.target.result.Value : null);
  });
}

export async function Delete(key) {
  const store = await getStore("readwrite");
  return new Promise((resolve, reject) => {
    const req = store.delete(key);
    req.onerror = (e) => reject(e.target.error);
    req.onsuccess = () => resolve();
  });
}