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
               text: 'Temperatura godzinowa [°C]',
               fontSize: 20
           },
           legend: {
            display: false
           
            }
        }
    });}

    function getChart2(){
        const ctx = document.getElementById('chart2').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
        
            data: {
                labels: x2,
                datasets: [{
                    label: 'Ciśnienie',
                    fill: false,
                    backgroundColor: '#bbb',
                    borderColor: '#555',
                    data: y2 
                }]
            },
        
            options: {
               title:{
                   display: true,
                   text: 'Ciśnienie [hPa]',
                   fontSize: 20
               },
               legend: {
                display: false
               
                }
            }
        });}
    
        function getChart3(){
            const ctx = document.getElementById('chart3').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
            
                data: {
                    labels: x3,
                    datasets: [{
                        label: 'Wilgotność',
                        fill: false,
                        backgroundColor: '#bbb',
                        borderColor: '#555',
                        data: y3 
                    }]
                },
            
                options: {
                   title:{
                       display: true,
                       text: 'Wilgotność [%]',
                       fontSize: 20
                   },
                   legend: {
                    display: false
                   
                    }
                }
            });}