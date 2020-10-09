//question about arsenal club
var questions = [{
        title: "When does Arsenal win their first League Cup?:",
        // answer: 0       1       2       3
        choices: ["1987", "1988", "1989", "1990"],
        answer: 0
    },
    {
        title: "When was Arsenal Ladies found?",
        choices: ["1990", "1989", "1988", "1987"],
        answer: 3
    },
    {
        title: "How many years has Arsenal played at Highbury",
        choices: ["92 years", "93 years", "94 years", "95 years"],
        answer: 1
    },
    {
        title: "How many years has Arsene Wenger incharge of Arsenal",
        choices: ["20 years", "21 years", "22 years", "23 yearss"],
        answer: 2
    },
    {
        title: "How many goals has Henry scored for Arsenal",
        choices: ["227 goals", "228 goals", "229 goals", "230 goals"],
        answer: 1
    },

];

// global variables
var score, currentQuestion, timeLeft, timer

function showPage( showPage ){
    // hide each page
    document.querySelectorAll('.quiz-page')
        .forEach( function(page){ page.classList.add('d-none')} )
    
    // THEN show this individual page
    document.querySelector(showPage).classList.remove('d-none')
}

// runs each second and decreases timer
function decreaseTimer(){
    timeLeft--
    document.querySelector("#timeLeft").textContent = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
        // clearInterval(timer);
        endGame(); 
    }
}



//starts the countdown timer once user clicks the 'start' button
function startGame() {
    // if a timer is runnign stop it
    if( timer ){
        clearInterval(timer)
        timer = ""
    }
    // start the decrease timer and it will run every 1000ms (1 second)
    timer = setInterval( decreaseTimer, 1000 )

    // set the variables for the game
    score = 0
    currentQuestion = 0
    timeLeft = 60

    // show the start-game page
    showPage('.quiz-start')
    
    showQuestion( currentQuestion )
}

//stop the timer to end the game 
function endGame() {
    // stop the timer
    clearInterval(timer)
    // switch to the score page
    showPage('.quiz-end')

    // put the scores on the screen
    document.querySelector('#score').textContent = score
    document.querySelector('#numQuestionsRight').textContent = score / 20
}

//store the scores on local storage
function saveScore() {
    // read the score name from the INPUT box value field
    localStorage.highscoreName = document.querySelector('#nameInput').value
    localStorage.highscore = score
    showScore()
}


function showScore() {
    showPage('.quiz-score')

    // put the scores on the screen
    document.querySelector('#highscoreName').textContent = localStorage.highscoreName
    document.querySelector('#highscore').textContent = localStorage.highscore
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.highscoreName = ""
    localStorage.highscore = ""

    startGame()
}

//loops through the questions 
function showQuestion( questionId ) {
    // if we are beyond the last question, let's quit.
    if (questionId >= questions.length ) {
        endGame()
        return
    }

    // show the quiz question page
    showPage('.quiz-question')

    // show the question info
    var question = questions[questionId]
    console.log( `active question: `, question )
    document.querySelector('#questionTitle').textContent = question.title
    document.querySelector('#answer0').textContent = question.choices[0]
    document.querySelector('#answer1').textContent = question.choices[1]
    document.querySelector('#answer2').textContent = question.choices[2]
    document.querySelector('#answer3').textContent = question.choices[3]
}

function selectAnswer( answer ){
    if( questions[currentQuestion].answer == answer ){
        // got the right answer, increase score
        score += 20
        // show the score
        document.querySelector('#topScore').textContent = score

    } else {
        // oops got the wrong answer!
        // decrease timer
        timeLeft -= 10
    }

    // increase question number
    currentQuestion++
    // and show this question
    showQuestion( currentQuestion )

}
