let container = document.querySelector("#container");

// the number of boxes in the grid. N => N/N;
let numOfBoxes = 50;
let boxSize = container.clientWidth / numOfBoxes; 


function drawContainer() {
    container.innerHTML = ''; 
    for (let i = 0; i < (numOfBoxes * numOfBoxes); i++) {
        container.style.width = boxSize * numOfBoxes; 
        const gridBox = document.createElement("div");
        gridBox.classList.add('grid-box');
        gridBox.style.width = boxSize.toString() + 'px';
        gridBox.style.height = boxSize.toString() + 'px';
        
        container.appendChild(gridBox);
    }

}

drawContainer()

const gridBoxes = document.querySelectorAll(".grid-box");

// Event Listners for the container 
let isLeftClick = false;
container.addEventListener("mousedown", (e) =>{
    if (e.button === 0) {
        isLeftClick = true;
    }
})

container.addEventListener("mouseup", () => {
    isLeftClick = false;
})

// Event Listeners for the boxes
gridBoxes.forEach((box) => {
    // color the box if you hover while holding left-click
    box.addEventListener("mouseenter", () => {
        if(isLeftClick) {
            box.style.backgroundColor = "blue";
            box.style.transition = ".5s";
        }
    })
    // color the box on single click
    box.addEventListener("click", () => {
        box.style.backgroundColor = "blue";
        box.style.transition = ".5s";
    })
})


// Slider 
const slider = document.querySelector("#container-slider");
let sliderDisplayVal = document.querySelector("#slider-value");
let sliderVal;

sliderDisplayVal.innerHTML = numOfBoxes;

slider.addEventListener("input", () => {
    sliderDisplayVal.innerHTML = slider.value;
})

