<?php
require(__DIR__ . "../../../vendor/autoload.php");
require("../../modelo/Conexao.php");
use  Dompdf\Dompdf;
use  Dompdf\Options;
try{
    $instrucaoBuscarVenda = "select * from vendas";
    $comandoBuscarVenda = Conexao::Obtem()->prepare($instrucaoBuscarVenda);
    $comandoBuscarVenda->execute();
    $registros_venda = $comandoBuscarVenda->fetchAll(PDO::FETCH_ASSOC);

    $dados = "<!DOCTYPE html>";
    $dados .= "<html lang='pt-br'>";
    $dados .= "<head>";
    $dados .= "<meta charset='UTF-8'>";
    $dados .= "
    <style>
         body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        .table-responsive {
            width: 100%;
            margin-bottom: 15px;
            overflow-x: auto;
            overflow-y: hidden;
            border: 1px solid #ddd;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 5px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
    </style>";
    $dados .= "<title>Painel Loja</title>";
    $dados .= "</head>";
    $dados .= "<body>";
    $dados .= "<h1>Listagem de Vendas</h1>";
    $dados .= "<img src='https://www.idailneto.com.br/loja/visao/vendas/logo.jpg' style='height:90px;width:90px;margin-bottom:10px;'/>";
    $dados .= "<table class='table'>";
    $dados .= "<thead>";
    $dados .= "<tr>";
    $dados .= "<th>Cliente</th>";
    $dados .= "<th>Produto</th>";
    $dados .= "<th>Quantidade</th>";
    $dados .= "<th>Desconto/Valor</th>";
    $dados .= "<th>Valor</th>";
    $dados .= "<th>Pago</th>";
    $dados .= "<th>Agendado</th>";
    $dados .= "<th>Data</th>";
    $dados .= "</tr>";

    // Ler os registros retornado do BD

    foreach($registros_venda as $vendas)
    {
        $recebeDesconto = "";
        $recebePagamentoAgendado = "";
        $recebePago = "";

        if($vendas["desconto_venda"] === 1)
            $recebeDesconto = "Sim";
        else
            $recebeDesconto = "Não";

        if($vendas["pago_venda"] === 1)
            $recebePago = "Sim";
        else
            $recebePago = "Não";

        if($vendas["pagamento_agendado_venda"] === 1)
            $recebePagamentoAgendado = "Sim";
        else
            $recebePagamentoAgendado = "Não";

        $dados .= "<tbody>";
        $dados .= "<tr>";
        $dados .= "<td>" . $vendas["nome_cliente_venda"] . "</td>";
        $dados .= "<td>" . $vendas["nome_produto_venda"] . "</td>";
        $dados .= "<td>" . $vendas["quantidade_produtos_venda"] . "</td>";
        $dados .= "<td>" . $recebeDesconto . " - R$" .str_replace('.', ',', $vendas["desconto_final_venda"]) . "</td>";
        $dados .= "<td>" . "R$".str_replace('.', ',', $vendas["valor_final_venda"]). "</td>";
        $dados .= "<td>" . $recebePago . "</td>";
        $dados .= "<td>" . $recebePagamentoAgendado . "</td>";
        $dados .= "<td>" . date('d/m/Y', strtotime($vendas["data_pagamento_venda"])) . "</td>";
        $dados .= "</tr>";
        $dados .= "</tbody>";
    }

    $dados .= "</table>";
    $dados .= "<h1>Vendas - Eliza Modas</h1>";
    $dados .= "</body>";
    $dados .= "</html>";

    $options = new Options();

    $dompdf = new Dompdf(['enable_remote' => true]);

    $options->set('defaultFont', 'Relatório Vendas');

    $dompdf->loadHtml($dados);

    $dompdf->setPaper('A4', 'portrait');

    $dompdf->render();

    $dompdf->stream();
}catch(PDOException $excecao)
{
    echo $excecao->getMessage();
}catch(Exception $exception)
{
    echo $exception->getMessage();
}
?>