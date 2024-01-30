// netlify/functions/DogCaptchaHandleAnswer.mjs
{
}
{
}
var headers = {
  "Access-Control-Allow-Origin": "https://astonishing-caramel-d77900.netlify.app",
  //Allowed URL to call API   * = All
  "Access-Control-Allow-Methods": "POST, DELETE",
  "Access-Control-Allow-Headers": "Content-Type"
};
exports.handler = async function(event, context) {
  let data;
  try {
    data = event.body;
  } catch (error) {
    console.error("Error parsing JSON: ", error);
    return { statusCode: 400, headers, body: "Invalid request body" };
  }
  if (event.httpMethod === "DELETE") {
    let database2 = await readDatabaseJSON();
    let i;
    for (i = 0; i < database2.length; i++) {
      if (JSON.parse(database2[i]).id === JSON.parse(data).id)
        break;
    }
    if (i === database2.length)
      i = -1;
    if (i !== -1)
      DeleteSelectedFromDatabase(i);
    return { statusCode: 200, headers, body: JSON.stringify({ message: "Requested API to Delete" }) };
  } else if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "This Was a Preflight Request" };
  } else if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method Not Allowed. Only Allows POST or DELETE. Your Method Was " + event.httpMethod + "." };
  }
  let database = await readDatabaseJSON();
  console.log(JSON.parse(data).ans.map(Number));
  let searchResult = database.indexOf(JSON.stringify({ id: JSON.parse(data).id, ans: JSON.parse(data).ans.map(Number) }));
  if (searchResult !== -1) {
    DeleteSelectedFromDatabase(searchResult);
    return { statusCode: 200, headers, body: JSON.stringify({ passFlag: 1, message: "Data Received and CAPTCHA Passed" }) };
  } else
    return { statusCode: 200, headers, body: JSON.stringify({ passFlag: 0, message: "Data Received but CAPTCHA Failed" }) };
};
async function readDatabaseJSON() {
  const response = await fetch("https://roaring-pegasus-3652c3.netlify.app/.netlify/functions/DogCaptchaDatabase");
  const data = await response.json();
  let JSONArray = data;
  return JSONArray;
}
{
}
function DeleteSelectedFromDatabase(index) {
  const data = { index };
  fetch("https://roaring-pegasus-3652c3.netlify.app/.netlify/functions/DogCaptchaDatabase", {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  }).then((data2) => console.log(data2)).catch((error) => console.error("Error:", error));
}
//# sourceMappingURL=DogCaptchaHandleAnswer.js.map
