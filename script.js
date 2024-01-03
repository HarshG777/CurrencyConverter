const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const button = document.querySelector("button");
const input = document.querySelector("input");
const output = document.querySelector("h4");

const fromcurr = document.querySelector(".dfrom")
const tocurr = document.querySelector(".dto")

let dropdown = document.querySelectorAll(".dropdownds select");

for( let select of dropdown){
    for(currcode in countryList){
        let newopt = document.createElement("option");
        newopt.innerText = currcode;
        newopt.value = currcode
        if(select.name === "form" && currcode === "USD"){
            newopt.selected = "selected";
        } else if(select.name === "to" && currcode === "INR"){
            newopt.selected = "selected";
        }
        select.append(newopt);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

function updateFlag(elemet){
    let currCoce = elemet.value;
    let contryCodd = countryList[currCoce];

    let newSrc = `https://flagsapi.com/${contryCodd}/flat/64.png`

    let img = elemet.parentElement.querySelector("img");
    img.src = newSrc;

}

button.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = input.value;
    if(amount === ''|| amount <= 0){
        amount = 1;
        input.value = 1;
    }
    const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`

    let response = await fetch(url)
    let data =  await response.json();
    data = data[tocurr.value.toLowerCase()];
    console.log(parseInt(amount)*data);

    output.innerText = `${parseInt(amount)*data} ${tocurr.value}`;
})
