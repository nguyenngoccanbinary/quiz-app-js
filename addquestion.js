
var questionForm = document.getElementById("add-question");
questionForm.onsubmit = processForm;
function processForm(){
	var newQuestion = {
		question: questionForm.question.value,
		choiceA: questionForm.choiceA.value,
		choiceB: questionForm.choiceB.value,
		choiceC: questionForm.choiceC.value,
		choiceD: questionForm.choiceD.value,
		correct: questionForm.correct.value
	}
	// if local storage contains questions, pull and update stored date. Store new object otherwise
	if(localStorage.questions != null){
		var questions = JSON.parse(localStorage.questions);
		questions.push(newQuestion);
		localStorage.setItem("questions",JSON.stringify(questions));
	}else{
	var questions = [newQuestion];
	localStorage.setItem("questions",JSON.stringify(questions));
	}
	questionForm.reset();	
	return false;		
}

