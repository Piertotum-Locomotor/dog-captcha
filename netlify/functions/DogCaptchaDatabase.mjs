{/* Database */}
{/* http://localhost:9999/.netlify/functions/DogCaptchaDatabase */}

let databaseJSON = [];

exports.handler = async function(event, context) {
//export async function DogCaptchaDatabase(event, context) {
    if (event.httpMethod === "GET") {
        //RETURN DATABASE

        return { statusCode: 200, body: JSON.stringify(databaseJSON)};
    } else if (event.httpMethod === "POST") {
        //EDIT DATABASE

        let data;
        try {
            //data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
            data = event.body;
        } catch (error) {
            console.error("Error parsing JSON: ", error);
            return { statusCode: 400, body: "Invalid request body" };
        }
        const { id: id, ans: ans } = data;
        let JSONCount = databaseJSON.push(data); //Push to JSON
        if (100 <= JSONCount) {databaseJSON = []; databaseJSON.push(data);}

        return { statusCode: 200, body: JSON.stringify({ message: "Successfully Pushed" })};
    } else if (event.httpMethod === "DELETE") {
        //DELETE DETABASE

        let data;
        try {
            data = event.body;
        } catch (error) {
            console.error("Error parsing JSON: ", error);
            return { statusCode: 400, body: "Invalid request body" };
        }
        databaseJSON.splice(Number(JSON.parse(data).index), 1); //Delete selected

        return { statusCode: 200, body: JSON.stringify({ message: "Successfully Deleted" })};
    } else {
        return { statusCode: 405, body: "Method Not Allowed. Only Allows GET or POST or DELETE. Your Method Was " + event.httpMethod + "." };
    }
};
