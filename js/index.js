let langOptions = document.querySelectorAll("select");
let fromText = document.querySelector(".fromText");
let translateText = document.querySelector('.toTranslate')
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


fromText?.addEventListener("input", () => {
    let content = fromText?.value;
    fromContent = langOptions[0].value;
    transContent = langOptions[1].value;

    let translateLink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;

    fetch(translateLink)
    .then(translate => translate.json()).then(data => {
        translateText.value = data.responseData.translatedText;
    }).catch((error) => {
        console.error(error);
    })
});