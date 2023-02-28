const gameCanvas = $("#game-area")[0];
const ctx = gameCanvas.getContext("2d");
let animationFps = 60;
let frameDelay = 1000 / animationFps; // frame delay in millis
let lastFrameTime = 0;
let animationId = null;

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "30px Arial";

const scoreBoard = {
    posX: 40,
    posY: 80,
    squareSize: 70,
    spaceBetweenSquares: 4,
    selectedX: 3,
    selectedY: 2,
    data: [
    [ 1,  2,  3,  4],
    [ 5,  6,  7,  8],
    [ 9, 'X', 11, 12]]
};

function drawBoard() {
    for(let y=0; y<scoreBoard.data.length; y++) {
        for(let x=0; x<scoreBoard.data[0].length; x++) {
            //calculate each square's position
            let curPosX = x * (scoreBoard.squareSize + scoreBoard.spaceBetweenSquares) + scoreBoard.posX;
            let curPosY = y * (scoreBoard.squareSize + scoreBoard.spaceBetweenSquares) + scoreBoard.posY;

            // draw squares
            if(x == scoreBoard.selectedX && y == scoreBoard.selectedY){
                // chosen square. Draw several faded squares as if its LED's were on.
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = "#FF0000";
                for(let i=0; i<10; i++) {
                    // not a chosen square. normal draw process.
                    ctx.fillRect(curPosX, curPosY, scoreBoard.squareSize, scoreBoard.squareSize );
                }
            }else {
                ctx.fillStyle = "#220000";
                ctx.fillRect(curPosX, curPosY, scoreBoard.squareSize, scoreBoard.squareSize );
            }

            ctx.globalAlpha = 1;
            // write contents of the squares
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(scoreBoard.data[y][x], curPosX + scoreBoard.squareSize/  2, curPosY + scoreBoard.squareSize / 2);
        }
    }
}

function changeSelected() {
    scoreBoard.selectedX ++;
    if (scoreBoard.selectedX >= scoreBoard.data[0].length) {
        scoreBoard.selectedX = 0;
        scoreBoard.selectedY ++;
        if (scoreBoard.selectedY >= scoreBoard.data.length) {
            scoreBoard.selectedY = 0;
        }
    }
}

function loop(currentTime){
    // calculate the time passed since the last frame   
    let timePassed = currentTime - lastFrameTime;

    if(timePassed > frameDelay) {
        // update last frame time
        lastFrameTime = currentTime;
        frameDelay *= 1.05;
        changeSelected();
        drawBoard();
    }
    
    animationId = requestAnimationFrame(loop);
}

animationId = requestAnimationFrame(loop);

// stop the animation after 10 seconds
setTimeout(() => {
    cancelAnimationFrame(animationId);
}, 5000 + Math.random() * 5000);

