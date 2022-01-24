// DOM ELEments
const selectDOM = document.getElementById("select");
const arabicText = document.getElementById("arabic");
const playBtn = document.getElementById("playBtn");
const verseNumber = document.getElementById("verseNumber");
const audio = document.getElementById("audio");
// some useful variables
let selectedSurah = 1;
let ayaIndex = 1;
let ayaDetail;

const getSuraList = async () => {
  fetch("https://api.quran.sutanlab.id/surah")
    .then((response) => response.json())
    .then((data) => renderSuraList(data.data));
};


const getAyaInfo = async () => {
    playBtn.disabled = true
    playBtn.title = "Wait.."
    console.log("Clicked")
  fetch(`https://api.quran.sutanlab.id/surah/${selectedSurah}/${ayaIndex}`)
    .then((response) => response.json())
    .then((data) => {
        arabicText.textContent = data.data.text.arab;
        audio.src = data.data.audio.primary;
        audio.play()
        playBtn.disabled = false
    }).catch(()=>{
        alert("Subhanallah, there is an error");
        playBtn.disabled = false;
    })
};

const renderSuraList = (list) => {
  //
  list.map((d) => {
    let optionItem = `<option value=${d.number}>${d.name.transliteration.en}----${d.name.short}</option>`;
    selectDOM.innerHTML += optionItem;
  });
};

window.onload = getSuraList;

// Event Listeners
selectDOM.addEventListener('change', (e)=>{
    selectedSurah = e.target.value;
    console.log(e.target.value)
})

playBtn.addEventListener("click", ()=>getAyaInfo())


verseNumber.addEventListener("change", (e)=>{
    ayaIndex = e.target.value;
})

// https://github.com/sutanlab/quran-api