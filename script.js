let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let time = document.getElementById("time");
let msSpan = document.getElementById("ms");
let display = null;
let startBTN = document.getElementById("start");
let resetBTN = document.getElementById("reset");
let lapBTN = document.getElementById("lap");
let lapHist = document.getElementById("lapHistory");

let startTime = null;
let pausedTime = 0;
let isRunning = false;

function run() {
    const now = Date.now();
    const elapsed = now - startTime;

    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    const milliseconds = elapsed % 1000;

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds; 
    let ms = milliseconds < 10 ? "00" + milliseconds :
        milliseconds < 100 ? "0" + milliseconds : milliseconds;
    time.innerHTML = `${h} : ${m} : ${s}`;
    msSpan.innerHTML = ms;
}

startBTN.addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now() - pausedTime;
        display = setInterval(run, 10);
        startBTN.innerText = "Stop";
        isRunning = true;
    } else {
        clearInterval(display);
        pausedTime = Date.now() - startTime;
        display = null;
        startBTN.innerText = "Start";
        isRunning = false;
    }
});

resetBTN.addEventListener("click", () => {
    isRunning = false;
    clearInterval(display)
    startBTN.innerText = "Start"
    time.innerHTML = `00 : 00 : 00`;
    msSpan.innerHTML = `000`;
    pausedTime = 0;
    startTime = null;
    lapHist.innerHTML = " "
});

lapBTN.addEventListener("click", () => {
    if (!isRunning) return;
    const lapTime = `${time.innerText}.${msSpan.innerText}`;
    lapHist.innerHTML = `${lapTime}<br>` + lapHist.innerHTML;
})