let num1, num2;

// Seeded random using date
function getDailySeed() {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generate daily multiplication
function generateDailyMultiplication() {
  const seed = getDailySeed();
  const rand = mulberry32(seed);

  num1 = Math.floor(rand() * 47) + 3;
  num2 = Math.floor(rand() * 41) + 2;

  document.getElementById("question").innerHTML = `<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>${num1}</mi><mo>&#xd7;</mo><mi>${num2}</mi></mrow></math>
  `;
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("answer").value);
  const correctAnswer = num1 * num2;
  
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
generateDailyMultiplication();

const today = new Date();

const day = today.getDate();
const month = today.toLocaleString('en-US', {month: 'long'});
const year = today.getFullYear();

document.getElementById("currentDate").textContent = "Current date of the equation: " + `${day} ${month} ${year}`;
