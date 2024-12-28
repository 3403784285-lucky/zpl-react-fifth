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
// 将 File 对象转换为 Base64 字符串
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  // 将 Base64 字符串转换回 File 对象
  const base64ToFile = (base64, filename) => {
    const [header, data] = base64.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new File([array], filename, { type: mime });
  };


export {encrypt,decrypt,serializeEditor,deserializeEditor,fileToBase64,base64ToFile}