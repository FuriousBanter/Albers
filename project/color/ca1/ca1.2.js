let colorLeft = [];
let colorRight = [];
let colorPick = [];

//##################################
//start//draw vars//
//##################################
let drawShapeX1;
let drawShapeY1;
let drawShapeX2;
let drawShapeY2;
let drawShapeW;
let drawShapeH;
let shapes = [];
let shapesRedo = [];
let shapeColor;

let drawLock = 0;

let shapeOrigin;
let lastShapePoint;

let lastShape = [];
//##################################
//end//draw vars//
//##################################

let boxes = []; //array of box arrays
let box = []; //array of boxes in a row 
let numCol = 8;
let miniCanvas;
let numRow = 1;
let blendModes = ["source-over", "lighter", "darken", "lighten", "difference", "exclusion", "multiply", "overlay"] //let user flick between different modes for the color blending of shapes.
//add = lighter, darkest = darken, lightest = lighten, difference = difference, exclusion = exclusion, multiply ==, overlay ==.
let optionsMenu = {
    color: [255, 0, 0, 255],
    color2: [255, 0, 0, 255],
    movex: 156,
    movey: 180,
    moveflagx: 38,
    moveflagy: 65,
    blendmode: 'source-over'
};

let gui;
let folder;
let backgroundCol = [250, 250, 250];

//##################################
//start//CLASS FOR GRADIENT BOX//
//##################################
class ColorBox {
    constructor(name, height, width, x, y, color) {
        this.name = name;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.color = color;

    }
}
//##################################
//end//CLASS FOR GRADIENT BOX//
//##################################

//##################################
//start//CLASS FOR SHAPE//
//##################################
class Shape {
    constructor(name, x, y, w, h, color) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color

    }
}
//##################################
//end//CLASS FOR SHAPE//
//##################################



function setup() {
    colorMode(RGB, 100);
    createCanvas(1240, 1954);
    miniCanvas = createGraphics(1240, 1754); // Grab an image of a 100x200 rectangle at (20,30).
    noStroke();
    miniCanvas.noStroke();


    //##################################
    //start//datgui//
    //##################################
    gui = new dat.GUI();
    let folder1 = gui.addFolder('Color Changer')
    folder1.addColor(optionsMenu, "color");
    folder1.addColor(optionsMenu, "color2");
    let folder2 = gui.addFolder('Rect move')
    folder2.add(optionsMenu, "movex", 0, 400, 1);
    folder2.add(optionsMenu, "movey", 0, 460, 1);
    folder2.add(optionsMenu, "moveflagx", 0, 300, 1);
    folder2.add(optionsMenu, "moveflagy", 0, 380, 1); //class, "name", min, max, step
    let folder3 = gui.addFolder('Blend Mode :)');
    folder3.add(optionsMenu, "blendmode", blendModes);
    //##################################
    //end//datgui//
    //##################################


}

function draw() {
    background(255, 255, 255);
    // console.log(mouseX, mouseY);

    if (mouseX < 1240 && (mouseY < 1754) && (mouseY > 200)) {
        cursor(CROSS);
    } else {
        cursor(ARROW)
    }
    miniCanvas.background(backgroundCol);

    // miniCanvas.fill(color(1, 1, 1, 5));

    // miniCanvas.rect(0, 0, 1240, 1754);


    //##################################
    //start//COLOR GRADIENT BAR//
    //##################################
    for (let i = 0; i < 2; i++) { //leftright rows
        for (let j = 0; j < 8; j++) { //updown cols
            let squareColor = lerpColor(color(optionsMenu.color), color(optionsMenu.color2), map(j, 0, 7, 0, 1));
            // let squareColor = color(i+3.98, i+3.98, i+3.98, map(j, 0, 7, 0, 1));
            let square = new ColorBox("colorbox " + j + "," + i, 50, 50, j * 50, i * 50, squareColor);
            box[j] = square;

            fill(squareColor);
            // console.log(boxes);
            rect(j * 50, i * 50, 50, 50);

        }
        boxes[i] = box;
        boxes[i][i].color = color(255);
    }
    //##################################
    //end//COLOR GRADIENT BAR//
    //##################################

    //##################################
    //start//DRAW SHAPES//
    //##################################


    for (let s = 0; s < shapes.length; s++) { //draw shape arrays

        // fill(lerpColor(color(optionsMenu.color), color(optionsMenu.color2), map(s, 0, 1, 0, 1)));
        miniCanvas.fill(color(shapes[s].color));
        // console.log("the shapez: " + shapes);
        miniCanvas.rect(shapes[s].x, shapes[s].y, shapes[s].w, shapes[s].h);
        // console.log(s);  

    }


    //test rect 1
    miniCanvas.fill(color(optionsMenu.color));
    miniCanvas.rect(optionsMenu.moveflagx, (optionsMenu.moveflagy), 60, 200);
    miniCanvas.rect(optionsMenu.moveflagx + 80, (optionsMenu.moveflagy + 20), 60, 200);
    miniCanvas.rect(optionsMenu.moveflagx + 160, (optionsMenu.moveflagy), 60, 200);
    miniCanvas.rect(optionsMenu.moveflagx + 240, (optionsMenu.moveflagy + 20), 60, 200);



    //##################################
    //start//blendmodes//
    //##################################
    //test rect 2
    miniCanvas.blendMode(optionsMenu.blendmode);
    miniCanvas.fill(color(optionsMenu.color2));

    miniCanvas.rect(optionsMenu.movex, (optionsMenu.movey), 200, 20);
    miniCanvas.blendMode(BLEND);

    //##################################
    //end//blendmodes//
    //##################################

    //##################################
    //end//DRAW SHAPES//
    //##################################
    keepOpen();


    image(miniCanvas, 0, 200)
}

function keepOpen() {
    if (!!document.querySelector('.closed')) {
        document.querySelector('.closed').classList.remove('closed'); //keep menu open on load
    }
}

mousePressed = () => {
    shapesRedo = [];
    drawShapeX1 = mouseX;
    drawShapeY1 = mouseY - 200;
    shapeOrigin = [mouseX, mouseY];
    console.log("click: " + drawShapeX1, drawShapeY1);

    // let start1 = drawShapeX1; temporary guide
    // let start2 = drawShapeY1;

    // miniCanvas.fill(color(0,0,0));
    // miniCanvas.rect(start1, start2, 2,2);
}

mouseReleased = () => {
    // drawShapeX2 = miniCanvas.mouseX / (miniCanvas.width / 2);
    // drawShapeY2 = (miniCanvas.mouseY - 200) / (miniCanvas.height / 2);
    drawShapeX2 = mouseX;
    drawShapeY2 = (mouseY - 200);

    drawShapeW = drawShapeX2 - drawShapeX1;
    drawShapeH = drawShapeY2 - drawShapeY1;

    shapeColor = color(optionsMenu.color);

    if (drawLock == 0) {

        let shape = new Shape("rect " + "x1: " + drawShapeX1 + " x2: " + drawShapeX2 + ", y1: " + drawShapeY1 + " y2: ", drawShapeX1, drawShapeY1, drawShapeW, drawShapeH, shapeColor);
        console.log("boi " + drawShapeY1);
        shapes.push(shape);
        // console.log("the shape array: " + shapes);

        // miniCanvas.fill(color(optionsMenu.color));
        // miniCanvas.rect(drawShapeX1, drawShapeY1, drawShapeW, drawShapeH);
    }
    // drawShapeX1 = 0;
    // drawShapeY1 = 0;
    // shapeOrigin = [];
    // drawShapeX2 = 0;
    // drawShapeY2 = 0;

    // drawShapeW = 0;
    // drawShapeH = 0;
    // console.log("x1:" + drawShapeX1 + " y1:" + drawShapeY1);
    console.log("x2:" + drawShapeX2 + " y2:" + drawShapeY2);
    console.log("width: " + drawShapeW, "height: " + drawShapeH);

    console.log("rect: " + drawShapeX1, drawShapeY2, drawShapeW, drawShapeH)

    miniCanvas.blendMode(BLEND);

}




function mousePressed() {

}

function keyPressed() {
    if (key === 's' || key === 'S') {
        backgroundCol = [255, 255, 255];
        save(miniCanvas, "saved_name.png");
        backgroundCol = [250, 250, 250];
    }

    if (key === 'q' || key === 'Q') {
        drawLock = 1;
        console.log("Locked! " + drawLock);
    }

    if (key === 'e' || key === 'E') {
        drawLock = 0;
        console.log("UnLocked! " + drawLock);
    }

    if ((key === 'u' || key === 'U') && shapes.length !== 0) {
        shapesRedo.push(
            shapes.pop()
        );
        miniCanvas.background(255);
    }

    if ((key === 'r' || key === 'R') && (shapesRedo.length !== 0)) {
        shapes.push(
            shapesRedo.pop()
        );
        miniCanvas.background(255);
    }
}




function colorPickFunction() {
    colorPick = 0;
}