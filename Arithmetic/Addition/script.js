let num1, num2;

function getDailyAdditionEquation() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // Use the seed to generate two pseudo-random numbers
  num1 = (seed % 97) + 3; // Keeps it between 3 and 99
  num2 = ((seed * 7) % 89) + 11; // Keeps it between 11 and 99
  document.getElementById("question").innerHTML = `<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>${num1}</mi><mo>+</mo><mi>${num2}</mi></mrow></math>`;
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("answer").value);
  const correctAnswer = num1 + num2;
  
  if(userAnswer === correctAnswer) {
    document.getElementById("answer").style.background = "#21D375";
  }
  else {
    document.getElementById("answer").style.background = "#ffabab";
  }
  
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("answer").disabled = true;
}

// Preferences
getDailyAdditionEquation();

const today = new Date();

const day = today.getDate();
const month = today.toLocaleString('en-US', {month: 'long'});
const year = today.getFullYear();

document.getElementById("currentDate").textContent = "Current date of the equation: " + `${day} ${month} ${year}`;
