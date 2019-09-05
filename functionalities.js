const showHide = document.querySelectorAll('.showHide');
const content = document.querySelectorAll('.content');
const close = document.querySelector('.close');
const help = document.querySelector('#help');
const warning = document.querySelector('.warningZone');
const placeInput = document.querySelector('#placeInput');
const btn= document.getElementById('placeCheck');
const input=document.getElementById('searchCity');


for (let i=0; i<showHide.length; i++){
    showHide[i].onclick = function(){
        let content = this.parentElement.nextElementSibling;
        if(content.style.maxHeight){
            content.style.maxHeight = null;
            this.classList.remove('isOpen');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            this.classList.add('isOpen');
        }

    }
}
btn.addEventListener('click', ()=>{
    let city = input.value;
    Getdata(APIRequestByCityName(city))
});

placeInput.addEventListener('click', function(){
    warning.classList.add('hidden')
})

close.addEventListener('click', function(){
    warning.classList.add('hidden')
})

help.addEventListener('click', function(){
    warning.classList.remove('hidden');
})

console.log(showHide)

