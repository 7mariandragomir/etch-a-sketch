const body = document.querySelector("body");
const grid = document.querySelector("#grid");
const gridSlider = document.querySelector("#grid-slider");
const clrPicker = document.querySelector("#clr-picker");
const clrRainbow = document.querySelector("#clr-rainbow");
const clrEraser = document.querySelector("#eraser");
const displayTool = document.querySelector("#display-tool");
const displayGridSize = document.querySelector("#display-size");

// GRID GENERATION =============================================================

// grid slider handler
let gridSize =gridSlider.value;
gridSlider.addEventListener("input", () =>{
    gridSize = gridSlider.value;
    drawGrid()
    displayGridSize.innerText = gridSize + "x" + gridSize;
})

// FUN to reset the grid
function resetGrid() {
    let child = grid.lastElementChild;
    while(child) {
        grid.removeChild(child);
        child = grid.lastElementChild;
    }
}

// FUN to draw the grid
function drawGrid() {
    resetGrid();
    for(let i = 0; i < gridSize; i++) { //draw a line in grid
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        grid.appendChild(gridRow);

        for (let int = 0; int < gridSize; int++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridRow.appendChild(gridItem);
        }
    }
    handleDrawing();
    displayGridSize.innerText = gridSize + "x" + gridSize;
}
drawGrid();

// DRAWING =====================================================================
let selectedColor = clrPicker.value;
let isRainbow = false;
clrPicker.addEventListener("input", () =>{
    selectedColor = clrPicker.value;
    isRainbow = false;
    displayTool.innerHTML = "color: " + clrPicker.value;
})


function handleDrawing() {
    let gridItems = document.querySelectorAll(".grid-item");
    let isLeftClick = false;

    // handle holding left click
    grid.addEventListener("mousedown", (e) => {
        if(e.button === 0) {
            isLeftClick = true;
        }
    })
    
    body.addEventListener("mouseup", () =>{
        isLeftClick = false;
    })
    // handle coloring
    gridItems.forEach((item) => {
        item.addEventListener("mouseenter", (e) =>{
            if(isLeftClick) {
                if(isRainbow) {
                    item.style.backgroundColor = "hsl(" + Math.floor(Math.random() * (355 -1) + 1) + ",65%,65%)";
                } else {
                    item.style.backgroundColor = selectedColor;
                }
                item.style.transition = ".5s";
            }
        })
        item.addEventListener("click", () =>{
            if(isRainbow) {
                item.style.backgroundColor = "hsl(" + Math.floor(Math.random() * (355 -1) + 1) + ",65%,65%)";
            } else {
                item.style.backgroundColor = selectedColor;
            }
            item.style.transition = ".5s";
        })
    })}

// handle eraser 

clrEraser.addEventListener("click", () =>{
    selectedColor = "";
    isRainbow = false;
    displayTool.innerHTML = "[eraser]";
})

//handle rainbow color   Math.floor(Math.random() * (355 -1) + 1);
clrRainbow.addEventListener("click", () =>{
    isRainbow = true;
    displayTool.innerHTML = "[rainbow]";
})
