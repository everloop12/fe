// indexedDB.js
const dbName = 'MyAppDatabase';
const dbVersion = 1;
let db;

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function(event) {
      db = event.target.result;
      const objectStore = db.createObjectStore('userData', { keyPath: 'uid' });
      objectStore.createIndex('uid', 'uid', { unique: true });
    };

    request.onsuccess = function() { // Removed 'event' since it is not used
      db = request.result;
      resolve(db);
    };

    request.onerror = function(event) {
      reject(`IndexedDB error: ${event.target.errorCode}`);
    };
  });
};

export const getUserDataFromCache = (uid) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['userData'], 'readonly');
    const objectStore = transaction.objectStore('userData');
    const request = objectStore.get(uid);

    request.onsuccess = function() {
      resolve(request.result);
    };

    request.onerror = function(event) {
      reject(event.target.errorCode);
    };
  });
};

export const cacheUserData = (uid, data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['userData'], 'readwrite');
    const objectStore = transaction.objectStore('userData');
    const request = objectStore.put({ uid, data });

    request.onsuccess = function() { // Removed 'event' since it is not used
      resolve(true);
    };

    request.onerror = function(event) {
      reject(event.target.errorCode);
    };
  });
};
