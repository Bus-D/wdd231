
function enableNavigation() {
  const menuButton = document.getElementById('global-nav-toggle');
  const menu = document.getElementById('menu');
  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;
    menu.classList.toggle('visually-hidden');
    
    if (target.tagName != "BUTTON") {
      target = target.closest("button");
    }

    if (menu.classList.contains("visually-hidden")) {
      target.setAttribute("aria-expanded", false);
    } else {
      target.setAttribute("aria-expanded", true);
    }
  })
}

enableNavigation();