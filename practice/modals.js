const openBtn = document.getElementById('open-modal');
const closeBtn = document.querySelector('.close-button');
const modal = document.getElementById('modal');

function toggleModal() {

  openBtn.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', false);
  })

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute.toggle('aria-hidden');
  })

  // esc key close
  window.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      modal.classList.toggle('open');
      modal.setAttribute.toggle('aria-hidden');
    }
  })

  // click outside close
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.toggle('open');
    }
  })
}

toggleModal();