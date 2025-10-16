import { getParkData, getAlerts, getVisitorCenterData, getActivities } from "./parkService.mjs";
import { activityTemplate, alertTemplate, visitorCenterTemplate } from "./templates.mjs";
import { getMailingAddress, getVoicePhone } from "./main.js"
import "../css/style.css";
import "../css/conditions.css";


async function init() {
    try {
        const parkData = await getParkData();
        console.log("parkData loaded: ", parkData)

        const alerts = await getAlerts();
        console.log("alerts loaded: ", alerts);

        const visitorCenter = await getVisitorCenterData("yell");

        const activityData = await getActivities("yell");

        setHeaderInfo(parkData);
        setParkFooter(parkData);
        setAlerts(alerts);
        setVisitorCenter(visitorCenter);
        setActivity(activityData);

    } catch (err) {
        console.error("Error in init(): ", err);
    }
    
}
init();

// Header
function setHeaderInfo(parkData) {
    // Disclaimer
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = parkData.url;
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

// ---------- Body ---------- 
function setAlerts(alerts) {
    const alertsContainer = document.querySelector(".alerts > ul");
    alertsContainer.innerHTML = "";

    const html = alerts.map(alertTemplate);
    alertsContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setVisitorCenter(visitorCenter) {
    const visitorContainer = document.querySelector(".visitor ul");
    visitorContainer.innerHTML = "";

    const html = visitorCenter.map(visitorCenterTemplate);
    visitorContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setActivity(activities) {
    const activitiesContainer = document.querySelector(".activities ul");
    activitiesContainer.innerHTML = "";

    const html = activities.map(activityTemplate);
    activitiesContainer.insertAdjacentHTML("beforeend", html.join(""));
}
    


// ---------- Footer ---------
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