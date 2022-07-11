google.charts.load('current', { 'packages': ['timeline'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var container = document.getElementById('timeline');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'dummy bar label' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    // Date(year, month, day, hours, minutes, seconds, milliseconds)
    // #BFBFBF - Espera
    // #FF0000 - Bloqueado
    // #00B050 - Ejecución
    // #00B0F0 - Despachador
    dataTable.addRows([
        ['B', '', '#BFBFBF', new Date(0, 0, 0, 0, 0, 1, 0), new Date(0, 0, 0, 0, 0, 2, 0)],
        ['A', '', '#00B050', new Date(0, 0, 0, 0, 0, 20, 0), new Date(0, 0, 0, 0, 0, 23, 0)],
        ['A', '', '#BFBFBF', new Date(0, 0, 0, 0, 0, 5, 0), new Date(0, 0, 0, 0, 0, 20, 0)],
        ['A', '', '#FF0000', new Date(0, 0, 0, 0, 0, 3, 0), new Date(0, 0, 0, 0, 0, 5, 0)],
        ['A', '', '#00B050', new Date(0, 0, 0, 0, 0, 1, 0), new Date(0, 0, 0, 0, 0, 3, 0)],
        ['A', '', '#BFBFBF', new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 1, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 20, 0), new Date(0, 0, 0, 0, 0, 21, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 17, 0), new Date(0, 0, 0, 0, 0, 18, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 14, 0), new Date(0, 0, 0, 0, 0, 15, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 10, 0), new Date(0, 0, 0, 0, 0, 11, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 6, 0), new Date(0, 0, 0, 0, 0, 7, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 4, 0), new Date(0, 0, 0, 0, 0, 5, 0)],
        ['Dispatcher', '', '#00B0F0', new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 1, 0)]
    ]);

    var options = {
        tooltip : {trigger: 'none'},
    }
    
    chart.draw(dataTable, options);
}
