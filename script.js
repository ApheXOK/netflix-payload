// Breakpoint: cadmium-playercorereturn (m = l.decrypt(m, p, u), => Store p as temp1

const base64Decode = (str) => atob(str);

const base64ToHex = (base64) => {
  return Array.from(atob(base64))
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
};

const decryptAES = async (ciphertext, iv) => {
  const algorithm = { name: "AES-CBC", iv: new Uint8Array(iv) };
  const decrypted = await crypto.subtle.decrypt(algorithm, temp1, ciphertext);
  return new TextDecoder().decode(decrypted);
};

const processData = async (base64Data) => {
  try {
    const data = JSON.parse(base64Decode(base64Data));
    const { keyid, iv, ciphertext, sha256 } = data;

    const ivArrayBuffer = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
    const ciphertextArrayBuffer = Uint8Array.from(atob(ciphertext), (c) =>
      c.charCodeAt(0),
    );
    const decryptedData = await decryptAES(
      ciphertextArrayBuffer,
      ivArrayBuffer,
    );
    console.log("Decrypted data:", decryptedData);

    const { compressionalgo, data: innerData } = JSON.parse(decryptedData);

    const dataHex = base64ToHex(innerData);

    console.log("Compression Algorithm:", compressionalgo);
    console.log("Data (hex):", dataHex);
  } catch (error) {
    console.error("Decryption failed:", error);
  }
};

const payload ="PASTE PAYLOAD HERE";
processData(payload);
