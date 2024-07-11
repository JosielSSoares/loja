$(document).ready(function () {
  let url_venda = window.location.href;

  if (
    url_venda === "http://localhost/loja/visao/index.php?pagina=cadastro_venda"
  ) {
    let recebeTabelaCadastrarVendas = document.querySelector(
      "#listagem-produtos-venda"
    );
    recebeTabelaCadastrarVendas.innerHTML +=
      "<tr><td colspan='7' style='text-align:center;'>Nenhum registro adicionado</td></tr>";
    $("#listagem-produtos-venda").append(recebeTabelaCadastrarVendas);

    $("#exibe-informacao-qtd-produtos-estoque").hide();
    $("#exibe-desconto-venda").hide();
    $("#data-pagamento-agendado").hide();
    $("#recebe-mensagem-cadastro-realizado-venda").hide();
    $("#recebe-mensagem-campo-falha-cadastro-venda").hide();
    $("#recebe-mensagem-quantidade-acima-venda").hide();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").hide();
    $("#recebe-mensagem-campo-vazio-buscar-venda").hide();
    debugger;

    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ClienteAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_cliente: "recebe_consultar_clientes_para_venda",
      },
      //   beforeSend: function () {
      //     debugger;
      //     $("#registros-clientes").html("");
      //     $("#registros-clientes").append(
      //       "<td colspan='5' class='text-center'>Carregando dados</td>"
      //     );
      //     $("#registros-clientes").html("");
      //   },
      success: function (retorno_clientes) {
        debugger;
        if (retorno_clientes.length > 0) {
          $("#lista-cliente").html("");
          $("#lista-cliente").append(
            "<option value='selecione'>Selecione</option>"
          );
          $.each(retorno_clientes, function (i, element) {
            $("#lista-cliente").append(
              "<option value=" +
                element.codigo_cliente +
                ">" +
                element.nome_cliente +
                "</option>"
            );
          });
        } else {
          $("#lista-cliente").html("");
          $("#lista-cliente").append(
            "<option value='selecione'>Selecione</option>"
          );
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-falha-buscar-clientes-filtro").html(
          "Falha ao buscar clientes:" + error
        );
        $("#recebe-mensagem-falha-buscar-clientes-filtro").show();
        $("#recebe-mensagem-falha-buscar-clientes-filtro").fadeOut(4000);
      },
    });
  } else if (
    url_venda === "http://localhost/loja/visao/index.php?pagina=consulta_venda"
  ) {
    $("#recebe-mensagem-campo-vazio-buscar-venda").hide();
    $("#recebe-mensagem-campo-falha-buscar-venda").hide();
    $("#recebe-mensagem-exclusao-realizada-venda").hide();
    $("#recebe-mensagem-campo-falha-exclusao-venda").hide();
    $("#recebe-mensagem-campo-falha-buscar-cliente").hide();
    $("#recebe-mensagem-campo-vazio-busca-venda").hide();

    listarVendas("todos_venda", "todos_venda");

    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ClienteAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_cliente: "recebe_consultar_clientes",
        filtro_cliente: "todos",
        valor_filtro_cliente: "todos",
      },
      success: function (retorno_clientes) {
        debugger;
        if (retorno_clientes.length > 0) {
          $("#lista-cliente-venda").html("");
          $("#lista-cliente-venda").append(
            "<option value='selecione'>Selecione</option>"
          );
          $.each(retorno_clientes, function (i, element) {
            $("#lista-cliente-venda").append(
              "<option value=" +
                element.codigo_cliente +
                ">" +
                element.nome_cliente +
                "</option>"
            );
          });
        } else {
          $("#lista-cliente-venda").html("");
          $("#lista-cliente-venda").append(
            "<option value='selecione'>Selecione</option>"
          );
        }
      },
      error: function (xhr, status, error) {},
    });
  }
});

let recebeNomeProdutoGravar = "";
let recebeQTDEstoqueProduto = 0;
let recebeValorProdutoEstoque = 0;
let recebeValorSFP = "";
$("#lista-produto").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeValorSFP = $(this).val();

  $.ajax({
    //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
    url: "../api/ProdutoAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_produto:
        "recebe_consultar_produto_especifico_qtd_produtos_estoque",
      valor_codigo_produto_especifico_qtdpe: recebeValorSFP,
    },
    success: function (retorno_produto) {
      debugger;
      if (retorno_produto.length > 0) {
        for (let index = 0; index < retorno_produto.length; index++) {
          recebeQTDEstoqueProduto = retorno_produto[index].estoque_produto;
          recebeNomeProdutoGravar = retorno_produto[index].nome_produto;

          let recebeValorProdutoBR =
            retorno_produto[index].valor_produto.toString();

          recebeValorProdutoEstoque =
            "R$" + recebeValorProdutoBR.replace(".", ",");
        }

        $("#valor-final-venda").val(recebeValorProdutoEstoque);
        $("#informacao-qtd-produtos-estoque").html(
          "Quantidade em estoque:" + recebeQTDEstoqueProduto
        );
        $("#exibe-informacao-qtd-produtos-estoque").show();
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
});

let recebeNomeClienteSelecionado = "";
let recebeCodigoClienteGravar = 0;
$("#lista-cliente").change(function (e) {
  e.preventDefault();

  debugger;

  recebeCodigoClienteGravar = parseInt($(this).val());

  $.ajax({
    //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
    url: "../api/ClienteAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_cliente: "recebe_consultar_cliente_especifico",
      valor_codigo_cliente: recebeCodigoClienteGravar,
    },
    success: function (retorno_cliente) {
      debugger;
      if (retorno_cliente != "") {
        recebeNomeClienteSelecionado = retorno_cliente.nome_cliente;
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
});

let recebeValorDescontoV = "";

$("#lista-desconto-venda").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeValorSDV = $(this).val();

  recebeValorDescontoV = recebeValorSDV;

  if (recebeValorSDV === "sim") {
    $("#exibe-desconto-venda").show();
  } else {
    $("#exibe-desconto-venda").hide();
    $("#valor-final-venda").val(recebeValorProdutoEstoque);
  }
});

let recebeValorAgendamentoPagamento = "";

$("#lista-agendar-pagamento").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeValorAPV = $(this).val();

  recebeValorAgendamentoPagamento = recebeValorAPV;

  if (recebeValorAPV === "sim") {
    $("#data-pagamento-agendado").show();
  } else {
    $("#data-pagamento-agendado").hide();
  }
});

$(document).on("focus", "#desconto-produto-venda", function (e) {
  e.preventDefault();

  $(this).maskMoney({
    prefix: "R$",
    thousands: ".",
    decimal: ",",
  });
});

$("#quantidade-produto-venda").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeQTDInformadaV = $(this).val();

  if (recebeQTDInformadaV > recebeQTDEstoqueProduto) {
    $("#recebe-mensagem-quantidade-acima-venda").html(
      "Quantidade de produtos informados para venda maior que quantidade em estoque"
    );
    $("#recebe-mensagem-quantidade-acima-venda").show();
    $("#recebe-mensagem-quantidade-acima-venda").fadeOut(4000);
  }
});

let recebeValorNumericoDescontoVenda = "";

//let recebeValorStringDescontoVenda = "";

//let valorFinalVP = 0;
$("#desconto-produto-venda").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeValorDescontoVenda = $(this).val();

  if (recebeValorDescontoVenda != "") {
    let recebeValorFinalV = $("#valor-final-venda").val();

    let recebeVFProdutoCortado = recebeValorFinalV.split("R$");

    let recebeVProdutoNumerico = recebeVFProdutoCortado[1];

    let recebeVProdutoFinalNumerico = recebeVProdutoNumerico.replace(/,/g, ".");

    // Substituir o último ponto por um caractere temporário
    let tempStr = recebeVProdutoFinalNumerico.replace(/\.(?=[^.]*$)/, "TEMP");

    // Remover todos os outros pontos
    tempStr = tempStr.replace(/\./g, "");

    // Substituir o caractere temporário pelo ponto decimal
    let decimalStr = tempStr.replace("TEMP", ".");

    // Converter para número decimal
    let valorFinalVP = parseFloat(decimalStr);

    let recebeVDescontoProdutoCortado = recebeValorDescontoVenda.split("R$");

    let recebeVDescontoProdutoNumerico = recebeVDescontoProdutoCortado[1];

    let recebeVDescontoProdutoFinalNumerico =
      recebeVDescontoProdutoNumerico.replace(/,/g, ".");

    // Substituir o último ponto por um caractere temporário
    let tempDescontoStr = recebeVDescontoProdutoFinalNumerico.replace(
      /\.(?=[^.]*$)/,
      "TEMP"
    );

    // Remover todos os outros pontos
    tempDescontoStr = tempDescontoStr.replace(/\./g, "");

    // Substituir o caractere temporário pelo ponto decimal
    let decimalDescontoStr = tempDescontoStr.replace("TEMP", ".");

    // Converter para número decimal
    let valorDescontoFinalVP = parseFloat(decimalDescontoStr);

    let recebeValorFPDesconto = valorFinalVP - valorDescontoFinalVP;

    let recebeValorProdutoBRDesconto = recebeValorFPDesconto.toString();

    let recebeValorProdutoBRFinal =
      "R$" + recebeValorProdutoBRDesconto.replace(".", ",");

    $("#valor-final-venda").val(recebeValorProdutoBRFinal);

    recebeValorNumericoDescontoVenda = valorDescontoFinalVP;
  }
});

let listaNomeProdutosGravarV = Array();
let listaNomeClientesGravarV = Array();
let listaQuantidadeV = Array();
let listaDescontoV = Array();
let listaValorDescontoV = Array();
let listaValorTotalV = Array();
let listaPagoV = Array();
let listaPagamentoAgendadoV = Array();
let listaDataPagamentoV = Array();
let listaCodigoClienteV = Array();

$("#adicionar-item-venda").click(function (e) {
  debugger;
  e.preventDefault();

  let recebeNomeProdutoSV = $("#lista-produto").val();

  let recebeNomeSCV = recebeNomeClienteSelecionado;

  let recebeQTDPV = $("#quantidade-produto-venda").val();

  let recebeDescontoProdutoSV = $("#lista-desconto-venda").val();

  let recebeValorFinalV = $("#valor-final-venda").val();

  let recebePagoSPV = $("#lista-pago-venda").val();

  let recebeAgendarSPV = $("#lista-agendar-pagamento").val();

  let recebeDataPagamentoAgendadoBR = "";
  let recebeDataPagamentoAmericano = "";
  if (recebeAgendarSPV === "sim") {
    let recebeDataPagamentoAgendadoSV = $("#data-agendamento-pagamento").val();

    recebeDataPagamentoAgendadoBR = recebeDataPagamentoAgendadoSV
      .split("-")
      .reverse()
      .join("/");

    recebeDataPagamentoAmericano = recebeDataPagamentoAgendadoSV
      .split("/")
      .reverse()
      .join("-");
  } else {
    recebeDataPagamentoAgendadoBR = "Não informado";
  }

  let primeiraLinha = $("#tabela-listagem-venda tbody tr").first();

  if (primeiraLinha.find("td").eq(0).text() === "Nenhum registro adicionado")
    $("#listagem-produtos-venda").html("");

  if (recebeNomeProdutoSV === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor selecionar o produto para venda"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else if (recebeNomeSCV === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor selecionar o cliente para venda"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else if (recebeQTDPV === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor preencher a quantidade de produtos para venda"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else if (recebeDescontoProdutoSV === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor selecionar o desconto para venda"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else if (recebePagoSPV === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor selecionar se a venda foi paga ou não"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else {
    let recebeDescontoFinalVenda = "";

    //let recebeValorDescontoProdutoBRFinal = "";

    let recebeFinalVendaSemDesconto = "";

    let valorDescontoFinalVP = 0;
    let valorFinalVP = 0;
    if (
      $("#desconto-produto-venda").val() != "" &&
      recebeDescontoProdutoSV === "sim"
    ) {
      recebeDescontoFinalVenda = $("#valor-final-venda").val();

      let recebeVFProdutoCortado = recebeDescontoFinalVenda.split("R$");

      let recebeVProdutoNumerico = recebeVFProdutoCortado[1];

      let recebeVProdutoFinalNumerico = recebeVProdutoNumerico.replace(
        /,/g,
        "."
      );

      // Substituir o último ponto por um caractere temporário
      let tempStr = recebeVProdutoFinalNumerico.replace(/\.(?=[^.]*$)/, "TEMP");

      // Remover todos os outros pontos
      tempStr = tempStr.replace(/\./g, "");

      // Substituir o caractere temporário pelo ponto decimal
      let decimalStr = tempStr.replace("TEMP", ".");

      // Converter para número decimal
      valorFinalVP = parseFloat(decimalStr);

      let recebeVDescontoProdutoCortado = "";
      recebeVDescontoProdutoCortado = $("#desconto-produto-venda")
        .val()
        .split("R$");

      let recebeVDescontoProdutoNumerico = recebeVDescontoProdutoCortado[1];

      let recebeVDescontoProdutoFinalNumerico =
        recebeVDescontoProdutoNumerico.replace(/,/g, ".");

      // Substituir o último ponto por um caractere temporário
      let tempDescontoStr = recebeVDescontoProdutoFinalNumerico.replace(
        /\.(?=[^.]*$)/,
        "TEMP"
      );

      // Remover todos os outros pontos
      tempDescontoStr = tempDescontoStr.replace(/\./g, "");

      // Substituir o caractere temporário pelo ponto decimal
      let decimalDescontoStr = tempDescontoStr.replace("TEMP", ".");

      // Converter para número decimal
      valorDescontoFinalVP = parseFloat(decimalDescontoStr);

      let recebeValorFPDesconto = valorFinalVP - valorDescontoFinalVP;

      let recebeValorProdutoBRDesconto = recebeValorFPDesconto.toString();

      recebeValorDescontoProdutoBRFinal =
        "R$" + recebeValorProdutoBRDesconto.replace(".", ",");
    } else {
      recebeFinalVendaSemDesconto = recebeValorFinalV;

      let recebeVFProdutoCortado = recebeFinalVendaSemDesconto.split("R$");

      let recebeVProdutoNumerico = recebeVFProdutoCortado[1];

      let recebeVProdutoFinalNumerico = recebeVProdutoNumerico.replace(
        /,/g,
        "."
      );

      // Substituir o último ponto por um caractere temporário
      let tempStr = recebeVProdutoFinalNumerico.replace(/\.(?=[^.]*$)/, "TEMP");

      // Remover todos os outros pontos
      tempStr = tempStr.replace(/\./g, "");

      // Substituir o caractere temporário pelo ponto decimal
      let decimalStr = tempStr.replace("TEMP", ".");

      // Converter para número decimal
      valorFinalVP = parseFloat(decimalStr);
    }

    let recebeValorDescontoVendaFinal = "";
    let recebeValorBooleanoDescontoVendaFinal = "";
    let recebeValorDescontoVendaFinalString = "";
    if (
      $("#desconto-produto-venda").val() != "" &&
      recebeDescontoProdutoSV === "sim"
    ) {
      recebeValorDescontoVendaFinal = $("#desconto-produto-venda").val();
      recebeValorDescontoVendaFinalString = "Sim";
      recebeValorBooleanoDescontoVendaFinal = 1;
    } else {
      recebeValorDescontoVendaFinal = "Não Informado";
      recebeValorDescontoVendaFinalString = "Não";
      recebeValorBooleanoDescontoVendaFinal = 0;
    }

    let recebePagoVendaBooleanoFinal = "";
    let recebePagoVendaFinalString = "";
    if (recebePagoSPV === "sim") {
      recebePagoVendaFinalString = "Sim";
      recebePagoVendaBooleanoFinal = 1;
    } else {
      recebePagoVendaFinalString = "Não";
      recebePagoVendaBooleanoFinal = 0;
    }

    let recebeAgendarPagamentoBooleanoFinal = "";
    let recebeAgendarPagamentoStringFinal = "";
    if (recebeAgendarSPV === "sim") {
      recebeAgendarPagamentoStringFinal = "Sim";
      recebeAgendarPagamentoBooleanoFinal = 1;
    } else {
      recebeAgendarPagamentoStringFinal = "Não Informado";
      recebeAgendarPagamentoBooleanoFinal = 0;
    }

    listaNomeProdutosGravarV.push(recebeNomeProdutoGravar);
    listaNomeClientesGravarV.push(recebeNomeSCV);
    listaQuantidadeV.push(recebeQTDPV);
    listaDescontoV.push(recebeValorBooleanoDescontoVendaFinal);
    listaValorDescontoV.push(valorDescontoFinalVP);
    listaValorTotalV.push(valorFinalVP);
    listaPagoV.push(recebePagoVendaBooleanoFinal);
    listaPagamentoAgendadoV.push(recebeAgendarPagamentoBooleanoFinal);
    listaDataPagamentoV.push(recebeDataPagamentoAmericano);
    listaCodigoClienteV.push(recebeCodigoClienteGravar);

    let linha = $("<tr></tr>");
    let colunaNomeProdutoSV = $("<td></td>").text(recebeNomeProdutoGravar);
    let colunaNomeClienteSV = $("<td></td>").text(recebeNomeSCV);
    let colunaQuantidadeProdutosV = $("<td></td>").text(recebeQTDPV);
    let colunaDescontoVendaValorDescontoVenda = $("<td></td>").text(
      recebeValorDescontoVendaFinalString + " -" + recebeValorDescontoVendaFinal
    );
    let colunaValorFinalVenda = $("<td></td>").text(recebeValorFinalV);
    let colunaPagoVenda = $("<td></td>").text(recebePagoVendaFinalString);
    let colunaAgendadoPagamentoDataPagamentoVenda = $("<td></td>").text(
      recebeAgendarPagamentoStringFinal + " - " + recebeDataPagamentoAgendadoBR
    );

    linha.append(colunaNomeProdutoSV);
    linha.append(colunaNomeClienteSV);
    linha.append(colunaQuantidadeProdutosV);
    linha.append(colunaDescontoVendaValorDescontoVenda);
    linha.append(colunaValorFinalVenda);
    linha.append(colunaPagoVenda);
    linha.append(colunaAgendadoPagamentoDataPagamentoVenda);

    $("#listagem-produtos-venda").append(linha);

    // let recebeListaProduto = document.querySelector("#lista-produto");

    // recebeListaProduto.selectedIndex = 0;

    // $("#quantidade-produto-venda").val("");

    // let recebeListaDesconto = document.querySelector("#lista-desconto-venda");

    // recebeListaDesconto.selectedIndex = 0;

    // $("#desconto-produto-venda").val("");

    // $("#valor-final-venda").val("");

    // let recebeListaPago = document.querySelector("#lista-pago-venda");

    // recebeListaPago.selectedIndex = 0;

    // let recebeListaPagamentoAgendado = document.querySelector("#lista-agendar-pagamento");

    // recebeListaPagamentoAgendado.selectedIndex = 0;

    // $("#data-agendamento-pagamento").val("");

    // $("#informacao-qtd-produtos-estoque").html("");
  }
});

$("#cadastro-venda").click(function (e) {
  e.preventDefault();

  debugger;

  let primeiraLinha = $("#tabela-listagem-venda tbody tr").first();

  if (primeiraLinha.find("td").eq(0).text() === "Nenhum registro adicionado") {
  } else {
    $.ajax({
      url: "../api/VendaAPI.php",
      type: "post",
      dataType: "json",
      data: {
        valor_nomeprodutov: listaNomeProdutosGravarV,
        valor_nomeclientev: listaNomeClientesGravarV,
        valor_quantidadeprodutov: listaQuantidadeV,
        valor_selecionado_descontov: listaDescontoV,
        valor_descontoprodutov: listaValorDescontoV,
        valor_finalv: listaValorTotalV,
        valor_selecionado_pagov: listaPagoV,
        valor_pagamentoagendadov: listaPagamentoAgendadoV,
        valor_datapagamentov: listaDataPagamentoV,
        valor_codigocv: listaCodigoClienteV,
        processo_venda: "recebe_cadastro_venda",
      },
      success: function (retorno) {
        debugger;
        if (retorno > 0) {
          $("#recebe-mensagem-cadastro-realizado-venda").html(
            "Venda cadastrada com sucesso"
          );
          $("#recebe-mensagem-cadastro-realizado-venda").show();
          $("#recebe-mensagem-cadastro-realizado-venda").fadeOut(4000);
        } else {
          $("#recebe-mensagem-campo-falha-cadastro-venda").html(
            "Falha ao cadastrar venda:" + retorno
          );
          $("#recebe-mensagem-campo-falha-cadastro-venda").show();
          $("#recebe-mensagem-campo-falha-cadastro-venda").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        debugger;
        $("#recebe-mensagem-campo-falha-cadastro-venda").html(
          "Falha ao cadastrar venda:" + error
        );
        $("#recebe-mensagem-campo-falha-cadastro-venda").show();
        $("#recebe-mensagem-campo-falha-cadastro-venda").fadeOut(4000);
      },
    });
  }

  // let recebeNomeProdutoSV = $("#lista-produto").val();

  // let recebeNomeCV = $("#lista-cliente").val();

  // let recebeQTDPV = $("#quantidade-produto-venda").val();

  // let recebeDescontoProdutoSV = $("#lista-desconto-venda").val();

  // let recebePagoSPV = $("#lista-pago-venda").val();

  // let recebeAgendarSPV = $("#lista-agendar-pagamento").val();

  // let recebeValorFinalV = $("#valor-final-venda").val();

  // let recebeValorVendaFinal = 0;
  // if (recebeValorFinalV != "") {
  //   let recebeValorFinalVCortado = recebeValorFinalV.split("R$");

  //   let recebeVProdutoNumerico = recebeValorFinalVCortado[1];

  //   let recebeVProdutoFinalNumerico = recebeVProdutoNumerico.replace(/,/g, ".");

  //   // Substituir o último ponto por um caractere temporário
  //   let tempStr = recebeVProdutoFinalNumerico.replace(/\.(?=[^.]*$)/, "TEMP");

  //   // Remover todos os outros pontos
  //   tempStr = tempStr.replace(/\./g, "");

  //   // Substituir o caractere temporário pelo ponto decimal
  //   let decimalStr = tempStr.replace("TEMP", ".");

  //   // Converter para número decimal
  //   recebeValorVendaFinal = parseFloat(decimalStr);
  // }

  // let recebeValorAgendaPagamentoV = "";
  // let recebeAgendamentoPagamentoV = false;
  // let recebeDescontoProdutoV = false;
  // let recebePagoV = false;

  // if (recebeValorDescontoV === "sim") {
  //   recebeDescontoProdutoV = 1;
  // } else {
  //   recebeDescontoProdutoV = 0;
  // }

  // if (recebeValorAgendamentoPagamento === "sim") {
  //   recebeAgendamentoPagamentoV = 1;
  //   recebeValorAgendaPagamentoV = $("#data-agendamento-pagamento").val();
  // } else {
  //   recebeAgendamentoPagamentoV = 0;
  //   recebeValorAgendaPagamentoV = "";
  // }

  // let recebeValorPV = $("#lista-pago-venda").val();

  // if (recebeValorPV === "sim") {
  //   recebePagoV = 1;
  // } else {
  //   recebePagoV = 0;
  // }
});

$("#lista-cliente-venda").change(function (e) {
  // e.preventDefault();

  // debugger;

  // let recebeNomeSelecionadoCliente = $(this).val();

  // if (recebeNomeSelecionadoCliente === "selecione") {
  //   $("#recebe-mensagem-campo-vazio-busca-venda").html(
  //     "Favor selecione o cliente que deseja ver as vendas"
  //   );
  //   $("#recebe-mensagem-campo-vazio-busca-venda").show();
  //   $("#recebe-mensagem-campo-vazio-busca-venda").fadeOut(4000);
  //   // $("#titulo-filtro").hide();
  //   // $("#lista-filtro-venda").hide();
  //   // $("#valor-filtro-venda").hide();
  //   // $("#buscar-venda").hide();
  //   // $("#listagem-vendas").hide();
  // } else {
  //   // $("#titulo-filtro").show();
  //   // $("#lista-filtro-venda").show();
  //   // $("#valor-filtro-venda").show();
  //   // $("#buscar-venda").show();
  //   // $("#listagem-vendas").show();
  // }
});

let listaImagensProdutos = Array();
let listaNomeClientes = Array();

function listarVendas(recebeFiltroV, recebeValorFiltroV) {
  debugger;

  $.ajax({
    //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
    url: "../api/VendaAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_venda: "recebe_consultar_vendas",
      filtro_venda: recebeFiltroV,
      valor_filtro_venda: recebeValorFiltroV,
    },
    beforeSend: function () {
      debugger;
      $("#registros-vendas").html("");
      $("#registros-vendas").append(
        "<td colspan='5' class='text-center'>Carregando dados</td>"
      );
      $("#registros-vendas").html("");
    },
    success: function (retorno_vendas) {
      debugger;
      if (retorno_vendas.length > 0) {
        let recebe_tabela_vendas = document.querySelector("#registros-vendas");

        let recebe_quantidade_vendas = retorno_vendas.length;

        $("#exibi-quantidade-vendas").html(
          "Quantidade de vendas:" + recebe_quantidade_vendas
        );

        for (let vendas = 0; vendas < retorno_vendas.length; vendas++) {
          // if (
          //   listaNomeClientes.includes(
          //     retorno_vendas[vendas].nome_cliente_venda
          //   )
          // ) {
          //   console.log("nome ja consta no array");
          // } else {
          //   listaNomeClientes.push(retorno_vendas[vendas].nome_cliente_venda);
          // }

          // listaImagensProdutos.push(retorno_vendas[vendas].nome_produto_venda);

          // let recebeValorVendaBR =
          //   retorno_vendas[vendas].valor_final_venda.toString();

          // let recebeValorVendaBRFinal =
          //   "R$" + recebeValorVendaBR.replace(".", ",");

          // let recebeValorDescontoV = retorno_vendas[vendas].desconto_venda;

          // let recebePagoV = retorno_vendas[vendas].pago_venda;

          // let recebeAgendamentoV =
          //   retorno_vendas[vendas].pagamento_agendado_venda;

          // let recebeValorDescontoVString = "";
          // let recebeValorDescontoBRFinal = "";

          // if (retorno_vendas[vendas].desconto_final_venda != null) {
          //   recebeValorDescontoVString =
          //     retorno_vendas[vendas].desconto_final_venda.toString();
          //   recebeValorDescontoBRFinal =
          //     "R$" + recebeValorDescontoVString.replace(".", ",");
          // } else {
          //   recebeValorDescontoBRFinal = "Não informado";
          // }

          // let recebeValorFinalDescontoV = "";

          // if (recebeValorDescontoV === 1) recebeValorFinalDescontoV = "Sim";
          // else recebeValorFinalDescontoV = "Não";

          // let recebeValorPagoV = "";

          // if (recebePagoV === 1) recebeValorPagoV = "Sim";
          // else recebeValorPagoV = "Não";

          // let recebeValorAgendamentoV = "";

          // if (recebeAgendamentoV === 1) recebeValorAgendamentoV = "Sim";
          // else recebeValorAgendamentoV = "Não";

          // let recebeDataAgendamentoV = "";
          // let recebeDataAmericana = "";
          // let recebeDataBRAgendamentoV = "";

          // if (retorno_vendas[vendas].data_pagamento_venda != null) {
          //   recebeDataAgendamentoV =
          //     retorno_vendas[vendas].data_pagamento_venda;
          //   recebeDataBRAgendamentoV = recebeDataAgendamentoV
          //     .split("-")
          //     .reverse()
          //     .join("/");
          // } else {
          //   recebeDataBRAgendamentoV = "Não informado";
          // }

          recebe_tabela_vendas.innerHTML +=
            "<tr>" +
            "<td style='text-align:center;'>" +
            retorno_vendas[vendas].nome_cliente_venda +
            "</td>" +
            // "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-vendas' data-backdrop='static' id='carrega-imagens-venda' onclick=visualiza_vendas_cliente(" + retorno_vendas[vendas].codigo_cliente_vendas + ")>" +

            // "</td>" +
            "<td style='text-align:center;'><a href='#'><i class='bi bi-handbag fs-4' data-param1='" +
            retorno_vendas[vendas].codigo_cliente_vendas +
            "' data-param2='" +
            retorno_vendas[vendas].nome_cliente_venda +
            "' title='Visualizar Vendas' data-bs-toggle='modal' data-bs-target='#visualiza-vendas-cliente' data-backdrop='static' id='visualizarVendasEspecificaCliente'></i></a></td>" +
            "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Venda' onclick=excluiProdutoEspecifico(" +
            // retorno_vendas[vendas].codigo_venda +
            ",event)></i></a></td>" +
            "</tr>";
        }
        $("#registros-vendas").append(recebe_tabela_vendas);
      } else {
        $("#exibi-quantidade-vendas").html("Quantidade de vendas:" + 0);
        $("#registros-vendas").append(
          "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
        );
      }
    },
    error: function (xhr, status, error) {},
  });
}

$(document).on("click", "#visualizarVendasEspecificaCliente", function (e) {
  e.preventDefault();

  debugger;
  let recebeNomeClienteVendas = $(this).data("param2");

  $.ajax({
    //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
    url: "../api/VendaAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_venda: "recebe_consultar_vendas_cliente_especifico",
      valor_codigo_cliente_venda: $(this).data("param1"),
    },
    //   beforeSend: function () {
    //     debugger;
    //     $("#registros-clientes").html("");
    //     $("#registros-clientes").append(
    //       "<td colspan='5' class='text-center'>Carregando dados</td>"
    //     );
    //     $("#registros-clientes").html("");
    //   },
    success: function (retorno_vendas) {
      debugger;

      if (retorno_vendas.length > 0) {
        let recebe_tabela_vendas = document.querySelector(
          "#registros-vendas-cliente"
        );

        $("#registros-vendas-cliente").html("");

        $("#exibi-nome-cliente").html(recebeNomeClienteVendas);

        for (let vendas = 0; vendas < retorno_vendas.length; vendas++) {
          let recebeDescontoVenda = retorno_vendas[vendas].desconto_venda;
          let recebeValorDescontoVenda =
            retorno_vendas[vendas].desconto_final_venda.toString();

          let recebeDescontoVF = "";
          if (recebeDescontoVenda === 1) recebeDescontoVF = "Sim";
          else recebeDescontoVF = "Não";

          let recebeValorDescontoF = "";
          if (recebeValorDescontoVenda > 0) {
            recebeValorDescontoF =
              "R$" + recebeValorDescontoVenda.replace(".", ",");
          } else {
            recebeValorDescontoF =
              "R$" + recebeValorDescontoVenda.replace(".", ",");
          }

          let recebeValorFinal =
            retorno_vendas[vendas].valor_final_venda.toString();

          let recebeValorFVBR = "R$" + recebeValorFinal.replace(".", ",");

          let recebePagoVenda = retorno_vendas[vendas].pago_venda;

          let recebeDataPagamentoAgendadoBR = "";
          if (retorno_vendas[vendas].pagamento_agendado_venda === 1) {
            recebeDataPagamentoAgendadoBR = retorno_vendas[
              vendas
            ].data_pagamento_venda
              .split("-")
              .reverse()
              .join("/");
          } else {
            recebeDataPagamentoAgendadoBR = "Não informado";
          }

          let recebePagoFV = "";
          if (recebePagoVenda === 1) recebePagoFV = "Sim";
          else recebePagoFV = "Não";

          recebe_tabela_vendas +=
            "<tr>" +
            "<td class='text-center'>" +
            retorno_vendas[vendas].nome_produto_venda +
            "</td>" +
            "<td class='text-center'>" +
            retorno_vendas[vendas].quantidade_produtos_venda +
            "</td>" +
            "<td class='text-center'>" +
            recebeDescontoVF +
            " - " +
            recebeValorDescontoF +
            "</td>" +
            "<td class='text-center'>" +
            recebeValorFVBR +
            "</td>" +
            "<td class='text-center'>" +
            recebePagoFV +
            "</td>" +
            "<td class='text-center'>" +
            recebeDataPagamentoAgendadoBR +
            "</td>" +
            "<td><a href='#'><i class='bi bi-cash-coin fs-4' title='Venda Paga' onclick=''></i></a></td>" +
            "</tr>";
        }

        $("#registros-vendas-cliente").append(recebe_tabela_vendas);
      } else {
        console.log(retorno_vendas);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
});

$("#filtro-venda").change(function(e){
  e.preventDefault();

  let recebeValorSelecionadoBC = $(this).val();

  if(recebeValorSelecionadoBC === "todos_venda")
  {
    $("#lista-cliente-venda").prop("disabled",true);
  }else{
    $("#lista-cliente-venda").prop("disabled",false);
  }
});

$("#buscar-venda").click(function (e) {
  e.preventDefault();

  debugger;

  let recebeClienteSelecionado = $("#lista-cliente-venda").val();

  let recebeFiltro = $("#filtro-venda").val();

  if (
    recebeClienteSelecionado != "" &&
    recebeFiltro != ""
  ) {
    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/VendaAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_venda: "recebe_consultar_vendas",
        filtro_venda:recebeFiltro,
        valor_filtro_venda: recebeClienteSelecionado,
      },
      beforeSend: function () {
        debugger;
        $("#registros-vendas").html("");
        $("#registros-vendas").append(
          "<td colspan='5' class='text-center'>Carregando dados</td>"
        );
        $("#registros-vendas").html("");
      },
      success: function (retorno_vendas) {
        debugger;
        if (retorno_vendas.length > 0) {
          let recebe_tabela_vendas = document.querySelector("#registros-vendas");
  
          let recebe_quantidade_vendas = retorno_vendas.length;
  
          $("#exibi-quantidade-vendas").html(
            "Quantidade de vendas:" + recebe_quantidade_vendas
          );
  
          for (let vendas = 0; vendas < retorno_vendas.length; vendas++) {
            // if (
            //   listaNomeClientes.includes(
            //     retorno_vendas[vendas].nome_cliente_venda
            //   )
            // ) {
            //   console.log("nome ja consta no array");
            // } else {
            //   listaNomeClientes.push(retorno_vendas[vendas].nome_cliente_venda);
            // }
  
            // listaImagensProdutos.push(retorno_vendas[vendas].nome_produto_venda);
  
            // let recebeValorVendaBR =
            //   retorno_vendas[vendas].valor_final_venda.toString();
  
            // let recebeValorVendaBRFinal =
            //   "R$" + recebeValorVendaBR.replace(".", ",");
  
            // let recebeValorDescontoV = retorno_vendas[vendas].desconto_venda;
  
            // let recebePagoV = retorno_vendas[vendas].pago_venda;
  
            // let recebeAgendamentoV =
            //   retorno_vendas[vendas].pagamento_agendado_venda;
  
            // let recebeValorDescontoVString = "";
            // let recebeValorDescontoBRFinal = "";
  
            // if (retorno_vendas[vendas].desconto_final_venda != null) {
            //   recebeValorDescontoVString =
            //     retorno_vendas[vendas].desconto_final_venda.toString();
            //   recebeValorDescontoBRFinal =
            //     "R$" + recebeValorDescontoVString.replace(".", ",");
            // } else {
            //   recebeValorDescontoBRFinal = "Não informado";
            // }
  
            // let recebeValorFinalDescontoV = "";
  
            // if (recebeValorDescontoV === 1) recebeValorFinalDescontoV = "Sim";
            // else recebeValorFinalDescontoV = "Não";
  
            // let recebeValorPagoV = "";
  
            // if (recebePagoV === 1) recebeValorPagoV = "Sim";
            // else recebeValorPagoV = "Não";
  
            // let recebeValorAgendamentoV = "";
  
            // if (recebeAgendamentoV === 1) recebeValorAgendamentoV = "Sim";
            // else recebeValorAgendamentoV = "Não";
  
            // let recebeDataAgendamentoV = "";
            // let recebeDataAmericana = "";
            // let recebeDataBRAgendamentoV = "";
  
            // if (retorno_vendas[vendas].data_pagamento_venda != null) {
            //   recebeDataAgendamentoV =
            //     retorno_vendas[vendas].data_pagamento_venda;
            //   recebeDataBRAgendamentoV = recebeDataAgendamentoV
            //     .split("-")
            //     .reverse()
            //     .join("/");
            // } else {
            //   recebeDataBRAgendamentoV = "Não informado";
            // }
  
            recebe_tabela_vendas.innerHTML +=
              "<tr>" +
              "<td style='text-align:center;'>" +
              retorno_vendas[vendas].nome_cliente_venda +
              "</td>" +
              // "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-vendas' data-backdrop='static' id='carrega-imagens-venda' onclick=visualiza_vendas_cliente(" + retorno_vendas[vendas].codigo_cliente_vendas + ")>" +
  
              // "</td>" +
              "<td style='text-align:center;'><a href='#'><i class='bi bi-handbag fs-4' data-param1='" +
              retorno_vendas[vendas].codigo_cliente_vendas +
              "' data-param2='" +
              retorno_vendas[vendas].nome_cliente_venda +
              "' title='Visualizar Vendas' data-bs-toggle='modal' data-bs-target='#visualiza-vendas-cliente' data-backdrop='static' id='visualizarVendasEspecificaCliente'></i></a></td>" +
              "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Venda' onclick=excluiProdutoEspecifico(" +
              // retorno_vendas[vendas].codigo_venda +
              ",event)></i></a></td>" +
              "</tr>";
          }
          $("#registros-vendas").append(recebe_tabela_vendas);
        } else {
          $("#exibi-quantidade-vendas").html("Quantidade de vendas:" + 0);
          $("#registros-vendas").append(
            "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  } else if (recebeClienteSelecionado === "") {
    $("#recebe-mensagem-campo-vazio-busca-venda").html(
      "Favor selecionar o cliente que deseja pesquisar"
    );
    $("#recebe-mensagem-campo-vazio-busca-venda").show();
    $("#recebe-mensagem-campo-vazio-busca-venda").fadeOut(4000);
  } else if (recebeFiltro === "") {
    $("#recebe-mensagem-campo-vazio-busca-venda").html(
      "Favor selecionar o filtro que deseja pesquisar"
    );
    $("#recebe-mensagem-campo-vazio-busca-venda").show();
    $("#recebe-mensagem-campo-vazio-busca-venda").fadeOut(4000);
  }
});
