// 1
const hexToBase64 = (hexString) => {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.substr(i, 2), 16));
    }

    let base64 = '';
    const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    for (let i = 0; i < bytes.length; i += 3) {
        const byte1 = bytes[i];
        const byte2 = bytes[i + 1];
        const byte3 = bytes[i + 2];

        const char1 = byte1 >> 2;
        const char2 = ((byte1 & 3) << 4) | (byte2 >> 4);
        const char3 = ((byte2 & 15) << 2) | (byte3 >> 6);
        const char4 = byte3 & 63;

        base64 += base64Chars.charAt(char1);
        base64 += base64Chars.charAt(char2);
        base64 += i + 1 < bytes.length ? base64Chars.charAt(char3) : '=';
        base64 += i + 2 < bytes.length ? base64Chars.charAt(char4) : '=';
    }

    return base64;
}

document.getElementById('convertButton').addEventListener('click', () => {
    const hexString = document.getElementById('hexInput').value;
    const base64String = hexToBase64(hexString);

    const base64OutputDiv = document.getElementById('base64Output');
    base64OutputDiv.textContent = ("Your base64 string is: " + base64String);
});

// 2
const fixedXOR = (buffer1, buffer2) =>{
    // Convert hexadecimal strings to byte arrays
    const bytes1 = hexToBytes(buffer1);
    const bytes2 = hexToBytes(buffer2);

    // Perform XOR operation byte by byte
    const resultBytes = [];
    for (let i = 0; i < bytes1.length; i++) {
        resultBytes.push(bytes1[i] ^ bytes2[i]);
    }

    // Convert result byte array to hexadecimal string
    const resultHex = bytesToHex(resultBytes);
    
    return resultHex;
}

// Helper const to convert hexadecimal string to byte array
const hexToBytes = hexString => {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return bytes;
};

// Helper const to convert byte array to hexadecimal string
const bytesToHex = bytes => {
    return bytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
};

// const to calculate XOR and update the result
const calculateXOR = () => {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;

    const result = fixedXOR(input1, input2);

    // Update the document with the result
    const resultElement = document.getElementById('result');
    resultElement.textContent = 'Result: ' + result;
};

// 3
const xorDecrypt = (hexString, key) => {
    const buffer = hexToBytes(hexString);
    const result = [];

    for (let byte of buffer) {
        result.push(byte ^ key);
    }

    return String.fromCharCode(...result);
};








// 4
const scorePlaintext = (text) => {
    // Your scoring logic goes here
};

// Now you can define your handleFile function
const handleFile = () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const content = event.target.result;
        console.log('Content:', content); 
        
        const lines = content.split(/\r?\n/);
        // console.log('Lines:', lines); 
        
        let mostLikelySentence = null;
        let maxScore = 0;

        for (const line of lines) {
            const score = scorePlaintext(line.trim());
            console.log('Line:', line.trim(), 'Score:', score); 
            if (score > maxScore) {
                maxScore = score;
                mostLikelySentence = line;
            }
        }

        console.log(`Most likely sentence: ${mostLikelySentence}`);

        const resultElement = document.getElementById('result2');
        resultElement.value = mostLikelySentence;
    };

    reader.readAsText(file);
};







// 5
const repeatingKeyXOR = (plaintext, key) => {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const plaintextBytes = encoder.encode(plaintext);
    const keyBytes = encoder.encode(key);
    const encryptedBytes = [];
    for (let i = 0; i < plaintextBytes.length; i++) {
        const byte = plaintextBytes[i] ^ keyBytes[i % keyBytes.length];
        encryptedBytes.push(byte);
    }
    // Convert bytes to hexadecimal representation
    const hexString = encryptedBytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hexString;
};

const encrypt = () => {
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;
    const ciphertext = repeatingKeyXOR(plaintext, key);
    document.getElementById('ciphertext').value = ciphertext;
};
