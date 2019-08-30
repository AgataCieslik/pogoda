
const incorrectCityNameInfo = "City can't contain special charakters";

const doc = document.getElementById('inputCity');
doc.addEventListener('keyup', function(e){
    const errorText = document.getElementById('CityHelp');
    const regW = /\W/;
    const matchError = regW.exec(this.value);

    matchError === null ? errorText.innerHTML = "" : errorText.innerHTML = incorrectCityNameInfo;
});