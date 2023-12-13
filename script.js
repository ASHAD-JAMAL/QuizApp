const question =[
    {
        question: "Who is Inventor of C Language?",
        answers: [
            {text:"Brendan Eich" , correct:false},
            {text:"James Gossling" , correct:false},
            {text:"Dennis Ritchie" , correct:true},
            {text:"Guido Van Rossum" , correct:false},
        ]
    },

    {
        question: "Who is Inventor of Java Language?",
        answers: [
            {text:"James Gossling" , correct:true},
            {text:"Dennis Ritchie" , correct:false},
            {text:"Guido van Rossum" , correct:false},
            {text:"Brendan Eich" , correct:false},
        ]
    },

    {
        question: "Who is Inventor of Python Language?",
        answers: [
            {text:"James Gossling" , correct:false},
            {text:"Guido van Rossum" , correct:true},
            {text:"Dennis Ritchie" , correct:false},
            {text:"Brendan Eich" , correct:false},
        ]
    },

    {
        question: "Who is Inventor of JavaScript Language?",
        answers: [
            {text:"James Gossling" , correct:false},
            {text:"Guido van Rossum" , correct:false},
            {text:"Dennis Ritchie" , correct:false},
            {text:"Brendan Eich" , correct:true},
        ]
    }

];

const questionElement =document.getElementById("question");
const answerButtons =document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");

let currentQuestionIndex =0;
let score =0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function  showQuestion(){
    resetState();
    let currentQuestion =question[currentQuestionIndex];
    let questionNo =currentQuestionIndex + 1;
    questionElement.innerHTML =questionNo+ " . " + currentQuestion.question;

    //showing question
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML =" Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
