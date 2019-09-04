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
/*rozważyć polskie znaki?-w api id jest bz polskich znaków*/
});
const dateInput=document.getElementById('dateInput');
dateInput.addEventListener('input', function(e){
    let ad=new Date(Date.now());
    let d= new Date(dateInput.value);
    let f=new Date(Date.now());
    f.setDate(f.getDate()+5);
    if(d<ad || d>f){
        document.getElementById('messagesBar').style.display="block";
        document.getElementById('messages').style.display="block";
        document.getElementById('dateError').style.display="block";
    }
})
/*potrzebna jeszcze walidacja daty*/
/*POBIERANIE DANYCH DLA INPUTU MIASTA*/

const sub=document.getElementById('submit');
    sub.addEventListener('click',function(e){
        Getdata(APIRequestByCityName(placeInput.value));
/*trzeba również dodać wybór wg daty*/
/*trzeba rozważyć wszelakie błędy*/
})
