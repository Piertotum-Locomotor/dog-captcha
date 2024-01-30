var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/uuid/dist/esm-node/rng.js
var import_crypto = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

// node_modules/uuid/dist/esm-node/native.js
var import_crypto2 = __toESM(require("crypto"));
var native_default = {
  randomUUID: import_crypto2.default.randomUUID
};

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// netlify/functions/DogCaptcha.mjs
{
}
{
}
var headers = {
  "Access-Control-Allow-Origin": "https://astonishing-caramel-d77900.netlify.app",
  //Allowed URL to call API   * = All
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type"
};
var breeds = ["akita", "beagle", "dachshund", "dalmatian", "husky", "komondor", "poodle/toy", "shiba", "terrier/yorkshire"];
var breeds_ja = ["\u79CB\u7530\u72AC", "\u30D3\u30FC\u30B0\u30EB", "\u30C0\u30C3\u30AF\u30B9\u30D5\u30F3\u30C8", "\u30C0\u30EB\u30E1\u30B7\u30A2\u30F3", "\u30CF\u30B9\u30AD\u30FC", "\u30B3\u30E2\u30F3\u30C9\u30FC\u30EB", "\u30C8\u30A4\u30D7\u30FC\u30C9\u30EB", "\u67F4\u72AC", "\u30E8\u30FC\u30AF\u30B7\u30E3\u30FC\u30C6\u30EA\u30A2"];
var targets_count;
var target_slot;
var target_index;
var slots;
async function push_slots() {
  console.log("DOG");
  targets_count = Math.floor(Math.random() * 4 + 1);
  {
  }
  target_slot = [];
  for (let i = 0; i < targets_count; i++) {
    let challenge;
    do {
      challenge = Math.floor(Math.random() * 9);
      {
      }
    } while (target_slot.includes(challenge));
    target_slot[i] = challenge;
  }
  target_slot.sort((x, y) => {
    return x - y;
  });
  target_index = Math.floor(Math.random() * breeds.length);
  {
  }
  slots = [];
  for (let i = 0; i < 9; i++) {
    let incorrect_index;
    do {
      incorrect_index = Math.floor(Math.random() * breeds.length);
    } while (incorrect_index == target_index);
    let response;
    if (target_slot.includes(i))
      response = await fetch("https://dog.ceo/api/breed/" + breeds[target_index] + "/images/random");
    else
      response = await fetch("https://dog.ceo/api/breed/" + breeds[incorrect_index] + "/images/random");
    let data = await response.json();
    slots.push(data.message);
  }
  return target_slot;
}
exports.handler = async function(event, context) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "This Was a Preflight Request" };
  } else if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method Not Allowed. Only Allows POST. Your Method Was " + event.httpMethod + "." };
  }
  slots = [];
  let ans = [];
  ans = await push_slots();
  const data = {
    id: v4_default(),
    quiz: breeds[target_index],
    quiz_ja: breeds_ja[target_index],
    message: slots
  };
  PushToDatabase(data.id, ans);
  return { statusCode: 200, headers, body: JSON.stringify(data) };
};
{
}
function PushToDatabase(id, ans) {
  console.log("POST Request to add to database");
  const data = { id, ans };
  fetch("https://roaring-pegasus-3652c3.netlify.app/.netlify/functions/DogCaptchaDatabase", {
    //fetch('http://localhost:9999/.netlify/functions/DogCaptchaDatabase', {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  }).then((data2) => console.log(data2)).catch((error) => console.error("Error:", error));
}
//# sourceMappingURL=DogCaptcha.js.map
