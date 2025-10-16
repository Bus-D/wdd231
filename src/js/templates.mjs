import spritePath from '../images/sprite.symbol.svg';

export function alertTemplate(alert) {
  let alertType = "";
  // most of the alerts are one word and line up with the icons nicely. "Park Closure" is the exception
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }
  return `
  <li class="alert">
    <svg class="icon" focusable="false" aria-hidden="true">
        <use xlink:href="/images/sprite.symbol.svg#alert-${alertType}"></use>
    </svg>
    <div>
        <h3 class="alert-${alertType}">${alert.title}</h3>
        <p>${alert.description}</p>
    </div>
  </li>`;
}

export function visitorCenterTemplate(visitorCenter) {
    return `
    <div class="visitorDetails">
        <h3>${visitorCenter.name}</h3>
        <p>${visitorCenter.description}
    </div>`;
    
}

export function activityTemplate(activity) {
    return `
    <li class="activity">
        <h3>${activity.name}</h3>
    </li>
    `;
}