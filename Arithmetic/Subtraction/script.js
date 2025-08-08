let num1, num2;

function getDailySubtractionEquation() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // Generate two pseudo-random numbers
  const raw1 = (seed % 97) + 3;        // Between 3 and 99
  const raw2 = ((seed * 7) % 89) + 11; // Between 11 and 99

  // Ensure subtraction doesn't go negative
  num1 = Math.max(raw1, raw2);
  num2 = Math.min(raw1, raw2);

  document.getElementById("question").innerHTML = `<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>${num1}</mi><mo>&#x2212;</mo><mi>${num2}</mi></mrow></math>`;
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("answer").value);
  const correctAnswer = num1 - num2;
  
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
getDailySubtractionEquation();

const today = new Date();

const day = today.getDate();
const month = today.toLocaleString('en-US', {month: 'long'});
const year = today.getFullYear();

document.getElementById("currentDate").textContent = "Current date of the equation: " + `${day} ${month} ${year}`;
