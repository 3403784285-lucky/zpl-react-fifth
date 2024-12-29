const CHAR_SET = 'defgklABhijCXYZabcmnopDEFGHIrstuvwxyzJQRSTUVWqKLMNOP';
const BASE = CHAR_SET.length;
const LENGTH = 5;



const encryptCopy = (number) => {
    let num = parseInt(number, 10);
    let sb = [];

    for (let i = 0; i < LENGTH; i++) {
        let index = num % BASE;
        sb.push(CHAR_SET[index]);
        num = Math.floor(num / BASE);
    }

    return sb.reverse().join('');
};


const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const encrypt = (num) => {
  const length = 100; // 你可以根据需要调整生成字符串的长度
  const newString = generateRandomString(length) + '#'+encryptCopy(num);
};

const decrypt = (encryptedString) => {
  const decrypted = randomString.split('#')[1]; // 提取 # 后的内容
  setDecryptedContent(decrypted);
};

const decryptCopy = (encryptedString) => {
    let number = 0;
    for (let i = 0; i < encryptedString.length; i++) {
        let c = encryptedString.charAt(i);
        let index = CHAR_SET.indexOf(c);
        number = number * BASE + index;
    }

    return number;
};


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
  


export {encrypt,storeFile,decrypt,retrieveFile,generateRandomString}