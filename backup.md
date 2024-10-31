<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Etch-A-Sketch</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="options">
        <div class="slider">
            <span id="slider-value"></span>
            <input type="range" id="container-slider" min="4" max="100">
            <button id="set-container-size">Set Size</button>
        </div>
        <div id="color-btns">
            <button class="color-btn" id="white"></button>
            <button class="color-btn" id="blue"></button>
            <button class="color-btn" id="red"></button>
            <button class="color-btn .gradient" id="random"></button>
            <button class="color-btn" id="eraser">X</button>
        </div>
    </div>
    <div id="container"></div>
</body>
</html>



* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: sans-serif;
    background-color: hsl(0, 0%, 9%);
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
}

#container { 
    display: flex; 
    flex-wrap: wrap; 
    justify-content: start;
    align-items: center;
    width: 70vw;
    max-width: 960px;
    border: 1px solid gray;
}

.grid-box {
    /* border: .1px solid gray; */
    width: 50px;
    height: 50px;
}

.options {
    padding: 30px 10px;
    display: flex;
    flex-direction: row;
    width: 70vw;
    max-width: 960px;
    justify-content: space-between;
}

.slider {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    gap: 10px;
}

.slider button {
    padding: 2px 5px;
    outline: none;
    border: none;
    outline: none;
}

.slider button:hover {
    font-weight: 800;
    background-color: aquamarine;
}

#color-btns {
    display: flex;
    justify-items: center;
    align-items: center;
    padding-bottom: 10px;
    gap: 10px;
}

#color-btns .color-btn {
    padding: 0;
    border: 2px solid rgb(255, 255, 255);
    border-radius: 20px;
    margin: 0;
    outline: 0;
    width: 30px;
    height: 30px;
}

#color-btns:hover {
    cursor: pointer;
}

#color-btns #random {
    animation: colorGradient 2s infinite;
}

#color-btns #white {
    background-color: #fff;
}

#color-btns #blue {
    background-color: rgb(0, 119, 255);
}

#color-btns > #red {
    background-color: hsl(345, 77%, 42%);
}

#color-btns #eraser {
    background-color: transparent;
    color: red;
}


.gradient { 
    animation: colorGradient 60s infinite;
    transition: ease-in-out;
}

@keyframes colorGradient {
    0% {
        background-color: rgb(255, 80, 80);
    }

    15% {
        background-color:rgb(245, 242, 51);
    }

    35% {
        background-color:rgb(88, 243, 73)
    }

    55% {
        background-color:rgb(20, 239, 255);
    }

    75% {
        background-color:rgb(153, 54, 233);
    }

    100% {
        background-color: rgb(255, 80, 80);
    }
}



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