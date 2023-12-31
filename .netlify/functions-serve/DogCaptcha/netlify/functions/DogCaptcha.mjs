
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
  return new Response(JSON.stringify(data));
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvRG9nQ2FwdGNoYS5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbInsvKiBucG0gcnVuIHNlcnZlICovfVxyXG57LyogaHR0cDovL2xvY2FsaG9zdDo5OTk5Ly5uZXRsaWZ5L2Z1bmN0aW9ucy9Eb2dDYXB0Y2hhICovfVxyXG5cclxuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XHJcblxyXG5jb25zdCBicmVlZHMgPSBbXCJha2l0YVwiLCBcImJlYWdsZVwiLCBcImRhY2hzaHVuZFwiLCBcImRhbG1hdGlhblwiLCBcImh1c2t5XCIsIFwia29tb25kb3JcIiwgXCJwb29kbGUvdG95XCIsIFwic2hpYmFcIiwgXCJ0ZXJyaWVyL3lvcmtzaGlyZVwiXTtcclxuY29uc3QgYnJlZWRzX2phID0gW1wiXHU3OUNCXHU3NTMwXHU3MkFDXCIsIFwiXHUzMEQzXHUzMEZDXHUzMEIwXHUzMEVCXCIsIFwiXHUzMEMwXHUzMEMzXHUzMEFGXHUzMEI5XHUzMEQ1XHUzMEYzXHUzMEM4XCIsIFwiXHUzMEMwXHUzMEVCXHUzMEUxXHUzMEI3XHUzMEEyXHUzMEYzXCIsIFwiXHUzMENGXHUzMEI5XHUzMEFEXHUzMEZDXCIsIFwiXHUzMEIzXHUzMEUyXHUzMEYzXHUzMEM5XHUzMEZDXHUzMEVCXCIsIFwiXHUzMEM4XHUzMEE0XHUzMEQ3XHUzMEZDXHUzMEM5XHUzMEVCXCIsIFwiXHU2N0Y0XHU3MkFDXCIsIFwiXHUzMEU4XHUzMEZDXHUzMEFGXHUzMEI3XHUzMEUzXHUzMEZDXHUzMEM2XHUzMEVBXHUzMEEyXCJdO1xyXG5cclxubGV0IHRhcmdldF9zbG90O1xyXG5sZXQgdGFyZ2V0X2luZGV4O1xyXG5sZXQgc2xvdHM7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwdXNoX3Nsb3RzKCkge1xyXG4gIHRhcmdldF9zbG90ID0gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIDkgKTsgey8qIHRhcmdldCBhbnN3ZXIgc2xvdDogMC04ICovfVxyXG4gIHRhcmdldF9pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJyZWVkcy5sZW5ndGgpOyB7LyogdGFyZ2V0IGJyZWVkIGluZGV4ICovfVxyXG4gIHNsb3RzPVtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgbGV0IHJldDtcclxuICAgIGRvIHtcclxuICAgICAgcmV0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYnJlZWRzLmxlbmd0aCk7XHJcbiAgICB9IHdoaWxlIChyZXQgPT0gdGFyZ2V0X2luZGV4KTtcclxuXHJcbiAgICBsZXQgcmVzcG9uc2U7XHJcbiAgICBpZiAoaSA9PSB0YXJnZXRfc2xvdCkgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vZG9nLmNlby9hcGkvYnJlZWQvXCIgKyBicmVlZHNbdGFyZ2V0X2luZGV4XSArIFwiL2ltYWdlcy9yYW5kb21cIik7XHJcbiAgICBlbHNlIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2RvZy5jZW8vYXBpL2JyZWVkL1wiICsgYnJlZWRzW3JldF0gKyBcIi9pbWFnZXMvcmFuZG9tXCIpO1xyXG5cclxuICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgc2xvdHMucHVzaChkYXRhLm1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRhcmdldF9zbG90O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoKSA9PiB7XHJcbiAgbGV0IGFucyA9IGF3YWl0IHB1c2hfc2xvdHMoKTtcclxuXHJcbiAgY29uc3QgZGF0YSA9IHtcclxuICAgIGlkOiB1dWlkdjQoKSxcclxuICAgIHF1aXo6IGJyZWVkc1t0YXJnZXRfaW5kZXhdLFxyXG4gICAgcXVpel9qYTogYnJlZWRzX2phW3RhcmdldF9pbmRleF0sXHJcbiAgICBtZXNzYWdlOiBzbG90c1xyXG4gIH07XHJcblxyXG4gIFB1c2hUb0RhdGFiYXNlKGRhdGEuaWQsIGFucyk7XHJcblxyXG4gIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59O1xyXG5cclxuICB7LyogUE9TVCAqL31cclxuICBmdW5jdGlvbiBQdXNoVG9EYXRhYmFzZShpZCwgYW5zKSB7XHJcbiAgICBjb25zdCBkYXRhID0geyBpZDogaWQsIGFuczogYW5zIH07XHJcbiAgICBmZXRjaCgnaHR0cHM6Ly9yb2FyaW5nLXBlZ2FzdXMtMzY1MmMzLm5ldGxpZnkuYXBwLy5uZXRsaWZ5L2Z1bmN0aW9ucy9Eb2dDYXB0Y2hhRGF0YWJhc2UnLCB7XHJcbiAgICAvL2ZldGNoKCdodHRwOi8vbG9jYWxob3N0Ojk5OTkvLm5ldGxpZnkvZnVuY3Rpb25zL0RvZ0NhcHRjaGFEYXRhYmFzZScsIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgIH0pXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgfSlcclxuICAgIC50aGVuKGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSkpXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcikpO1xyXG4gIH0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBR0EsU0FBUyxNQUFNLGNBQWM7QUFIN0I7QUFBb0I7QUFDcEI7QUFBMEQ7QUFJMUQsSUFBTSxTQUFTLENBQUMsU0FBUyxVQUFVLGFBQWEsYUFBYSxTQUFTLFlBQVksY0FBYyxTQUFTLG1CQUFtQjtBQUM1SCxJQUFNLFlBQVksQ0FBQyxzQkFBTyw0QkFBUSw4Q0FBVyx3Q0FBVSw0QkFBUSx3Q0FBVSx3Q0FBVSxnQkFBTSx3REFBVztBQUVwRyxJQUFJO0FBQ0osSUFBSTtBQUNKLElBQUk7QUFFSixlQUFlLGFBQWE7QUFDMUIsZ0JBQWMsS0FBSyxNQUFPLEtBQUssT0FBTyxJQUFJLENBQUU7QUFBRztBQUFBLEVBQThCO0FBQzdFLGlCQUFlLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxPQUFPLE1BQU07QUFBRztBQUFBLEVBQXlCO0FBQ25GLFVBQU0sQ0FBQztBQUVQLFdBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQzFCLFFBQUk7QUFDSixPQUFHO0FBQ0QsWUFBTSxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksT0FBTyxNQUFNO0FBQUEsSUFDaEQsU0FBUyxPQUFPO0FBRWhCLFFBQUk7QUFDSixRQUFJLEtBQUs7QUFBYSxpQkFBVyxNQUFNLE1BQU0sK0JBQStCLE9BQU8sWUFBWSxJQUFJLGdCQUFnQjtBQUFBO0FBQzlHLGlCQUFXLE1BQU0sTUFBTSwrQkFBK0IsT0FBTyxHQUFHLElBQUksZ0JBQWdCO0FBRXpGLFFBQUksT0FBTyxNQUFNLFNBQVMsS0FBSztBQUMvQixVQUFNLEtBQUssS0FBSyxPQUFPO0FBQUEsRUFDekI7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxJQUFPLHFCQUFRLFlBQVk7QUFDekIsTUFBSSxNQUFNLE1BQU0sV0FBVztBQUUzQixRQUFNLE9BQU87QUFBQSxJQUNYLElBQUksT0FBTztBQUFBLElBQ1gsTUFBTSxPQUFPLFlBQVk7QUFBQSxJQUN6QixTQUFTLFVBQVUsWUFBWTtBQUFBLElBQy9CLFNBQVM7QUFBQSxFQUNYO0FBRUEsaUJBQWUsS0FBSyxJQUFJLEdBQUc7QUFFM0IsU0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLElBQUksQ0FBQztBQUMxQztBQUVFO0FBQVc7QUFDWCxTQUFTLGVBQWUsSUFBSSxLQUFLO0FBQy9CLFFBQU0sT0FBTyxFQUFFLElBQVEsSUFBUztBQUNoQyxRQUFNLG9GQUFvRjtBQUFBO0FBQUEsSUFFeEYsUUFBUTtBQUFBLElBQ1IsTUFBTSxLQUFLLFVBQVUsSUFBSTtBQUFBLElBQ3pCLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsRUFDaEQsQ0FBQyxFQUNBLEtBQUssY0FBWTtBQUNoQixRQUFJLENBQUMsU0FBUyxJQUFJO0FBQ2hCLFlBQU0sSUFBSSxNQUFNLEdBQUcsU0FBUyxNQUFNLElBQUksU0FBUyxVQUFVLEVBQUU7QUFBQSxJQUM3RDtBQUNBLFdBQU8sU0FBUyxLQUFLO0FBQUEsRUFDckIsQ0FBQyxFQUNGLEtBQUssQ0FBQUEsVUFBUSxRQUFRLElBQUlBLEtBQUksQ0FBQyxFQUM5QixNQUFNLENBQUMsVUFBVSxRQUFRLE1BQU0sVUFBVSxLQUFLLENBQUM7QUFDbEQ7IiwKICAibmFtZXMiOiBbImRhdGEiXQp9Cg==
