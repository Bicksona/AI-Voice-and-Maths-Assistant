let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let btn1 = document.querySelector("#btn1");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-IN";
    window.speechSynthesis.speak(text_speak);
}
function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices()[0]; // Use default voice
    window.speechSynthesis.speak(utterance);
}

function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices()[0]; // Use default voice
    window.speechSynthesis.speak(utterance);
}

function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices()[0]; // Use default voice
    window.speechSynthesis.speak(utterance);
}

function wishMe() {
    if (!sessionStorage.getItem('greeted')) {
        let day = new Date();
        let hours = day.getHours();
        let greeting = "Good Evening Sir"; // Default greeting

        if (hours >= 0 && hours < 12) {
            greeting = "Good Morning Sir";
        } else if (hours >= 12 && hours < 16) {
            greeting = "Good Afternoon Sir";
        }

        speak(greeting);
        sessionStorage.setItem('greeted', 'true'); // Ensure it runs only once per session
    }
}

// ✅ **Ensure Speech Runs Only After User Interaction**
function enableSpeechAfterInteraction() {
    document.addEventListener("click", function () {
        wishMe();
    }, { once: true }); // Ensures it runs only once
}

// Call this on page load
window.addEventListener("load", enableSpeechAfterInteraction);


let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    console.log(event);
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;

    takeCommand(transcript.toLowerCase());
};


recognition.onend = () => {

    btn.style.display = "flex";
    voice.style.display = "none";
    btn1.style.display = "flex";
}

recognition.onerror = (event) => {
    if (event.error === "no-speech") {
        btn.style.display = "flex";
        voice.style.display = "none";
        btn1.style.display = "flex";
        speak("I'm sorry. I didn't quite catch that. Could you please repeat or rephrase your question?");
    }

};

btn.addEventListener("click", () => {
    recognition.start();
    console.log("Started");
    btn.style.display = "none";
    voice.style.display = "block";
    btn1.style.display = "none";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    btn1.style.display = "flex";
    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello Sir, How's your day going?");
    } else if (message.includes("who are you")) {
        speak("I’m Shiru, an AI voice assistant. I can also assist you with mathematical problems. How can I assist you today?");
    } else if (message.includes("what can you do")) {
        speak("I can do many things, like opening websites, searching for information, answering questions, and solving mathematical problems. How can I assist you today?");
    } else if (message.includes("what is your name")) {
        speak("My name is Shiru. How can I assist you today?");
    } else if (message.includes("how are you")) {
        speak("I am good, thank you for asking. How can I assist you today?");
    } else if (message.includes("what's the time")) {
        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        speak(`The time is ${hours} ${minutes}`);
    } else if (message.includes("what's the date")) {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        speak(`The date is ${day} ${month + 1} ${year}`);
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com");
    } else if (message.includes("open spotify") || message.includes("play music")) {
        speak("Opening Spotify");
        window.open("https://open.spotify.com/");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("https://web.whatsapp.com/");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com/");
    } else if (message.includes("open twitter")) {
        speak("Opening Twitter");
        window.open("https://twitter.com/");
    } else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn");
        window.open("https://www.linkedin.com/");
    } else if (message.includes("weather")) {
        speak("Opening Weather...");
        window.open("https://www.accuweather.com/");
    }
    else {
        let finalText = "This is what I found on the internet regarding " + message.replace("Shiru", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("Shiru", "")}`, "_blank");
    }

}
