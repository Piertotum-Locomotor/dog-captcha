
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/DogCaptcha.mjs
import { v4 as uuidv4 } from "uuid";
{
}
{
}
var headers = {
  "Access-Control-Allow-Origin": "https://astonishing-caramel-d77900.netlify.app",
  //Allowed URL to call API   * = All
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type"
};
var breeds = ["akita", "beagle", "dachshund", "dalmatian", "husky", "komondor", "poodle/toy", "shiba", "terrier/yorkshire"];
var breeds_ja = ["\u79CB\u7530\u72AC", "\u30D3\u30FC\u30B0\u30EB", "\u30C0\u30C3\u30AF\u30B9\u30D5\u30F3\u30C8", "\u30C0\u30EB\u30E1\u30B7\u30A2\u30F3", "\u30CF\u30B9\u30AD\u30FC", "\u30B3\u30E2\u30F3\u30C9\u30FC\u30EB", "\u30C8\u30A4\u30D7\u30FC\u30C9\u30EB", "\u67F4\u72AC", "\u30E8\u30FC\u30AF\u30B7\u30E3\u30FC\u30C6\u30EA\u30A2"];
var target_slot;
var target_index;
var slots;
async function push_slots() {
  target_slot = Math.floor(Math.random() * 9);
  {
  }
  target_index = Math.floor(Math.random() * breeds.length);
  {
  }
  slots = [];
  for (let i = 0; i < 9; i++) {
    let ret;
    do {
      ret = Math.floor(Math.random() * breeds.length);
    } while (ret == target_index);
    let response;
    if (i == target_slot)
      response = await fetch("https://dog.ceo/api/breed/" + breeds[target_index] + "/images/random");
    else
      response = await fetch("https://dog.ceo/api/breed/" + breeds[ret] + "/images/random");
    let data = await response.json();
    slots.push(data.message);
  }
  return target_slot;
}
var DogCaptcha_default = async () => {
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
    headers
  });
};
{
}
function PushToDatabase(id, ans) {
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
export {
  DogCaptcha_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvRG9nQ2FwdGNoYS5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbInsvKiBucG0gcnVuIHNlcnZlICovfVxyXG57LyogaHR0cDovL2xvY2FsaG9zdDo5OTk5Ly5uZXRsaWZ5L2Z1bmN0aW9ucy9Eb2dDYXB0Y2hhICovfVxyXG5cclxuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XHJcblxyXG5jb25zdCBoZWFkZXJzID0ge1xyXG4gIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIgOiBcImh0dHBzOi8vYXN0b25pc2hpbmctY2FyYW1lbC1kNzc5MDAubmV0bGlmeS5hcHBcIiwgIC8vQWxsb3dlZCBVUkwgdG8gY2FsbCBBUEkgICAqID0gQWxsXHJcbiAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCI6IFwiR0VUXCIsXHJcbiAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCI6IFwiQ29udGVudC1UeXBlXCJcclxufVxyXG5cclxuY29uc3QgYnJlZWRzID0gW1wiYWtpdGFcIiwgXCJiZWFnbGVcIiwgXCJkYWNoc2h1bmRcIiwgXCJkYWxtYXRpYW5cIiwgXCJodXNreVwiLCBcImtvbW9uZG9yXCIsIFwicG9vZGxlL3RveVwiLCBcInNoaWJhXCIsIFwidGVycmllci95b3Jrc2hpcmVcIl07XHJcbmNvbnN0IGJyZWVkc19qYSA9IFtcIlx1NzlDQlx1NzUzMFx1NzJBQ1wiLCBcIlx1MzBEM1x1MzBGQ1x1MzBCMFx1MzBFQlwiLCBcIlx1MzBDMFx1MzBDM1x1MzBBRlx1MzBCOVx1MzBENVx1MzBGM1x1MzBDOFwiLCBcIlx1MzBDMFx1MzBFQlx1MzBFMVx1MzBCN1x1MzBBMlx1MzBGM1wiLCBcIlx1MzBDRlx1MzBCOVx1MzBBRFx1MzBGQ1wiLCBcIlx1MzBCM1x1MzBFMlx1MzBGM1x1MzBDOVx1MzBGQ1x1MzBFQlwiLCBcIlx1MzBDOFx1MzBBNFx1MzBEN1x1MzBGQ1x1MzBDOVx1MzBFQlwiLCBcIlx1NjdGNFx1NzJBQ1wiLCBcIlx1MzBFOFx1MzBGQ1x1MzBBRlx1MzBCN1x1MzBFM1x1MzBGQ1x1MzBDNlx1MzBFQVx1MzBBMlwiXTtcclxuXHJcbmxldCB0YXJnZXRfc2xvdDtcclxubGV0IHRhcmdldF9pbmRleDtcclxubGV0IHNsb3RzO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gcHVzaF9zbG90cygpIHtcclxuICB0YXJnZXRfc2xvdCA9IE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiA5ICk7IHsvKiB0YXJnZXQgYW5zd2VyIHNsb3Q6IDAtOCAqL31cclxuICB0YXJnZXRfaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBicmVlZHMubGVuZ3RoKTsgey8qIHRhcmdldCBicmVlZCBpbmRleCAqL31cclxuICBzbG90cz1bXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgIGxldCByZXQ7XHJcbiAgICBkbyB7XHJcbiAgICAgIHJldCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJyZWVkcy5sZW5ndGgpO1xyXG4gICAgfSB3aGlsZSAocmV0ID09IHRhcmdldF9pbmRleCk7XHJcblxyXG4gICAgbGV0IHJlc3BvbnNlO1xyXG4gICAgaWYgKGkgPT0gdGFyZ2V0X3Nsb3QpIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2RvZy5jZW8vYXBpL2JyZWVkL1wiICsgYnJlZWRzW3RhcmdldF9pbmRleF0gKyBcIi9pbWFnZXMvcmFuZG9tXCIpO1xyXG4gICAgZWxzZSByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9kb2cuY2VvL2FwaS9icmVlZC9cIiArIGJyZWVkc1tyZXRdICsgXCIvaW1hZ2VzL3JhbmRvbVwiKTtcclxuXHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHNsb3RzLnB1c2goZGF0YS5tZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0YXJnZXRfc2xvdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKCkgPT4ge1xyXG4gIGxldCBhbnMgPSBhd2FpdCBwdXNoX3Nsb3RzKCk7XHJcblxyXG4gIGNvbnN0IGRhdGEgPSB7XHJcbiAgICBpZDogdXVpZHY0KCksXHJcbiAgICBxdWl6OiBicmVlZHNbdGFyZ2V0X2luZGV4XSxcclxuICAgIHF1aXpfamE6IGJyZWVkc19qYVt0YXJnZXRfaW5kZXhdLFxyXG4gICAgbWVzc2FnZTogc2xvdHNcclxuICB9O1xyXG5cclxuICBQdXNoVG9EYXRhYmFzZShkYXRhLmlkLCBhbnMpO1xyXG5cclxuICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgaGVhZGVyczogaGVhZGVyc1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4gIHsvKiBQT1NUICovfVxyXG4gIGZ1bmN0aW9uIFB1c2hUb0RhdGFiYXNlKGlkLCBhbnMpIHtcclxuICAgIGNvbnN0IGRhdGEgPSB7IGlkOiBpZCwgYW5zOiBhbnMgfTtcclxuICAgIGZldGNoKCdodHRwczovL3JvYXJpbmctcGVnYXN1cy0zNjUyYzMubmV0bGlmeS5hcHAvLm5ldGxpZnkvZnVuY3Rpb25zL0RvZ0NhcHRjaGFEYXRhYmFzZScsIHtcclxuICAgIC8vZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OS8ubmV0bGlmeS9mdW5jdGlvbnMvRG9nQ2FwdGNoYURhdGFiYXNlJywge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgfSlcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICB9KVxyXG4gICAgLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSlcclxuICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKSk7XHJcbiAgfSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFHQSxTQUFTLE1BQU0sY0FBYztBQUg3QjtBQUFvQjtBQUNwQjtBQUEwRDtBQUkxRCxJQUFNLFVBQVU7QUFBQSxFQUNkLCtCQUFnQztBQUFBO0FBQUEsRUFDaEMsZ0NBQWdDO0FBQUEsRUFDaEMsZ0NBQWdDO0FBQ2xDO0FBRUEsSUFBTSxTQUFTLENBQUMsU0FBUyxVQUFVLGFBQWEsYUFBYSxTQUFTLFlBQVksY0FBYyxTQUFTLG1CQUFtQjtBQUM1SCxJQUFNLFlBQVksQ0FBQyxzQkFBTyw0QkFBUSw4Q0FBVyx3Q0FBVSw0QkFBUSx3Q0FBVSx3Q0FBVSxnQkFBTSx3REFBVztBQUVwRyxJQUFJO0FBQ0osSUFBSTtBQUNKLElBQUk7QUFFSixlQUFlLGFBQWE7QUFDMUIsZ0JBQWMsS0FBSyxNQUFPLEtBQUssT0FBTyxJQUFJLENBQUU7QUFBRztBQUFBLEVBQThCO0FBQzdFLGlCQUFlLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxPQUFPLE1BQU07QUFBRztBQUFBLEVBQXlCO0FBQ25GLFVBQU0sQ0FBQztBQUVQLFdBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQzFCLFFBQUk7QUFDSixPQUFHO0FBQ0QsWUFBTSxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksT0FBTyxNQUFNO0FBQUEsSUFDaEQsU0FBUyxPQUFPO0FBRWhCLFFBQUk7QUFDSixRQUFJLEtBQUs7QUFBYSxpQkFBVyxNQUFNLE1BQU0sK0JBQStCLE9BQU8sWUFBWSxJQUFJLGdCQUFnQjtBQUFBO0FBQzlHLGlCQUFXLE1BQU0sTUFBTSwrQkFBK0IsT0FBTyxHQUFHLElBQUksZ0JBQWdCO0FBRXpGLFFBQUksT0FBTyxNQUFNLFNBQVMsS0FBSztBQUMvQixVQUFNLEtBQUssS0FBSyxPQUFPO0FBQUEsRUFDekI7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxJQUFPLHFCQUFRLFlBQVk7QUFDekIsTUFBSSxNQUFNLE1BQU0sV0FBVztBQUUzQixRQUFNLE9BQU87QUFBQSxJQUNYLElBQUksT0FBTztBQUFBLElBQ1gsTUFBTSxPQUFPLFlBQVk7QUFBQSxJQUN6QixTQUFTLFVBQVUsWUFBWTtBQUFBLElBQy9CLFNBQVM7QUFBQSxFQUNYO0FBRUEsaUJBQWUsS0FBSyxJQUFJLEdBQUc7QUFFM0IsU0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLElBQUksR0FBRztBQUFBLElBQ3RDLFlBQVk7QUFBQSxJQUNaO0FBQUEsRUFDRixDQUFDO0FBQ0w7QUFFRTtBQUFXO0FBQ1gsU0FBUyxlQUFlLElBQUksS0FBSztBQUMvQixRQUFNLE9BQU8sRUFBRSxJQUFRLElBQVM7QUFDaEMsUUFBTSxvRkFBb0Y7QUFBQTtBQUFBLElBRXhGLFFBQVE7QUFBQSxJQUNSLE1BQU0sS0FBSyxVQUFVLElBQUk7QUFBQSxJQUN6QixTQUFTLEVBQUUsZ0JBQWdCLG1CQUFtQjtBQUFBLEVBQ2hELENBQUMsRUFDQSxLQUFLLGNBQVk7QUFDaEIsUUFBSSxDQUFDLFNBQVMsSUFBSTtBQUNoQixZQUFNLElBQUksTUFBTSxHQUFHLFNBQVMsTUFBTSxJQUFJLFNBQVMsVUFBVSxFQUFFO0FBQUEsSUFDN0Q7QUFDQSxXQUFPLFNBQVMsS0FBSztBQUFBLEVBQ3JCLENBQUMsRUFDRixLQUFLLENBQUFBLFVBQVEsUUFBUSxJQUFJQSxLQUFJLENBQUMsRUFDOUIsTUFBTSxDQUFDLFVBQVUsUUFBUSxNQUFNLFVBQVUsS0FBSyxDQUFDO0FBQ2xEOyIsCiAgIm5hbWVzIjogWyJkYXRhIl0KfQo=
