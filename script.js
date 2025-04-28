const options = ['Stone', 'Paper', 'Scissors'];
let userScore = 0;
let computerScore = 0;
let lastComputerChoice = null;
let userHistory = [];

function playGame(userChoice) {
  userHistory.push(userChoice);
  if (userHistory.length > 10) userHistory.shift(); // Limit history to last 10

  const computerChoice = getSmartComputerChoice();

  const player = document.getElementById('playerChoice');
  const computer = document.getElementById('computerChoice');
  document.getElementById('result').innerText = '';
  player.innerText = getEmoji(userChoice);
  computer.innerText = getEmoji(computerChoice);

  player.classList.remove('animate');
  computer.classList.remove('animate');
  void player.offsetWidth;
  void computer.offsetWidth;
  player.classList.add('animate');
  computer.classList.add('animate');

  setTimeout(() => {
    let resultText = '';
    let emoji = '';

    if (userChoice === computerChoice) {
      resultText = "It's a Draw!";
      emoji = '😐';
    } else if (
      (userChoice === 'Stone' && computerChoice === 'Scissors') ||
      (userChoice === 'Paper' && computerChoice === 'Stone') ||
      (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
      resultText = `You Win! ${userChoice} beats ${computerChoice}`;
      emoji = '🎉';
      userScore++;
    } else {
      resultText = `You Lose! ${computerChoice} beats ${userChoice}`;
      emoji = '😢';
      computerScore++;
    }

    document.getElementById('result').innerHTML = `
      You chose: <b>${userChoice}</b><br>
      Computer chose: <b>${computerChoice}</b><br>
      <strong>${resultText} ${emoji}</strong>
    `;
    document.getElementById('score').innerText = `You: ${userScore} | Computer: ${computerScore}`;
  }, 700);
}

function getEmoji(choice) {
  switch (choice) {
    case 'Stone': return '🪨';
    case 'Paper': return '📄';
    case 'Scissors': return '✂️';
  }
}

// SMART COMPUTER AI
function getSmartComputerChoice() {
  if (userHistory.length < 3) {
    return getNonRepeatingRandomChoice();
  }

  const frequency = {
    'Stone': 0,
    'Paper': 0,
    'Scissors': 0
  };

  userHistory.forEach(choice => frequency[choice]++);

  // Most common user choice
  const mostUsed = Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);

  const counterMoves = {
    'Stone': 'Paper',
    'Paper': 'Scissors',
    'Scissors': 'Stone'
  };

  const smartMove = counterMoves[mostUsed];

  // Avoid repeating last move
  if (smartMove === lastComputerChoice) {
    const alternatives = options.filter(opt => opt !== lastComputerChoice);
    const choice = alternatives[Math.floor(Math.random() * alternatives.length)];
    lastComputerChoice = choice;
    return choice;
  }

  lastComputerChoice = smartMove;
  return smartMove;
}

function getNonRepeatingRandomChoice() {
  let choice;
  do {
    choice = options[Math.floor(Math.random() * options.length)];
  } while (choice === lastComputerChoice);
  lastComputerChoice = choice;
  return choice;
}

function resetScore() {
  userScore = 0;
  computerScore = 0;
  userHistory = [];
  document.getElementById('result').innerText = 'Make your move!';
  document.getElementById('score').innerText = 'You: 0 | Computer: 0';
  document.getElementById('playerChoice').innerText = '';
  document.getElementById('computerChoice').innerText = '';
}
