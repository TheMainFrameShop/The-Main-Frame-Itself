const bootSequence = [
  { text: "Initializing The Time Travelers Market Place...\nBooting eBay History Modules...", duration: 3000 },
  { text: "Loading Theories of Life Formation...\nSpawning Primordial Soup...", duration: 4000 },
  { text: "Booting Present Time OS Modules...\nLoading Products...", duration: 4000 },
  { text: "Predicting Future Trends...\nCalculating Market Futures...", duration: 4000 }
];

let i = 0;
const bootText = document.getElementById("bootText");
const productOverlay = document.getElementById("productOverlay");

const products = [
  { name: "Retro Camera", img: "assets/products/camera.jpg", url: "https://www.ebay.com/itm/PRODUCT_ID1", x: 100, y: 200 },
  { name: "Vintage Vinyl", img: "assets/products/vinyl.jpg", url: "https://www.ebay.com/itm/PRODUCT_ID2", x: 300, y: 400 }
  // Add more products as needed
];

function showProducts() {
  productOverlay.innerHTML = ""; // clear previous
  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("module");
    div.style.left = p.x + "px";
    div.style.top = p.y + "px";
    div.innerHTML = `<img src="${p.img}" width="100"><p>${p.name}</p>`;
    div.onclick = () => window.open(p.url, "_blank");
    productOverlay.appendChild(div);
  });
}

function nextBoot() {
  bootText.innerText = bootSequence[i].text;

  // Show products only during Present Time section
  if (i === 2) showProducts();
  else productOverlay.innerHTML = "";

  setTimeout(() => {
    i = (i + 1) % bootSequence.length;
    nextBoot();
  }, bootSequence[i].duration);
}

nextBoot();