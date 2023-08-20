const items = [
  {
    title: "BMW 3 серии",
    description: "318d, 2019",
    tags: ["new"],
    price: 38000,
    img: "./img/1.jpg",
  },
  {
    title: "BMW 3 серии",
    description: "320d AT, 2018",
    tags: ["popular"],
    price: 26000,
    img: "./img/2.jpg",
  },
  {
    title: "BMW X7",
    description: "6 мест, 2019",
    tags: ["family car"],
    price: 115000,
    img: "./img/3.jpg",
  },
  {
    title: "BMW X2",
    description: "M Sport 2019",
    tags: ["M Sport"],
    price: 33750,
    img: "./img/4.jpg",
  },
  {
    title: "BMW I3",
    description: "2018",
    tags: ["fast charge"],
    price: 17400,
    img: "./img/5.jpg",
  },
  {
    title: "BMW 3 серия",
    description: "E36, 1997",
    tags: ["the cheapest"],
    price: 4600,
    img: "./img/6.jpg",
  },
  {
    title: "BMW 5 серия",
    description: "G30, 2020",
    tags: ["station wagon"],
    price: 35250,
    img: "./img/7.jpg",
  },
  {
    title: "BMW 4 серия",
    description: "ТG22, G23, 2021",
    tags: ["coupe"],
    price: 54950,
    img: "./img/8.jpg",
  },
  {
    title: "BMW X4",
    description: "F26, 2018",
    tags: ["stylish"],
    price: 37200,
    img: "./img/9.jpg",
  },
  {
    title: "BMW M4",
    description: "2018",
    tags: ["M competition"],
    price: 79000,
    img: "./img/10.jpg",
  },
  {
    title: "BMW 7 серия",
    description: "2008",
    tags: ["on sale"],
    price: 15800,
    img: "./img/11.jpg",
  },
  {
    title: "BMW X3",
    description: "G01, 2020",
    tags: ["family car"],
    price: 47200,
    img: "./img/12.jpg",
  },
];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
 
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}$`;

  const tagsHolder = item.querySelector(".tags");

  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });
  return item;
}

const nothingFound = document.querySelector("#nothing-found");

function showItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

let currentItems = [...items];

showItems(currentItems.sort((a, b) => sortByAlphabet(a, b)));

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchLine = searchInput.value.trim().toLowerCase();

  currentItems = items.filter((el) =>
    el.title.toLowerCase().includes(searchLine)
  );
  currentItems.sort((a, b) => sortByAlphabet(a, b));
  showItems(currentItems);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "cheap": {
      currentItems.sort((a, b) => a.price - b.price);
      break;
    }
    case "expensive": {
      currentItems.sort((a, b) => b.price - a.price);
      break;
    }
  }
  showItems(currentItems);
});
