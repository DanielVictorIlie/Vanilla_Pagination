const url = "http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8";
const list_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");

let current_page = 1;
let rows = 5;

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let lists = data.news;
    return lists.map(function (list) {
      function DisplayList(items, wrapper, rows_per_page, page) {
        wrapper.innerHTML = "";
        page--;

        let start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = lists.slice(start, end);

        for (let i = 0; i < paginatedItems.length; i++) {
          let item = paginatedItems[i];

          let item_element = document.createElement("div");
          item_element.classList.add("item");
          item_element.innerText = item.title + "\n" + "\n" + item.details;
          wrapper.appendChild(item_element);
        }
      }

      function SetupPagination(items, wrapper, rows_per_page) {
        wrapper.innerHTML = "";

        let page_count = Math.ceil(lists.length / rows_per_page);
        for (let i = 1; i < page_count + 1; i++) {
          let btn = PaginationButton(i, lists);
          wrapper.appendChild(btn);
        }
      }

      function PaginationButton(page, items) {
        let button = document.createElement("button");

        button.innerText = page;
        if (current_page !== page) button.setAttribute("id", "timer");

        if (current_page == page) button.classList.add("active");

        button.addEventListener("click", function () {
          current_page = page;
          DisplayList(items, list_element, rows, current_page);

          let current_btn = document.querySelector(
            ".pagenumbers button.active"
          );
          current_btn.classList.remove("active");

          if (button.classList.add("active"));
        });

        return button;
      }

      DisplayList(list.title, list_element, rows, current_page);
      SetupPagination(list.title, pagination_element, rows);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

window.onload = function () {
  setInterval(function () {
    document.getElementById("timer").click();
  }, 15000);
};
