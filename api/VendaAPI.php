<?php
//é importado a classe protocoloscontroladora.php
require("../controladora/VendaControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
$vendaControladora = new VendaControladora();

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    $recebeProcessoVenda = $_POST["processo_venda"];

    if($recebeProcessoVenda === "recebe_cadastro_venda")
    {
        $recebeNomeClienteV = $_POST["valor_nomeclientev"];
        $recebeNomeProdutoV = $_POST["valor_nomeprodutov"];
        $recebeQuantidadeProdutoV = $_POST["valor_quantidadeprodutov"];
        $recebeValorSelecionadoDescontoV = $_POST["valor_selecionado_descontov"];
        $recebeDescontoValorV = $_POST["valor_descontoprodutov"];
        $recebeValorV = $_POST["valor_finalv"];
        $recebeValorSelecionadoPagoV = $_POST["valor_selecionado_pagov"];
        $recebePagamentoAgendadoV = $_POST["valor_pagamentoagendadov"];
        $recebeDataAgendamentoProdutoV = $_POST["valor_datapagamentov"];
        $recebeCodigoClienteV = $_POST["valor_codigocv"];
        $recebeDadosAtualizarEstoque = $_POST["valor_dadosatualizarestoque"];


        $resultadoCadastrarVenda = $vendaControladora->CadastrarVenda($recebeNomeClienteV,$recebeNomeProdutoV,$recebeQuantidadeProdutoV,
        $recebeValorSelecionadoDescontoV,$recebeDescontoValorV,$recebeValorV,$recebeValorSelecionadoPagoV,
        $recebePagamentoAgendadoV,$recebeDataAgendamentoProdutoV,$recebeCodigoClienteV);

        if($resultadoCadastrarVenda != 0)
        {
            $resultadoAtualizarEstoqueVenda = $vendaControladora->AtualizarEstoqueVenda($recebeDadosAtualizarEstoque);

            echo json_encode($resultadoAtualizarEstoqueVenda);
        }
    }else if($recebeProcessoVenda === "recebe_atualizar_pagamento")
    {
        if($_POST["metodo"] === "PUT")
        {
            $recebeCodigoVenda = $_POST["valor_codigo_venda"];

            $resultadoAtualizarPagamento = $vendaControladora->AtualizarPagamento($recebeCodigoVenda);

            echo json_encode($resultadoAtualizarPagamento);
        }
    }
}else if($_SERVER["REQUEST_METHOD"] === "GET")
{
    $recebeProcessoVenda = $_GET["processo_venda"];

    if($recebeProcessoVenda === "recebe_consultar_vendas")
    {
        $recebeFiltroV = $_GET["filtro_venda"];
        $recebeValorFiltroV = $_GET["valor_filtro_venda"];

        $resultadoBuscarVendas = $vendaControladora->BuscarVendas($recebeFiltroV,$recebeValorFiltroV);

        echo json_encode($resultadoBuscarVendas);
    }else if($recebeProcessoVenda === "recebe_consultar_vendas_cliente_especifico")
    {
        $recebeCodigoClienteVendas = $_GET["valor_codigo_cliente_venda"];

        $resultadoBuscarVendasCEspecifico = $vendaControladora->BuscarVendasClienteEspecifico($recebeCodigoClienteVendas);

        echo json_encode($resultadoBuscarVendasCEspecifico);
    }else if($recebeProcessoVenda === "recebe_consultar_total_vendas")
    {
        $resultadoBuscaTotalVenda = $vendaControladora->BuscaTotalVendas();

        echo json_encode($resultadoBuscaTotalVenda);
    }else if($recebeProcessoVenda === "recebe_consultar_vendas_vencer")
    {
        $resultadoBuscaVendasVencer = $vendaControladora->BuscaVendasVencer();

        echo json_encode($resultadoBuscaVendasVencer);
    }else if($recebeProcessoVenda === "recebe_consultar_vendas_vencer_hoje")
    {
        $resultadoBuscaVendasVencerHoje = $vendaControladora->BuscaVendasVencerHoje();

        echo json_encode($resultadoBuscaVendasVencerHoje);
    }else if($recebeProcessoVenda === "recebe_consultar_total_vendas_meses")
    {
        $resultadoBuscarVendasTotaisMeses = $vendaControladora->BuscarVendasMeses();

        echo json_encode($resultadoBuscarVendasTotaisMeses);
    }else if($recebeProcessoVenda === "recebe_consultar_vendas_relatorio")
    {
        $resultadoBuscaVendasRelatorio = $vendaControladora->BuscaVendasRelatorio();

        echo json_encode($resultadoBuscaVendasRelatorio);
    }
}else if($_SERVER["REQUEST_METHOD"] === "DELETE")
{
    $processoVenda = json_decode(file_get_contents("php://input",true));

    if(!empty($processoVenda->processo_venda === "recebe_exclui_venda"))
    {
        $resultadoExcluirVenda = $vendaControladora->ExcluirVenda($processoVenda->valor_codigo_venda_exclui);

        echo json_encode($resultadoExcluirVenda);
    }else{
        echo json_encode("Falha ao excluir a venda devido não ter codigo");
    }
}
?>