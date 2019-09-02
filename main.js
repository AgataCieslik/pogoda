/*WALIDACJA*/
const placeInput=document.getElementById('placeInput');
placeInput.addEventListener('input', function(e){
    const regW =/[^A-Za-z_]/ ;
    const matchError = regW.exec(this.value);
    if(matchError!==null){
        document.getElementById('messagesBar').style.display="block";
        document.getElementById('messages').style.display="block";
        document.getElementById('typingError').style.display="block";
    }
/*rozważyć polskie znaki!*/
});
/*potrzebna jeszcze walidacja daty*/
/*POBIERANIE DANYCH DLA INPUTU MIASTA*/

const sub=document.getElementById('submit');
sub.addEventListener('click',function(e){
    Getdata(APIRequestByCityName(placeInput.value));
/*trzeba również dodać wybór wg daty*/
/*trzeba rozważyć wszelakie błędy*/
})
