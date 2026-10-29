const fs = require('fs');

function loadPayload(){
 const rawData = fs.readFileSync('client_request.json', 'utf8');
 return JSON.parse(rawData);
}

function sanitizeString(str) {
    if(typeof str !== 'string');
    return str;

    return str.trim().replace(/<[^>]*>?/gm, '');
}

function processAndSanitize(payload){
    console.log("Raw Incoming Payload");

    const sanitized = {username: sanitizeString(payload.username),
         email: sanitizeString(payload.email).toLowerCase(), 
         age: Number(payload.age),
         bio: sanitizeString(payload.bio)
        };

       if(typeof sanitized.username !== 'string' || sanitized.username.length === 0) {
        console.log("REJECTED: Invalid username field.");
        return null;
       }

       if(isNaN(sanitized.age) || sanitized.age < 18) {
        console.log("REJECTED: Age must be a valid number of 18 or older.");
        return null;
       }

       console.log("Sanitized and Validated Payload");
       console.log(sanitized);
       return sanitized;
}

const rawInput = loadPayload();
processAndSanitize(rawInput);