import { checkAnswers } from "./checkAnswers.js";

let questions = [];

fetch('/PGF-07.json')
  .then(response => response.json())
  .then(data => {
    questions = getRandomItemsFromArray(data, 40);


    console.log(questions);
    const quizContainer = document.getElementById('quiz-container');

    questions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');
      questionElement.dataset.questionIndex = index;
      // Tworzenie tekstu pytań
      const questionNumber = document.createElement('h3');
      questionNumber.innerText = `Pytanie ${index + 1}:`;
      questionElement.appendChild(questionNumber);

      const questionText = document.createElement('p');
      questionText.innerText = `${question.question}`;
      questionText.classList.add('question-text');
      questionElement.appendChild(questionText);

      // Dodawanie tabeli jeśli istnieje

      if (question.table) {
        const table = document.createElement('div');
        table.innerHTML = question.table;
        questionElement.appendChild(table);
      }

      //Dodawanie odpowiedzi do kontenera
      const answers = document.createElement('div');
      const punctuation = ['A', 'B', 'C', 'D', 'E'];
      const a = getRandomItemsFromArray(question.answers, question.answers.length);
      
      a.forEach((answer, index) => {
        const item = document.createElement('li');
        const text = document.createElement('p');
        text.innerText = `${punctuation[index]}. ${answer.text}`;
        const checkBox = document.createElement('input');
        checkBox.dataset.index = index;
        checkBox.dataset.qIndex = questionElement.dataset.questionIndex;
        checkBox.type = 'checkbox';

        // Odznaczanie wszystkich zaznaczonych odpowiedzi poza aktualnie wybieraną
        checkBox.addEventListener('click', cbox => {
          const box = cbox.target;
          const questionIndex = box.dataset.qIndex;
          const answerIndex = box.dataset.index;

          const questions = document.querySelectorAll(`[data-question-index]`);
          console.log(questions);
          questions.forEach(question => {
            if (question.dataset.questionIndex === questionIndex) {
              const answers = question.querySelectorAll('input');
              answers.forEach(answer => {
                if (answer.dataset.index !== answerIndex) {
                  answer.checked = false;
                }
              });
            }
          });
        });

        item.appendChild(checkBox);
        item.appendChild(text);
        answers.appendChild(item);

      });

      questionElement.appendChild(answers);

      //Dodawanie pytań do kontenera pytań
      const answersContainer = document.createElement('ul');

      question.answers.forEach((answer) => {
        const answerElement = document.createElement('li');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        const answerText = document.createElement('p');


        answerText.innerText = answer;
        answerElement.appendChild(answerText);
        answersContainer.appendChild(answerElement);
      });


      // Dodawanie pytania do kontenera
      quizContainer.appendChild(questionElement);
    });
    const checkAnswersButton = document.createElement('button');
    checkAnswersButton.innerText = 'Sprawdź wynik';
    checkAnswersButton.onclick = checkAnswers;
    checkAnswersButton.classList.add('check-answers');

    quizContainer.appendChild(checkAnswersButton);
  });

function getRandomItemsFromArray(arr, numItems) {
  // Shuffle the array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Return the first numItems items
  return arr.slice(0, numItems);
}

export { questions };