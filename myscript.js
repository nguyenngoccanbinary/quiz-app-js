//initialize variables
var questionID, question, choiceA, choiceB, choiceC, choiceD, correct, questions, numQuestions,userChoice,
current = 0,
score = 0;
var points = [];
var defaultQuestions = [{
	question:"Where are the three smallest bones in the human body",
        choiceA:"Middle ear",
        choiceB:"Nose",
        choiceC:"Toes",
        choiceD:"Eyes",
        correct:"choiceA"
    },
    {
        question:"What is the most abundant element in the Universe",
        choiceA:"Helium",
        choiceB:"Oxygym",
        choiceC:"Lithium",
        choiceD:"Hydrogen",
        correct:"choiceD"
    },
    {
        question:"What is 10/2",
        choiceA:"5",
        choiceB:"8",
        choiceC:"9",
        choiceD:"2",
        correct:"choiceD"
    }
]
// reference HTML elements
var elQuestion = document.getElementById("question");
var elChoiceA = document.getElementById("choiceA");
var elChoiceB = document.getElementById("choiceB");
var elChoiceC = document.getElementById("choiceC");
var elChoiceD = document.getElementById("choiceD");
var elQuizStatus = document.getElementById("indexWhestion");
var elDisplayQuestion = document.getElementById("displayQuestion");
var elSummary = document.getElementById("displaySummary");
var elChoices = document.getElementsByName("choices");
// start quiz
checkLocalStorage();
renderQuestion();
var btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", gradeQuestion);
function checkLocalStorage(){
	// Populate with default questions
	questions = defaultQuestions;
	// If local storage contains questions, add to defaultQuestions
	if(localStorage.questions != null ){
		var newQuestions = JSON.parse(localStorage.questions);
		for(var i=0, length = newQuestions.length; i < length; i++){
		questions.push(newQuestions[i]);
		}
	}

numQuestions = questions.length;
}
function populateQuestionInfo(){
	// populate current question info from question list
	qInfo = questions[current];
	question = questions[current].question;	
	choiceA = qInfo.choiceA;
	choiceB = qInfo.choiceB;
	choiceC = qInfo.choiceC;
	choiceD = qInfo.choiceD;
	correct = qInfo.correct;
}

function renderQuestion(){
	// display question on webpage
	questionID = current + 1;
	elQuizStatus.innerHTML = "Question " + questionID + " of " + (numQuestions); 
	populateQuestionInfo();
	elQuestion.innerHTML = question;
	elChoiceA.innerHTML = choiceA;
	elChoiceB.innerHTML = choiceB;
	elChoiceC.innerHTML = choiceC;
	elChoiceD.innerHTML = choiceD;
}
function gradeQuestion(){
	if(getUserChoice()){
		if(userChoice == questions[current].correct){
			score++;
			points[current] = 1;
		}else{
			points[current] = 0;
		}
		if(current == numQuestions-1){
			endGame();
		}else{
		// Next Question
		current++;
		renderQuestion();
		}
	}}
function getUserChoice(){
	for(var i = 0, length = elChoices.length;i < length;i++){
		if(elChoices[i].checked){
			userChoice = elChoices[i].value;
			// clear radio input for next question
			elChoices[i].checked = false;
			return true;
		}}
	// user didn't select an answer
	alert("Please select answer before continuing");
	return false;
}
function endGame(){
	elDisplayQuestion.innerHTML = "<h2> Your score: " + score + " out of " + points.length + "</h2>" 

	for(var i = 0;i < points.length;i++){	
	var summary = document.createElement("p");
		if(points[i] == 1){
			summary.innerHTML = "Question#" + (i+1) + ": CORRECT!";
			summary.style.color = "green";
		}else{
			summary.innerHTML = "Question#"  + (i+1) + ": INCORRECT";
			summary.style.color = "red";
		}
	elDisplayQuestion.appendChild(summary);
	}
	elSummary.style.display = "block";			
}



