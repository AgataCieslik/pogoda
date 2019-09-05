
let data = [];
function APIRequestByGeoCoordinates(lat, lon) 
{
    let  request =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=aa89918a50010961a10dfbbee0781cb1`;
    //let  request =  `http://api.openweathermap.org/data/2.5/forecast?qq=London,us&APPID=aa89918a50010961a10dfbbee0781cb1`;
    //api.openweathermap.org/data/2.5/forecast/daily?q=München,DE&cnt=8
    return request;
}

function APIRequestByCityName(city)
{
    return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=aa89918a50010961a10dfbbee0781cb1`
}
function KelvinToCelcjusz(K){
    const prec = 100;
    return Math.floor((K - 273.15)*prec)/prec;
}

async function Getdata(APIpromise){
    let data1 = [];
    var code = [];
    const values = [];
    const body = document.querySelector('body');
    await fetch(APIpromise)
        .then( response => response.json())
        .then (APIdata => {
            if(APIdata.cod !== "200")
                return APIdata.message;
            if(APIdata !== undefined)
            {
                //console.log(APIdata);
                data1.push(...APIdata.list);
            }
        });
        data1.map(x => {
            x.main.temp = KelvinToCelcjusz(x.main.temp);
            x.main.temp_max = KelvinToCelcjusz(x.main.temp_max);
            x.main.temp_min = KelvinToCelcjusz(x.main.temp_min);
        } );
    return data1;
    //console.log(data1)
}
function ActuallDate()
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
let date = new Date();
console.log(date);



const d = ActuallDate();
let dd = GetDataForDay(d, data)
//console.log(dd);