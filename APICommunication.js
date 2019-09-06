
let data = [];
let dataCode = 0;
function APIRequestByGeoCoordinates(lat, lon) 
{
    let  request =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=aa89918a50010961a10dfbbee0781cb1&units=metric`;
    return request;
}
function correctPolishLetters (string) {
    var dict = {'ą':'a','ć':'c','ę':'e','ł':'l','ń':'n','ó':'o','ś':'s','ź':'z','ż':'z'};
    return string.replace(/[ąćęłńóśźż]/g, match => dict[match]);
  }

function APIRequestByCityName(city)
{
    city=correctPolishLetters(city);
    return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang={pl}&APPID=aa89918a50010961a10dfbbee0781cb1`
}
/*Język przestawiony w api na polski (&lang={pl}), ale nie zawuażyłam zmiany */

async function Getdata(APIpromise){
    let errorMessage = "";
    dataCode = 0;
    data = [];
    const body = document.querySelector('body');
    await fetch(APIpromise)
        .then( response => response.json())
        .then (APIdata => {
            dataCode = APIdata.cod;
            if(dataCode !== "200")
            {
                errorMessage = APIdata.message;
                return;   
            }
            if(APIdata !== undefined)
            {
                data.push(...APIdata.list);
                // przykładowe dane do wykresu - Mateusz
                
            }
        })
       /*nieprzetestowanie 
        .catch(error=>{
            console.log('error');
            document.getElementById('messages').style.display="block";
            document.getElementById('APIError').style.display="block";
        })*/
        if(dataCode !== "200")
            return errorMessage;
        return data;
}
function ActualDate()
{
    const date = new Date();
    const noMonth = date.getMonth() + 1;
    const noDay = date.getDate();
    const month = noMonth >= 10 ? noMonth : `0${noMonth}`;
    const day = noDay >= 10 ? noDay : `0${noDay}`;
    return `${date.getFullYear()}-${month}-${day}`;
}

function GetDataForDay(date, table)
{
    //d.dt_txt.includes(date)
    //console.log(table);
    //console.log(date);
    return table.filter(q => q.dt_txt.includes(date));
}



 //Getdata(APIRequestByCityName('London'));
//console.log(data);
//console.log(data);
/*let date = new Date();
console.log(date);



const d = ActuallDate();
let dd = GetDataForDay(d, data)*/

