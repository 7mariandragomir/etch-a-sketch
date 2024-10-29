let body = document.querySelector("body");
let container = document.querySelector("#container");

// FUNCTION TO RESET THE CONTAINER
function resetContainer(cont) {
    let children = cont.childELementCount;
    while(cont.firstChild) {
        cont.removeChild(cont.lastChild);
    }
}

// FUNCTION TO DRAW THE CONTAINER
let numOfBoxes = 24;
let boxSize = container.clientWidth / numOfBoxes; 

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

// LISTENERS FUNCTIONALITIES
function startListeners() {
    const gridBoxes = document.querySelectorAll(".grid-box");

    // EVENT LISTENERS FOR THE CONTAINER 
    let isLeftClick = false;
    container.addEventListener("mousedown", (e) =>{
        if (e.button === 0) {
            isLeftClick = true;
        }
    })
    
    container.addEventListener("mouseup", () => {
        isLeftClick = false;
    })
    
    // EVENT LISTENERS FOR THE BOXES/PIXELS
    gridBoxes.forEach((box) => {
        box.addEventListener("mouseenter", (e) => { // color the box if you hover while holding left-click
            if(isLeftClick) {
                if(isRainbow) {
                    box.style.backgroundColor = 'rgb(' + getRGBNumber() + ',' + getRGBNumber() + ',' + getRGBNumber() + ')';
                } else {
                    box.style.backgroundColor = color;
                }
                box.style.transition = ".5s";
            }
        })
        
        box.addEventListener("click", () => { // color the box on single click
            box.style.backgroundColor = color;
            box.style.transition = ".5s";
        })
    })
}

// SLIDER FUNCTIONALITY 
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

// COLORS
let color = "white"; 
const colorBtns = document.querySelector("#color-btns");

colorBtns.addEventListener("click", (e) => {
    selectedColor = e.target.id;
    switch(selectedColor) {
        case "white": {
            color = "#fff";
            isRainbow = false;
            break};
        case "blue": {
            color = "rgb(0, 119, 255)";
            isRainbow = false;
            break} 
        case "red": {
            color = "hsl(345, 77%, 42%)";
            isRainbow = false;
            break}
        case "eraser": {
            color = "";
            isRainbow = false;  
            break}
        case "random": {
            isRainbow = true;            
            break;
        }
    }
})


function getRGBNumber(n = Math.random() * 10000) { // FUNC to get number from 1 to 255, used for random color
    return Math.floor((n/10000) * (255-1) + 1);
}
let isRainbow = false; // USED in event listener for boxes/pixels