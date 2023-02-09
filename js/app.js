'use strict';

// As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
// Times the image has been shown


// GLOBAL VARIABLES
// window to the DOM

// querySelector is what we use to target our document elements.  You need more practice on proper targeting.

let resultsContainer = document.getElementsByClassName('div2');
let imgContainer = document.getElementById('div3');  
let resultsButton = document.getElementById('resultsButton');


let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');




let matchupTotal = 0;
const matchupAllowed = 25;

let allProducts = [];

let indexArray = [];
// the indexArray is going to be used to keep track of our CURRENT selections in the product picking game.  the array will then be checked against before generating another set of images.  If the newly generated image set contains anything in the indexArray, we're going to generate the images again.



// GLOBAL FUNCTIONS

// Function for selecting the index of a random product.

function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);  // maximum is inclusive when expressed this way.
}

// saveState and loadState functions for manipulating local storage.  To put into local storage, we have to convert it to a string, store the string in a container, and pack that container into local storage.  It all feels very PSone memory cartridge/emulator save state, so run with that model.
function saveState() {
let processedSaveState = JSON.stringify(allProducts);
localStorage.setItem('allProducts', processedSaveState); 

}
// put loadState here as a static function if it turns out you need it outside of page startup later on..


// Constructor for our odd ball products
// name, image src, views, likes/clicks

function OddDuckProduct(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.likes = 0;

}

// instances of aaaaaaall our weird Archie McPhee looking products.

// If I wrap this in a function, I can make all of this happen only IF there is nothing to load from local storage.  I want that, and I want to not save anything to local storage unless the game has been completely run, so I should tie saving to local storage to successfully completing the selecting game.

// so I wrap the construction of our objects and the array into if/else statements

if (!localStorage.getItem('allProducts')) {   // if localStorage.getItem does NOT find allProducts, then we create all these products and load them into the allProducts array.  However, if it DOES find allProducts....

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

} else {    // .....then it's going to do the following code.

  let loadState = localStorage.getItem('allProducts');  // fetch the game's save state from localStorage, and then...
  allProducts = JSON.parse(loadState);  // ...please do not turn off your system while the loading icon appears, and finally..
  console.log(allProducts);  // check to make sure it came back properly parsed.

}


// within the render function, we need to 
// 1- select three random items
// 2 - check if any of them are duplicates of each other
// 3 - if so, get more items and try try again


function renderProducts() {
  
while (indexArray.length < 6) {
  let randomProducts = selectRandomProduct();  // we're using six here because we're containing enough to account for both the first set of images AND the second set of random images to compare.
  
  // here we're using the ! operator before our function call to say that we want to return TRUE if the function returns FALSE.  Think of it as a little discworld daemon guy yelling HEY HEY! I WANT NOT THIS, OK?  
  if (!indexArray.includes(randomProducts)) {
    indexArray.push(randomProducts);
  }
}
let item1 = indexArray.shift();
let item2 = indexArray.shift();
let item3 = indexArray.shift();

  



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
  }  // if we put the saveState and renderChart functions to renderResults, we can automagically save the results of our game at the moment we render the chart.  So it's kind of like an auto-save at a checkpoint.  
  saveState();
  renderChart();

}




// - event listener is looking for the click event.

function handleProductClick(event) {
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
// we're not adding an event listener here anymore, because we're going to automatically render the chart with our results after the game is complete.

renderChart();

}

}


function renderChart() {

  // the chart will need the variables that we care about, and each will be stored in an array.

  let productNames = [];
  let productViews = [];
  let productLikes = [];

  // the for loop runs through the array of products after we've played the product picking game, and pushes the recorded values of name, views, and likes to three respective container arrays.  We're going to use these container arrays to render the chart data.

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productLikes.push(allProducts[i].likes);

  }



  // here's where we do the chart.js work.  We start with a window into the dom

  const ctx = document.getElementById('myChart');

  let config = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [
      {
        label: '# of Votes',
        data: productLikes,
        borderWidth: 2,
        borderColor: 'rgba(179, 57, 14, 0.96)',
        hoverBackgroundColor: 'rgba(21, 47, 217, 0.96)',
        backgroundColor: [ 
        'rgba(253, 187, 39, 0.5)',
        'rgba(10, 249, 187, 0.9)',
        'rgba(58, 241, 127, 0.6)',
        'rgba(245, 70, 0, 0.2)',
        'rgba(148, 105, 166, 0.5)',
        'rgba(144, 76, 28, 0.2)'
      ]
      },
      {
        label: '# of Views',
        data: productViews,
        borderWidth: 1
      }
    ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  
new Chart(ctx, config);

}


// first iteration of the game is called here.

renderProducts();

// event listener is added and ready for clicks.  

imgContainer.addEventListener('click', handleProductClick);



console.log()










// Deprecated code, for me to help understand where I came from on this project.

// Beginning of previous renderProducts logic

  // let item1 = selectRandomProduct();
  //   let item2 = selectRandomProduct();
  //   let item3 = selectRandomProduct();
    
  // // duplicate = true is a flag we set to start.  Later we use the checkForDuplicates function to check if the array contains any duplicates.  The while loop runs as long as duplicates strictly equals true.  Once it doesn't, we're out of the loop.
  // let duplicate = true;
  // let comparisonArray = [];

  
  // while ( duplicate === true ) {
  //   let item1 = selectRandomProduct();
  //   let item2 = selectRandomProduct();
  //   let item3 = selectRandomProduct();
    
  //   comparisonArray = [item1, item2, item3];
  //     duplicate = checkForDuplicates(comparisonArray);
    
  // }

// end of renderProducts logic

// duplicate checking code

// I need a way to check if an array of numbers contains a duplicate.  This was mostly copied from: 
// https://dev.to/will_devs/javascript-how-to-check-if-an-array-has-duplicate-values-cha
// with additional help from Michael Treat to get it to work with my code.
// checkForDuplicates will return a true if the array contains a duplicate value, false if it does not.  

// function checkForDuplicates(array) {
//   let alreadySeen = [];
  
//   for (let i = 0; i < array.length; i++) {
//     let value = array[i]
//     if (alreadySeen.indexOf(value) !== -1) {
//       return true
//     }
//     alreadySeen.push(value)
//   }
//   return false
// }
// the checkForDuplicates function is no longer used after some code cleanup, but I like the method so for now I'm keeping it as a visual reminder of a different way to get to the same result.
