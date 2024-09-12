$(document).ready(function (e) {
    debugger;

    var dados = [];

    var recebe_total_clientes = "";
    var recebe_total_vendas = "";
    var recebe_vendas_vencer = "";
    var recebe_vendas_vh = "";

    recebe_total_clientes = $.ajax({
        url: "../api/ClienteAPI.php",
        dataType: "json",
        type: "get",
        data: {
            processo_cliente: "recebe_consultar_total_clientes",
        },
        success: function (retorno_cliente) {
            debugger;
            dados.push({
                value: retorno_cliente,
                name: "Clientes"
            });
        },
        error: function (xhr, status, error) {

        },
    });

    recebe_total_vendas = $.ajax({
        url: "../api/VendaAPI.php",
        dataType: "json",
        type: "get",
        data: {
            processo_venda: "recebe_consultar_total_vendas",
        },
        success: function (retorno_venda) {
            debugger;

            dados.push({
                value: retorno_venda,
                name: "Vendas"
            });
        },
        error: function (xhr, status, error) {

        },
    });

    recebe_vendas_vencer = $.ajax({
        url: "../api/VendaAPI.php",
        dataType: "json",
        type: "get",
        data: {
            processo_venda: "recebe_consultar_vendas_vencer",
        },
        success: function (retorno_venda_vencer) {
            let recebe_quantidade_vendas_vencer = retorno_venda_vencer.length;
            dados.push({
                value: recebe_quantidade_vendas_vencer,
                name: "A Vencer"
            });
        },
        error: function (xhr, status, error) {

        },
    });

    recebe_vendas_vh = $.ajax({
        url: "../api/VendaAPI.php",
        dataType: "json",
        type: "get",
        data: {
            processo_venda: "recebe_consultar_vendas_vencer_hoje",
        },
        success: function (retorno_venda_vencer_hoje) {
            let recebe_quantidade_vendas_vencer_hoje = retorno_venda_vencer_hoje.length;
            dados.push({
                value: recebe_quantidade_vendas_vencer_hoje,
                name: "Vencidas"
            });
        },
        error: function (xhr, status, error) {

        },
    });

    $.when(recebe_total_clientes, recebe_total_vendas, recebe_vendas_vencer, recebe_vendas_vh).done(function () {
        debugger;

        echarts.init(document.querySelector("#trafficChart")).setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [{
                name: 'Informações',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: dados
            }]
        });
    });

    let recebe_vendas_totais_meses = "";

    let numeros = [0,0,0,0,0,0,0,0,0,0,0,0];

    recebe_vendas_totais_meses = $.ajax({
        url: "../api/VendaAPI.php",
        dataType: "json",
        type: "get",
        data: {
            processo_venda: "recebe_consultar_total_vendas_meses",
        },
        success: function (retorno_totais_vendas_meses) {
            debugger;

            let totalVendas = 0;

            for (let index = 0; index < retorno_totais_vendas_meses.length; index++) {

                if (retorno_totais_vendas_meses[index].mes === 1) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[0] = totalVendas;
                    } else {
                        numeros[0] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 2) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[1] = totalVendas;
                    } else {
                        numeros[1] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 3) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[2] = totalVendas;
                    } else {
                        numeros[2] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 4) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[3] = totalVendas;
                    } else {
                        numeros[3] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 5) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[4] = totalVendas;
                    } else {
                        numeros[4] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 6) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[5] = totalVendas;
                    } else {
                        numeros[5] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 7) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[6] = totalVendas;
                    } else {
                        numeros[6] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 8) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[7] = totalVendas;
                    } else {
                        numeros[7] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 9) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[8] = totalVendas;
                    } else {
                        numeros[8] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 10) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[9] = totalVendas;
                    } else {
                        numeros[9] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 11) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[10] = totalVendas;
                    } else {
                        numeros[10] = totalVendas;
                    }
                } else if (retorno_totais_vendas_meses[index].mes === 12) {
                    if (retorno_totais_vendas_meses[index].total_vendas > 0) {
                        totalVendas = retorno_totais_vendas_meses[index].total_vendas;
                        numeros[11] = totalVendas;
                    } else {
                        numeros[11] = totalVendas;
                    }
                }

                console.log(numeros);
            }
        },
        error: function (xhr, status, error) {

        },
    });

    $.when(recebe_vendas_totais_meses).done(function () {
        new Chart(document.querySelector('#barChart'), {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: 'Vendas',
                    data: numeros,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
});