const startBtn = document.getElementById('start-btn');
const resultDiv = document.getElementById('result');
let recognition;

// Verifică dacă browserul suportă Web Speech API
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ro-RO';

    recognition.onstart = function() {
        resultDiv.innerHTML = 'Ascultare...';
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        resultDiv.innerHTML = `Ai spus: "${transcript}"`;
    };

    recognition.onerror = function(event) {
        resultDiv.innerHTML = 'Eroare: ' + event.error;
    };

    recognition.onend = function() {
        resultDiv.innerHTML += '<br>Ascultarea s-a oprit.';
    };
} else {
    resultDiv.innerHTML = 'Browserul tău nu suportă Web Speech API.';
}

startBtn.addEventListener('click', function() {
    if (recognition) {
        recognition.start();
    }
});