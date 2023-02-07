'use strict';

// As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
// Times the image has been shown


// GLOBAL VARIABLES
// window to the DOM

// querySelector is what we use to target our document elements.  

let resultsContainer = document.getElementsByClassName('div2');
let imgContainer = document.getElementById('div3');  
let resultsButton = document.getElementById('resultsButton');


let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');


let matchupTotal = 0;
const matchupAllowed = 25;

let allProducts = [];



// GLOBAL FUNCTIONS 

// Function for selecting the index of a random product.

function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);  // maximum is inclusive when expressed this way.
}

// I need a way to check if an array of numbers contains a duplicate.  This was mostly copied from: 
// https://dev.to/will_devs/javascript-how-to-check-if-an-array-has-duplicate-values-cha
// with additional help from Michael Treat to get it to work with my code.
// checkForDuplicates will return a true if the array contains a duplicate value, false if it does not.  

function checkForDuplicates(array) {
  let alreadySeen = [];
  
  for (let i = 0; i < array.length; i++) {
    let value = array[i]
    if (alreadySeen.indexOf(value) !== -1) {
      return true
    }
    alreadySeen.push(value)
  }
  return false
}


// Constructor for our odd ball products

// name, image src, views, likes/clicks

function OddDuckProduct(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `/img/${name}.${fileExtension}`;
  this.views = 0;
  this.likes = 0;

}

// instances of aaaaaaall our weird Archie McPhee looking products.

let bag = new OddDuckProduct('bag');
let banana = new OddDuckProduct('banana');
let bathroom = new OddDuckProduct('bathroom');
let boots = new OddDuckProduct('boots');
let breakfast = new OddDuckProduct('breakfast');
let bubblegum = new OddDuckProduct('bubblegum');
let chair = new OddDuckProduct('chair');
let cthulhu = new OddDuckProduct('cthulhu');
let dogduck = new OddDuckProduct('dog-duck');
let dragon = new OddDuckProduct('dragon');
let pen = new OddDuckProduct('pen');
let petsweep = new OddDuckProduct('pet-sweep');
let scissors = new OddDuckProduct('scissors');
let shark = new OddDuckProduct('shark');
let sweep = new OddDuckProduct('sweep', 'png');
let tauntaun = new OddDuckProduct('tauntaun');
let unicorn = new OddDuckProduct('unicorn');
let watercan = new OddDuckProduct('water-can');
let wineglass = new OddDuckProduct('wine-glass');

// allProducts array: our warehouse for goofball objects.

allProducts = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass];


// within the render function, we need to 
// 1- select three random items
// 2 - check if any of them are duplicates of each other
// 3 - if so, get more items and try again


function renderProducts() {
  let item1 = selectRandomProduct();
    let item2 = selectRandomProduct();
    let item3 = selectRandomProduct();
    
  // duplicate = true is a flag we set to start.  Later we use the checkForDuplicates function to check if the array contains any duplicates.  The while loop runs as long as duplicates strictly equals true.  Once it doesn't, we're out of the loop.
  let duplicate = true;
  let comparisonArray = [];

  
  while ( duplicate === true ) {
    let item1 = selectRandomProduct();
    let item2 = selectRandomProduct();
    let item3 = selectRandomProduct();
    
    comparisonArray = [item1, item2, item3];
      duplicate = checkForDuplicates(comparisonArray);
    
  }



  
// once outside of the loop we render all the images to their respective img tags on the page, we increment up the views for each of those items, and increment up the matchupTotal variable.


img1.src = allProducts[item1].src;
img2.src = allProducts[item2].src;
img3.src = allProducts[item3].src;
img1.alt = allProducts[item1].src;
img2.alt = allProducts[item2].src;
img3.alt = allProducts[item3].src;
allProducts[item1].views++;
allProducts[item2].views++;
allProducts[item3].views++;

// here's the matchupTotal counter.

matchupTotal++

}


// the renderResults function looks through the array of allProducts, which is where every product object is stored, and creates a <li> for each of them.  The <li> is filled with a text string reporting how many times the product was selected, and appends the result to the UL.

function renderResults() {
  let results = document.getElementById('resultsList');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} was selected ${allProducts[i].likes} times out of ${allProducts[i].views} matchups.`;
    results.appendChild(li);
  }
}


// - event listener is looking for the click event.

function handleProductClick(event) {
  // From the Goat Tinder demo, we first want to see what image got clicked using the console.log function.  
  console.log(event.target.alt); 

  //  bind the click to the product, then use a for loop to find the product in the allProducts array.
  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === clickedProduct) {
      allProducts[i].likes++;   // if a product is clicked, the allProducts array is searched for an exact match to the alt text of the product image, and for that product object the score is incremented up one.
    }
  }
// we need to do another iteration of the game and change our product images.
if (matchupTotal < matchupAllowed) {
  renderProducts();
} else { // if the game has hit the matchupAllowed limit, we remove the event listener for clicking the products, and enable ONLY the click listener for the results button.
imgContainer.removeEventListener('click', handleProductClick);
resultsButton.addEventListener('click', renderResults);


}

}


// first iteration of the game is called here.

renderProducts();

// event listener is added and ready for clicks.

imgContainer.addEventListener('click', handleProductClick);
