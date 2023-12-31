{/* Handle POST request from client */}
{/* http://localhost:9999/.netlify/functions/DogCaptchaHandleAnswer */}

const headers = {
    "Access-Control-Allow-Origin" : "https://astonishing-caramel-d77900.netlify.app/",  //Allowed URL to call API   * = All
    "Access-Control-Allow-Methods": "POST, DELETE",
    "Access-Control-Allow-Headers": "Content-Type"
}  

exports.handler = async function(event, context) {
//export async function DogCaptchaHandleAnswer(event, context) {

    //Read POST/DELETE Request
    let data;
    try {
        data = event.body;
    } catch (error) {
        console.error("Error parsing JSON: ", error);
        return { statusCode: 400, headers: headers, body: "Invalid request body" };
    }

    if (event.httpMethod === "DELETE") {

        let database = await readDatabaseJSON();

        let i;
        for (i = 0; i < database.length; i++) { //Search for ID matched database index
            if (JSON.parse(database[i]).id === JSON.parse(data).id) break;
        }
        if (i === database.length) i = -1;

        if (i !== -1) DeleteSelectedFromDatabase(i);

        return { statusCode: 200, headers: headers, body: JSON.stringify({ message: "Requested API to Delete" })};

    } else if (event.httpMethod === 'OPTIONS') {

        // Preflight request
        return { statusCode: 200, headers: headers, body: 'This Was a Preflight Request' };

    } else if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers: headers, body: "Method Not Allowed. Only Allows POST or DELETE. Your Method Was " + event.httpMethod + "." };
    }


    //POST
    
    //Read Database JSON
    let database = await readDatabaseJSON();

    //Search Answer from Database JSON
    let searchResult = database.indexOf( JSON.stringify({id: JSON.parse(data).id, ans: Number(JSON.parse(data).ans)}) );
    
    if (searchResult !== -1) { 
        DeleteSelectedFromDatabase(searchResult);   //delete from database
        return { statusCode: 200, headers: headers, body: JSON.stringify({ passFlag: 1, message: "Data Received and CAPTCHA Passed" })};
    }
    else return { statusCode: 200, headers: headers, body: JSON.stringify({ passFlag: 0, message: "Data Received but CAPTCHA Failed" })};
};

async function readDatabaseJSON() {
    const response = await fetch("https://roaring-pegasus-3652c3.netlify.app/.netlify/functions/DogCaptchaDatabase");
    const data = await response.json();
    let JSONArray = data;

    return JSONArray;
}

{/* DELETE */}
function DeleteSelectedFromDatabase(index) {
    const data = { index: index };
    fetch('https://roaring-pegasus-3652c3.netlify.app/.netlify/functions/DogCaptchaDatabase', {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
    })
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
}