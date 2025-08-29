const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
  {
    question: "Which company developed JavaScript?",
    a: "Microsoft",
    b: "Netscape",
    c: "Sun Microsystems",
    d: "Oracle",
    correct: "b",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    a: "<js>",
    b: "<javascript>",
    c: "<script>",
    d: "<code>",
    correct: "c",
  },
  {
    question: "Which CSS property controls the text size?",
    a: "font-style",
    b: "text-size",
    c: "font-size",
    d: "text-style",
    correct: "c",
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    a: "class",
    b: "font",
    c: "styles",
    d: "style",
    correct: "d",
  },
  {
    question: "Which HTML element is used to specify a footer for a document?",
    a: "<bottom>",
    b: "<footer>",
    c: "<section>",
    d: "<foot>",
    correct: "b",
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    a: "msg('Hello World');",
    b: "alert('Hello World');",
    c: "alertBox('Hello World');",
    d: "console.log('Hello World');",
    correct: "b",
  },
];

// DOM Elements
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

// Load first question
loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    const correctAnswer = quizData[currentQuiz].correct;

    // ✅ Highlight correct & wrong answer
    answerEls.forEach((ans) => {
      const label = document.querySelector(`label[for=${ans.id}]`);
      if (ans.id === correctAnswer) {
        label.style.backgroundColor = "#a8f0c6"; // green
      } else if (ans.id === answer && ans.id !== correctAnswer) {
        label.style.backgroundColor = "#f5a6a6"; // red
      }
    });

    // ✅ Delay before loading next question
    setTimeout(() => {
      if (answer === correctAnswer) {
        score++;
      }
      currentQuiz++;

      if (currentQuiz < quizData.length) {
        // reset styles for next question
        answerEls.forEach((ans) => {
          const label = document.querySelector(`label[for=${ans.id}]`);
          label.style.backgroundColor = "";
        });
        loadQuiz();
      } else {
        quiz.innerHTML = `
                    <div class="result">🎉 You scored ${score}/${quizData.length}!</div>
                    <button onclick="location.reload()">Play Again 🔄</button>
                `;
      }
    }, 1500);
  }
});
