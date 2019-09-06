/*WALIDACJA*/
const placeInput=document.getElementById('placeInput');
const messageSection = document.getElementById('messages');
const sub=document.getElementById('submit');
let errorsTypes = []; // jeśli zawiera "1" to błąd w nazwie miasta, jeśli zawiera "2" to błąd w dacie
placeInput.addEventListener('input', function(e){
    /*opcja altenatywna:brak możliwości wpisania polskich znaków:
    this.value=correctPolishLetters(this.value);*/
    let a= correctPolishLetters(this.value);
    const regW =/[^A-Za-z_]/ ;
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

            // document.getElementById('messagesBar').style.display="none";  
    }
/*rozważyć polskie znaki?-w api id jest bz polskich znaków*/
});
// const dateInput=document.getElementById('dateInput');
// dateInput.addEventListener('input', function(e){
//     let actualDate=new Date(Date.now()); 
//     let inputDate= new Date(dateInput.value);
//     let f=new Date(Date.now());
//     f.setDate(f.getDate()+5);
//     if(inputDate<actualDate || inputDate>f){
//         // document.getElementById('messagesBar').style.display="block";
//         messageSection.style.display="block";
//         document.getElementById('dateError').style.display="block";
//         errorsTypes.includes(2) ? null : errorsTypes.push(2); //dodaj błąd jeśli go nie ma
//         sub.setAttribute('disabled', 'disabled');
//     }
//     else{
//         document.getElementById('dateError').style.display="none";
//         errorsTypes = errorsTypes.filter(err => err != 2);    // usun blad z tablicy
//         if(errorsTypes.length == 0)  
//         {
//             messageSection.style.display="none";
//             sub.removeAttribute('disabled');
//         }    
//     }
// })
/*potrzebna jeszcze walidacja daty*/
/*POBIERANIE DANYCH DLA INPUTU MIASTA*/

//Przy loadowaniu strony
let defaultCity = 'Wrocław';
window.addEventListener('load', async function(e){
    await Getdata(APIRequestByCityName('Wrocław'));
    console.log('logWindow');
    console.log(data);
    await createShortSection();
    createDetailedSection(defaultCity, data[0].dt);

});

//Po kliknięciu submita
sub.addEventListener('click', async function(e){
        const datas = await Getdata(APIRequestByCityName(placeInput.value));
        const errorInfo = document.getElementById("error-info");
        const weatherInfo = document.getElementById("weather-info");
        errorInfo.style.display = "none";
        weatherInfo.style.display = "none";
        console.log(datas);
        if(dataCode === "200")
        {
            await createShortSection();
            createDetailedSection(placeInput.value, data[0].dt);
            // console.log(datas);
            CreateCharts(datas);
            weatherInfo.style.display = "block";
        }
        else
        {
            errorInfo.style.display = "block";
            document.getElementById("error-type").innerHTML = dataCode;
            document.getElementById("error-message").innerHTML = datas;
        }

        // console.log(data);
/*trzeba również dodać wybór wg daty*/
/*trzeba rozważyć wszelakie błędy*/
/*trzeba upewnić sie, że zajdzie walidacja przed pobraniem danych*/

})
    

//Po kliknięciu kafelka

let weatherTiles = document.querySelectorAll('.short');
weatherTiles.forEach(tile=>{
    tile.addEventListener('click', weatherTileClick)
})