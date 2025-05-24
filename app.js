let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset');
let winner = document.querySelector('.winner');

let turnX = true;
let count = 1;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(turnX){
            box.innerHTML = 'X';
            turnX = false;
            box.style.color='red';
            count++;
        }else{
            box.innerHTML = 'O';
            turnX = true;   
            box.style.color='blue';
            count++;

        }

        box.disabled = true;

        checkWinner();
    });
});

const resetGame = () => {
    turnX = true;
    enableBoxes();
    winner.classList.add('hidden');
    count = 1;
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";

    }
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (player) => {
    winner.innerHTML = `Winner is ${player}`;
    winner.classList.remove('hidden');
    disableBoxes();
}

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerHTML;
        let pos2 = boxes[pattern[1]].innerHTML;
        let pos3 = boxes[pattern[2]].innerHTML;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            count = 1; // Reset count after win
            return;
        }
    }

    if (count > 9) {
        winner.innerHTML = "Match Draw";
        winner.classList.remove('hidden');
        disableBoxes();
        count = 1; // Reset count after draw
    }
}


reset.addEventListener('click', resetGame);