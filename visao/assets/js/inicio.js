$(document).ready(function (e) {
  $("#remove-ponteiros-1").removeClass("bi bi-three-dots");
  $("#remove-ponteiros-2").removeClass("bi bi-three-dots");
  $("#remove-ponteiros-3").removeClass("bi bi-three-dots");

  debugger;

  let url_inicio = window.location.href;

  if (
    url_inicio === "https://www.idailneto.com.br/loja/visao/index.php" ||
    url_inicio ===
    "https://www.idailneto.com.br/loja/visao/index.php?pagina=consulta_venda" ||
    url_inicio ===
    "https://www.idailneto.com.br/loja/visao/index.php?pagina=consulta_clientes" ||
    url_inicio ===
    "https://www.idailneto.com.br/loja/visao/index.php?pagina=consulta_produtos" ||
    url_inicio === "https://www.idailneto.com.br/loja/visao/index.php?pagina=consulta_venda" ||
    url_inicio === "https://www.idailneto.com.br/loja/visao/index.php?pagina=cadastro_venda" ||
    url_inicio === "https://www.idailneto.com.br/loja/visao/index.php?pagina=cadastro_produtos" ||
    url_inicio === "https://www.idailneto.com.br/loja/visao/index.php?pagina=cadastro_clientes"
  ) {
    debugger;
    $("#recebe-mensagem-pagamento-atualizado-vendas-vencer").hide();
    $("#recebe-mensagem-falha-pagamento-atualizado-vendas-vencer").hide();
    $("#recebe-mensagem-email-cobranca-vendas-vencer-encaminhado").hide();
    $("#recebe-mensagem-falha-email-cobranca-vendas-vencer-encaminhar").hide();
    $("#recebe-mensagem-falha-localizar-email-cobranca-vendas-vencer-encaminhar").hide();

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
      error: function (xhr, status, error) { },
    });
  }
});

$("#visualizarVendasAVencer").click(function (e) {
  e.preventDefault();

  $.ajax({
    url: "../api/VendaAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_venda: "recebe_consultar_vendas_vencer",
    },
    success: function (retorno_venda_vencer) {
      debugger;
      if (retorno_venda_vencer.length > 0) {
        let recebe_tabela_vendas = document.querySelector(
          "#registros-vendas-cliente-a-vencer"
        );

        $("#registros-vendas-cliente-a-vencer").html("");

        for (let vendas = 0; vendas < retorno_venda_vencer.length; vendas++) {
          let recebeDescontoVenda = retorno_venda_vencer[vendas].desconto_venda;
          let recebeValorDescontoVenda =
            retorno_venda_vencer[vendas].desconto_final_venda.toString();

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
            retorno_venda_vencer[vendas].valor_final_venda.toString();

          let recebeValorFVBR = "R$" + recebeValorFinal.replace(".", ",");

          let recebePagoVenda = retorno_venda_vencer[vendas].pago_venda;

          let recebeDataPagamentoAgendadoBR = "";
          if (retorno_venda_vencer[vendas].pagamento_agendado_venda === 1) {
            recebeDataPagamentoAgendadoBR = retorno_venda_vencer[
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
            retorno_venda_vencer[vendas].nome_cliente_venda +
            "</td>" +
            "<td class='text-center'>" +
            retorno_venda_vencer[vendas].nome_produto_venda +
            "</td>" +
            "<td class='text-center'>" +
            retorno_venda_vencer[vendas].quantidade_produtos_venda +
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
            "<td><a href='#'><i class='bi bi-cash-coin fs-4' title='Venda Paga' id='informarPagamento' data-param-codigo='" +
            retorno_venda_vencer[vendas].codigo_venda +
            "'></i></a></td>" +
            "<td><a href='#'><i class='bi bi-envelope fs-4' title='E-mail de cobrança' data-param-codigo-cliente='" +
            retorno_venda_vencer[vendas].codigo_cliente_vendas +
            "' data-param-nome-produto='" + retorno_venda_vencer[vendas].nome_produto_venda + "' data-param-valor-final='" + recebeValorFVBR + "'" +
            "data-param-nome-cliente='" + retorno_venda_vencer[vendas].nome_cliente_venda + "' id='EncaminharEmailCobranca'></i></a></td>" +
            "</tr>";
        }

        $("#registros-vendas-cliente-a-vencer").append(recebe_tabela_vendas);
      } else {
        $("#registros-vendas-cliente-a-vencer").append(
          "<td colspan='7' class='text-center'>Nenhum registro localizado</td>"
        );
      }
    },
    error: function (xhr, status, error) { },
  });
});

$(document).on("click", "#informarPagamento", function (e) {
  let recebeCodigoVenda = $(this).data("param-codigo");

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
        $("#recebe-mensagem-pagamento-atualizado-vendas-vencer").html(retorno);
        $("#recebe-mensagem-pagamento-atualizado-vendas-vencer").show();
        $("#recebe-mensagem-pagamento-atualizado-vendas-vencer").fadeOut(4000);

        $.ajax({
          url: "../api/VendaAPI.php",
          dataType: "json",
          type: "get",
          data: {
            processo_venda: "recebe_consultar_vendas_vencer",
          },
          success: function (retorno_venda_vencer) {
            debugger;
            if (retorno_venda_vencer.length > 0) {
              let recebe_tabela_vendas = document.querySelector(
                "#registros-vendas-cliente-a-vencer"
              );

              $("#registros-vendas-cliente-a-vencer").html("");

              for (
                let vendas = 0;
                vendas < retorno_venda_vencer.length;
                vendas++
              ) {
                let recebeDescontoVenda =
                  retorno_venda_vencer[vendas].desconto_venda;
                let recebeValorDescontoVenda =
                  retorno_venda_vencer[vendas].desconto_final_venda.toString();

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
                  retorno_venda_vencer[vendas].valor_final_venda.toString();

                let recebeValorFVBR = "R$" + recebeValorFinal.replace(".", ",");

                let recebePagoVenda = retorno_venda_vencer[vendas].pago_venda;

                let recebeDataPagamentoAgendadoBR = "";
                if (
                  retorno_venda_vencer[vendas].pagamento_agendado_venda === 1
                ) {
                  recebeDataPagamentoAgendadoBR = retorno_venda_vencer[
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
                  retorno_venda_vencer[vendas].nome_cliente_venda +
                  "</td>" +
                  "<td class='text-center'>" +
                  retorno_venda_vencer[vendas].nome_produto_venda +
                  "</td>" +
                  "<td class='text-center'>" +
                  retorno_venda_vencer[vendas].quantidade_produtos_venda +
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
                  "<td><a href='#'><i class='bi bi-cash-coin fs-4' title='Venda Paga' id='informarPagamento' data-param-codigo='" +
                  retorno_venda_vencer[vendas].codigo_venda +
                  "'></i></a></td>" +
                  "<td><a href='#'><i class='bi bi-envelope fs-4' title='E-mail de cobrança' id='EncaminharEmailCobranca'></i></a></td>" +
                  "</tr>";
              }

              $("#registros-vendas-cliente-a-vencer").append(
                recebe_tabela_vendas
              );
            } else {
              $("#registros-vendas-cliente-a-vencer").html("");
              $("#registros-vendas-cliente-a-vencer").append(
                "<td colspan='7' class='text-center'>Nenhum registro localizado</td>"
              );
            }
          },
          error: function (xhr, status, error) { },
        });
      } else {
        $("#recebe-mensagem-falha-pagamento-atualizado-vendas-vencer").html(
          "Falha ao atualizar pagamento"
        );
        $("#recebe-mensagem-falha-pagamento-atualizado-vendas-vencer").show();
        $("#recebe-mensagem-falha-pagamento-atualizado-vendas-vencer").fadeOut(
          4000
        );
      }
    },
    error: function (xhr, status, error) {
      $("#recebe-mensagem-falha-pagamento-atualizado-vendas-vencer").html(
        "Falha ao atualizar pagamento:" + error
      );
      $("#recebe-mensagem-falha-pagamento-atualizado-vendas-vencer").show();
      $("#recebe-mensagem-falha-pagamento-atualizado-vendas-vencer").fadeOut(
        4000
      );
    },
  });
});

$(document).on("click", "#EncaminharEmailCobranca", function (e) {
  e.preventDefault();

  debugger;

  let recebeCodigoClienteVenda = $(this).data("param-codigo-cliente");
  let recebeNomeProdutoVenda = $(this).data("param-nome-produto");
  let recebeValorFinalVenda = $(this).data("param-valor-final");
  let recebeNomeClienteVenda = $(this).data("param-nome-cliente");

  $.ajax({
    url: "../api/ClienteAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_cliente: "recebe_consultar_email_cliente",
      valor_codigo_cliente_venda: recebeCodigoClienteVenda,
    },
    success: function (retorno_email) {
      debugger;

      let recebeEmailClienteCobranca = retorno_email;

      $.ajax({
        url: "../api/ClienteAPI.php",
        type: "post",
        dataType: "json",
        data: {
          processo_cliente: "recebe_envia_email_cobranca",
          valor_nome_produto_venda: recebeNomeProdutoVenda,
          valor_final_venda: recebeValorFinalVenda,
          valor_nome_cliente_venda: recebeNomeClienteVenda,
          valor_email_cliente_venda: recebeEmailClienteCobranca,
        },
        success: function (retorno_envia_email) {
          debugger;
          if (retorno_envia_email === "E-mail de cobrança encaminhado") {
            $("#recebe-mensagem-email-cobranca-vendas-vencer-encaminhado").html(retorno_envia_email);
            $("#recebe-mensagem-email-cobranca-vendas-vencer-encaminhado").show();
            $("#recebe-mensagem-email-cobranca-vendas-vencer-encaminhado").fadeOut(4000);
          }
        },
        error: function (xhr, status, error) {
          $("#recebe-mensagem-falha-email-cobranca-vendas-vencer-encaminhar").html("Falha ao encaminhar e-mail:" + error);
          $("#recebe-mensagem-falha-email-cobranca-vendas-vencer-encaminhar").show();
          $("#recebe-mensagem-falha-email-cobranca-vendas-vencer-encaminhar").fadeOut(4000);
        },
      });
    },
    error: function (xhr, status, error) {
      $("#recebe-mensagem-falha-localizar-email-cobranca-vendas-vencer-encaminhar").html("Falha ao buscar e-mail do cliente:" + error);
      $("#recebe-mensagem-falha-localizar-email-cobranca-vendas-vencer-encaminhar").show();
      $("#recebe-mensagem-falha-localizar-email-cobranca-vendas-vencer-encaminhar").fadeOut(4000);
    },
  });
});