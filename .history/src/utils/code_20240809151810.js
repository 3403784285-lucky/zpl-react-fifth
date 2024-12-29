const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const base = alphabet.length;

function encrypt(documentId) {
    let encryptedId = "";
    while (documentId > 0) {
        let remainder = documentId % base;
        encryptedId = alphabet.charAt(remainder) + encryptedId;
        documentId = Math.floor(documentId / base);
    }
    return encryptedId;
}
function serializeEditor(editor) {
    // 编写你的编辑器对象序列化逻辑，将编辑器对象转换为序列化后的格式（如 JSON 字符串）
    return JSON.stringify(editor);
  }
  
  function deserializeEditor(serialized) {
    // 编写你的编辑器对象反序列化逻辑，将序列化后的格式（如 JSON 字符串）转换为编辑器对象
    return JSON.parse(serialized);
  }
function decrypt(encryptedId) {
    let documentId = 0;
    for (let i = 0; i < encryptedId.length; i++) {
        let char = encryptedId.charAt(i);
        let position = alphabet.indexOf(char);
        documentId = documentId * base + position;
    }
    return documentId;
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
  


export {encrypt,decrypt,serializeEditor,deserializeEditor,fileToBase64,base64ToFile}