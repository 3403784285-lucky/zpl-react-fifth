import seedrandom from 'seedrandom';
const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const CHAR_SET_LENGTH = CHAR_SET.length;
const ENCODED_LENGTH = 9;
import seedrandom from 'seedrandom';



function encrypt(number) {
    let random = seedrandom(number.toString());  // 使用种子生成器
    let encoded = '';

    for (let i = 0; i < ENCODED_LENGTH; i++) {
        let index = Math.floor(random() * CHAR_SET_LENGTH);
        encoded += CHAR_SET.charAt(index);
    }

    return encoded;
}

function decrypt(encoded) {
    for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
        if (encrypt(i) === encoded) {
            return i;
        }
    }
    return null;
}
// 创建或打开 IndexedDB 数据库
const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('fileStorageDB', 1);
  
      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore('files');
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
  
  // 存储 File 对象
  const storeFile = async (file) => {
    const db = await openDB();
    const transaction = db.transaction('files', 'readwrite');
    const store = transaction.objectStore('files');
    store.put(file, file.name); // 使用文件名作为键
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  };
  
  // 从 IndexedDB 恢复 File 对象
  const retrieveFile = async (filename) => {
    const db = await openDB();
    const transaction = db.transaction('files');
    const store = transaction.objectStore('files');
    const file = await store.get(filename);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve(file);
      transaction.onerror = () => reject(transaction.error);
    });
  };
  


export {encrypt,decrypt,storeFile,retrieveFile}