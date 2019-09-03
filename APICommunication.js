
let data = [];
function APIRequestByGeoCoordinates(lat, lon) 
{
    let  request =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=aa89918a50010961a10dfbbee0781cb1&units=metric`;
    //let  request =  `http://api.openweathermap.org/data/2.5/forecast?qq=London,us&APPID=aa89918a50010961a10dfbbee0781cb1`;
    //api.openweathermap.org/data/2.5/forecast/daily?q=München,DE&cnt=8
    return request;
}

function APIRequestByCityName(city)
{
    return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=aa89918a50010961a10dfbbee0781cb1&units=metric`
}
function KelvinToCelcjusz(K){
    const prec = 100;
    return Math.floor((K - 273.15)*prec)/prec;
}

async function Getdata(APIpromise){
    var code = [];
    const values = [];
    const body = document.querySelector('body');

    body.style.background = "gray";
    await fetch(APIpromise)
        .then( response => response.json())
        .then (APIdata => {
            if(APIdata.cod !== "200")
                return APIdata.message;
            if(APIdata !== undefined)
            {

                data.push(...APIdata.list);
                // przykładowe dane do wykresu - Mateusz
                x=[];
                y=[];
                for(let i=0; i<10; i++){

                    x.push(APIdata.list[i].dt_txt.substr(0,16));
                    y.push(APIdata.list[i].main.temp);
                };
                getChart();

                x2=[];
                y2=[];
                for(let i=0; i<10; i++){
                    x2.push(APIdata.list[i].dt_txt.substr(0,16));
                    y2.push(APIdata.list[i].main.pressure);
                };
                getChart2();

                x3=[];
                y3=[];
                for(let i=0; i<10; i++){
                    x3.push(APIdata.list[i].dt_txt.substr(0,16));
                    y3.push(APIdata.list[i].main.humidity);
                };
                getChart3();
                // 
            }
        });
        data.map(x => {
            x.main.temp = KelvinToCelcjusz(x.main.temp);
            x.main.temp_max = KelvinToCelcjusz(x.main.temp_max);
            x.main.temp_min = KelvinToCelcjusz(x.main.temp_min);
        } );
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
    console.log(table);
    console.log(date);
    return table.filter(q => q.dt_txt.includes(date));
}



 Getdata(APIRequestByCityName('London'));
//console.log(data);
//console.log(data);
let date = new Date();
//console.log(date);



const d = ActuallDate();
let dd = GetDataForDay(d, data)
console.log(dd);