let body = document.querySelector("body");
let container = document.querySelector("#container");
let color = "white"; 


// the number of boxes in the grid. N => N/N;
let numOfBoxes = 24;
let boxSize = container.clientWidth / numOfBoxes; 


// function to reset container 
function resetContainer(cont) {
    let children = cont.childELementCount;
    while(cont.firstChild) {
        cont.removeChild(cont.lastChild);
    }
}

// function to draw the container
function drawContainer() {
    resetContainer(container);
    container.style.width = boxSize * numOfBoxes; 
    boxSize = container.clientWidth / numOfBoxes; 
    for (let i = 0; i < (numOfBoxes * numOfBoxes); i++) {
        const gridBox = document.createElement("div");
        gridBox.classList.add('grid-box');
        gridBox.style.width = boxSize.toString() + 'px';
        gridBox.style.height = boxSize.toString() + 'px';
        
        container.appendChild(gridBox);
    }
    startListeners()
}

drawContainer()

// function to start all listners
function startListeners() {
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
                box.style.backgroundColor = color;
                box.style.transition = ".5s";
            }
        })
        // color the box on single click
        box.addEventListener("click", () => {
            box.style.backgroundColor = color;
            box.style.transition = ".5s";
        })
    })
}

// Slider 
const slider = document.querySelector("#container-slider");
const sliderBtn = document.querySelector("#set-container-size");
let sliderDisplayVal = document.querySelector("#slider-value");
let sliderVal = numOfBoxes;

sliderDisplayVal.innerHTML = numOfBoxes;
slider.value = numOfBoxes;

slider.addEventListener("input", () => {
    sliderDisplayVal.innerHTML = slider.value;
    sliderVal = slider.value;
})

sliderBtn.addEventListener("click", () => {
    numOfBoxes = Number(sliderVal);
    drawContainer();
})

// Colors
const colorBtns = document.querySelector("#color-btns");

function getRandomColor() {
    let n = (Math.random() * 0xfffff * 100000).toString(16);
    return '#' + n.slice(0, 6);
}

colorBtns.addEventListener("click", (e) => {
    selectedColor = e.target.id;
    switch(selectedColor) {
        case "white": {
            color = "#fff";
            break};
        case "blue": {
            color = "rgb(0, 119, 255)";
            break} 
        case "red": {
            color = "hsl(345, 77%, 42%)";
            break}
        case "eraser": {
            color = "";
            break}
        case "random": {
            
            color = getRandomColor();
            break;
        }
    }
})
