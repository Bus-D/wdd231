import { getParkData } from "./parkService.mjs";
import { parkInfoLinks } from "./parkService.mjs";
import "../css/style.css";
import "../css/home.css";

async function init() {
    const parkData = await getParkData();
    setHeaderInfo(parkData);
    setParkIntro(parkData);
    mediaCardTemplate(parkInfoLinks, parkData);
    setParkFooter(parkData);
}
init();

function setHeaderInfo(parkData) {
    // Disclaimer
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = parkData.url;
    console.log(disclaimer.href);
    disclaimer.innerHTML = parkData.fullName;

    // Update Hero Info
    function parkInfoTemplate(info) {
        return `<a href="/" class="hero-banner-title">${info.fullName}</a>
        <p class="hero-banner-text">
            <span>${info.designation}</span>
            <span>${info.states}</span>`
    }

    // Update the Title
    function titleUpdate(info) {
        document.title = info.fullName
    }

    titleUpdate(parkData);

    // Update Hero Pic
    const heroInfo = document.querySelector(".hero-banner-content");
    heroInfo.innerHTML = parkInfoTemplate(parkData);

    const heroImg = document.querySelector(".hero-banner > img");
    heroImg.src = parkData.images[0].url;
    heroImg.alt = parkData.images[0].altText;
}

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
function setParkInfoLinks(data) {
    const infoEl = document.querySelector(".info");
    const html = data.map(mediaCardTemplate);
    infoEl.innerHTML = html.join("");
}


// footer

export function getMailingAddress(addresses) {
    const mailing = addresses.find((address) => address.type === "Mailing");
    return mailing;
}

export function getVoicePhone(phoneNumbers) {
    const voicePhone = phoneNumbers.find(phone => phone.type === "Voice");
    return voicePhone ? voicePhone.phoneNumber : "No phone number available";
}

function footerTemplate(info) {
    const mailing = getMailingAddress(info.addresses);
    const voice = getVoicePhone(info.contacts.phoneNumbers);

    return`
    <section class="contact">
        <h3>Contact Info</h3>
        <h4>Mailing Address:</h4>
        <div>
            <p>${mailing.line1}</p>
            <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
        </div>
        <h4>Phone</h4>
        <p>${voice}</p>
    </section>
    `;
}

function setParkFooter(parkData) {
    const footer = document.getElementById("park-footer");

    if (footer) {
         footer.innerHTML = footerTemplate(parkData);
    }
   
}
