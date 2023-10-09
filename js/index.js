let langOptions = document.querySelectorAll("select");
let fromText = document.querySelector(".fromText");
let toTranslate = document.querySelector('.toTranslate');
let from_voice = document.querySelector(".from_voice");
let to_voice = document.querySelector(".to_voice");

langOptions.forEach((selectElem, index) => {
    for (const countryCode in language) {
        let selected;
        if (index === 0 && countryCode === 'en-GB') {
            selected = "selected";
        } else if (index === 1 && countryCode === 'bn-IN') {
            selected = "selected";
        };

        let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
        selectElem.insertAdjacentHTML('beforeend', option)
    };
});


// text translator
fromText.addEventListener("input", () => {
    let content = fromText?.value;
    fromContent = langOptions[0].value;
    transContent = langOptions[1].value;

    let translateLink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;

    fetch(translateLink)
        .then(translate => translate.json()).then(data => {
            toTranslate.value = data.responseData.translatedText;
        }).catch((error) => {
            console.error(error);
        })
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
    toTalk = new SpeechSynthesisUtterance(toTranslate.value);
    toTalk.lang = langOptions[1][1].value;
    speechSynthesis.speak(toTalk);
});