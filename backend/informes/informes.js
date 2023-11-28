// Agrega la referencia a la biblioteca Moment.js
document.addEventListener('DOMContentLoaded', () => {
    // Puedes realizar algunas configuraciones adicionales si es necesario
});

Chart.register({
    id: 'moment',
    beforeInit: function(chart) {
        const { ctx, data, options } = chart;
        if (options.scales.x.type === 'time' && options.scales.x.time && options.scales.x.time.parser) {
            options.scales.x._realtime = {
                parser: options.scales.x.time.parser,
                unit: options.scales.x.time.unit,
                round: options.scales.x.time.round,
                isoWeekday: options.scales.x.time.isoWeekday,
            };
            options.scales.x.time.parser = function(date) {
                return moment(date, options.scales.x._realtime.parser);
            };
        }
        Chart.controllers.line.prototype.beforeDatasetsDraw.call(chart);
    }
});

function buscarInformes() {
    const fechaDesde = document.getElementById('fechaDesde').value;
    const fechaHasta = document.getElementById('fechaHasta').value;

    // Validar que las fechas estén seleccionadas
    if (fechaDesde === '' || fechaHasta === '') {
        alert('Por favor, seleccione las fechas de inicio y fin.');
        return;
    }

    fetch(`obtener_informes.php?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`)
        .then(response => response.json())
        .then(data => {
            // Llamar a una función para generar el gráfico con los datos obtenidos
            generarGrafico(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function generarGrafico(data) {
    const ctx = document.getElementById('grafico').getContext('2d');

    // Verificar si data es un array antes de intentar mapear
    if (!Array.isArray(data)) {
        console.error('Error: Los datos recibidos no son un array.');
        return;
    }

    const ingresos = data.map(item => item.ingresos);
    const gastos = data.map(item => item.gastos);
    const fechas = data.map(item => item.fecha);

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [
                {
                    label: 'Ingresos',
                    data: ingresos,
                    borderColor: 'green',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Gastos',
                    data: gastos,
                    borderColor: 'red',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    title: {
                        display: true,
                        text: 'Fechas'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Monto ($)'
                    }
                }
            }
        }
    });
}
