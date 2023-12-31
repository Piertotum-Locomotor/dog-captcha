// netlify/functions/DogCaptchaDatabase.mjs
{
}
{
}
var databaseJSON = [];
exports.handler = async function(event, context) {
  if (event.httpMethod === "GET") {
    return { statusCode: 200, body: JSON.stringify(databaseJSON) };
  } else if (event.httpMethod === "POST") {
    let data;
    try {
      data = event.body;
    } catch (error) {
      console.error("Error parsing JSON: ", error);
      return { statusCode: 400, body: "Invalid request body" };
    }
    const { id, ans } = data;
    let JSONCount = databaseJSON.push(data);
    if (100 <= JSONCount) {
      databaseJSON = [];
      databaseJSON.push(data);
    }
    return { statusCode: 200, body: JSON.stringify({ message: "Successfully Pushed" }) };
  } else if (event.httpMethod === "DELETE") {
    let data;
    try {
      data = event.body;
    } catch (error) {
      console.error("Error parsing JSON: ", error);
      return { statusCode: 400, body: "Invalid request body" };
    }
    databaseJSON.splice(Number(JSON.parse(data).index), 1);
    return { statusCode: 200, body: JSON.stringify({ message: "Successfully Deleted" }) };
  } else {
    return { statusCode: 405, body: "Method Not Allowed. Only Allows GET or POST or DELETE. Your Method Was " + event.httpMethod + "." };
  }
};
//# sourceMappingURL=DogCaptchaDatabase.js.map
