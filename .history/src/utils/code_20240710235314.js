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

function decrypt(encryptedId) {
    let documentId = 0;
    for (let i = 0; i < encryptedId.length; i++) {
        let char = encryptedId.charAt(i);
        let position = alphabet.indexOf(char);
        documentId = documentId * base + position;
    }
    return documentId;
}