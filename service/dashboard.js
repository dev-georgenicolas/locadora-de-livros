
const returnsChart = document.getElementById('returnsChart');


new Chart(returnsChart, {
    type: 'bar',
    data: {
        labels: ['Atrasados', 'Dentro do Prazo'],
        datasets: [{
            label: 'Livros',
            data: [76, 46],
            backgroundColor: ['#cc0000', '#009966'],
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Status das Devoluções'
            }
        }
    }
});


const rentalsChart = document.getElementById('rentalsChart');

new Chart(rentalsChart, {
    type: 'pie',
    data: {
        labels: ['Ana', 'Carlos', 'João'],
        datasets: [{
            label: '',
            data: [20, 15, 10],
            borderWidth: 1,
            backgroundColor: ['#006666', '#008888', '#004344']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            position: 'bottom'
        }
    }
});

