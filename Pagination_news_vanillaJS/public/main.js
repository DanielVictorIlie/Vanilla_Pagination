let todos = [];
let todosPages = [];
let selectedPage;
let selectedIndex;
let startIndex;
let endIndex;
let pagingList;
fetch("http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    todos = json;
    //paging
    let pagesNumber = todos.news.length / 5;
    const pagesNumberRemainder = pagesNumber % 1;
    const pagesNumberWithoutRemainder = Math.floor(pagesNumber);
    if (pagesNumberRemainder > 0)
      pagesNumber = Number(pagesNumberWithoutRemainder) + 1;
    todosPages = Array(pagesNumber)
      .fill(1)
      .map((x, i) => i + 1);
    startIndex = 0;
    endIndex = 5;
    selectedPage = 1;
    //fill the paging list
    injectPagination();
    //start mapping the list
    injectPage();
  });

injectPagination = () => {
  pagingList = `
          <li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goPrevious()">Previous</a></li>
          <li class="page-item"><span class="page-link" id="spanSelectedPage">${selectedPage} | ${todosPages.length}</span></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goNext()">Next</a></li>
          `;
  document.getElementById("paging").innerHTML = pagingList;
};

injectPage = () => {
  const list = todos
    ? todos.news
        .slice(startIndex, endIndex)
        .map(
          (todo, index) =>
            `
                      <p>${todo.title}</p>
                      <p>${todo.details}</p>
                      <hr />
                        `
        )
        .join("") //to prevent unexpected comma
    : "";
  document.getElementById("list").innerHTML = list;
};

goPrevious = () => {
  if (selectedPage != 1) {
    startIndex -= 5;
    endIndex -= 5;
    selectedPage--;
    injectPage();
    injectPagination();
  }
};

goNext = () => {
  if (selectedPage < todosPages.length) {
    startIndex += 5;
    endIndex += 5;
    selectedPage++;
    injectPage();
    injectPagination();
  }
};

window.onload = function () {
  setInterval(function () {
    document.getElementById("clickButtonNext").click();
  }, 5000);
  setInterval(function () {
    document.getElementById("clickButtonPrevious").click();
  }, 20000); // this will make it click again every 1000 miliseconds
};
