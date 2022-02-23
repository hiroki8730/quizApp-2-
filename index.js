const $quizNum = document.getElementById("quiz-number");
let i = 1;
let $startBtn = document.getElementById("btn");
let ansBtn = [];
const $genre = document.getElementById("quiz-genre");
const $difficult = document.getElementById("difficult");
const $quiz = document.getElementById("quiz");
let $answers = document.getElementById("answers");
let choices = [];
let check = [];
let buttonClickCount = 0;
let title = document.getElementById("title");
let contents = [];
let trueAnswers = 0;
let randomNumber = 0;
const questionItems = [];
const btns = document.getElementsByClassName("btn");
const select = document.getElementById("select");
let removedQuestion = [];
let correctAnswer = [];

$quiz.textContent = "以下のボタンをクリック";

// --- 開始ボタンを押した時の動作 --- //
$startBtn.addEventListener("click", function () {
    buttonClickCount++;
    callApi();
});

// ---API取得--- //
const callApi = () => {
    title.textContent = "取得中";
    $quiz.textContent = "少々お待ちください";
    fetch("https://opentdb.com/api.php?amount=10")
        .then(response => {
            return response.json();
        })
        .then(data => {
            $startBtn.style.display = "none";
            contents = data.results;
            console.log(contents);
            contents.forEach(function (content) {
                const tempAnswers = [];
                correctAnswer.push({ isCorrect: true, text: content.correct_answer });
                tempAnswers.push({ isCorrect: true, text: content.correct_answer });
                tempAnswers.push({ isCorrect: false, text: content.incorrect_answers[0] });
                tempAnswers.push({ isCorrect: false, text: content.incorrect_answers[1] });
                tempAnswers.push({ isCorrect: false, text: content.incorrect_answers[2] });
                questionItems.push(tempAnswers);
            });
            console.log(contents.slice(0, 1));
            removedQuestion = contents.slice(0, 1);
            showQuestion();
        })
        .catch(error => {
            console.log("失敗しました");
        });
};

function showQuestion() {
    select.style.display = "block";
    select.style.listStyle = "none";
    let i = 0;
    if (i < removedQuestion.length) {
        title.textContent = "";
        $genre.innerText = "[ジャンル]" + contents[i].category;
        $difficult.innerText = "[難易度]" + contents[i].difficulty;
        $quiz.innerText = contents[i].question;
        title.textContent = "問題" + buttonClickCount;
        btnCreate(questionItems[i]);
    } else {
        title.textContent = "あなたの正当数は" + trueAnswers + "/ 10でした！";
        $genre.innerText = "";
        $difficult.innerText = "";
        $quiz.innerText = "再度チャレンジしたい場合は以下のボタンをクリック!!";
        select.style.display = "none";
        const homeBtn = document.createElement("button");
        document.getElementById("home-button-container").appendChild(homeBtn);
        homeBtn.innerText = "ホームに戻る";
        homeBtn.addEventListener("click", function () {
            location.reload();
        });
    };
};

// --- 選択肢のボタンを作成 --- //
function btnCreate(qItem) {
    buttonClickCount++;
    let num = qItem.length;
    while (num) {
        let tmp = Math.floor(Math.random() * num);
        let str = qItem[--num];
        qItem[num] = qItem[tmp];
        qItem[tmp] = str;

        for (let i = 0; i < qItem.length; i++) {
            btns[i].textContent = qItem[i].text;
        }
    }
};

// ボタンクリックされた時の処理
function pushChoices(event) {
    if(event.toElement.textContent === correctAnswer[buttonClickCount-2].text) {
        trueAnswers++;
    };
    console.log(trueAnswers);
    removedQuestion = [];
    questionItems.shift();
    contents.shift();
    removedQuestion = contents.slice(0, 1);
    showQuestion();
    console.log(event.toElement.textContent);
    // ===>選択した答え
    console.log(correctAnswer[buttonClickCount-2].text);
    // ===> 正答
};