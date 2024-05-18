$(document).ready(function () {
  let url_venda = window.location.href;

  if (
    url_venda === "http://localhost/loja/visao/index.php?pagina=cadastro_venda"
  ) {
    $("#exibe-informacao-qtd-produtos-estoque").hide();
    $("#exibe-desconto-venda").hide();
    $("#data-pagamento-agendado").hide();
    debugger;

    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ProdutoAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_produto: "recebe_consultar_produtos",
        filtro_produto: "todos",
        valor_filtro_produto: "todos",
      },
      //   beforeSend: function () {
      //     debugger;
      //     $("#registros-produtos").html("");
      //     $("#registros-produtos").append(
      //       "<td colspan='5' class='text-center'>Carregando dados</td>"
      //     );
      //     $("#registros-produtos").html("");
      //   },
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
      error: function (xhr, status, error) {},
    });

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
                element.nome_cliente.toLowerCase() +
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
  }
});

let recebeNomeProdutoGravar = "";
let recebeQTDEstoqueProduto = 0;

$("#lista-produto").change(function(e){
  e.preventDefault();

  debugger;

  let recebeValorSFP = $(this).val();

  $.ajax({
    //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
    url: "../api/ProdutoAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_produto: "recebe_consultar_produto_especifico_qtd_produtos_estoque",
      valor_codigo_produto_especifico_qtdpe: recebeValorSFP,
    },
    success: function (retorno_produto) 
    {
      debugger;
      if(retorno_produto.length > 0)
      {
        for (let index = 0; index < retorno_produto.length; index++) {
          recebeQTDEstoqueProduto = retorno_produto[index].estoque_produto;
          recebeNomeProdutoGravar = retorno_produto[index].nome_produto;
        }

        $("#informacao-qtd-produtos-estoque").html("Quantidade em estoque:" + recebeQTDEstoqueProduto);
        $("#exibe-informacao-qtd-produtos-estoque").show();
      }
    },
    error:function(xhr,status,error)
    {
      console.log(error);
    },
  });
});

let recebeValorDV = "";

$("#lista-desconto-venda").change(function(e){
  e.preventDefault();

  debugger;

  let recebeValorSDV = $(this).val();

  recebeValorDV = recebeValorSDV;

  if(recebeValorSDV === "sim")
  {
    $("#exibe-desconto-venda").show();
  }else{
    $("#exibe-desconto-venda").hide();
  }
});

let recebeValorAP = "";

$("#lista-agendar-pagamento").change(function(e){
  e.preventDefault();

  debugger;

  let recebeValorAPV = $(this).val();

  recebeValorAP = recebeValorAPV;

  if(recebeValorAPV === "sim")
  {
    $("#data-pagamento-agendado").show();
  }else{
    $("#data-pagamento-agendado").hide();
  }
});

$("#cadastro-venda").click(function(e){
  e.preventDefault();

  debugger;

  let recebeNomeCV = $("#lista-cliente").val();
  let recebeQTDPV = $("#quantidade-produto-venda").val();
  let recebeValorFV = $("#valor-final-venda").val();

  let recebeDV = 0;
  let recebeValorAGP = "";
  let recebeAPV = false;
  let recebeDPV = false;
  let recebePV = false;

  if(recebeValorDV === "sim")
  {
    recebeDPV = true;
    recebeDV = $("#desconto-produto-venda").val();
  }else{
    recebeDPV = false;
    recebeDV = "";
  }

  if(recebeValorAP === "sim")
  {
    recebeAPV = true;
    recebeValorAGP = $("#data-agendamento-pagamento").val();
  }else{
    recebeAPV = false;
    recebeValorAGP = "";
  }

  let recebeValorPV = $("#lista-pago-venda").val();

  if(recebeValorPV === "sim")
  {
    recebePV = true;
  }else{
    recebePV = false;
  }

  // let formulario_cadastro_venda = $("#formulario-cadastro-venda")[0];

  // let dados_formulario_cadastro_venda = new FormData(formulario_cadastro_venda);

  // dados_formulario_cadastro_venda.append("processo_venda","recebe_cadastro_venda");

  $.ajax({
    url: "../api/VendaAPI.php",
    type: "post",
    dataType: "json",
    processData: false,
    contentType: false,
    data: {
      valor_nomepv:recebeNomeProdutoGravar,
      valor_nomecv:recebeNomeCV,
      valor_quantidadepv:recebeQTDPV,
      valor_selecionado_dv:recebeDPV,
      valor_descontofv:recebeDV,
      valor_fv:recebeValorFV,
      valor_selecionado_pv:recebePV,
      valor_pagamentoav:recebeAPV,
      valor_datapv:recebeValorAGP,
      processo_venda:recebe_cadastro_venda,
    },
    success: function (retorno) 
    {
      debugger;
      console.log(retorno);
    },
    error:function(xhr,status,error)
    {

    },
  });
});