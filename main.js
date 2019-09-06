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
const dateInput=document.getElementById('dateInput');
dateInput.addEventListener('input', function(e){
    let actualDate=new Date(Date.now()); 
    let inputDate= new Date(dateInput.value);
    let f=new Date(Date.now());
    f.setDate(f.getDate()+5);
    if(inputDate<actualDate || inputDate>f){
        // document.getElementById('messagesBar').style.display="block";
        messageSection.style.display="block";
        document.getElementById('dateError').style.display="block";
        errorsTypes.includes(2) ? null : errorsTypes.push(2); //dodaj błąd jeśli go nie ma
        sub.setAttribute('disabled', 'disabled');
    }
    else{
        document.getElementById('dateError').style.display="none";
        errorsTypes = errorsTypes.filter(err => err != 2);    // usun blad z tablicy
        if(errorsTypes.length == 0)  
        {
            messageSection.style.display="none";
            sub.removeAttribute('disabled');
        }    
    }
})
/*potrzebna jeszcze walidacja daty*/
/*POBIERANIE DANYCH DLA INPUTU MIASTA*/


sub.addEventListener('click', async function(e){
        await Getdata(APIRequestByCityName(placeInput.value));
        await createShortSection();
        //uwaga: gdzieś 8 września przestanie działać:
        createDetailedSection(1567771200);
/*trzeba również dodać wybór wg daty*/
/*trzeba rozważyć wszelakie błędy*/
/*trzeba upewnić sie, że zajdzie walidacja przed pobraniem danych*/

})
    