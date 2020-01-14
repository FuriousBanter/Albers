let colorLeft = [];
let colorRight = [];
let numCol = 4;
let numRow = 4;



function setup(){
    createCanvas(500,500);
    background(255);
    // noStroke();
    shakeColors();
}

function draw(){
    
    
    // let yer= (mouseY/(height/100));
    for (let i = 0; i < numRow; i++) {
        let perc = 1/numCol;
        for(let j = 0; j < numCol; j++) {
            let lerpC = lerpColor(colorLeft[i], colorRight[i], perc);
            fill(lerpC);
            rect(j*width/numCol, i*height/numRow, width/numCol, height/numRow);
            perc = perc + 1/numCol;
            
        }
    }
}

function shakeColors(){
    let k = mouseX/(width/2);
    for(let k=0; k<=4; k++){
    colorLeft[k]=color(random(k, random(255), random(255)));
    colorRight[k]=color(random(k), random(255), random(255));
    }
}






