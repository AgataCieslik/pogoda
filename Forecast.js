
//funkcje pomocnicze
const dayName = (dayNr)=>{
    switch(dayNr){
        case 0:
            return 'Niedziela';
            break;
        case 1:
            return 'Poniedziałek';
            break;
        case 2:
            return 'Wtorek';
            break;
        case 3:
            return 'Środa';
            break;
        case 4:
            return 'Czwartek';
            break;
        case 5:
            return 'Piątek';
            break;
        case 6:
            return 'Sobota';
            break;
    }
}

const iconUrlfromId = (iconId)=>{
   return `http://openweathermap.org/img/wn/${iconId}@2x.png`
}

//utworzenie sekcji DetailedSection

const createDetailedSection = async (cityName, dataId)=>{
    let data = await Getdata(APIRequestByCityName(cityName));
    console.log(data);
    let moment = data.find(el => el.dt === dataId);
    //console.log(moment);
    let detailedForecast = {
        weatherDescription: moment.weather[0].description,
        weatherIcon: moment.weather[0].icon,
        temperature: moment.main.temp,
        pressure: moment.main.pressure,
        humidity: moment.main.humidity,
        windSpeed: moment.wind.speed,
        clouds: moment.clouds.all,
    }



    let detailDivs = document.querySelectorAll('#detail');
    
    detailDivs[0].innerHTML = `
    <figure>
        <img src="${iconUrlfromId(detailedForecast.weatherIcon)}"></img>
        <figcaption><b>${detailedForecast.weatherDescription}</b></figcaption>
        </figure>
        `
    detailDivs[1].innerHTML = `
    <figure>
        <i class="wi wi-thermometer"></i>
        <figcaption><b>Temperatura</b> ${detailedForecast.temperature}°C</figcaption>
    </figure>
    `
    detailDivs[2].innerHTML = `
    <figure>
    <i class="wi wi-barometer"></i>
        <figcaption><b>Ciśnienie</b> ${detailedForecast.pressure}hPa</figcaption>
    </figure>
    `
    detailDivs[3].innerHTML = `
    <figure>
    <i class="wi wi-humidity"></i>
        <figcaption><b>Wilgotność</b> ${detailedForecast.humidity}%</figcaption>
    </figure>
    `
    detailDivs[4].innerHTML = `
    <figure>
    <i class="wi wi-strong-wind"></i>
        <figcaption><b>Wiatr</b> ${detailedForecast.windSpeed}m/s</figcaption>
    </figure>
    `
    detailDivs[5].innerHTML = `
    <figure>
        <i class="wi wi-day-cloudy"></i>
        <figcaption><b>Zachmurzenie</b> ${detailedForecast.clouds}m/s</figcaption>
    </figure>
    `
    let forecastHeader = document.getElementById('detailedHeader');
    forecastHeader.innerHTML = `Dane dla miasta: ${cityName}     ${moment.dt_txt}`
}


//utworzenie sekcji ShortSection
const createShortSection = async (cityName)=>{
    let data = await Getdata(APIRequestByCityName(cityName));
    let next5days = [];

    
    let dayNr = -1;
    let previousMomentDay = -1;

    for(let i=0; i<data.length; i++){
        let currentMomentDay = new Date(data[i].dt_txt).getDate();
        if(currentMomentDay !== previousMomentDay){
            dayNr ++;
            next5days[dayNr] = [data[i]];
        }
        else{
            next5days[dayNr].push(data[i]);
        }
        
        previousMomentDay = currentMomentDay;

    }
    //console.log(next5days);
    //console.log(next5days.forEach(e=>console.log(e.map(f=>new Date(f.dt_txt).getDate()))))

    let shortData = {
        temperature: [],
        pressure: [],
        humidity: [],
        dayDate:[],
    }

    //console.log(data);


    for(let day of next5days){
        
        shortData.temperature.push(day.reduce((a,b)=>{return a+b.main.temp},0)/day.length);
        shortData.pressure.push(day.reduce((a,b)=>{return a+b.main.pressure},0)/day.length);
        shortData.humidity.push(day.reduce((a,b)=>{return a+b.main.humidity},0)/day.length);

        let dayWeek = new Date(day[0].dt_txt).getDay();
        let dayMonth = new Date(day[0].dt_txt).getDate();
        if(dayMonth<10) dayMonth = '0' + dayMonth;
        let month = new Date(day[0].dt_txt).getMonth()+1;
        if(month<10) month = '0' + month;
        
        shortData.dayDate.push(`${dayName(dayWeek)}<br>${dayMonth}.${month}`)
        
    }

    console.log(shortData);

    for(let factor in shortData){
        if (factor !== 'dayDate') shortData[factor] = shortData[factor].map(el=>el.toFixed(1));
    }

    //console.log(shortData);
    let shortTemperatureTags = document.querySelectorAll('.shortTemperature');
    let shortPressureTags = document.querySelectorAll('.shortPressure');
    let shortHumidityTags = document.querySelectorAll('.shortHumidity');
    let shortImages = document.querySelectorAll('.shortImg');
    let shortHeaders = document.querySelectorAll('.shortHeader');
    let shortFigCaptions = document.querySelectorAll('#short figcaption')

    //console.log('shortCaptions');
    //console.log(shortFigCaptions);

    const middleArrEl = (arr)=>{
        if (arr.length%2 === 0) return arr[arr.length/2-1];
        if (arr.length%2 === 1) return arr[(arr.length+1)/2-1];
    }

    //console.log(next5days);

    let imgIds = next5days.map(day=>{
        return middleArrEl(day).weather[0].icon;
    })

    //console.log(imgIds);

    let weatherDescriptions = next5days.map(day=>{
        return middleArrEl(day).weather[0].description;
    })

    //console.log(weatherDescriptions);

    for(let i=0; i<5; i++){
        shortTemperatureTags[i].innerHTML = `${shortData.temperature[i]}°C`;
        shortPressureTags[i].innerHTML = `${shortData.pressure[i]}hPa`;
        shortHumidityTags[i].innerHTML = `${shortData.humidity[i]}%`;
        shortHeaders[i].innerHTML = shortData.dayDate[i];

        
        shortImages[i].src = iconUrlfromId(imgIds[i]);
        shortFigCaptions[i].innerHTML = weatherDescriptions[i];
    }




}


createShortSection('Dzierżoniów');
createDetailedSection('Dzierżoniów', 1567771200);