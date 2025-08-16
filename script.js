// --- Boot sequence with multi-platform products ---
const bootSequence = [
  {
    text: "Initializing Time Travelers Market Place OS...\nBooting History Modules...",
    duration: 4000,
    theme: "history",
    disclaimer: "Placeholder: past era items. Real products may vary.",
    products: [
      { name: "Vintage Typewriter", img: "assets/products/placeholder1.jpg", url: "https://www.ebay.com/itm/EXAMPLE1" },
      { name: "Retro Phone", img: "assets/products/placeholder2.jpg", url: "https://www.teemill.com/stores/EXAMPLE" }
    ]
  },
  {
    text: "Loading Theories of Life Formation...\nSpawning Primordial Soup...",
    duration: 5000,
    theme: "life",
    disclaimer: "Placeholder: primordial artifacts. Real products may vary.",
    products: [
      { name: "Fossil Replica", img: "assets/products/placeholder3.jpg", url: "https://www.ebay.com/itm/EXAMPLE3" },
      { name: "DNA Model", img: "assets/products/placeholder4.jpg", url: "https://www.teemill.com/stores/EXAMPLE" }
    ]
  },
  {
    text: "Booting Present Time Modules...\nLoading Products...",
    duration: 5000,
    theme: "present",
    disclaimer: "Placeholder: modern items. Real products may vary.",
    products: [
      { name: "Retro Camera", img: "assets/products/placeholder5.jpg", url: "https://www.ebay.com/itm/EXAMPLE5" },
      { name: "Custom T-Shirt", img: "assets/products/placeholder6.jpg", url: "https://www.teemill.com/stores/EXAMPLE" }
    ]
  },
  {
    text: "Predicting Future Trends...\nCalculating Market Futures...",
    duration: 5000,
    theme: "future",
    disclaimer: "Placeholder: futuristic concepts. Real products may vary.",
    products: [
      { name: "Hoverboard Concept", img: "assets/products/placeholder7.jpg", url: "https://www.ebay.com/itm/EXAMPLE7" },
      { name: "AI Personal Assistant", img: "assets/products/placeholder8.jpg", url: "https://www.teemill.com/stores/EXAMPLE" }
    ]
  }
];

// --- Variables ---
let i = 0;
let bootPaused = false;
const bootText = document.getElementById("bootText");
const productOverlay = document.getElementById("productOverlay");
const pauseBtn = document.getElementById("pauseBtn");
const eraSearch = document.getElementById("eraSearch");

// --- Theme switch ---
function applyTheme(theme) {
  switch(theme) {
    case "history":
      document.body.style.backgroundColor = "#000";
      bootText.style.color = "lime";
      break;
    case "life":
      document.body.style.backgroundColor = "#001a1a";
      bootText.style.color = "#33ffcc";
      break;
    case "present":
      document.body.style.backgroundColor = "#