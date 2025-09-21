import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner-title">${info.name}</a>
    <p class="hero-banner-text">
        <span>${info.designation}</span>
        <span>${info.states}</span>`
}

function titleUpdate(info) {
    document.title = info.fullName
}

titleUpdate(parkData);

const heroInfo = document.querySelector(".hero-banner-content");
heroInfo.innerHTML = parkInfoTemplate(parkData);

const heroImg = document.querySelector(".hero-banner > img");
heroImg.src = parkData.images[0].url;
heroImg.alt = parkData.images[0].altText;