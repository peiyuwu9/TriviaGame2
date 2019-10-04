//Set up variable to hold the results.
var correct = 0;
var incorrect = 0;
var unanswer = 0;
var time = 10;
var i = 0;

//Count down 10 seconds and display as 00:00 format
var timeInterval;
function timer() {
    timeInterval = setInterval(count,1000);
}
function count() {
    time --;
    $("#timer-display").text("Time Remain 00:0" + time);
}

// //Reset timer
// function restTimer() {
//     time = 10;
//     clearInterval();
// }

//Save questions as an object
var questions = [
{question: "1. How did Daenerys Targaryen eventually hatch her dragon eggs?", choices: ["In a lightning storm","In a funeral pyre","In a firepalce","In a frozen cave"], correctAnswer: "In a funeral pyre", userAnswer: "",gifURL: "https://giphy.com/embed/3o6ozuOnkpcJzeaBwY"},
{question: "2. The phrase 'Valar Morghulis' or 'all men must die' is usually responed with:", choices: ["'Valar Dohaeris' or 'all men must serve'","'Valar Rohnas' or 'all men must live'","'Valar GoGo' or 'll men must dance'","'Valar Bhores' or 'all men must sleep'"], correctAnswer: "'Valar Dohaeris' or 'all men must serve'", userAnswer: "", gifURL: "https://giphy.com/embed/xT1XGzz5mhWPWWFOGQ"},
{question: "3. What is the only thing that can put out volatile Wildfire?", choices: ["Sand","Water","Dragon's Blood","Sunlight"], correctAnswer: "Sand", userAnswer: "", gifURL: "https://giphy.com/embed/Bv8fFyqIHsKis"},
{question: "4. Besides dargonglass, what is the only other substance capable of defeating White Walker?", choices: ["Weirdwood","Wildfire","Valrian Steel","Snowballs"], correctAnswer: "Valrian Steel", userAnswer: "", gifURL: "https://giphy.com/embed/TIKOOMqkqBI7C"},
{question: "5. How many times has Beric Dondarrion been brouhgt back to life?", choices: ["3","4","5","6"], correctAnswer: "6", userAnswer: "", gifURL: "https://giphy.com/embed/xUA7bgivQXDhokUguY"},
{question: "6. Which Starks family direwolf was killed in retaliation for an attack on Prince Joffery?", choices: ["Ghost","Lady","Nymeria","Summer"], correctAnswer: "Lady", userAnswer: "", gifURL: "https://giphy.com/embed/xUA7aR4LAvGgE7U15m"},
{question: "7. 'It's nothing' were the last words of this infamous character:", choices: ["Renly Baratheon","Tywon Lannister","Robb Stark","King Joffery"], correctAnswer: "King Joffery", userAnswer: "", gifURL: "https://giphy.com/embed/RxfxxobFy4qsM"},
{question: "8. The name of King Tommen's favorite cat is:", choices: ["Battle Pus","Little Lion","Ser Pounce","Prince Fuzzy"], correctAnswer: "Ser Pounce", userAnswer: "", gifURL: "https://giphy.com/embed/3oEduSh7uz2wGe75ao"},
{question: "9. How shoots the flaming arrow that subsequently destroies Stannis' fleet in Blackwater Bay?", choices: ["Tyrion Lannister","King Joffery","Jamie Lannister","Bronn"], correctAnswer: "Bronn", userAnswer: "", gifURL: "https://giphy.com/embed/QWVBGcAOXQMik"},
{question: "10. Prince Oberyn Martell is nicknamed the 'Red Viper' because of his combat and:", choices: ["Pride in drawing blood first","Knowledge of poisons","Nighttime attacks","Ruby-colored armor"], correctAnswer: "Knowledge of poisons", userAnswer: "", gifURL: "https://giphy.com/embed/3o6ozpgijLAVWFL3Zm"},
]

//Function to pop question
function questionPop() {
    if (i<10) {
        time = 10;
        $("#question-display").html("");
        var questionPrint = $("<div>");
        questionPrint.text(questions[i].question);
        $("#question-display").append(questionPrint);
        for (var j=0; j<questions[i].choices.length; j++) {
            var answerInput = $("<input>");
            answerInput.attr("type","radio").attr("class","answerBtn").attr("name","answers").attr("value",questions[i].choices[j]).attr("id",questions[i].choices[j]);

            var answerLabel = $("<label>");
            answerLabel.attr("for",questions[i].choices[j]);
            answerLabel.text(questions[i].choices[j]);
            answerInput.append(answerLabel)
            $("#question-display").append(answerInput).append(" ").append(answerLabel).append("<br>");
        }

        // Once players click submit button, go to next question
        $(".answerBtn").on("click",function(){
            $("#timer-display").text("Time Remain: 00:00");
            clearInterval(timeInterval);
            pushAnswer();
            console.log(questions[i].userAnswer);
            console.log(questions[i].userAnswer === questions[i].correctAnswer);
            
            if (questions[i].userAnswer === questions[i].correctAnswer) {
                var gifText = $("<div>");
                gifText.text("You are correct!");
                var gifImage = $("<iframe>");
                gifImage.attr("src",questions[i].gifURL).attr("width","320").attr("height","180");
                $("#question-display").append(gifText).append(gifImage);
            }
            else {
                var gifText2 = $("<div>");
                gifText2.text("You are NOT correct!");
                var gifImage2 = $("<iframe>");
                gifImage2.attr("src",questions[i].gifURL).attr("width","320").attr("height","180");
                $("#question-display").append(gifText2).append(gifImage2);
            }
            i++;
            console.log(i);
            console.log(time);
            

            setTimeout(nextQuestion,3000);
            
        });

    }
    // Once players submit all 10 questions, result will be retured.
    else {
        resultPrint();
    }
}

//Once player select, return answers back to question array for resultcheck function
function pushAnswer() {
    questions[i].userAnswer = $("input[name=answers]:checked").attr("value");
}

//Function to check result
function resultChecker() {
    for (var k=0; k<questions.length; k++) {
        if (questions[k].userAnswer === questions[k].correctAnswer) {
            correct ++;
        }
        else if (questions[k].userAnswer === undefined) {
            unanswer ++;
        }
        else {
            incorrect ++;
        }
    }
}

//Function to print result
function resultPrint() {
resultChecker();
$("#timer-display").attr("style","display: none");
var resultPrint = $("<h2>");
resultPrint.text("Submitted");
$("#question-display").html(resultPrint);
var resultPrint = $("<div>");
resultPrint.text("You got " + correct + " questions CORRECT");
$("#question-display").append(resultPrint);
var resultPrint = $("<div>");
resultPrint.text("You got " + incorrect + " questions INCORRECT");
$("#question-display").append(resultPrint);
var resultPrint = $("<div>");
resultPrint.text("You got " + unanswer + " questions UNANSWERED");
$("#question-display").append(resultPrint);
}

//Set a next question function.
function nextQuestion (){
    $("#timer-display").text("Time Remain: 00:10");
    clearInterval(timeInterval);
    questionPop();
    timer();
}

//When players click start button, questions pop and timer starts.
$("#start").on("click", function(){
    //After starts, start button will disapear
    $("p").attr("style","display: none");
    $("#start").attr("style","display: none");
    $("#timer-display").text("Time Remain: 00:10");
    questionPop();
    timer();

    // if (time = 0){
    //     nextQuestion();
    // }

});