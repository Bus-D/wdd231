const list = document.getElementById("list");
const items = Array.from(list.querySelectorAll("li"));
const itemsPerPage = 5;
let currentPage = 1;

function showPage(page) {
  items.forEach(item => item.style.display = "none");

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  items.slice(start, end).forEach(item => item.style.display = "list-item");

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const prev = document.createElement("button");
  prev.textContent = "Previous";
  prev.disabled = currentPage === 1;
  prev.onclick = () => {
    currentPage--;
    showPage(currentPage);
  };
  pagination.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.onclick = () => {
      currentPage = i;
      showPage(currentPage);
    };
    pagination.appendChild(btn);
  }

    const next = document.createElement("button");
    next.textContent = "Next";
    next.disabled = currentPage === totalPages;
    next.onclick = () => {
      currentPage++;
      showPage(currentPage);
    };
    pagination.appendChild(next);
}

showPage(currentPage);