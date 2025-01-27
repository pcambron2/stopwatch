let startTime;
let elapsedTime = 0;
let timerInterval;
let lapStartTime;
let lapNumber = 1;

const display = document.querySelector('.display');
const lapsDisplay = document.querySelector('.laps-display');
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const resetButton = document.getElementById('resetBtn');
const lapButton = document.getElementById('lapBtn');

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function addLap() {
    if (!startTime) return; // Don't add lap if timer hasn't started

    const currentTime = Date.now();
    const lapTime = currentTime - lapStartTime;
    const totalTime = currentTime - startTime;
    
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap-time');
    lapElement.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <span>${formatTime(lapTime)}</span>
        <span>Total: ${formatTime(totalTime)}</span>
    `;
    
    lapsDisplay.insertBefore(lapElement, lapsDisplay.firstChild);
    
    lapStartTime = currentTime;
    lapNumber++;
}

function startTimer() {
    startButton.disabled = true;
    stopButton.disabled = false;
    lapButton.disabled = false;
    
    startTime = Date.now() - elapsedTime;
    lapStartTime = startTime;
    timerInterval = setInterval(updateDisplay, 10);
}

function stopTimer() {
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = false;
    lapButton.disabled = true;
    elapsedTime = 0;
    lapNumber = 1;
    display.textContent = '00:00:00';
    lapsDisplay.innerHTML = '';
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);

// Initially disable lap button
lapButton.disabled = true; 