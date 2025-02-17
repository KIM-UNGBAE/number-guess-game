// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!
// 랜덤번호가 > 유저번호 Up!
// Reset 버튼을 누르면 게임이 리셋된다
// 3번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다
// 정답을 미리 공개한다


let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 3;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let answerArea = document.getElementById("answer-area");
let history = []

// click 이벤트
playButton.addEventListener("click", play); //함수가 매개변수로서 들어가면 ()빼야됨
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){userInput.value = ""});


function pickRandomNum(){
    // Math.random -> 랜덤한 숫자를 뽑을 수 있게 도와주는 함수, 0~1까지 근접한 숫자를 반환(이때 1은 포함이 안돼는 1에 가까운 숫자를 반환)
    // Math.floor -> 소수점 자리를 없애준다
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답", computerNum);

    // 정답 공개
    document.getElementById("answer-area").textContent = `정답: ${computerNum}`;
};

function play(){
    // 유저 번호 값을 들고오기
    let userValue = userInput.value;

    // 범위 밖 숫자 입력했을 때
    if(userValue < 1 || userValue > 100){
        resultArea.textContent = "1과 100사이 숫자를 입력해 주세요";
        return;
    }

    // 유효성 검사(이미 입력한 숫자가 있다면)
    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요!";
        return;
    }

    // play 할때마다 1씩 줄어듬
    chances -- ;
    chanceArea.textContent = `남은기회: ${chances}번`; // 백팁 사용
    console.log("chance", chances)

    // 결과값 나온다
    if(userValue < computerNum){
        resultArea.textContent = "Up!";
    }else if(userValue > computerNum){
        resultArea.textContent = "Down!";
    }else{
        resultArea.textContent = "맞췄습니다!";
        gameOver = true;
    }

    // history라는 배열에 입력한 값 저장
    history.push(userValue);
    console.log(history)

    // 게임 기회
    if(chances < 1){
        gameOver = true;
    }

    // play버튼 disabled
    if(gameOver == true){
        playButton.disabled = true;
    }
}

// 리셋
function reset() {
    // user input창이 깨끗하게 정리되고
    userInput.value = "";
    // 새로운 번호가 생성되고
    pickRandomNum();
    // 결과 메시지 초기화
    resultArea.textContent = "결과값이 여기 나옵니다.";
    // 남은 찬스 초기화
    chances = 3;
    chanceArea.textContent = `남은기회: ${chances}번`;
    // 게임 상태 초기화
    gameOver = false;
    playButton.disabled = false; // 버튼 다시 활성화
    // 입력한 숫자 기록 초기화
    history = [];
}

pickRandomNum();

