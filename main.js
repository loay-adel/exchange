import { COUNTRY_NAMES } from "./countries.js";

let exchangeBtn = document.querySelector("button.exchange-btn");
let fromSelect = document.querySelector("#fromselect");
let toSelect = document.querySelector("#toselect");
let convert = document.querySelector("button.convert");
let result = document.querySelector("div.result");
let objKeys = Object.keys(COUNTRY_NAMES);

objKeys.forEach((keys) => {
  fromSelect.innerHTML += `<option>${keys} || ${COUNTRY_NAMES[keys]}</option>`;
});

objKeys.forEach((keys) => {
  toSelect.innerHTML += `<option>${keys} || ${COUNTRY_NAMES[keys]}</option>`;
});
exchangeBtn.addEventListener("click", () => {
  console.log(fromSelect.value);

  let first = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = first;
});
convert
  .addEventListener("click", () => {
    let first = fromSelect.value;
    let sec = toSelect.value;
    let link = first.slice(0, 3);
    let exchangerate = document.querySelector("input.userInput").value || 1;

    fetch(
      `https://v6.exchangerate-api.com/v6/64a61b56ef2db243ef928348/latest/${link}`
    )
      .then((data) => data.json())
      .then((cur) => {
        let objkey = Object.keys(cur.conversion_rates).find(
          (key) => key == sec.slice(0, 3)
        );
        result.innerHTML = `${exchangerate || 1} ${first.slice(6)} = ${
          cur.conversion_rates[objkey] * exchangerate
        } ${sec.slice(6)}`;
      });
  })
  .catch((e) => console.log(e));
