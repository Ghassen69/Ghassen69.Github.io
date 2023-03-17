$(document).ready(function() {

    // Define quiz questions
    const questions = [
      {
        question: "What supercar is known as the 'Goddess of the Wind'?",
        options: ["Aston Martin Valkyrie", "Pagani Huayra", "Koenigsegg Agera"],
        answer: "b"
      },
      {
        question: "Which supercar has a top speed of 304 mph (489 km/h)?",
        options: ["Bugatti Veyron", "Hennessey Venom F5", "Koenigsegg Jesko"],
        answer: "b"
      },
      {
        question: "What supercar is known as the 'Raging Bull'?",
        options: ["Lamborghini Aventador", "Ferrari 458 Italia", "McLaren 720S"],
        answer: "a"
      }
    ];
  
    // Define variables
    const quizForm = $("#quiz-form");
    const submitBtn = $("#submit-btn");
    const resultDiv = $("#results");
    let currentQuestion = 0;
    let correctAnswers = 0;
  
    // Display current question
    function showQuestion() {
      const question = questions[currentQuestion];
      quizForm.find(".question-number").text(`Question ${currentQuestion + 1}`);
      quizForm.find(".question-text").text(question.question);
      const options = quizForm.find(".options");
      options.empty();
      question.options.forEach((option, index) => {
        const id = `q${currentQuestion + 1}${index + 1}`;
        const label = $(`<label for="${id}"><input type="radio" id="${id}" name="q${currentQuestion + 1}" value="${String.fromCharCode(97 + index)}"><span>${option}</span></label>`);
        options.append(label);
      });
    }
  
    // Check answer and move to next question
    function checkAnswer() {
      const selected = quizForm.find(`input[name=q${currentQuestion + 1}]:checked`);
      if (selected.length === 0) {
        return false; // No answer selected
      }
      const answer = selected.val();
      if (answer === questions[currentQuestion].answer) {
        correctAnswers++;
      }
      currentQuestion++;
      return true;
    }
  
    // Show results
    function showResults() {
      quizForm.hide();
      submitBtn.hide();
      resultDiv.text(`You got ${correctAnswers} out of ${questions.length} questions correct!`).show();
    }
  
    // Show first question
    showQuestion();
  
    // Handle form submit
    quizForm.submit(function(event) {
      event.preventDefault();
      if (checkAnswer()) {
        if (currentQuestion === questions.length) {
          showResults();
        } else {
          showQuestion();
        }
      }
    });
  
    // Enable submit button when an answer is selected
    quizForm.find("input[type=radio]").change(function() {
      submitBtn.prop("disabled", false);
    });
  
  });