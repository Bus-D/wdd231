const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = "https://pokeapi.co/api/v2/pokemon";

let results = null;
async function getPokemon(url) {
  const response = await fetch(url);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    doStuff(data);
  }
}
function doStuff(data) {
  results = data;
  const outputElement = document.querySelector("#output");

  
  const html= `
    <h2>${results.name}</h2>
    <img src="${results.sprites.front_default}" alt="Image of ${results.name}">
  `

  outputElement.innerHTML = html;
  console.log("first: ", results);
}

function doStuffList(data) {
    console.log(data);
    const pokeListElement = document.getElementById("outputList");
    const pokeList = data.results;

    pokeList.forEach((currentItem) => {
        const html = `<li data-url="${currentItem.url}">${currentItem.name}</li>`;
        
        pokeListElement.innerHTML += html;
    });
}

getPokemon(urlList, doStuffList);
console.log("second: ", results);