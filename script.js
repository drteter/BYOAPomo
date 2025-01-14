let timeLeft;
let timerId = null;
let isWorkMode = true;

// Wait for DOM to be ready before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const resetButton = document.getElementById('resetBtn');
    const toggleButton = document.getElementById('toggleBtn');
    const modeToggleButton = document.getElementById('modeToggle');
    const playIcon = toggleButton.querySelector('.play-icon');
    const pauseIcon = toggleButton.querySelector('.pause-icon');
    const workIcon = modeToggleButton.querySelector('.work-icon');
    const breakIcon = modeToggleButton.querySelector('.break-icon');

    const WORK_TIME = 25 * 60;
    const BREAK_TIME = 5 * 60;

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
                    toggleButton.classList.remove('paused');
                    playIcon.classList.remove('hidden');
                    pauseIcon.classList.add('hidden');
                }
            }, 1000);
            toggleButton.classList.add('paused');
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }
    }

    function pauseTimer() {
        clearInterval(timerId);
        timerId = null;
        toggleButton.classList.remove('paused');
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }

    function resetTimer() {
        clearInterval(timerId);
        timerId = null;
        timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
        updateDisplay();
    }

    function toggleTimer() {
        if (timerId === null) {
            startTimer();
        } else {
            pauseTimer();
        }
    }

    function toggleMode() {
        isWorkMode = !isWorkMode;
        timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
        
        if (isWorkMode) {
            workIcon.classList.add('hidden');
            breakIcon.classList.remove('hidden');
        } else {
            workIcon.classList.remove('hidden');
            breakIcon.classList.add('hidden');
        }
        
        resetTimer();
    }

    // Initialize
    timeLeft = WORK_TIME;
    updateDisplay();
    workIcon.classList.remove('hidden');
    breakIcon.classList.add('hidden');

    // Event listeners
    toggleButton.addEventListener('click', toggleTimer);
    modeToggleButton.addEventListener('click', toggleMode);
    resetButton.addEventListener('click', resetTimer);
}); 