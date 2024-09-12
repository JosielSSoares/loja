$(document).ready(function (e) {
  $("#recebe-mensagem-cadastro-alterar-realizado-produto").hide();
  $("#recebe-mensagem-cadastro-alterar-sendo-realizada-produto").hide();
  $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").hide();
  $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").hide();

  $("#recebe-mensagem-falha-buscar-produto-filtro").hide();
  $("#recebe-mensagem-campo-falha-buscar-produto").hide();
  $("#recebe-mensagem-exclusao-realizado-produto").hide();
  $("#recebe-mensagem-campo-falha-exclusao-produto").hide();
  $("#recebe-mensagem-campo-vazio-buscar-produto").hide();

  $("#recebe-mensagem-alterar-realizado-produto").hide();
  $("#recebe-mensagem-alterar-sendo-realizada-produto").hide();
  $("#recebe-mensagem-campo-vazio-alterar-produto").hide();
  $("#recebe-mensagem-campo-falha-alterar-produto").hide();

  $("img.checkable").imgCheckbox();

  let recebe_url_atual_produtos = window.location.href;

  recebe_filtro_produto_pesquisado_continuar_exibicao_excluindo_produtos = "";

  recebe_valor_filtro_selecionado_produto_pesquisado_continuar_exibicao_excluindo_produtos =
    "";

  recebe_filtro_produto_pesquisado_continuar_exibicao_alterando_produtos = "";

  recebe_valor_filtro_selecionado_produto_pesquisado_continuar_exibicao_alterando_produtos =
    "";

  debugger;
  dados_produtos = "";
  tamanhoPagina = 10;
  pagina = 0;
  max_links = 2;
  recebe_filtro_selecionado_produtos = "";
  recebe_valor_filtro_informado_produtos = "";

  $("#proximo-produtos").click(function () {
    debugger;
    if (pagina < dados_produtos.length / tamanhoPagina - 1) {
      pagina++;
      paginar_proximo_produtos();
      ajustarBotoes();
    }
  });

  $("#anterior-produtos").click(function () {
    debugger;
    if (pagina > 0) {
      pagina--;
      paginar_anterior_produtos();
      ajustarBotoes();
    }
  });

  function ajustarBotoes() {
    debugger;
    $("#proximo-produtos").prop(
      "disabled",
      dados_produtos.length <= tamanhoPagina ||
        pagina >= Math.ceil(dados_produtos.length / tamanhoPagina) - 1
    );
    $("#anterior-produtos").prop(
      "disabled",
      dados_produtos.length <= tamanhoPagina || pagina == 0
    );
  }

  if (
    recebe_url_atual_produtos ===
    "https://www.idailneto.com.br/loja/visao/index.php?pagina=consulta_produtos"
  ) {
    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/CategoriaAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_categoria: "recebe_consultar_categorias",
      },
      // beforeSend: function () {
      //   debugger;
      //   $("#registros-clientes").html("");
      //   $("#registros-clientes").append(
      //     "<td colspan='5' class='text-center'>Carregando dados</td>"
      //   );
      //   $("#registros-clientes").html("");
      // },
      success: function (retorno_categorias) {
        debugger;
        if (retorno_categorias.length > 0) {
          $("#valor-filtro-categoria-produto").html("");
          $("#valor-filtro-categoria-produto").append(
            "<option value='selecione'>Selecione</option>"
          );
          $.each(retorno_categorias, function (i, element) {
            $("#valor-filtro-categoria-produto").append(
              "<option value=" +
                element.nome_categoria.toLowerCase() +
                ">" +
                element.nome_categoria +
                "</option>"
            );
          });
        } else {
        }
      },
      error: function (xhr, status, error) {},
    });

    listarProdutos("todos", "todos");
    $("#valor-filtro-produto").attr("disabled", true);
    $("#buscar-produto").attr("disabled", true);

    recebe_filtro_selecionado_produtos = "todos";
    recebe_valor_filtro_informado_produtos = "todos";
  }

  function paginar_anterior_produtos() {
    debugger;

    if (recebe_filtro_selecionado_produtos === "todos") {
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ProdutoAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_produto: "recebe_consultar_produtos",
          filtro_produto: recebe_filtro_selecionado_produtos,
          valor_filtro_produto: recebe_valor_filtro_informado_produtos,
        },
        beforeSend: function () {
          debugger;
          $("#registros-produtos").html("");
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-produtos").html("");
        },
        success: function (retorno_produtos) {
          debugger;
          if (retorno_produtos.length > 0) {
            let recebe_tabela_produtos = document.querySelector(
              "#registros-produtos"
            );

            let recebe_quantidade_produtos = retorno_produtos.length;

            $("#exibi-quantidade-produtos").html(
              "Quantidade de produtos:" + recebe_quantidade_produtos
            );

            dados_produtos = retorno_produtos;
            for (
              var produtos = pagina * tamanhoPagina;
              produtos < retorno_produtos.length &&
              produtos < (pagina + 1) * tamanhoPagina;
              produtos++
            ) {
              let recebeValorProdutoBR =
                retorno_produtos[produtos].valor_produto.toString();

              let recebeValorProdutoBRFinal =
                "R$" + recebeValorProdutoBR.replace(".", ",");

              recebe_tabela_produtos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_produtos[produtos].categoria_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].nome_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].estoque_produto +
                "</td>" +
                "<td>" +
                recebeValorProdutoBRFinal +
                "</td>" +
                "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></a></i></td>" +
                "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></i></a></td>" +
                "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)></i></a></td>" +
                "</tr>";
            }
            $("#registros-produtos").append(recebe_tabela_produtos);

            $("#numeracao-produtos").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_produtos.length / tamanhoPagina)
            );
          } else {
            $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
            $("#registros-produtos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );

            if (pagina == 0) {
              $("#numeracao-produtos").text("Página " + (pagina + 1) + " de 1");
            } else {
              $("#numeracao-produtos").text(
                "Página " +
                  (pagina + 1) +
                  " de " +
                  Math.ceil(retorno_produtos.length / tamanhoPagina)
              );
            }
          }
        },
        error: function (xhr, status, error) {},
      });
    } else if (recebe_filtro_selecionado_produtos === "categoria_produto") {
      debugger;
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ProdutoAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_produto: "recebe_consultar_produtos",
          filtro_produto: recebe_filtro_selecionado_produtos,
          valor_filtro_produto: recebe_valor_filtro_informado_produtos,
        },
        beforeSend: function () {
          debugger;
          $("#registros-produtos").html("");
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-produtos").html("");
        },
        success: function (retorno_produtos) {
          debugger;
          if (retorno_produtos.length > 0) {
            let recebe_tabela_produtos = document.querySelector(
              "#registros-produtos"
            );

            let recebe_quantidade_produtos = retorno_produtos.length;

            $("#exibi-quantidade-produtos").html(
              "Quantidade de produtos:" + recebe_quantidade_produtos
            );

            dados_produtos = retorno_produtos;
            for (
              var produtos = pagina * tamanhoPagina;
              produtos < retorno_produtos.length &&
              produtos < (pagina + 1) * tamanhoPagina;
              produtos++
            ) {
              let recebeValorProdutoBR =
                retorno_produtos[produtos].valor_produto.toString();

              let recebeValorProdutoBRFinal =
                "R$" + recebeValorProdutoBR.replace(".", ",");

              recebe_tabela_produtos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_produtos[produtos].categoria_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].nome_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].estoque_produto +
                "</td>" +
                "<td>" +
                recebeValorProdutoBRFinal +
                "</td>" +
                "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></a></i></td>" +
                "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></i></a></td>" +
                "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)></i></a></td>" +
                "</tr>";
            }
            $("#registros-produtos").append(recebe_tabela_produtos);

            $("#numeracao-produtos").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_produtos.length / tamanhoPagina)
            );
          } else {
            $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
            $("#registros-produtos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );

            if (pagina == 0) {
              $("#numeracao-produtos").text("Página " + (pagina + 1) + " de 1");
            } else {
              $("#numeracao-produtos").text(
                "Página " +
                  (pagina + 1) +
                  " de " +
                  Math.ceil(retorno_produtos.length / tamanhoPagina)
              );
            }
          }
        },
        error: function (xhr, status, error) {},
      });
    } else if (recebe_filtro_selecionado_produtos === "nome_produto") {
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ProdutoAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_produto: "recebe_consultar_produtos",
          filtro_produto: recebe_filtro_selecionado_produtos,
          valor_filtro_produto: recebe_valor_filtro_informado_produtos,
        },
        beforeSend: function () {
          debugger;
          $("#registros-produtos").html("");
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-produtos").html("");
        },
        success: function (retorno_produtos) {
          debugger;
          if (retorno_produtos.length > 0) {
            let recebe_tabela_produtos = document.querySelector(
              "#registros-produtos"
            );

            let recebe_quantidade_produtos = retorno_produtos.length;

            $("#exibi-quantidade-produtos").html(
              "Quantidade de produtos:" + recebe_quantidade_produtos
            );

            dados_produtos = retorno_produtos;
            for (
              var produtos = pagina * tamanhoPagina;
              produtos < retorno_produtos.length &&
              produtos < (pagina + 1) * tamanhoPagina;
              produtos++
            ) {
              let recebeValorProdutoBR =
                retorno_produtos[produtos].valor_produto.toString();

              let recebeValorProdutoBRFinal =
                "R$" + recebeValorProdutoBR.replace(".", ",");

              recebe_tabela_produtos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_produtos[produtos].categoria_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].nome_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].estoque_produto +
                "</td>" +
                "<td>" +
                recebeValorProdutoBRFinal +
                "</td>" +
                "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></a></i></td>" +
                "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></i></a></td>" +
                "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)></i></a></td>" +
                "</tr>";
            }
            $("#registros-produtos").append(recebe_tabela_produtos);

            $("#numeracao-produtos").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_produtos.length / tamanhoPagina)
            );
          } else {
            $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
            $("#registros-produtos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );

            if (pagina == 0) {
              $("#numeracao-produtos").text("Página " + (pagina + 1) + " de 1");
            } else {
              $("#numeracao-produtos").text(
                "Página " +
                  (pagina + 1) +
                  " de " +
                  Math.ceil(retorno_produtos.length / tamanhoPagina)
              );
            }
          }
        },
        error: function (xhr, status, error) {},
      });
    }
  }

  function paginar_proximo_produtos() {
    debugger;

    if (recebe_filtro_selecionado_produtos === "todos") {
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ProdutoAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_produto: "recebe_consultar_produtos",
          filtro_produto: recebe_filtro_selecionado_produtos,
          valor_filtro_produto: recebe_valor_filtro_informado_produtos,
        },
        beforeSend: function () {
          debugger;
          $("#registros-produtos").html("");
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-produtos").html("");
        },
        success: function (retorno_produtos) {
          debugger;
          if (retorno_produtos.length > 0) {
            let recebe_tabela_produtos = document.querySelector(
              "#registros-produtos"
            );

            let recebe_quantidade_produtos = retorno_produtos.length;

            $("#exibi-quantidade-produtos").html(
              "Quantidade de produtos:" + recebe_quantidade_produtos
            );

            dados_produtos = retorno_produtos;
            for (
              var produtos = pagina * tamanhoPagina;
              produtos < retorno_produtos.length &&
              produtos < (pagina + 1) * tamanhoPagina;
              produtos++
            ) {
              let recebeValorProdutoBR =
                retorno_produtos[produtos].valor_produto.toString();

              let recebeValorProdutoBRFinal =
                "R$" + recebeValorProdutoBR.replace(".", ",");

              recebe_tabela_produtos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_produtos[produtos].categoria_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].nome_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].estoque_produto +
                "</td>" +
                "<td>" +
                recebeValorProdutoBRFinal +
                "</td>" +
                "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></a></i></td>" +
                "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></i></a></td>" +
                "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)></i></a></td>" +
                "</tr>";
            }
            $("#registros-produtos").append(recebe_tabela_produtos);

            $("#numeracao-produtos").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_produtos.length / tamanhoPagina)
            );
          } else {
            $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
            $("#registros-produtos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );

            if (pagina == 0) {
              $("#numeracao-produtos").text("Página " + (pagina + 1) + " de 1");
            } else {
              $("#numeracao-produtos").text(
                "Página " +
                  (pagina + 1) +
                  " de " +
                  Math.ceil(retorno_produtos.length / tamanhoPagina)
              );
            }
          }
        },
        error: function (xhr, status, error) {},
      });
    } else if (recebe_filtro_selecionado_produtos === "categoria_produto") {
      debugger;
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ProdutoAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_produto: "recebe_consultar_produtos",
          filtro_produto: recebe_filtro_selecionado_produtos,
          valor_filtro_produto: recebe_valor_filtro_informado_produtos,
        },
        beforeSend: function () {
          debugger;
          $("#registros-produtos").html("");
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-produtos").html("");
        },
        success: function (retorno_produtos) {
          debugger;
          if (retorno_produtos.length > 0) {
            let recebe_tabela_produtos = document.querySelector(
              "#registros-produtos"
            );

            let recebe_quantidade_produtos = retorno_produtos.length;

            $("#exibi-quantidade-produtos").html(
              "Quantidade de produtos:" + recebe_quantidade_produtos
            );

            dados_produtos = retorno_produtos;
            for (
              var produtos = pagina * tamanhoPagina;
              produtos < retorno_produtos.length &&
              produtos < (pagina + 1) * tamanhoPagina;
              produtos++
            ) {
              let recebeValorProdutoBR =
                retorno_produtos[produtos].valor_produto.toString();

              let recebeValorProdutoBRFinal =
                "R$" + recebeValorProdutoBR.replace(".", ",");

              recebe_tabela_produtos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_produtos[produtos].categoria_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].nome_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].estoque_produto +
                "</td>" +
                "<td>" +
                recebeValorProdutoBRFinal +
                "</td>" +
                "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></a></i></td>" +
                "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></i></a></td>" +
                "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)></i></a></td>" +
                "</tr>";
            }
            $("#registros-produtos").append(recebe_tabela_produtos);

            $("#numeracao-produtos").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_produtos.length / tamanhoPagina)
            );
          } else {
            $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
            $("#registros-produtos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );

            if (pagina == 0) {
              $("#numeracao-produtos").text("Página " + (pagina + 1) + " de 1");
            } else {
              $("#numeracao-produtos").text(
                "Página " +
                  (pagina + 1) +
                  " de " +
                  Math.ceil(retorno_produtos.length / tamanhoPagina)
              );
            }
          }
        },
        error: function (xhr, status, error) {},
      });
    } else if (recebe_filtro_selecionado_produtos === "nome_produto") {
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ProdutoAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_produto: "recebe_consultar_produtos",
          filtro_produto: recebe_filtro_selecionado_produtos,
          valor_filtro_produto: recebe_valor_filtro_informado_produtos,
        },
        beforeSend: function () {
          debugger;
          $("#registros-produtos").html("");
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-produtos").html("");
        },
        success: function (retorno_produtos) {
          debugger;
          if (retorno_produtos.length > 0) {
            let recebe_tabela_produtos = document.querySelector(
              "#registros-produtos"
            );

            let recebe_quantidade_produtos = retorno_produtos.length;

            $("#exibi-quantidade-produtos").html(
              "Quantidade de produtos:" + recebe_quantidade_produtos
            );

            dados_produtos = retorno_produtos;
            for (
              var produtos = pagina * tamanhoPagina;
              produtos < retorno_produtos.length &&
              produtos < (pagina + 1) * tamanhoPagina;
              produtos++
            ) {
              let recebeValorProdutoBR =
                retorno_produtos[produtos].valor_produto.toString();

              let recebeValorProdutoBRFinal =
                "R$" + recebeValorProdutoBR.replace(".", ",");

              recebe_tabela_produtos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_produtos[produtos].categoria_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].nome_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].estoque_produto +
                "</td>" +
                "<td>" +
                recebeValorProdutoBRFinal +
                "</td>" +
                "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></a></i></td>" +
                "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></i></a></td>" +
                "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)></i></a></td>" +
                "</tr>";
            }
            $("#registros-produtos").append(recebe_tabela_produtos);

            $("#numeracao-produtos").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_produtos.length / tamanhoPagina)
            );
          } else {
            $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
            $("#registros-produtos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );

            if (pagina == 0) {
              $("#numeracao-produtos").text("Página " + (pagina + 1) + " de 1");
            } else {
              $("#numeracao-produtos").text(
                "Página " +
                  (pagina + 1) +
                  " de " +
                  Math.ceil(retorno_produtos.length / tamanhoPagina)
              );
            }
          }
        },
        error: function (xhr, status, error) {},
      });
    }
  }
});

function listarProdutos(filtroProduto, valorFiltroProduto) {
  $.ajax({
    //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
    url: "../api/ProdutoAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_produto: "recebe_consultar_produtos",
      filtro_produto: filtroProduto,
      valor_filtro_produto: valorFiltroProduto,
    },
    beforeSend: function () {
      debugger;
      $("#registros-produtos").html("");
      $("#registros-produtos").append(
        "<td colspan='5' class='text-center'>Carregando dados</td>"
      );
      $("#registros-produtos").html("");
    },
    success: function (retorno_produtos) {
      debugger;
      if (retorno_produtos.length > 0) {
        let recebe_tabela_produtos = document.querySelector(
          "#registros-produtos"
        );

        let recebe_quantidade_produtos = retorno_produtos.length;

        $("#exibi-quantidade-produtos").html(
          "Quantidade de produtos:" + recebe_quantidade_produtos
        );

        dados_produtos = retorno_produtos;

        recebe_registros_produtos_pesquisa_todos = retorno_produtos;

        configura_proximo_todos_produtos();
        configura_anterior_todos_produtos();
        configura_botao_proximo_todos_produtos();
        configura_botao_anterior_todos_produtos();

        for (
          var produtos = pagina * tamanhoPagina;
          produtos < retorno_produtos.length &&
          produtos < (pagina + 1) * tamanhoPagina;
          produtos++
        ) {
          let recebeValorProdutoBR =
            retorno_produtos[produtos].valor_produto.toString();

          let recebeValorProdutoBRFinal =
            "R$" + recebeValorProdutoBR.replace(".", ",");

          recebe_tabela_produtos.innerHTML +=
            "<tr>" +
            "<td>" +
            retorno_produtos[produtos].categoria_produto +
            "</td>" +
            "<td>" +
            retorno_produtos[produtos].nome_produto +
            "</td>" +
            "<td>" +
            retorno_produtos[produtos].estoque_produto +
            "</td>" +
            "<td>" +
            recebeValorProdutoBRFinal +
            "</td>" +
            "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
            retorno_produtos[produtos].codigo_produto +
            ",event)'></a></i></td>" +
            "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
            retorno_produtos[produtos].codigo_produto +
            ",event)'></i></a></td>" +
            "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
            retorno_produtos[produtos].codigo_produto +
            ",event)></i></a></td>" +
            "</tr>";
        }
        $("#registros-produtos").append(recebe_tabela_produtos);

        $("#numeracao-produtos").text(
          "Página " +
            (pagina + 1) +
            " de " +
            Math.ceil(retorno_produtos.length / tamanhoPagina)
        );
      } else {
        $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
        $("#registros-produtos").append(
          "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
        );

        if (pagina == 0) {
          $("#numeracao-produtos").text("Página " + (pagina + 1) + " de 1");
        } else {
          $("#numeracao-produtos").text(
            "Página " +
              (pagina + 1) +
              " de " +
              Math.ceil(retorno_produtos.length / tamanhoPagina)
          );
        }
      }
    },
    error: function (xhr, status, error) {},
  });
}

recebe_registros_produtos_pesquisa_nome = "";

function configura_proximo_nome_produtos() {
  if (
    pagina <
    recebe_registros_produtos_pesquisa_nome.length / tamanhoPagina - 1
  ) {
    pagina++;
  }
}

function configura_anterior_nome_produtos() {
  if (pagina > 0) {
    pagina--;
  }
}

function configura_botao_proximo_nome_produtos() {
  debugger;
  console.log(
    Math.ceil(recebe_registros_produtos_pesquisa_nome.length / tamanhoPagina) -
      1
  );

  $("#proximo-produtos").prop(
    "disabled",
    recebe_registros_produtos_pesquisa_nome.length <= tamanhoPagina ||
      pagina >=
        Math.ceil(
          recebe_registros_produtos_pesquisa_nome.length / tamanhoPagina
        ) -
          1
  );
}

function configura_botao_anterior_nome_produtos() {
  debugger;
  $("#anterior-produtos").prop(
    "disabled",
    recebe_registros_produtos_pesquisa_nome.length <= tamanhoPagina ||
      pagina == 0
  );
}

recebe_registros_produtos_pesquisa_categoria = "";

function configura_proximo_categoria_produtos() {
  debugger;
  if (
    pagina <
    recebe_registros_produtos_pesquisa_categoria.length / tamanhoPagina - 1
  ) {
    pagina++;
  }
}

function configura_anterior_categoria_produtos() {
  debugger;
  if (pagina > 0) {
    pagina--;
  }
}

function configura_botao_proximo_categoria_produtos() {
  debugger;
  $("#proximo-produtos").prop(
    "disabled",
    recebe_registros_produtos_pesquisa_categoria.length <= tamanhoPagina ||
      pagina >=
        Math.ceil(
          recebe_registros_produtos_pesquisa_categoria.length / tamanhoPagina
        ) -
          1
  );
}

function configura_botao_anterior_categoria_produtos() {
  debugger;
  $("#anterior-produtos").prop(
    "disabled",
    recebe_registros_produtos_pesquisa_categoria.length <= tamanhoPagina ||
      pagina == 0
  );
}

recebe_registros_produtos_pesquisa_todos = "";

function configura_proximo_todos_produtos() {
  debugger;
  if (
    pagina <
    recebe_registros_produtos_pesquisa_todos.length / tamanhoPagina - 1
  ) {
    pagina++;
  }
}

function configura_anterior_todos_produtos() {
  debugger;
  if (pagina > 0) {
    pagina--;
  }
}

function configura_botao_proximo_todos_produtos() {
  debugger;
  $("#proximo-produtos").prop(
    "disabled",
    recebe_registros_produtos_pesquisa_todos.length <= tamanhoPagina ||
      pagina >=
        Math.ceil(
          recebe_registros_produtos_pesquisa_todos.length / tamanhoPagina
        ) -
          1
  );
}

function configura_botao_anterior_todos_produtos() {
  debugger;
  $("#anterior-produtos").prop(
    "disabled",
    recebe_registros_produtos_pesquisa_todos.length <= tamanhoPagina ||
      pagina == 0
  );
}

function carrega_imagens_produto(recebe_codigo_produto_imagens, e) {
  e.preventDefault();
  debugger;

  if (recebe_codigo_produto_imagens != "") {
    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ProdutoAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_produto: "recebe_consultar_imagens_produto",
        valor_codigo_imagens_produto: recebe_codigo_produto_imagens,
      },
      success: function (retorno_imagens_produto) {
        debugger;

        if (retorno_imagens_produto.length > 0) {
          $("#exibi-imagens-produtos-cadastrados").html("");
          for (let index = 0; index < retorno_imagens_produto.length; index++) {
            const arquivo = new File(
              [retorno_imagens_produto[index].imagem],
              retorno_imagens_produto[index].imagem,
              {
                type: "image/jpg",
              }
            );

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(arquivo);
            //campo_imagem_usuario.files = dataTransfer.files;

            // document.getElementById("exibi-foto-perfil").src =
            //   "acesso/imagem_perfil/" + retorno.imagem_usuario;

            $("#exibi-imagens-produtos-cadastrados").append(
              "<img src='produtos/imagens_produto/" +
                retorno_imagens_produto[index].imagem +
                "' style='height:80px;margin-right:10px;margin-right: 10px;margin-top: 17px;margin-bottom: 15px;'/>"
            );
          }
        }
      },
      error: function (xhr, status, error) {},
    });
  }
}
let imagens_produto_alteracao = Array();
function carrega_dados_produto_alteracao(recebeCodigoProdutoAlteracao, e) {
  e.preventDefault();

  debugger;

  let div_imagens_exibindo_imagens_antes_alterar = document.querySelector(
    "#imagens-produtos-visualiza-alterar"
  );

  div_imagens_exibindo_imagens_antes_alterar.classList.add(
    "exibi_imagems_lado_lado"
  );

  imagens_produto_alteracao.length = 0;

  if (recebeCodigoProdutoAlteracao) {
    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/CategoriaAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_categoria: "recebe_consultar_categorias",
      },
      // beforeSend: function () {
      //   debugger;
      //   $("#registros-clientes").html("");
      //   $("#registros-clientes").append(
      //     "<td colspan='5' class='text-center'>Carregando dados</td>"
      //   );
      //   $("#registros-clientes").html("");
      // },
      success: function (retorno_categorias) {
        debugger;
        if (retorno_categorias.length > 0) {
          $("#categoria-produto-alterar").html("");
          $("#categoria-produto-alterar").append(
            "<option value='selecione'>Selecione</option>"
          );
          $.each(retorno_categorias, function (i, element) {
            $("#categoria-produto-alterar").append(
              "<option value=" +
                element.nome_categoria.toLowerCase() +
                ">" +
                element.nome_categoria +
                "</option>"
            );
          });
        } else {
        }
      },
      error: function (xhr, status, error) {},
    });

    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ProdutoAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_produto: "recebe_consultar_produto_especifico",
        valor_codigo_produto_especifico_alteracao: recebeCodigoProdutoAlteracao,
      },
      success: function (retorno_produto) {
        debugger;

        if (retorno_produto.length > 0) {
          $("#exibi-imagens-produtos-alterar").html("");
          for (
            let dados_produto = 0;
            dados_produto < retorno_produto.length;
            dados_produto++
          ) {
            let recebeValorProdutoBR =
              retorno_produto[dados_produto].valor_produto.toString();

            let recebeValorProdutoBRFinal =
              "R$" + recebeValorProdutoBR.replace(".", ",");

            $("#categoria-produto-alterar").val(
              retorno_produto[dados_produto].categoria_produto
            );
            $("#nome-produto-alterar").val(
              retorno_produto[dados_produto].nome_produto
            );
            $("#estoque-produto-alterar").val(
              retorno_produto[dados_produto].estoque_produto
            );
            $("#valor-produto-alterar").val(recebeValorProdutoBRFinal);
            $("#codigo-produto-alterar").val(
              retorno_produto[dados_produto].codigo_produto
            );

            // const campo_imagem_produto = document.querySelector(
            //   "#imagens-produtos-alterar"
            // );
            // const arquivo = new File(
            //   [retorno_produto[dados_produto].imagem],
            //   retorno_produto[dados_produto].imagem,
            //   {
            //     type: "image/jpg",
            //   }
            // );

            // const dataTransfer = new DataTransfer();
            // dataTransfer.items.add(arquivo);
            // campo_imagem_produto.files = dataTransfer.files;

            $("#exibi-imagens-produtos-alterar").append(
              "<img src='produtos/imagens_produto/" +
                retorno_produto[dados_produto].imagem +
                "' style='height:80px;margin-right:10px;margin-right: 10px;margin-top: 17px;margin-bottom: 15px;'/>"
            );

            imagens_produto_alteracao.push(
              retorno_produto[dados_produto].imagem
            );
          }
        }
      },
      error: function (xhr, status, error) {},
    });
  }
}

function excluiProdutoEspecifico(recebeCodigoProdutoEspecificoExcluir, e) {
  e.preventDefault();

  let recebeRespostaExcluirProdutoEspecifico = window.confirm(
    "Tem certeza que deseja excluir o produto?"
  );

  if (recebeRespostaExcluirProdutoEspecifico) {
    $.ajax({
      url: "../api/ProdutoAPI.php",
      type: "DELETE",
      dataType: "json",
      cache: false,
      data: JSON.stringify({
        processo_produto: "recebe_exclui_produto",
        valor_codigo_produto_exclui: recebeCodigoProdutoEspecificoExcluir,
      }),
      success: function (retorno) {
        debugger;
        if (retorno != "") {
          if (retorno === "Produto excluido com sucesso") {
            $("#recebe-mensagem-exclusao-realizado-produto").html(retorno);
            $("#recebe-mensagem-exclusao-realizado-produto").show();
            $("#recebe-mensagem-exclusao-realizado-produto").fadeOut(4000);

            let url_produto = window.location.href;

            if (
              url_produto ===
              "https://www.idailneto.com.br/loja/visao/index.php?pagina=consulta_produtos"
            ) {
              if (
                recebe_filtro_produto_pesquisado_continuar_exibicao_excluindo_produtos ===
                "nome_produto"
              ) {
                $.ajax({
                  //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
                  url: "../api/ProdutoAPI.php",
                  dataType: "json",
                  type: "get",
                  data: {
                    processo_produto: "recebe_consultar_produtos",
                    filtro_produto:
                      recebe_filtro_produto_pesquisado_continuar_exibicao_excluindo_produtos,
                    valor_filtro_produto:
                      recebe_valor_filtro_selecionado_produto_pesquisado_continuar_exibicao_excluindo_produtos,
                  },
                  beforeSend: function () {
                    debugger;
                    $("#registros-produtos").html("");
                    $("#registros-produtos").append(
                      "<td colspan='5' class='text-center'>Carregando dados</td>"
                    );
                    $("#registros-produtos").html("");
                  },
                  success: function (retorno_produtos) {
                    debugger;
                    if (retorno_produtos.length > 0) {
                      recebe_registros_produtos_pesquisa_nome =
                        retorno_produtos;

                      configura_anterior_nome_produtos();
                      configura_proximo_nome_produtos();
                      configura_botao_anterior_nome_produtos();
                      configura_botao_proximo_nome_produtos();

                      let recebe_tabela_produtos = document.querySelector(
                        "#registros-produtos"
                      );

                      let recebe_quantidade_produtos = retorno_produtos.length;

                      $("#exibi-quantidade-produtos").html(
                        "Quantidade de produtos:" + recebe_quantidade_produtos
                      );

                      dados_produtos = retorno_produtos;
                      for (
                        var produtos = pagina * tamanhoPagina;
                        produtos < retorno_produtos.length &&
                        produtos < (pagina + 1) * tamanhoPagina;
                        produtos++
                      ) {
                        let recebeValorProdutoBR =
                          retorno_produtos[produtos].valor_produto.toString();

                        let recebeValorProdutoBRFinal =
                          "R$" + recebeValorProdutoBR.replace(".", ",");

                        recebe_tabela_produtos.innerHTML +=
                          "<tr>" +
                          "<td>" +
                          retorno_produtos[produtos].categoria_produto +
                          "</td>" +
                          "<td>" +
                          retorno_produtos[produtos].nome_produto +
                          "</td>" +
                          "<td>" +
                          retorno_produtos[produtos].estoque_produto +
                          "</td>" +
                          "<td>" +
                          recebeValorProdutoBRFinal +
                          "</td>" +
                          "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                          retorno_produtos[produtos].codigo_produto +
                          ",event)'></a></i></td>" +
                          "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                          retorno_produtos[produtos].codigo_produto +
                          ",event)'></i></a></td>" +
                          "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                          retorno_produtos[produtos].codigo_produto +
                          ",event)></i></a></td>" +
                          "</tr>";
                      }
                      $("#registros-produtos").append(recebe_tabela_produtos);

                      $("#numeracao-produtos").text(
                        "Página " +
                          (pagina + 1) +
                          " de " +
                          Math.ceil(retorno_produtos.length / tamanhoPagina)
                      );
                    } else {
                      $("#exibi-quantidade-produtos").html(
                        "Quantidade de produtos:" + 0
                      );
                      $("#registros-produtos").append(
                        "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
                      );

                      if (pagina == 0) {
                        $("#numeracao-produtos").text(
                          "Página " + (pagina + 1) + " de 1"
                        );
                      } else {
                        $("#numeracao-produtos").text(
                          "Página " +
                            (pagina + 1) +
                            " de " +
                            Math.ceil(retorno_produtos.length / tamanhoPagina)
                        );
                      }
                    }
                  },
                  error: function (xhr, status, error) {},
                });
              } else if (
                recebe_filtro_produto_pesquisado_continuar_exibicao_excluindo_produtos ===
                "categoria_produto"
              ) {
                $.ajax({
                  //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
                  url: "../api/ProdutoAPI.php",
                  dataType: "json",
                  type: "get",
                  data: {
                    processo_produto: "recebe_consultar_produtos",
                    filtro_produto:
                      recebe_filtro_produto_pesquisado_continuar_exibicao_excluindo_produtos,
                    valor_filtro_produto:
                      recebe_valor_filtro_selecionado_produto_pesquisado_continuar_exibicao_excluindo_produtos,
                  },
                  beforeSend: function () {
                    debugger;
                    $("#registros-produtos").html("");
                    $("#registros-produtos").append(
                      "<td colspan='5' class='text-center'>Carregando dados</td>"
                    );
                    $("#registros-produtos").html("");
                  },
                  success: function (retorno_produtos) {
                    debugger;
                    if (retorno_produtos.length > 0) {
                      recebe_registros_produtos_pesquisa_categoria =
                        retorno_produtos;

                      configura_anterior_categoria_produtos();
                      configura_proximo_categoria_produtos();
                      configura_botao_anterior_nome_produtos();
                      configura_botao_proximo_nome_produtos();

                      let recebe_tabela_produtos = document.querySelector(
                        "#registros-produtos"
                      );

                      let recebe_quantidade_produtos = retorno_produtos.length;

                      $("#exibi-quantidade-produtos").html(
                        "Quantidade de produtos:" + recebe_quantidade_produtos
                      );

                      dados_produtos = retorno_produtos;
                      for (
                        var produtos = pagina * tamanhoPagina;
                        produtos < retorno_produtos.length &&
                        produtos < (pagina + 1) * tamanhoPagina;
                        produtos++
                      ) {
                        let recebeValorProdutoBR =
                          retorno_produtos[produtos].valor_produto.toString();

                        let recebeValorProdutoBRFinal =
                          "R$" + recebeValorProdutoBR.replace(".", ",");

                        recebe_tabela_produtos.innerHTML +=
                          "<tr>" +
                          "<td>" +
                          retorno_produtos[produtos].categoria_produto +
                          "</td>" +
                          "<td>" +
                          retorno_produtos[produtos].nome_produto +
                          "</td>" +
                          "<td>" +
                          retorno_produtos[produtos].estoque_produto +
                          "</td>" +
                          "<td>" +
                          recebeValorProdutoBRFinal +
                          "</td>" +
                          "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                          retorno_produtos[produtos].codigo_produto +
                          ",event)'></a></i></td>" +
                          "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                          retorno_produtos[produtos].codigo_produto +
                          ",event)'></i></a></td>" +
                          "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                          retorno_produtos[produtos].codigo_produto +
                          ",event)></i></a></td>" +
                          "</tr>";
                      }
                      $("#registros-produtos").append(recebe_tabela_produtos);

                      $("#numeracao-produtos").text(
                        "Página " +
                          (pagina + 1) +
                          " de " +
                          Math.ceil(retorno_produtos.length / tamanhoPagina)
                      );
                    } else {
                      $("#exibi-quantidade-produtos").html(
                        "Quantidade de produtos:" + 0
                      );
                      $("#registros-produtos").append(
                        "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
                      );

                      if (pagina == 0) {
                        $("#numeracao-produtos").text(
                          "Página " + (pagina + 1) + " de 1"
                        );
                      } else {
                        $("#numeracao-produtos").text(
                          "Página " +
                            (pagina + 1) +
                            " de " +
                            Math.ceil(retorno_produtos.length / tamanhoPagina)
                        );
                      }
                    }
                  },
                  error: function (xhr, status, error) {},
                });
              } else {
                recebe_filtro_selecionado_produtos = "todos";
                recebe_valor_filtro_informado_produtos = "todos";
                $.ajax({
                  url: "../api/ProdutoAPI.php",
                  dataType: "json",
                  type: "get",
                  data: {
                    processo_produto: "recebe_consultar_produtos",
                    filtro_produto: recebe_filtro_selecionado_produtos,
                    valor_filtro_produto:
                      recebe_valor_filtro_informado_produtos,
                  },
                  beforeSend: function () {
                    debugger;
                    $("#registros-produtos").html("");
                    $("#registros-produtos").append(
                      "<td colspan='5' class='text-center'>Carregando dados</td>"
                    );
                    $("#registros-produtos").html("");
                  },
                  success: function (retorno_produtos) {
                    debugger;
                    if (retorno_produtos.length > 0) {
                      let recebe_tabela_produtos = document.querySelector(
                        "#registros-produtos"
                      );

                      let recebe_quantidade_produtos = retorno_produtos.length;

                      $("#exibi-quantidade-produtos").html(
                        "Quantidade de produtos:" + recebe_quantidade_produtos
                      );

                      dados_produtos = retorno_produtos;
                      for (
                        var produtos = pagina * tamanhoPagina;
                        produtos < retorno_produtos.length &&
                        produtos < (pagina + 1) * tamanhoPagina;
                        produtos++
                      ) {
                        let recebeValorProdutoBR =
                          retorno_produtos[produtos].valor_produto.toString();

                        let recebeValorProdutoBRFinal =
                          "R$" + recebeValorProdutoBR.replace(".", ",");

                        recebe_tabela_produtos.innerHTML +=
                          "<tr>" +
                          "<td>" +
                          retorno_produtos[produtos].categoria_produto +
                          "</td>" +
                          "<td>" +
                          retorno_produtos[produtos].nome_produto +
                          "</td>" +
                          "<td>" +
                          retorno_produtos[produtos].estoque_produto +
                          "</td>" +
                          "<td>" +
                          recebeValorProdutoBRFinal +
                          "</td>" +
                          "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                          retorno_produtos[produtos].codigo_produto +
                          ",event)'></a></i></td>" +
                          "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                          retorno_produtos[produtos].codigo_produto +
                          ",event)'></i></a></td>" +
                          "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                          retorno_produtos[produtos].codigo_produto +
                          ",event)></i></a></td>" +
                          "</tr>";
                      }
                      $("#registros-produtos").append(recebe_tabela_produtos);

                      $("#numeracao-produtos").text(
                        "Página " +
                          (pagina + 1) +
                          " de " +
                          Math.ceil(retorno_produtos.length / tamanhoPagina)
                      );
                    } else {
                      $("#exibi-quantidade-produtos").html(
                        "Quantidade de produtos:" + 0
                      );
                      $("#registros-produtos").append(
                        "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
                      );

                      if (pagina == 0) {
                        $("#numeracao-produtos").text(
                          "Página " + (pagina + 1) + " de 1"
                        );
                      } else {
                        $("#numeracao-produtos").text(
                          "Página " +
                            (pagina + 1) +
                            " de " +
                            Math.ceil(retorno_produtos.length / tamanhoPagina)
                        );
                      }
                    }
                  },
                  error: function (xhr, status, error) {},
                });
              }
            }
            //listarProdutos("todos", "todos");
          } else {
            $("#recebe-mensagem-campo-falha-exclusao-produto").html(
              "Falha ao excluir produto:" + retorno
            );
            $("#recebe-mensagem-campo-falha-exclusao-produto").show();
            $("#recebe-mensagem-campo-falha-exclusao-produto").fadeOut(4000);
          }
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-exclusao-produto").html(
          "Falha ao excluir cliente:" + error
        );
        $("#recebe-mensagem-campo-falha-exclusao-produto").show();
        $("#recebe-mensagem-campo-falha-exclusao-produto").fadeOut(4000);
      },
    });
  } else {
    return;
  }
}

$(document).on("focus", "#valor-produto-alterar", function (e) {
  e.preventDefault();

  debugger;

  $(this).maskMoney({
    prefix: "R$",
    thousands: ".",
    decimal: ",",
  });
});

$("#alterar-produto").click(function (e) {
  e.preventDefault();

  debugger;

  let recebeCategoriaProdutoAlterar = $("#categoria-produto-alterar").val();
  let recebeNomeProdutoAlterar = $("#nome-produto-alterar").val();
  let recebeEstoqueProdutoAlterar = $("#estoque-produto-alterar").val();
  let recebeValorProdutoAlterar = $("#valor-produto-alterar").val();

  let recebeVProdutoCortado = recebeValorProdutoAlterar.split("R$");

  let recebeVProdutoNumerico = recebeVProdutoCortado[1];

  let recebeVProdutoFinalNumerico = recebeVProdutoNumerico.replace(/,/g, ".");

  // Substituir o último ponto por um caractere temporário
  let tempStr = recebeVProdutoFinalNumerico.replace(/\.(?=[^.]*$)/, "TEMP");

  // Remover todos os outros pontos
  tempStr = tempStr.replace(/\./g, "");

  // Substituir o caractere temporário pelo ponto decimal
  let decimalStr = tempStr.replace("TEMP", ".");

  // Converter para número decimal
  let numeroDecimal = parseFloat(decimalStr);

  if (
    recebeCategoriaProdutoAlterar != "selecione" &&
    recebeNomeProdutoAlterar != "" &&
    recebeEstoqueProdutoAlterar != "" &&
    recebeValorProdutoAlterar != "" &&
    imagens_produto_alteracao.length > 0
  ) {
    //let recebeImagensProdutoSelecionadas = $("#imagens-produtos-alterar")[0].files;

    let dados_formulario_alterar_produto = $("#formulario-alterar-produto")[0];

    let dados_produto_alterar = new FormData(dados_formulario_alterar_produto);

    // if(recebeImagensProdutoSelecionadas.length === 0)
    // {
    //   dados_produto_alterar.append("imagens-produtos-cadastradas", imagens_produto_alteracao);
    //   dados_produto_alterar.append("quantidade-imagens-cadastrados-produtos",imagens_produto_alteracao.length);
    // }

    dados_produto_alterar.append(
      "valor_produto_numerico_alterar",
      numeroDecimal
    );
    dados_produto_alterar.append("processo_produto", "recebe_alterar_produto");
    dados_produto_alterar.append("valor_metodo", "PUT");
    dados_produto_alterar.append("processo_imagem", "recebe_alterar_imagem");

    $.ajax({
      type: "post",
      // enctype: "multipart/form-data",
      dataType: "json",
      //http://localhost/engenharia_testando/final/controladora/ImagemControladora.php
      url: "../api/ProdutoAPI.php",
      cache: false,
      processData: false,
      contentType: false,
      data: dados_produto_alterar,

      success: function (resultado) {
        debugger;
        if (resultado === "Produto alterado com sucesso") {
          $.ajax({
            type: "post",
            enctype: "multipart/form-data",
            dataType: "json",
            //http://localhost/engenharia_testando/final/controladora/ImagemControladora.php
            url: "../api/ImagemAPI.php",
            cache: false,
            processData: false,
            contentType: false,
            data: dados_produto_alterar,
            success: function (retorno) {
              debugger;
              if (retorno === "imagens cadastradas") {
                $("#recebe-mensagem-alterar-realizado-produto").html(
                  "Produto alterado com sucesso"
                );
                $("#recebe-mensagem-alterar-realizado-produto").show();
                $("#recebe-mensagem-alterar-realizado-produto").fadeOut(4000);

                //listarProdutos("todos", "todos");

                let url_produto = window.location.href;

                if (
                  url_produto ===
                  "https://www.idailneto.com.br/loja/visao/index.php?pagina=consulta_produtos"
                ) {
                  if (
                    recebe_filtro_produto_pesquisado_continuar_exibicao_alterando_produtos ===
                    "nome_produto"
                  ) {
                    $.ajax({
                      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
                      url: "../api/ProdutoAPI.php",
                      dataType: "json",
                      type: "get",
                      data: {
                        processo_produto: "recebe_consultar_produtos",
                        filtro_produto:
                          recebe_filtro_produto_pesquisado_continuar_exibicao_alterando_produtos,
                        valor_filtro_produto:
                          recebe_valor_filtro_selecionado_produto_pesquisado_continuar_exibicao_alterando_produtos,
                      },
                      beforeSend: function () {
                        debugger;
                        $("#registros-produtos").html("");
                        $("#registros-produtos").append(
                          "<td colspan='5' class='text-center'>Carregando dados</td>"
                        );
                        $("#registros-produtos").html("");
                      },
                      success: function (retorno_produtos) {
                        debugger;
                        if (retorno_produtos.length > 0) {
                          recebe_registros_produtos_pesquisa_nome =
                            retorno_produtos;

                          configura_anterior_nome_produtos();
                          configura_proximo_nome_produtos();
                          configura_botao_anterior_nome_produtos();
                          configura_botao_proximo_nome_produtos();

                          let recebe_tabela_produtos = document.querySelector(
                            "#registros-produtos"
                          );

                          let recebe_quantidade_produtos =
                            retorno_produtos.length;

                          $("#exibi-quantidade-produtos").html(
                            "Quantidade de produtos:" +
                              recebe_quantidade_produtos
                          );

                          dados_produtos = retorno_produtos;
                          for (
                            var produtos = pagina * tamanhoPagina;
                            produtos < retorno_produtos.length &&
                            produtos < (pagina + 1) * tamanhoPagina;
                            produtos++
                          ) {
                            let recebeValorProdutoBR =
                              retorno_produtos[
                                produtos
                              ].valor_produto.toString();

                            let recebeValorProdutoBRFinal =
                              "R$" + recebeValorProdutoBR.replace(".", ",");

                            recebe_tabela_produtos.innerHTML +=
                              "<tr>" +
                              "<td>" +
                              retorno_produtos[produtos].categoria_produto +
                              "</td>" +
                              "<td>" +
                              retorno_produtos[produtos].nome_produto +
                              "</td>" +
                              "<td>" +
                              retorno_produtos[produtos].estoque_produto +
                              "</td>" +
                              "<td>" +
                              recebeValorProdutoBRFinal +
                              "</td>" +
                              "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                              retorno_produtos[produtos].codigo_produto +
                              ",event)'></a></i></td>" +
                              "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                              retorno_produtos[produtos].codigo_produto +
                              ",event)'></i></a></td>" +
                              "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                              retorno_produtos[produtos].codigo_produto +
                              ",event)></i></a></td>" +
                              "</tr>";
                          }
                          $("#registros-produtos").append(
                            recebe_tabela_produtos
                          );

                          $("#numeracao-produtos").text(
                            "Página " +
                              (pagina + 1) +
                              " de " +
                              Math.ceil(retorno_produtos.length / tamanhoPagina)
                          );
                        } else {
                          $("#exibi-quantidade-produtos").html(
                            "Quantidade de produtos:" + 0
                          );
                          $("#registros-produtos").append(
                            "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
                          );

                          if (pagina == 0) {
                            $("#numeracao-produtos").text(
                              "Página " + (pagina + 1) + " de 1"
                            );
                          } else {
                            $("#numeracao-produtos").text(
                              "Página " +
                                (pagina + 1) +
                                " de " +
                                Math.ceil(
                                  retorno_produtos.length / tamanhoPagina
                                )
                            );
                          }
                        }
                      },
                      error: function (xhr, status, error) {},
                    });
                  } else if (
                    recebe_filtro_produto_pesquisado_continuar_exibicao_alterando_produtos ===
                    "categoria_produto"
                  ) {
                    $.ajax({
                      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
                      url: "../api/ProdutoAPI.php",
                      dataType: "json",
                      type: "get",
                      data: {
                        processo_produto: "recebe_consultar_produtos",
                        filtro_produto:
                          recebe_filtro_produto_pesquisado_continuar_exibicao_alterando_produtos,
                        valor_filtro_produto:
                          recebe_valor_filtro_selecionado_produto_pesquisado_continuar_exibicao_alterando_produtos,
                      },
                      beforeSend: function () {
                        debugger;
                        $("#registros-produtos").html("");
                        $("#registros-produtos").append(
                          "<td colspan='5' class='text-center'>Carregando dados</td>"
                        );
                        $("#registros-produtos").html("");
                      },
                      success: function (retorno_produtos) {
                        debugger;
                        if (retorno_produtos.length > 0) {
                          recebe_registros_produtos_pesquisa_categoria =
                            retorno_produtos;

                          configura_anterior_categoria_produtos();
                          configura_proximo_categoria_produtos();
                          configura_botao_anterior_nome_produtos();
                          configura_botao_proximo_nome_produtos();

                          let recebe_tabela_produtos = document.querySelector(
                            "#registros-produtos"
                          );

                          let recebe_quantidade_produtos =
                            retorno_produtos.length;

                          $("#exibi-quantidade-produtos").html(
                            "Quantidade de produtos:" +
                              recebe_quantidade_produtos
                          );

                          dados_produtos = retorno_produtos;
                          for (
                            var produtos = pagina * tamanhoPagina;
                            produtos < retorno_produtos.length &&
                            produtos < (pagina + 1) * tamanhoPagina;
                            produtos++
                          ) {
                            let recebeValorProdutoBR =
                              retorno_produtos[
                                produtos
                              ].valor_produto.toString();

                            let recebeValorProdutoBRFinal =
                              "R$" + recebeValorProdutoBR.replace(".", ",");

                            recebe_tabela_produtos.innerHTML +=
                              "<tr>" +
                              "<td>" +
                              retorno_produtos[produtos].categoria_produto +
                              "</td>" +
                              "<td>" +
                              retorno_produtos[produtos].nome_produto +
                              "</td>" +
                              "<td>" +
                              retorno_produtos[produtos].estoque_produto +
                              "</td>" +
                              "<td>" +
                              recebeValorProdutoBRFinal +
                              "</td>" +
                              "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                              retorno_produtos[produtos].codigo_produto +
                              ",event)'></a></i></td>" +
                              "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                              retorno_produtos[produtos].codigo_produto +
                              ",event)'></i></a></td>" +
                              "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                              retorno_produtos[produtos].codigo_produto +
                              ",event)></i></a></td>" +
                              "</tr>";
                          }
                          $("#registros-produtos").append(
                            recebe_tabela_produtos
                          );

                          $("#numeracao-produtos").text(
                            "Página " +
                              (pagina + 1) +
                              " de " +
                              Math.ceil(retorno_produtos.length / tamanhoPagina)
                          );
                        } else {
                          $("#exibi-quantidade-produtos").html(
                            "Quantidade de produtos:" + 0
                          );
                          $("#registros-produtos").append(
                            "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
                          );

                          if (pagina == 0) {
                            $("#numeracao-produtos").text(
                              "Página " + (pagina + 1) + " de 1"
                            );
                          } else {
                            $("#numeracao-produtos").text(
                              "Página " +
                                (pagina + 1) +
                                " de " +
                                Math.ceil(
                                  retorno_produtos.length / tamanhoPagina
                                )
                            );
                          }
                        }
                      },
                      error: function (xhr, status, error) {},
                    });
                  } else {
                    recebe_filtro_selecionado_produtos = "todos";
                    recebe_valor_filtro_informado_produtos = "todos";
                    $.ajax({
                      url: "../api/ProdutoAPI.php",
                      dataType: "json",
                      type: "get",
                      data: {
                        processo_produto: "recebe_consultar_produtos",
                        filtro_produto: recebe_filtro_selecionado_produtos,
                        valor_filtro_produto:
                          recebe_valor_filtro_informado_produtos,
                      },
                      beforeSend: function () {
                        debugger;
                        $("#registros-produtos").html("");
                        $("#registros-produtos").append(
                          "<td colspan='5' class='text-center'>Carregando dados</td>"
                        );
                        $("#registros-produtos").html("");
                      },
                      success: function (retorno_produtos) {
                        debugger;
                        if (retorno_produtos.length > 0) {
                          let recebe_tabela_produtos = document.querySelector(
                            "#registros-produtos"
                          );

                          let recebe_quantidade_produtos =
                            retorno_produtos.length;

                          $("#exibi-quantidade-produtos").html(
                            "Quantidade de produtos:" +
                              recebe_quantidade_produtos
                          );

                          dados_produtos = retorno_produtos;
                          for (
                            var produtos = pagina * tamanhoPagina;
                            produtos < retorno_produtos.length &&
                            produtos < (pagina + 1) * tamanhoPagina;
                            produtos++
                          ) {
                            let recebeValorProdutoBR =
                              retorno_produtos[
                                produtos
                              ].valor_produto.toString();

                            let recebeValorProdutoBRFinal =
                              "R$" + recebeValorProdutoBR.replace(".", ",");

                            recebe_tabela_produtos.innerHTML +=
                              "<tr>" +
                              "<td>" +
                              retorno_produtos[produtos].categoria_produto +
                              "</td>" +
                              "<td>" +
                              retorno_produtos[produtos].nome_produto +
                              "</td>" +
                              "<td>" +
                              retorno_produtos[produtos].estoque_produto +
                              "</td>" +
                              "<td>" +
                              recebeValorProdutoBRFinal +
                              "</td>" +
                              "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                              retorno_produtos[produtos].codigo_produto +
                              ",event)'></a></i></td>" +
                              "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                              retorno_produtos[produtos].codigo_produto +
                              ",event)'></i></a></td>" +
                              "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                              retorno_produtos[produtos].codigo_produto +
                              ",event)></i></a></td>" +
                              "</tr>";
                          }
                          $("#registros-produtos").append(
                            recebe_tabela_produtos
                          );

                          $("#numeracao-produtos").text(
                            "Página " +
                              (pagina + 1) +
                              " de " +
                              Math.ceil(retorno_produtos.length / tamanhoPagina)
                          );
                        } else {
                          $("#exibi-quantidade-produtos").html(
                            "Quantidade de produtos:" + 0
                          );
                          $("#registros-produtos").append(
                            "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
                          );

                          if (pagina == 0) {
                            $("#numeracao-produtos").text(
                              "Página " + (pagina + 1) + " de 1"
                            );
                          } else {
                            $("#numeracao-produtos").text(
                              "Página " +
                                (pagina + 1) +
                                " de " +
                                Math.ceil(
                                  retorno_produtos.length / tamanhoPagina
                                )
                            );
                          }
                        }
                      },
                      error: function (xhr, status, error) {},
                    });
                  }
                }
              } else {
                $("#recebe-mensagem-campo-falha-alterar-produto").html(
                  "Falha ao alterar produto"
                );
                $("#recebe-mensagem-campo-falha-alterar-produto").show();
                $("#recebe-mensagem-campo-falha-alterar-produto").fadeOut(4000);
              }
            },
            error: function (xhr, status, error) {
              $("#recebe-mensagem-campo-falha-alterar-produto").html(
                "Falha ao alterar produto:" + error
              );
              $("#recebe-mensagem-campo-falha-alterar-produto").show();
              $("#recebe-mensagem-campo-falha-alterar-produto").fadeOut(4000);
            },
          });
        } else {
          $("#recebe-mensagem-campo-falha-alterar-produto").html(
            "Falha ao alterar produto"
          );
          $("#recebe-mensagem-campo-falha-alterar-produto").show();
          $("#recebe-mensagem-campo-falha-alterar-produto").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {},
    });
  } else if (recebeCategoriaProdutoAlterar === "selecione") {
    $("#recebe-mensagem-campo-vazio-alterar-produto").html(
      "Favor selecionar a categoria do produto"
    );
    $("#recebe-mensagem-campo-vazio-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-alterar-produto").fadeOut(4000);
  } else if (recebeNomeProdutoAlterar === "") {
    $("#recebe-mensagem-campo-vazio-alterar-produto").html(
      "Favor preencher o nome do produto"
    );
    $("#recebe-mensagem-campo-vazio-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-alterar-produto").fadeOut(4000);
  } else if (recebeEstoqueProdutoAlterar === "") {
    $("#recebe-mensagem-campo-vazio-alterar-produto").html(
      "Favor preencher o estoque do produto"
    );
    $("#recebe-mensagem-campo-vazio-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-alterar-produto").fadeOut(4000);
  } else if (recebeValorProdutoAlterar === "") {
    $("#recebe-mensagem-campo-vazio-alterar-produto").html(
      "Favor preencher o valor do produto"
    );
    $("#recebe-mensagem-campo-vazio-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-alterar-produto").fadeOut(4000);
  } else if (imagens_produto_alteracao.length === 0) {
    $("#recebe-mensagem-campo-vazio-alterar-produto").html(
      "Favor selecionar as imagens do produto"
    );
    $("#recebe-mensagem-campo-vazio-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-alterar-produto").fadeOut(4000);
  }
});

$("#imagens-produtos-alterar").change(function (e) {
  e.preventDefault();

  debugger;

  let arquivo_selecionado_alterar = e.target.files;

  if (arquivo_selecionado_alterar != "") {
    let div_imagens_exibindo_imagens_antes_alterar = document.querySelector(
      "#imagens-produtos-visualiza-alterar"
    );

    div_imagens_exibindo_imagens_antes_alterar.classList.add(
      "exibi_imagens_selecionadas_alterar"
    );

    imagens_produto_alteracao.splice(0, imagens_produto_alteracao.length);

    for (
      let indice = 0;
      indice < arquivo_selecionado_alterar.length;
      indice++
    ) {
      let valores_imagens_alterar = {
        imagem: arquivo_selecionado_alterar[indice].name,
      };

      imagens_produto_alteracao.push(valores_imagens_alterar);
    }

    $("#exibi-imagens-produtos-alterar").html("");
    $.each(arquivo_selecionado_alterar, function (i, arquivo) {
      let ler_arquivo_alterar = new FileReader();
      ler_arquivo_alterar.readAsDataURL(arquivo);

      ler_arquivo_alterar.onload = function (e) {
        var html_exibi_imagens_produtos =
          '<img src="' +
          e.target.result +
          '" style="height:80px;margin-right:10px;" id="imagem' +
          i +
          '"></img><br>' +
          '<input type="hidden" name="quantidade_itens_selecionados" value="' +
          imagens_produto_alteracao.length +
          '" id="quantidade-imagens-galeria-selecionadas"/>';

        $("#exibi-imagens-produtos-alterar").append(
          html_exibi_imagens_produtos
        );
      };
    });
  }
});

var dados_imagens_produtos = Array();

//var quantidade_imagens_galeria;

var imagens_produtos = Array();

$("#imagens-produtos").change(function (e) {
  e.preventDefault();
  //debugger;
  var arquivo_selecionado = e.target.files;

  if (arquivo_selecionado != "") {
    //quantidade_imagens_galeria = arquivo_selecionado.length;

    if (arquivo_selecionado && arquivo_selecionado[0]) {
      for (let i = 0; i < arquivo_selecionado.length; i++) {
        //debugger;

        var valores_imagens = { imagem: arquivo_selecionado[i].name };

        imagens_produtos.push(valores_imagens);
      }
    }

    $.each(arquivo_selecionado, function (i, file) {
      //debugger;
      //imagens_galeria.push(i);
      dados_imagens_produtos.push(file);

      var reader = new FileReader();
      reader.readAsDataURL(file);

      //console.log("Registro:" + reader);

      reader.onload = function (e) {
        //debugger;

        // for (i = 0; i < numeros.length; i++) {
        //     console.log(numeros[i]);
        // }
        // console.log("Numeros:" + i);
        // console.log(e);
        var template =
          // '<div class="form-group">' +
          '<img src="' +
          e.target.result +
          '" style="height:80px;margin-right:10px;" id="imagem' +
          i +
          '"></img><br>' +
          // '<label for="exampleFormControlTextarea1">Insira a descrição desejada:</label>' +
          // '<textarea class="form-control" id="valor' + i + '" rows="3" name="texto_descricao' + i + '"></textarea>' +
          '<input type="hidden" name="quantidade_itens_selecionados" value="' +
          imagens_produtos.length +
          '" id="quantidade-imagens-galeria-selecionadas"/>';
        //   "</div>";

        // '<form action="/upload">'+
        // '<img src="' + e.target.result + '" style="height:80px;"> ' +
        // +'<textarea rows="3"></textarea>';
        //     '<div class="form-group">'+
        //         +'<label for="exampleFormControlTextarea1">Insira a descrição desejada:</label>'+

        //     +'</div>'
        // '<label>Image Title</label> <input type="text" name="title">'+
        // ' <button class="btn btn-sm btn-info upload">Upload</button>'+
        // ' <a href="#" class="btn btn-sm btn-danger remove">Remove</a>'+
        // '</form>';

        $("#exibi-imagens-produtos").append(template);
      };
    });
  }
});

$("#filtro-produto").change(function (e) {
  debugger;
  let recebeValorFiltroEscolhido = $(this).val();

  if (recebeValorFiltroEscolhido === "selecione") {
    $("#selecao-status").hide();
    $("#valor-filtro-categoria-produto").attr("disabled", true);
    $("#valor-filtro-produto").attr("disabled", true);
    $("#buscar-produto").attr("disabled", true);
  } else if (recebeValorFiltroEscolhido === "categoria_produto") {
    $("#selecao-status").show();
    $("#valor-filtro-categoria-produto").attr("disabled", false);
    $("#valor-filtro-produto").attr("disabled", true);
    $("#buscar-produto").attr("disabled", false);

    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/CategoriaAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_categoria: "recebe_consultar_categorias",
      },
      // beforeSend: function () {
      //   debugger;
      //   $("#registros-clientes").html("");
      //   $("#registros-clientes").append(
      //     "<td colspan='5' class='text-center'>Carregando dados</td>"
      //   );
      //   $("#registros-clientes").html("");
      // },
      success: function (retorno_categorias) {
        debugger;
        if (retorno_categorias.length > 0) {
          $("#valor-filtro-categoria-produto").html("");
          $("#valor-filtro-categoria-produto").append(
            "<option value='selecione'>Selecione</option>"
          );
          $.each(retorno_categorias, function (i, element) {
            $("#valor-filtro-categoria-produto").append(
              "<option value=" +
                element.nome_categoria.toLowerCase() +
                ">" +
                element.nome_categoria +
                "</option>"
            );
          });
        } else {
        }
      },
      error: function (xhr, status, error) {},
    });
  } else if (recebeValorFiltroEscolhido === "nome_produto") {
    $("#selecao-status").hide();
    $("#valor-filtro-categoria-produto").attr("disabled", true);
    $("#valor-filtro-produto").attr("disabled", false);
    $("#buscar-produto").attr("disabled", false);
  } else {
    $("#selecao-status").hide();
    $("#valor-filtro-cliente").attr("disabled", true);
    $("#buscar-produto").attr("disabled", false);
    $("#valor-filtro-produto").attr("disabled", true);
  }
});

$("#buscar-produto").click(function (e) {
  e.preventDefault();

  debugger;

  let recebeFiltroProduto = $("#filtro-produto").val();

  recebe_filtro_produto_pesquisado_continuar_exibicao_excluindo_produtos =
    recebeFiltroProduto;

  recebe_filtro_produto_pesquisado_continuar_exibicao_alterando_produtos =
    recebeFiltroProduto;

  if (recebeFiltroProduto === "categoria_produto") {
    let recebeValorFiltroCategoriaProduto = $(
      "#valor-filtro-categoria-produto"
    ).val();

    recebe_valor_filtro_selecionado_produto_pesquisado_continuar_exibicao_excluindo_produtos =
      recebeValorFiltroCategoriaProduto;

    recebe_valor_filtro_selecionado_produto_pesquisado_continuar_exibicao_alterando_produtos =
      recebeValorFiltroCategoriaProduto;

    if (recebeValorFiltroCategoriaProduto != "") {
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ProdutoAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_produto: "recebe_consultar_produtos",
          filtro_produto: recebeFiltroProduto,
          valor_filtro_produto: recebeValorFiltroCategoriaProduto,
        },
        beforeSend: function () {
          debugger;
          $("#registros-produtos").html("");
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-produtos").html("");
        },
        success: function (retorno_produtos) {
          debugger;
          if (retorno_produtos.length > 0) {
            recebe_registros_produtos_pesquisa_categoria = retorno_produtos;

            configura_proximo_categoria_produtos();
            configura_anterior_categoria_produtos();
            configura_botao_proximo_nome_produtos();
            configura_botao_anterior_nome_produtos();

            let recebe_tabela_produtos = document.querySelector(
              "#registros-produtos"
            );

            let recebe_quantidade_produtos = retorno_produtos.length;

            $("#exibi-quantidade-produtos").html(
              "Quantidade de produtos:" + recebe_quantidade_produtos
            );

            dados_produtos = retorno_produtos;
            for (
              var produtos = pagina * tamanhoPagina;
              produtos < retorno_produtos.length &&
              produtos < (pagina + 1) * tamanhoPagina;
              produtos++
            ) {
              let recebeValorProdutoBR =
                retorno_produtos[produtos].valor_produto.toString();

              let recebeValorProdutoBRFinal =
                "R$" + recebeValorProdutoBR.replace(".", ",");

              recebe_tabela_produtos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_produtos[produtos].categoria_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].nome_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].estoque_produto +
                "</td>" +
                "<td>" +
                recebeValorProdutoBRFinal +
                "</td>" +
                "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></a></i></td>" +
                "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></i></a></td>" +
                "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)></i></a></td>" +
                "</tr>";
            }
            $("#registros-produtos").append(recebe_tabela_produtos);

            $("#numeracao-produtos").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_produtos.length / tamanhoPagina)
            );
          } else {
            $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
            $("#registros-produtos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );

            if (pagina == 0) {
              $("#numeracao-produtos").text("Página " + (pagina + 1) + " de 1");
            } else {
              $("#numeracao-produtos").text(
                "Página " +
                  (pagina + 1) +
                  " de " +
                  Math.ceil(retorno_produtos.length / tamanhoPagina)
              );
            }
          }
        },
        error: function (xhr, status, error) {},
      });
    }
  } else if (recebeFiltroProduto === "nome_produto") {
    let recebeValorFiltroProduto = $("#valor-filtro-produto").val();

    recebe_valor_filtro_selecionado_produto_pesquisado_continuar_exibicao_excluindo_produtos =
      recebeValorFiltroProduto;

    recebe_valor_filtro_selecionado_produto_pesquisado_continuar_exibicao_alterando_produtos =
    recebeValorFiltroProduto;

    if (recebeValorFiltroProduto != "") {
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ProdutoAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_produto: "recebe_consultar_produtos",
          filtro_produto: recebeFiltroProduto,
          valor_filtro_produto: recebeValorFiltroProduto,
        },
        beforeSend: function () {
          debugger;
          $("#registros-produtos").html("");
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-produtos").html("");
        },
        success: function (retorno_produtos) {
          debugger;
          if (retorno_produtos.length > 0) {
            recebe_registros_produtos_pesquisa_nome = retorno_produtos;

            configura_proximo_nome_produtos();
            configura_anterior_nome_produtos();
            configura_botao_proximo_nome_produtos();
            configura_botao_anterior_nome_produtos();

            let recebe_tabela_produtos = document.querySelector(
              "#registros-produtos"
            );

            let recebe_quantidade_produtos = retorno_produtos.length;

            $("#exibi-quantidade-produtos").html(
              "Quantidade de produtos:" + recebe_quantidade_produtos
            );

            dados_produtos = retorno_produtos;
            for (
              var produtos = pagina * tamanhoPagina;
              produtos < retorno_produtos.length &&
              produtos < (pagina + 1) * tamanhoPagina;
              produtos++
            ) {
              let recebeValorProdutoBR =
                retorno_produtos[produtos].valor_produto.toString();

              let recebeValorProdutoBRFinal =
                "R$" + recebeValorProdutoBR.replace(".", ",");

              recebe_tabela_produtos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_produtos[produtos].categoria_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].nome_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].estoque_produto +
                "</td>" +
                "<td>" +
                recebeValorProdutoBRFinal +
                "</td>" +
                "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></a></i></td>" +
                "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)'></i></a></td>" +
                "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
                retorno_produtos[produtos].codigo_produto +
                ",event)></i></a></td>" +
                "</tr>";
            }
            $("#registros-produtos").append(recebe_tabela_produtos);

            $("#numeracao-produtos").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_produtos.length / tamanhoPagina)
            );
          } else {
            $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
            $("#registros-produtos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );

            if (pagina == 0) {
              $("#numeracao-produtos").text("Página " + (pagina + 1) + " de 1");
            } else {
              $("#numeracao-produtos").text(
                "Página " +
                  (pagina + 1) +
                  " de " +
                  Math.ceil(retorno_produtos.length / tamanhoPagina)
              );
            }
          }
        },
        error: function (xhr, status, error) {},
      });
    }
  } else {
    let recebeValorFiltroProduto = "todos";

    $.ajax({
      url: "../api/ProdutoAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_produto: "recebe_consultar_produtos",
        filtro_produto: recebeFiltroProduto,
        valor_filtro_produto: recebeValorFiltroProduto,
      },
      beforeSend: function () {
        debugger;
        $("#registros-produtos").html("");
        $("#registros-produtos").append(
          "<td colspan='5' class='text-center'>Carregando dados</td>"
        );
        $("#registros-produtos").html("");
      },
      success: function (retorno_produtos) {
        debugger;
        if (retorno_produtos.length > 0) {
          recebe_registros_produtos_pesquisa_todos = retorno_produtos;

          configura_proximo_todos_produtos();
          configura_anterior_todos_produtos();
          configura_botao_proximo_todos_produtos();
          configura_botao_anterior_todos_produtos();

          let recebe_tabela_produtos = document.querySelector(
            "#registros-produtos"
          );

          let recebe_quantidade_produtos = retorno_produtos.length;

          $("#exibi-quantidade-produtos").html(
            "Quantidade de produtos:" + recebe_quantidade_produtos
          );

          dados_produtos = retorno_produtos;
          for (
            var produtos = pagina * tamanhoPagina;
            produtos < retorno_produtos.length &&
            produtos < (pagina + 1) * tamanhoPagina;
            produtos++
          ) {
            let recebeValorProdutoBR =
              retorno_produtos[produtos].valor_produto.toString();

            let recebeValorProdutoBRFinal =
              "R$" + recebeValorProdutoBR.replace(".", ",");

            recebe_tabela_produtos.innerHTML +=
              "<tr>" +
              "<td>" +
              retorno_produtos[produtos].categoria_produto +
              "</td>" +
              "<td>" +
              retorno_produtos[produtos].nome_produto +
              "</td>" +
              "<td>" +
              retorno_produtos[produtos].estoque_produto +
              "</td>" +
              "<td>" +
              recebeValorProdutoBRFinal +
              "</td>" +
              "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
              retorno_produtos[produtos].codigo_produto +
              ",event)'></a></i></td>" +
              "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alteraracao-produto' data-backdrop='static' onclick='carrega_dados_produto_alteracao(" +
              retorno_produtos[produtos].codigo_produto +
              ",event)'></i></a></td>" +
              "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Produto' onclick=excluiProdutoEspecifico(" +
              retorno_produtos[produtos].codigo_produto +
              ",event)></i></a></td>" +
              "</tr>";
          }
          $("#registros-produtos").append(recebe_tabela_produtos);

          $("#numeracao-produtos").text(
            "Página " +
              (pagina + 1) +
              " de " +
              Math.ceil(retorno_produtos.length / tamanhoPagina)
          );
        } else {
          $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
          );

          if (pagina == 0) {
            $("#numeracao-produtos").text("Página " + (pagina + 1) + " de 1");
          } else {
            $("#numeracao-produtos").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_produtos.length / tamanhoPagina)
            );
          }
        }
      },
      error: function (xhr, status, error) {},
    });
  }
});

$(document).on("focus", "#valor-produto", function (e) {
  e.preventDefault();

  debugger;

  $(this).maskMoney({
    prefix: "R$",
    thousands: ".",
    decimal: ",",
  });
});

$("#cadastro-produto").click(function (e) {
  e.preventDefault();

  debugger;

  let recebeCategoriaProduto = $("#categoria-produto").val();

  let recebeNomeProduto = $("#nome-produto").val();

  let recebeEstoqueProduto = $("#estoque-produto").val();

  let recebeValorProduto = $("#valor-produto").val();

  let recebeVProdutoCortado = recebeValorProduto.split("R$");

  let recebeVProdutoNumerico = recebeVProdutoCortado[1];

  let recebeVProdutoFinalNumerico = recebeVProdutoNumerico.replace(/,/g, ".");

  // Substituir o último ponto por um caractere temporário
  let tempStr = recebeVProdutoFinalNumerico.replace(/\.(?=[^.]*$)/, "TEMP");

  // Remover todos os outros pontos
  tempStr = tempStr.replace(/\./g, "");

  // Substituir o caractere temporário pelo ponto decimal
  let decimalStr = tempStr.replace("TEMP", ".");

  // Converter para número decimal
  let numeroDecimal = parseFloat(decimalStr);

  // console.log(recebeVProdutoFinalNumerico);

  if (
    recebeCategoriaProduto != "selecione" &&
    recebeNomeProduto != "" &&
    recebeEstoqueProduto != "" &&
    recebeValorProduto != "" &&
    imagens_produtos.length > 0
  ) {
    let dados_formulario_cadastro_produto = $(
      "#formulario-cadastro-produto"
    )[0];

    let dados_produto = new FormData(dados_formulario_cadastro_produto);
    dados_produto.append("valor_produto_numerico", numeroDecimal);
    dados_produto.append("processo_produto", "recebe_cadastro_produto");
    dados_produto.append("processo_imagem", "recebe_cadastro_imagem");

    $.ajax({
      type: "post",
      // enctype: "multipart/form-data",
      dataType: "json",
      //http://localhost/engenharia_testando/final/controladora/ImagemControladora.php
      url: "../api/ProdutoAPI.php",
      cache: false,
      processData: false,
      contentType: false,
      data: dados_produto,

      success: function (resultado) {
        debugger;

        dados_produto.append("recebe_codigo_produto", resultado);
        if (resultado > 0) {
          $.ajax({
            type: "post",
            enctype: "multipart/form-data",
            dataType: "json",
            //http://localhost/engenharia_testando/final/controladora/ImagemControladora.php
            url: "../api/ImagemAPI.php",
            cache: false,
            processData: false,
            contentType: false,
            data: dados_produto,
            success: function (retorno) {
              debugger;
              if (retorno === "imagens cadastradas") {
                $("#recebe-mensagem-cadastro-alterar-realizado-produto").html(
                  "Produto cadastrado com sucesso"
                );
                $("#recebe-mensagem-cadastro-alterar-realizado-produto").show();
                $(
                  "#recebe-mensagem-cadastro-alterar-realizado-produto"
                ).fadeOut(4000);
              } else {
                $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").html(
                  "Falha ao cadastrar produto"
                );
                $(
                  "#recebe-mensagem-campo-falha-cadastro-alterar-produto"
                ).show();
                $(
                  "#recebe-mensagem-campo-falha-cadastro-alterar-produto"
                ).fadeOut(4000);
              }
            },
            error: function (xhr, status, error) {
              $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").html(
                "Falha ao cadastrar produto:" + error
              );
              $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").show();
              $(
                "#recebe-mensagem-campo-falha-cadastro-alterar-produto"
              ).fadeOut(4000);
            },
          });
        } else {
          $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").html(
            "Falha ao cadastrar produto"
          );
          $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").show();
          $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").fadeOut(
            4000
          );
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").html(
          "Falha ao cadastrar produto:" + error
        );
        $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").show();
        $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").fadeOut(
          4000
        );
      },
    });
  } else if (recebeCategoriaProduto === "selecione") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html(
      "Favor selecionar a categoria do produto"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
  } else if (recebeNomeProduto === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html(
      "Favor informar o nome do produto"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
  } else if (recebeEstoqueProduto === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html(
      "Favor informar o estoque do produto"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
  } else if (recebeValorProduto === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html(
      "Favor informar o valor do produto"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
  } else if (imagens_produtos.length === 0) {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html(
      "Favor selecionar as imagens que queira do produto"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
  }
});