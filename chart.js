let x =[];
let y =[];

    function getChart(){
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
    
        data: {
            labels: x,
            datasets: [{
                label: 'Temperatura',
                fill: false,
                backgroundColor: '#bbb',
                borderColor: '#555',
                data: y 
            }]
        },
    
        options: {
           title:{
               display: true,
               text: 'Temperatura godzinowa',
               fontSize: 20
           },
           legend: {
            display: false
           
            }
        }
    });}

    