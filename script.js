let timeLeft;
let timerId = null;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('startBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');
const workButton = document.getElementById('work');
const breakButton = document.getElementById('break');
const addFiveButton = document.getElementById('addFive');

const WORK_TIME = 25 * 60; // 30 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    document.getElementById('pageTitle').textContent = `(${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}) Pomodoro Timer`;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isWorkMode ? 'Work session finished! Take a break!' : 'Break is over! Back to work!');
                resetTimer();
            }
        }, 1000);
        startButton.disabled = true;
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateDisplay();
    startButton.disabled = false;
}

function switchMode(mode) {
    isWorkMode = mode === 'work';
    workButton.classList.toggle('active', isWorkMode);
    breakButton.classList.toggle('active', !isWorkMode);
    resetTimer();
}

// Initialize
timeLeft = WORK_TIME;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workButton.addEventListener('click', () => switchMode('work'));
breakButton.addEventListener('click', () => switchMode('break')); 