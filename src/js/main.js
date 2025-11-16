import { getParkData } from "./parkService.mjs";
import { parkInfoLinks } from "./parkService.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs"
import "../css/style.css";
import "../css/home.css";

async function init() {
    const parkData = await getParkData();
    setHeaderFooter(parkData);
    setParkIntro(parkData);
    mediaCardTemplate(parkInfoLinks, parkData);
}
init();

// Body

function mediaCardTemplate(parkInfoLinks, parkData) {
    const mediaCard = document.querySelector(".info");

    const cardsHtml = parkInfoLinks.map(link => {
        return `
            <div class="media-card">
                <a class="media-link" href="${link.link}" >
                    <div class="mediacard-imageContainer">
                        <img class="info-pic" src="${link.image}" alt="${parkData.images[2].altText}">
                    </div>
                    <div class="mediacard-title">
                        <h3>${link.name}</h3>
                    </div> 
                </a>
                <p class="media-description">${link.description}</p>
            </div>
`;
    });
    mediaCard.innerHTML = `
    <div class= "Component-MediaGrid">
        ${cardsHtml.join("")}
    </div>
    `;
}

function setParkIntro(parkData) {
    const title = document.querySelector(".intro");
    if (!title) {
        console.warn("No .intro element found - skipping intro setup");
        return;
    }

    title.innerHTML = `<h1>${parkData.fullName}</h1>
    <p>${parkData.description}</p>`;
    
}

// function setParkInfoLinks(data) {
//     const infoEl = document.querySelector(".info");
//     const html = data.map(mediaCardTemplate);
//     infoEl.innerHTML = html.join("");
// }

