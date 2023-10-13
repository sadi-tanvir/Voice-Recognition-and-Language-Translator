let langOptions = document.querySelectorAll("select");
let fromText = document.querySelector(".fromText");
let word_length = document.querySelector(".word_length");
let translatedText = document.querySelector('.toTranslate');
let from_voice = document.querySelector(".from_voice");
let to_voice = document.querySelector(".to_voice");
let copyText = document.querySelector(".copyText");
let copy_popup = document.querySelector('.copy_popup');
let swap_lang_option = document.querySelector('.swap_lang_option');
let voice_microphone = document.querySelector(".voice_microphone")



langOptions.forEach((selectElem, index) => {
    for (const countryCode in languages) {
        let selected;
        if (index === 0 && countryCode === 'en-GB') {
            selected = "selected";
        } else if (index === 1 && countryCode === 'bn-IN') {
            selected = "selected";
        };

        let option = `<option value="${countryCode}" ${selected}>${languages[countryCode]}</option>`;
        selectElem.insertAdjacentHTML('beforeend', option)
    };
});




// translate text
function translate(text) {
    fromContent = langOptions[0].value;
    transContent = langOptions[1].value;

    if (text.length <= 500) {
        word_length.innerText = `${text.length}/500`;
        let translateLink = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${fromContent}|${transContent}`;

        fetch(translateLink)
            .then(translate => translate.json()).then(data => {
                translatedText.value = data.responseData.translatedText;
            }).catch((error) => {
                console.error(error);
            });
    } else {
        window.alert("limit exceed")
    };
}




// voice recognition
voice_microphone.addEventListener("click", () => {
    let startSound = new Audio("audio/start.wav");
    let endSound = new Audio("audio/end.wav");
    
    let fromCurrentLang = langOptions[0];
    let recognition = new webkitSpeechRecognition();
    recognition.lang = fromCurrentLang.value;

    recognition.onstart = function () {
        voice_microphone.classList.add("active");
        startSound.play()
    };

    recognition.onresult = function (event) {
        console.log(event);
        fromText.value = event.results[0][0].transcript;
        translate(fromText.value)
    };

    recognition.start();

    recognition.onend = function () {
        voice_microphone.classList.remove("active");
        endSound.play();
    };
});




// take input for translate
fromText.addEventListener("input", () => {
    let content = fromText?.value;
    translate(content);
});




// voice translator
from_voice.addEventListener('click', () => {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = langOptions[0].value;
    speechSynthesis.speak(fromTalk);
});

to_voice.addEventListener("click", () => {
    let toTalk;
    toTalk = new SpeechSynthesisUtterance(translatedText.value);
    toTalk.lang = langOptions[1].value;
    speechSynthesis.speak(toTalk);
});




// copy to clipboard
copyText.addEventListener('click', () => {
    navigator.clipboard.writeText(translatedText.value);

    if (copy_popup.classList.contains("show")) {
        copy_popup.classList.remove("show")
        setTimeout(() => {
            copy_popup.classList.add("show")
        }, 100)
    } else {
        copy_popup.classList.add("show")
    }

    setTimeout(() => {
        copy_popup.classList.remove("show")
    }, 3000)
});




// swap language selection and text
swap_lang_option.addEventListener('click', () => {
    let fromCurrentLang = langOptions[0];
    let toCurrentLang = langOptions[1];
    let tempFromLangVal = fromCurrentLang.value;
    let tempFromLangInnerText = fromCurrentLang[fromCurrentLang.selectedIndex].innerText;
    let tempFromTextAreaVal = fromText.value;

    // swap textarea values
    fromText.value = translatedText.value;
    translatedText.value = tempFromTextAreaVal;

    // swap language options
    for (let i = 0; i < fromCurrentLang.options.length; i++) {
        if (fromCurrentLang.options[i].value == toCurrentLang.value) {
            fromCurrentLang[fromCurrentLang.selectedIndex].selected = false;
            fromCurrentLang.options[i].selected = true;
            fromCurrentLang.options[i].innerText = toCurrentLang[toCurrentLang.selectedIndex].innerText;
            break;
        };
    };

    for (let i = 0; i < toCurrentLang.options.length; i++) {
        if (toCurrentLang.options[i].value == tempFromLangVal) {
            toCurrentLang[toCurrentLang.selectedIndex].selected = false;
            toCurrentLang.options[i].selected = true;
            toCurrentLang.options[i].innerText = tempFromLangInnerText;
            break;
        };
    };
});