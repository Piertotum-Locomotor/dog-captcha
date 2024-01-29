{/* npm run serve */}
{/* http://localhost:9999/.netlify/functions/DogCaptcha */}

import { v4 as uuidv4 } from 'uuid';

const headers = {
  "Access-Control-Allow-Origin" : "https://astonishing-caramel-d77900.netlify.app",  //Allowed URL to call API   * = All
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type"
}

const breeds = ["akita", "beagle", "dachshund", "dalmatian", "husky", "komondor", "poodle/toy", "shiba", "terrier/yorkshire"];
const breeds_ja = ["秋田犬", "ビーグル", "ダックスフント", "ダルメシアン", "ハスキー", "コモンドール", "トイプードル", "柴犬", "ヨークシャーテリア"];

let target_slot;
let target_index;
let slots;

async function push_slots() {
  target_slot = Math.floor( Math.random() * 9 ); {/* target answer slot: 0-8 */}
  target_index = Math.floor(Math.random() * breeds.length); {/* target breed index */}
  slots=[];

  for (let i = 0; i < 9; i++) {
    let ret;
    do {
      ret = Math.floor(Math.random() * breeds.length);
    } while (ret == target_index);

    let response;
    if (i == target_slot) response = await fetch("https://dog.ceo/api/breed/" + breeds[target_index] + "/images/random");
    else response = await fetch("https://dog.ceo/api/breed/" + breeds[ret] + "/images/random");

    let data = await response.json();
    slots.push(data.message);
  }

  return target_slot;
}

exports.handler = async function(event, context) {
//export default async () => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: headers, body: "Method Not Allowed. Only Allows POST. Your Method Was " + event.httpMethod + "." };
}
  let ans = await push_slots();

  const data = {
    id: uuidv4(),
    quiz: breeds[target_index],
    quiz_ja: breeds_ja[target_index],
    message: slots
  };

  PushToDatabase(data.id, ans);

  return new Response(JSON.stringify(data), {
      statusCode: 200,
      headers: headers
    });
};

  {/* POST */}
  function PushToDatabase(id, ans) {
    const data = { id: id, ans: ans };
    fetch('https://roaring-pegasus-3652c3.netlify.app/.netlify/functions/DogCaptchaDatabase', {
    //fetch('http://localhost:9999/.netlify/functions/DogCaptchaDatabase', {
      method: 'POST',
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