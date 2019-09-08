const dayTheme = {
    image: 'url("background_sky/dzien.jpg")',
    dimness: "rgba(220,170,200, 0.3)"
}
const nightTheme = {
    image: 'url("background_sky/noc.jpg")',
    dimness: "rgba(15,15,36,0.3)"
}
let theme;

/*WALIDACJA*/
const placeInput=document.getElementById('placeInput');
const messageSection = document.getElementById('messages');
const sub=document.getElementById('submit');
let errorsTypes = []; // jeśli zawiera "1" to błąd w nazwie miasta, jeśli zawiera "2" to błąd w dacie

placeInput.addEventListener('input', function(e){
    let a= correctPolishLetters(this.value);
    const regW =/[^A-Za-z_\s]/ ;
    const matchError = regW.exec(a);
    if(matchError!==null){
        // document.getElementById('messagesBar').style.display="block";
        messageSection.style.display="block";
        document.getElementById('typingError').style.display="block";
        errorsTypes.includes(1) ? null : errorsTypes.push(1); //dodaj błąd jeśli go nie ma
        sub.setAttribute('disabled', 'disabled');
    }
    else{
        document.getElementById('typingError').style.display="none";     
        errorsTypes = errorsTypes.filter(err => err != 1);    // usun blad z tablicy    
        if(errorsTypes.length == 0)  
        {
            messageSection.style.display="none";
            sub.removeAttribute('disabled');
        }  
    }
});
//Przy loadowaniu strony
let slider = document.getElementById('hourSlider');
window.addEventListener('load', async function(e){
    themeDependsOnHour();
});

function themeDependsOnHour(){
    isNight() ? theme = nightTheme : theme = dayTheme;
    const backgound = document.getElementById("background");
    backgound.style.backgroundImage = theme.image;
}

//Po kliknięciu submita
sub.addEventListener('click', async function(e){
        const datas = await Getdata(APIRequestByCityName(placeInput.value));
        const errorInfo = document.getElementById("error-info");
        const weatherInfo = document.getElementById("weather-info");
        errorInfo.style.display = "none";
        weatherInfo.style.display = "none";
        if(dataCode === "200")
        {
            await createShortSection();
            createDetailedSection(placeInput.value, data[0].dt);
            CreateCharts(datas);
            weatherInfo.style.display = "block";
        }
        else
        {
            errorInfo.style.display = "block";
            document.getElementById("error-type").innerHTML = dataCode;
            document.getElementById("error-message").innerHTML = datas;
        }
})
    
//Po kliknięciu kafelka

let weatherTiles = document.querySelectorAll('.short');
weatherTiles.forEach(tile=>{
    tile.addEventListener('click', weatherTileClick);
    tile.addEventListener('click', setSliderAfterTileClick);
})

//Obsługa slidera
slider.addEventListener('change', usingSlider)

//strzałki do slidera

let leftArrow = document.getElementById('leftArrow');
let rightArrow = document.getElementById('rightArrow');

leftArrow.addEventListener('click',(e)=>{
    if(slider.value>slider.min) {
        slider.value -= 3
    }
    let forecastHeader = document.getElementById('detailedHeader');
    forecastHeader.querySelector('b').innerHTML = `${slider.value}:00`
    createDetailedSection(placeInput.value, dataIdfromSlider());
})

rightArrow.addEventListener('click',e=>{
    if(slider.value<=21) slider.value = -1*(-1*slider.value-3);
    let forecastHeader = document.getElementById('detailedHeader');
    forecastHeader.querySelector('b').innerHTML = `${slider.value}:00`;
    createDetailedSection(placeInput.value, dataIdfromSlider());
})

function isNight(){
    const actualHour = new Date().getHours();
    if(actualHour >= 21 || actualHour <=6) 
        return true;
    return false;
}