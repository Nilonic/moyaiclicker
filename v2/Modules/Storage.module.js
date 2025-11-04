// Storage.module.js
// Part of Moyai Clicker V2 Source Code
// Under the MIT License

let DB;
let DBReadyResolve;
const DBReady = new Promise((resolve) => (DBReadyResolve = resolve));
let DBLoaded = false;

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
  DBLoaded = true;
  DBReadyResolve();
};

const memoryCache = new Map();
let dirty = false;

async function loadAllToMemory() {
  await DBReady;
  const transaction = DB.transaction(["gameData"], "readonly");
  const store = transaction.objectStore("gameData");
  return new Promise((resolve, reject) => {
    const req = store.getAll();
    req.onerror = (e) => reject(e.target.error);
    req.onsuccess = (e) => {
      e.target.result.forEach((entry) => memoryCache.set(entry.Key, entry.Value));
      resolve();
    };
  });
}

async function flushToDB() {
  if (!dirty || !DB) return;
  const transaction = DB.transaction(["gameData"], "readwrite");
  const store = transaction.objectStore("gameData");
  memoryCache.forEach((value, key) => {
    store.put({ Key: key, Value: value });
  });
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      dirty = false;
      resolve();
    };
    transaction.onerror = (e) => reject(e.target.error);
  });
}

export async function InitStorage() {
  await loadAllToMemory();
  window.addEventListener("beforeunload", flushToDB);
  window.addEventListener("unload", flushToDB);
}

export async function isLoaded(){
  return DBLoaded;
}

export function DEBUG_DB_STATUS(){
  return [DBLoaded, dirty, memoryCache, FlushNow];
}

export async function Write(key, value) {
  memoryCache.set(key, value);
  dirty = true;
}

export async function Read(key) {
  return memoryCache.get(key) ?? null;
}

export async function Delete(key) {
  memoryCache.delete(key);
  dirty = true;
}

export async function FlushNow() {
  await flushToDB();
}
