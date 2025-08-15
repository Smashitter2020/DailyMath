let num1, num2, num3;

const operators = {
  addition: { operator: "+", symbol: "+" },
  subtraction: { operator: "-", symbol: "&#x2212;" },
  multiplication: { operator: "*", symbol: "&#xd7;" },
  division: { operator: "/", symbol: "&#xf7;" }
};

function getRandomOperator() {
  const keys = Object.keys(operators);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return operators[randomKey];
}

function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function getDailySeed() {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  return y * 10000 + m * 100 + d;
}

function getDailyOperator() {
  const keys = Object.keys(operators);
  const seed = getDailySeed();
  const rng = mulberry32(seed);
  
  num1 = Math.floor(rng() * 99) + 1;
  num2 = Math.floor(rng() * 99) + 1;
  num3 = Math.floor(rng() * 99) + 1;

  // First index
  const index1 = Math.floor(rng() * keys.length);

  // Second index — keep generating until it's different
  let index2;
  do {
    index2 = Math.floor(rng() * keys.length);
  } while (index2 === index1);

  return {
    op1: operators[keys[index1]],
    op2: operators[keys[index2]],
  }
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("answer").value);
  const correctAnswer = Math.round(eval(num1 + dailyOp.op1.operator + num2 + dailyOp.op2.operator + num3) * 100) / 100;
  
  if(userAnswer === correctAnswer) {
    document.getElementById("answer").style.background = "#21D375";
  }
  else {
    document.getElementById("answer").style.background = "#ffabab";
  }
  
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("answer").disabled = true;
}

const dailyOp = getDailyOperator();

document.getElementById("question").innerHTML = `<math xmlns="http://www.w3.org/1998/Math/MathML"><mn>${num1}</mn><mo>${dailyOp.op1.symbol}</mo><mn>${num2}</mn><mo>${dailyOp.op2.symbol}</mo><mn>${num3}</mn></math>`;

const today = new Date();

const day = today.getDate();
const month = today.toLocaleString('en-US', {month: 'long'});
const year = today.getFullYear();

document.getElementById("currentDate").textContent = "Current date of the equation: " + `${day} ${month} ${year}`;
