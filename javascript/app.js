//global variables
var correctAnswer;
var incorrectAnswer;
var questionsLeft;
var currentQuestion;
var answered;
var unanswered;
var seconds;
var time;
var userSelect;

var triviaQuestions = [{
	question: "Normal adult dogs have how many teeth?",
	answerList: ["24", "38", "42", "32"],
	answer: 2
},{
	question: "Through what part of the body do dogs sweat?",
	answerList: ["Mouth", "Ears", "Nose", "Paws"],
	answer: 0
},{
	question: "What is the most common training command taught to dogs?",
	answerList: ["Stay", "Beg", "Sit", "Dance"],
	answer: 2
},{
	question: "What is a dog’s most highly developed sense?",
	answerList: ["Taste", "Smell", "Sight", "Touch"],
	answer: 1
},{
	question: "Which dog breed is the smallest of them all?",
	answerList: ["Dachshund", "Shih Tzu", "Pomeranian", "Chihuahua"],
	answer: 3
},{
	question: "Which dog breed has a black tongue?",
	answerList: ["Husky", "Golden Retriever", "Chow Chow", "Pug"],
	answer: 2
},{
	question: "How old was the world’s oldest dog, an Australian cattle hound named Bluey, in human years?",
	answerList: ["32", "27", "30", "29"],
	answer: 3
},{
	question: "These dogs were first bred to go in holes and chase out rabbits?",
	answerList: ["Beagle", "Basset Hound", "Dachshund", "Whippet"],
	answer: 2
},{
	question: "Bonjour! This is the national dog of France?",
	answerList: ["Bichon Frise", "French Bulldog", "Poodle", "Beagle"],
    answer: 2
},{    
    question: "What is the fastest breed of dog?",
	answerList: ["Greyhound", "German Spitz", "German Shepherd", "Basset Hound"],
	answer: 0
}];

//messages for answer chosen
var messages = {
	correct: "Nice Job! 👏",
	incorrect: "Nope, that's not it 😓",
	endTime: "Out of time! ⌛",
	finished: "Alright! Let's see how you did."
}

var gifs


$("#main-question").hide();
$("#restartBtn").hide();
$(".answer").hide();


//start button functions
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

//new game function
function newGame(){
    $("#questionHead").show();
    $(".scoreboard").hide();
    $("#timeLeft").show();
    $("#unasweredQuestions").show();
    $(".answer").show();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
    unanswered = 0;
    questionsLeft = 10;
    newQuestion();
}

//generate new question and answers
function newQuestion() {
    answered = true;
    $("#questionHead").show();
    $("#main-question").show();
    $("#answer").hide();
    $(".gif").hide();
    $("#scoreboard").hide();
    $("#correctAnswer").hide();
    $("#questionsLeft").html(questionsLeft);
    $("#question").html(triviaQuestions[currentQuestion].question);
    for (var i = 0; i < 4; i++) {
        var choices = $("#option" + i);
        choices.html(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({'data-index': i });
    }
    timer();
}

//registers button click
$(document).on("click", ".btn-dark", function() {
    userSelect = $(this).data('index');
    clearInterval(time);
    questionsLeft--;
    answer();
    });


//sets timer
function timer() {
    seconds = 30;
    $("#timer").html(seconds);
    clearInterval(time);
    answered = true;
    time = setInterval(countDown, 1000);
}

//intiate the countdown and stop the counter once time has expired. Triggers answer function once time
function countDown() {
    seconds--;
    $("#timer").html(seconds);
    if (seconds < 1) { 
        clearInterval(time);
        answered = false; 
        questionsLeft--;
        answer();
	}
}

//compare chosen answer to correct answer
function answer() {
    $("#main-question").hide();
    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    if((userSelect == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $("#questionHead").hide();
        $("#answer").show();
        $("#gif" + currentQuestion).show()
        $("#answer").html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $("#questionHead").hide();
        $("#answer").show();
        $("#gif" + currentQuestion).show()
        $("#answer").html(messages.incorrect);
        $("#correctAnswer").show();
        $("#correctAnswer").html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $("#questionHead").hide();
        $("#answer").show();
        $("#gif" + currentQuestion).show()
        $("#answer").html(messages.endTime);
        $("#correctAnswer").show();
        $("#correctAnswer").html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }
      if (questionsLeft == 0){
        setTimeout(scoreboard, 4250);
    } else{
        currentQuestion++;
        setTimeout(newQuestion, 4250);
    }	
}

//scoreboard screen
function scoreboard() {
    $("#main-question").hide();
    $("#timeLeft").hide();
    $("#unasweredQuestions").hide();
    $(".answer").hide();
    $(".scoreboard").show();
    $("#finished").html(messages.finished);
    $("#correct").html("You answered " + correctAnswer +" correct!");
    $("#incorrect").html("You answered " + incorrectAnswer +" incorrect.");
    $("#unanswered").html("You didn't answer " + unanswered);
    $("#restartBtn").show();
}


$('#restartBtn').on('click', function(){
	$(this).hide();
	newGame();
});
