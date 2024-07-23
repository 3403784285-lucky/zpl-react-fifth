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


export {encrypt,decrypt,serializeEditor,deserializeEditor}