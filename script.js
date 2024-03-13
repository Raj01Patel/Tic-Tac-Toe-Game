let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn")
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]


const resetGame = () => {
    turn = true;
    count = 0;
    enableBoxes();
    boxes.innerText = "";
    msgContainer.classList.add("hide");
};


const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};


boxes.forEach((box) => {
    box.addEventListener('click', () => {
        // console.log("uhgfyibbjbvdfgy");

        if (turn === true) {
            box.innerText = "O";
            turn = false;

            //style
            box.style.color = "#fee800";
            box.style.color = "transparent";
            box.style.webkitTextStroke = '5px #fee800';
        }
        else {
            box.innerText = "X";
            turn = true;

            //style
            box.style.color = "#ff2372";
            box.style.color = "transparent";
            box.style.webkitTextStroke = '5px #ff2372';
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
});


const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is "${winner}"`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};


resetBtn.addEventListener("click", resetGame);
