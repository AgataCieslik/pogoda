
let data = [];
function APIRequestByGeoCoordinates(lat, lon) 
{
    let  request =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=aa89918a50010961a10dfbbee0781cb1`;
    //let  request =  `http://api.openweathermap.org/data/2.5/forecast/daily?q=München,DE&APPID=aa89918a50010961a10dfbbee0781cb1`;
    //api.openweathermap.org/data/2.5/forecast/daily?q=München,DE&cnt=8
    return request;
}

function KelvinToCelcjusz(K){
    const prec = 100;
    return Math.floor((K - 273.15)*prec)/prec;
}

function Getdata(){
    let code; 
    const values = [];
    const body = document.querySelector('body');

    body.style.background = "gray";

    const APIPromise = APIRequestByGeoCoordinates(54.1722, 15.5388);

    fetch(APIPromise)
        .then( response => response.json())
        .then (APIdata => {
            APIdata.list.map(x => {
                x.main.temp = KelvinToCelcjusz(x.main.temp);
                x.main.temp_max = KelvinToCelcjusz(x.main.temp_max);
                x.main.temp_min = KelvinToCelcjusz(x.main.temp_min);
            } );
            console.log(APIdata);
            code = APIdata.cod;
            values.push(...APIdata.list);
            console.log(code);
        });    
    return values;
}
data = Getdata();
console.log(data);