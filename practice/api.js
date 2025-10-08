const baseUrl = "https://developer.nps.gov/api/v1/";

async function getJson(endpoint) {
  // replace this with your actual key
  const apiKey = "aMqo5y4Ja2CLQKSCyAGsmevYCaEElKEr2PWmosaX";
  // construct the url: baseUrl + endpoint + parameters
  const url = baseUrl + endpoint;
  // set the options. The important one here is the X-Api-Key
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey
      }
  }
  // make the request
  const response = await fetch(url, options)
  const data = await response.json()
  console.log(data)
  return data;
}

function listTemplate(item) {
    return `
    <li><a href="${item.url}">Park Name: ${item.fullName}</a> States: ${item.states}</li>
    `
}

async function renderClimbingList() {
    const endpoint = "activities/parks?id=climbing";
    const listElement = document.getElementById("outputList");

    const data = await getJson(endpoint);
    const parks = data.data[0].parks;

    const listHtml = parks.map(listTemplate).join("");
    listElement.innerHTML = listHtml;
    
}

renderClimbingList();