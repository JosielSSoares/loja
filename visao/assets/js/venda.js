$(document).ready(function () {
  let url_venda = window.location.href;

  if (
    url_venda ===
    "https://www.idailneto.com.br/loja/visao/index.php?pagina=cadastro_venda"
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

    $("#cadastro-venda").prop("disabled", true);

    $.ajax({
      url: "../api/ProdutoAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_produto: "recebe_consultar_produtos",
        filtro_produto: "todos_produtos",
        valor_filtro_produto: "todos_produtos",
      },
      success: function (retorno_produtos) {
        debugger;

        if (retorno_produtos.length > 0) {
          $("#lista-produto").html("");
          $("#lista-produto").append(
            "<option value='selecione'>Selecione</option>"
          );

          $.each(retorno_produtos, function (i, element) {
            $("#lista-produto").append(
              "<option value=" +
                element.codigo_produto +
                ">" +
                element.nome_produto +
                "</option>"
            );
          });
        } else {
          $("#lista-produto").html("");
          $("#lista-produto").append(
            "<option value='selecione'>Selecione</option>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });

    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ClienteAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_cliente: "recebe_consultar_clientes_para_venda",
      },
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
    url_venda ===
    "https://www.idailneto.com.br/loja/visao/index.php?pagina=consulta_venda"
  ) {
    $("#recebe-mensagem-campo-vazio-buscar-venda").hide();
    $("#recebe-mensagem-campo-falha-buscar-venda").hide();
    $("#recebe-mensagem-exclusao-realizada-venda").hide();
    $("#recebe-mensagem-campo-falha-exclusao-venda").hide();
    $("#recebe-mensagem-campo-falha-buscar-cliente").hide();
    $("#recebe-mensagem-campo-vazio-busca-venda").hide();
    $("#recebe-mensagem-pagamento-atualizado-vendas-cliente-especifico").hide();
    $("#recebe-mensagem-campo-falha-buscar-venda-cliente-especifico").hide();
    $(
      "#recebe-mensagem-falha-pagamento-atualizado-vendas-cliente-especifico"
    ).hide();

    $("#exibi-quantidade-vendas").html("Quantidade de vendas:" + 0);
    $("#registros-vendas").append(
      "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
    );

    //listarVendas("todos_venda", "todos_venda");

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
  } else if (
    url_venda ===
    "https://idailneto.com.br/loja/visao/index.php?pagina=relatorio_venda"
  ) {
  }
});

let recebeNomeProdutoGravar = "";
let recebeQTDEstoqueProduto = 0;
let recebeValorProdutoEstoque = 0;
let recebeValorSFP = "";
let recebeCodigoProdutoSelecionado = 0;

$("#lista-produto").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeValorSFP = $(this).val();

  recebeCodigoProdutoSelecionado = recebeValorSFP;

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

let recebeValorDescontoV = 0;

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

let recebeDadosAtualizarEstoque = Array();

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

  let recebeCodigoPS = parseInt(recebeCodigoProdutoSelecionado);

  //dados = {recebeCodigoPS:recebeQTDPV,};

  recebeDadosAtualizarEstoque.push({
    codigo: recebeCodigoPS,
    estoque: recebeQTDPV,
  });

  console.log(recebeDadosAtualizarEstoque);

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

    // let verificaCliente = listaNomeClientesGravarV.includes(recebeNomeSCV);

    // if (verificaCliente) console.log(listaNomeClientesGravarV);
    // else listaNomeClientesGravarV.push(recebeNomeSCV);

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
    let colunaOpcaoRemoverItem = $("<td><a href=''><i class='bi bi-trash-fill fs-4' title='Excluir Item' onclick=removerItem(" + recebeNomeSCV + "," + recebeNomeProdutoGravar + ", " + recebeQTDPV + ", " + recebeValorBooleanoDescontoVendaFinal + "," +
    valorDescontoFinalVP + ", " + valorFinalVP + ", " + recebePagoVendaBooleanoFinal + ", " + recebeAgendarPagamentoBooleanoFinal + ", " + recebeDataPagamentoAmericano + ", " + recebeCodigoClienteGravar + ",event)></i></a></td>");

    linha.append(colunaNomeProdutoSV);
    linha.append(colunaNomeClienteSV);
    linha.append(colunaQuantidadeProdutosV);
    linha.append(colunaDescontoVendaValorDescontoVenda);
    linha.append(colunaValorFinalVenda);
    linha.append(colunaPagoVenda);
    linha.append(colunaAgendadoPagamentoDataPagamentoVenda);
    linha.append(colunaOpcaoRemoverItem);

    $("#listagem-produtos-venda").append(linha);

    $("#cadastro-venda").prop("disabled", false);

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

function removerItem(valorNomeClienteV,valorNomeProduto,valorQTDProduto,valorBooleanoDescontoV,valorFinalDesconto,valorTotal,valorPagoBooleano,valorAgendamentoBooleano,valorData,valorCodigoCliente,e)
{
  e.preventDefault();

  debugger;

  this.closest("tr").remove();
}

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
        valor_nomeclientev: listaNomeClientesGravarV,
        valor_nomeprodutov: listaNomeProdutosGravarV,
        valor_quantidadeprodutov: listaQuantidadeV,
        valor_selecionado_descontov: listaDescontoV,
        valor_descontoprodutov: listaValorDescontoV,
        valor_finalv: listaValorTotalV,
        valor_selecionado_pagov: listaPagoV,
        valor_pagamentoagendadov: listaPagamentoAgendadoV,
        valor_datapagamentov: listaDataPagamentoV,
        valor_codigocv: listaCodigoClienteV,
        valor_dadosatualizarestoque: recebeDadosAtualizarEstoque,
        processo_venda: "recebe_cadastro_venda",
      },
      success: function (retorno) {
        debugger;
        if (retorno === "Estoque atualizado") {
          $("#recebe-mensagem-cadastro-realizado-venda").html(
            "Venda cadastrada com sucesso"
          );
          $("#recebe-mensagem-cadastro-realizado-venda").show();
          $("#recebe-mensagem-cadastro-realizado-venda").fadeOut(4000);

          atualizaContasVencer();
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

    // $.ajax({
    //   url: "../api/ClienteVendaAPI.php",
    //   type: "post",
    //   dataType: "json",
    //   data: {
    //     valor_nomeclientevenda: listaNomeClientesGravarV,
    //     valor_codigoclientevenda: listaCodigoClienteV,
    //     processo_cliente_venda: "recebe_cadastro_cliente_venda",
    //   },
    //   success: function (retorno)
    //   {
    //     if(retorno > 0)
    //     {

    //     }
    //   },
    //   error:function(xhr,status,error)
    //   {

    //   },
    // });
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
          // let registro_exibido = listaNomeClientes.includes(
          //   retorno_vendas[vendas].nome_cliente_venda
          // );

          // if (registro_exibido) {
          //   console.log(registro_exibido);
          // } else {

          // }

          recebe_tabela_vendas.innerHTML +=
            "<tr>" +
            "<td style='text-align:center;'><a href='#'><i class='bi bi-handbag fs-4' data-param1='" +
            retorno_vendas[vendas].codigo_cliente_vendas +
            "' data-param2='" +
            retorno_vendas[vendas].nome_cliente_venda +
            "' title='Visualizar Vendas' data-bs-toggle='modal' data-bs-target='#visualiza-vendas-cliente' data-backdrop='static' id='visualizarVendasEspecificaCliente'></i></a></td>" +
            "</tr>";
          $("#registros-vendas").append(recebe_tabela_vendas);

          // listaNomeClientes.push(retorno_vendas[vendas].nome_cliente_venda);
        }
      } else {
        $("#exibi-quantidade-vendas").html("Quantidade de vendas:" + 0);
        $("#registros-vendas").html("");
        $("#registros-vendas").append(
          "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
        );
      }
    },
    error: function (xhr, status, error) {},
  });
}

function excluiVendaEspecifico(valorCodigoVenda, e) {
  e.preventDefault();

  debugger;

  let recebeCodigoVenda = valorCodigoVenda;

  let recebeRespostaExcluirPedido = window.confirm(
    "Tem certeza que deseja excluir o pedido?"
  );

  if (recebeRespostaExcluirPedido) {
    $.ajax({
      url: "../api/VendaAPI.php",
      type: "DELETE",
      dataType: "json",
      cache: false,
      data: JSON.stringify({
        processo_venda: "recebe_exclui_venda",
        valor_codigo_venda_exclui: recebeCodigoVenda,
      }),
      success: function (retorno_excluir) {
        debugger;

        if (retorno_excluir === "Venda excluida com sucesso") {
          $("#recebe-mensagem-exclusao-realizada-venda").html(retorno_excluir);
          $("#recebe-mensagem-exclusao-realizada-venda").show();
          $("#recebe-mensagem-exclusao-realizada-venda").fadeOut(4000);

          atualizaContasVencer();

          $.ajax({
            url: "../api/VendaAPI.php",
            dataType: "json",
            type: "get",
            data: {
              processo_venda: "recebe_consultar_vendas_cliente_especifico",
              valor_codigo_cliente_venda: recebeCodigoVendas,
            },
            success: function (retorno_vendas) {
              debugger;

              if (retorno_vendas.length > 0) {
                let recebe_tabela_vendas = document.querySelector(
                  "#registros-vendas-cliente"
                );

                $("#registros-vendas-cliente").html("");

                $("#exibi-nome-cliente").html(recebeNomeClienteVendas);

                for (let vendas = 0; vendas < retorno_vendas.length; vendas++) {
                  let recebeDescontoVenda =
                    retorno_vendas[vendas].desconto_venda;
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

                  let recebeValorFVBR =
                    "R$" + recebeValorFinal.replace(".", ",");

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
                  let htmlInformarPago = "";
                  if (recebePagoVenda === 1) {
                    recebePagoFV = "Sim";
                  } else {
                    htmlInformarPago =
                      "<td><a href=''><i class='bi bi-cash-coin fs-4' title='Venda Paga' data-param-codigo='" +
                      retorno_vendas[vendas].codigo_venda +
                      "' data-param-codigo-cliente='" +
                      retorno_vendas[vendas].codigo_cliente_vendas +
                      "' data-param-nome-cliente='" +
                      recebeNomeClienteVendas +
                      "' id='informarPagamento'></i></a></td>";
                    recebePagoFV = "Não";
                  }

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
                    htmlInformarPago +
                    "<td><a href=''><i class='bi bi-trash-fill fs-4' title='Excluir Venda' onclick=excluiVendaEspecifico(" +
                    retorno_vendas[vendas].codigo_venda +
                    ",event)></i></a></td>" +
                    "</tr>";
                }

                $("#registros-vendas-cliente").append(recebe_tabela_vendas);
              } else {
                $("#registros-vendas-cliente").html("");
                $("#registros-vendas-cliente").append(
                  "<td colspan='7' class='text-center'>Nenhum registro localizado</td>"
                );
              }
            },
            error: function (xhr, status, error) {
              $(
                "#recebe-mensagem-campo-falha-buscar-venda-cliente-especifico"
              ).html(error);
              $(
                "#recebe-mensagem-campo-falha-buscar-venda-cliente-especifico"
              ).show();
              $(
                "#recebe-mensagem-campo-falha-buscar-venda-cliente-especifico"
              ).fadeOut(4000);

              $("#registros-vendas-cliente").html("");
              $("#registros-vendas-cliente").append(
                "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
              );
            },
          });
        } else {
          $("#recebe-mensagem-campo-falha-exclusao-venda").html(
            "Falha ao excluir venda: " + retorno_excluir
          );
          $("#recebe-mensagem-campo-falha-exclusao-venda").show();
          $("#recebe-mensagem-campo-falha-exclusao-venda").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-exclusao-venda").html(
          "Falha ao excluir venda: " + error
        );
        $("#recebe-mensagem-campo-falha-exclusao-venda").show();
        $("#recebe-mensagem-campo-falha-exclusao-venda").fadeOut(4000);
      },
    });
  } else {
    return;
  }
}

let recebeNomeClienteVendas = "";
let recebeCodigoVendas = 0;

$(document).on("click", "#visualizarVendasEspecificaCliente", function (e) {
  e.preventDefault();

  debugger;
  recebeNomeClienteVendas = $(this).data("param2");
  recebeCodigoVendas = $(this).data("param1");
  $.ajax({
    url: "../api/VendaAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_venda: "recebe_consultar_vendas_cliente_especifico",
      valor_codigo_cliente_venda: $(this).data("param1"),
    },
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
          let htmlInformarPago = "";
          if (recebePagoVenda === 1) {
            recebePagoFV = "Sim";
          } else {
            htmlInformarPago =
              "<td><a href=''><i class='bi bi-cash-coin fs-4' title='Venda Paga' data-param-codigo='" +
              retorno_vendas[vendas].codigo_venda +
              "' data-param-codigo-cliente='" +
              retorno_vendas[vendas].codigo_cliente_vendas +
              "' data-param-nome-cliente='" +
              recebeNomeClienteVendas +
              "' id='informarPagamento'></i></a></td>";
            recebePagoFV = "Não";
          }

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
            htmlInformarPago +
            "<td><a href=''><i class='bi bi-trash-fill fs-4' title='Excluir Venda' onclick=excluiVendaEspecifico(" +
            retorno_vendas[vendas].codigo_venda +
            ",event)></i></a></td>" +
            "</tr>";
        }

        $("#registros-vendas-cliente").append(recebe_tabela_vendas);
      } else {
        $("#registros-vendas-cliente").html("");
        $("#registros-vendas-cliente").append(
          "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
        );
      }
    },
    error: function (xhr, status, error) {
      $("#recebe-mensagem-campo-falha-buscar-venda-cliente-especifico").html(
        error
      );
      $("#recebe-mensagem-campo-falha-buscar-venda-cliente-especifico").show();
      $("#recebe-mensagem-campo-falha-buscar-venda-cliente-especifico").fadeOut(
        4000
      );

      $("#registros-vendas-cliente").html("");
      $("#registros-vendas-cliente").append(
        "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
      );
    },
  });
});

$(document).on("click", "#informarPagamento", function (e) {
  debugger;

  e.preventDefault();

  let recebeCodigoVenda = $(this).data("param-codigo");

  let recebeCodigoClienteVenda = $(this).data("param-codigo-cliente");

  let recebeNomeClienteVenda = $(this).data("param-nome-cliente");

  $.ajax({
    url: "../api/VendaAPI.php",
    type: "post",
    dataType: "json",
    data: {
      processo_venda: "recebe_atualizar_pagamento",
      valor_codigo_venda: recebeCodigoVenda,
      metodo: "PUT",
    },
    success: function (retorno) {
      debugger;

      if (retorno === "Pagamento atualizado") {
        $(
          "#recebe-mensagem-pagamento-atualizado-vendas-cliente-especifico"
        ).html(retorno);
        $(
          "#recebe-mensagem-pagamento-atualizado-vendas-cliente-especifico"
        ).show();
        $(
          "#recebe-mensagem-pagamento-atualizado-vendas-cliente-especifico"
        ).fadeOut(4000);

        console.log("codigo recebido:" + recebeCodigoClienteVenda);

        atualizaContasVencer();

        $.ajax({
          url: "../api/VendaAPI.php",
          dataType: "json",
          type: "get",
          data: {
            processo_venda: "recebe_consultar_vendas_cliente_especifico",
            valor_codigo_cliente_venda: recebeCodigoClienteVenda,
          },
          success: function (retorno_vendas) {
            debugger;

            if (retorno_vendas.length > 0) {
              let recebe_tabela_vendas = document.querySelector(
                "#registros-vendas-cliente"
              );

              $("#registros-vendas-cliente").html("");

              $("#exibi-nome-cliente").html(recebeNomeClienteVenda);

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
                let htmlInformarPago = "";
                if (recebePagoVenda === 1) {
                  recebePagoFV = "Sim";
                } else {
                  htmlInformarPago =
                    "<td><a href='#'><i class='bi bi-cash-coin fs-4' title='Venda Paga' data-param-codigo='" +
                    retorno_vendas[vendas].codigo_venda +
                    "' data-param-codigo-cliente='" +
                    retorno_vendas[vendas].codigo_cliente_vendas +
                    "' data-param-nome-cliente='" +
                    recebeNomeClienteVendas +
                    "' id='informarPagamento'></i></a></td>";
                  recebePagoFV = "Não";
                }

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
                  htmlInformarPago +
                  "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Venda' onclick=excluiVendaEspecifico(" +
                  retorno_vendas[vendas].codigo_venda +
                  ",event)></i></a></td>" +
                  "</tr>";
              }

              $("#registros-vendas-cliente").append(recebe_tabela_vendas);
            } else {
              $("#registros-vendas-cliente").html("");
              $("#registros-vendas-cliente").append(
                "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
              );
            }
          },
          error: function (xhr, status, error) {
            $(
              "#recebe-mensagem-campo-falha-buscar-venda-cliente-especifico"
            ).html(error);
            $(
              "#recebe-mensagem-campo-falha-buscar-venda-cliente-especifico"
            ).show();
            $(
              "#recebe-mensagem-campo-falha-buscar-venda-cliente-especifico"
            ).fadeOut(4000);

            $("#registros-vendas-cliente").html("");
            $("#registros-vendas-cliente").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );
          },
        });
      } else {
        $(
          "#recebe-mensagem-falha-pagamento-atualizado-vendas-cliente-especifico"
        ).html("Falha ao informar pagamento: " + retorno);
        $(
          "#recebe-mensagem-falha-pagamento-atualizado-vendas-cliente-especifico"
        ).show();
        $(
          "#recebe-mensagem-falha-pagamento-atualizado-vendas-cliente-especifico"
        ).fadeOut(4000);
      }
    },
    error: function (xhr, status, error) {
      $(
        "#recebe-mensagem-falha-pagamento-atualizado-vendas-cliente-especifico"
      ).html("Falha ao informar pagamento: " + error);
      $(
        "#recebe-mensagem-falha-pagamento-atualizado-vendas-cliente-especifico"
      ).show();
      $(
        "#recebe-mensagem-falha-pagamento-atualizado-vendas-cliente-especifico"
      ).fadeOut(4000);
    },
  });
});

// $("#filtro-venda").change(function (e) {
//   e.preventDefault();

//   let recebeValorSelecionadoBC = $(this).val();

//   if (recebeValorSelecionadoBC === "todos_venda") {
//     $("#lista-cliente-venda").prop("disabled", true);
//   } else {
//     $("#lista-cliente-venda").prop("disabled", false);
//   }
// });

$("#buscar-venda").click(function (e) {
  e.preventDefault();

  debugger;

  let recebeClienteSelecionado = $("#lista-cliente-venda").val();

  if (recebeClienteSelecionado === "selecione") {
    $("#recebe-mensagem-campo-vazio-busca-venda").html(
      "Favor selecionar o cliente que deseja pesquisar"
    );
    $("#recebe-mensagem-campo-vazio-busca-venda").show();
    $("#recebe-mensagem-campo-vazio-busca-venda").fadeOut(4000);
  } else {
    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/VendaAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_venda: "recebe_consultar_vendas",
        filtro_venda: "cliente",
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
          let recebe_tabela_vendas =
            document.querySelector("#registros-vendas");

          let recebe_quantidade_vendas = retorno_vendas.length;

          $("#exibi-quantidade-vendas").html(
            "Quantidade de vendas:" + recebe_quantidade_vendas
          );

          for (let vendas = 0; vendas < retorno_vendas.length; vendas++) {
            recebe_tabela_vendas.innerHTML +=
              "<tr>" +
              "<td style='text-align:center;'><a href='#'><i class='bi bi-handbag fs-4' data-param1='" +
              retorno_vendas[vendas].codigo_cliente_vendas +
              "' data-param2='" +
              retorno_vendas[vendas].nome_cliente_venda +
              "' title='Visualizar Vendas' data-bs-toggle='modal' data-bs-target='#visualiza-vendas-cliente' data-backdrop='static' id='visualizarVendasEspecificaCliente'></i></a></td>" +
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
        $("#recebe-mensagem-campo-falha-buscar-venda").html(
          "Falha ao buscar venda:" + error
        );
        $("#recebe-mensagem-campo-falha-buscar-venda").show();
        $("#recebe-mensagem-campo-falha-buscar-venda").fadeOut(4000);
      },
    });
  }
});

function atualizaContasVencer() {
  $.ajax({
    url: "../api/VendaAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_venda: "recebe_consultar_vendas_vencer",
    },
    success: function (retorno_venda_vencer) {
      debugger;
      let recebe_quantidade_vendas_vencer = retorno_venda_vencer.length;

      if (recebe_quantidade_vendas_vencer != 0) {
        $("#exibi-quantidade-vendas-vencer").html("");
        $("#exibi-quantidade-vendas-vencer").html(
          recebe_quantidade_vendas_vencer
        );
        $("#total-vendas-vencer").html("");
        $("#total-vendas-vencer").html(recebe_quantidade_vendas_vencer);
      } else {
        $("#exibi-quantidade-vendas-vencer").html("");
        $("#exibi-quantidade-vendas-vencer").html(0);
        $("#total-vendas-vencer").html("");
        $("#total-vendas-vencer").html(0);
      }
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}
