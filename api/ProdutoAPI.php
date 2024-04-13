<?php
//é importado a classe protocoloscontroladora.php
require("../controladora/ProdutoControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
$produtoControladora = new ProdutoControladora();


if($_SERVER["REQUEST_METHOD"] === "POST")
{
    $recebeProcessoProduto = $_POST["processo_produto"];

    if($recebeProcessoProduto === "recebe_cadastro_produto")
    {
        $recebeCategoriaProduto = $_POST["categoria-produto"];

        $recebeNomeProduto = $_POST["nome-produto"];

        $recebeEstoqueProduto = $_POST["estoque-produto"];

        $recebeValorProduto = $_POST["valor-produto"];

        if(!empty($recebeCategoriaProduto) && !empty($recebeNomeProduto) && !empty($recebeEstoqueProduto) && !empty($recebeValorProduto))
        {
            $resultadoCadastroProduto = $produtoControladora->cadastrarProduto($recebeCategoriaProduto,$recebeNomeProduto,$recebeEstoqueProduto,$recebeValorProduto);

            echo json_encode($resultadoCadastroProduto);
        }else{
            echo json_encode("Favor preencher os campos");
        }
    }
}else if($_SERVER["REQUEST_METHOD"] === "GET")
{
    $recebeProcessoProduto = $_GET["processo_produto"];

    if($recebeProcessoProduto === "recebe_consultar_produtos")
    {
        $recebeFiltroProduto = $_GET["filtro_produto"];
        $recebeValorFiltroProduto = $_GET["valor_filtro_produto"];

        if(!empty($recebeFiltroProduto) && !empty($recebeValorFiltroProduto))
        {
            $recebeConsultaProdutos = $produtoControladora->ConsultarProdutos($recebeFiltroProduto,$recebeValorFiltroProduto);

            echo json_encode($recebeConsultaProdutos);
        }else{
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    }
}
?>