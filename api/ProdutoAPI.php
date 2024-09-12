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

        //$recebeValorProduto = $_POST["valor-produto"];

        $recebeValorProduto = $_POST["valor_produto_numerico"];

        if(!empty($recebeCategoriaProduto) && !empty($recebeNomeProduto) && !empty($recebeEstoqueProduto) && !empty($recebeValorProduto))
        {
            $resultadoCadastroProduto = $produtoControladora->cadastrarProduto($recebeCategoriaProduto,$recebeNomeProduto,$recebeEstoqueProduto,$recebeValorProduto);

            echo json_encode($resultadoCadastroProduto);
        }else{
            echo json_encode("Favor preencher os campos");
        }
    }else if($recebeProcessoProduto === "recebe_alterar_produto")
    {
        if($_POST["valor_metodo"] === "PUT")
        {
            $recebeCategoriaProdutoAlterar = $_POST["categoria-produto-alterar"];
            $recebeNomeProdutoAlterar = $_POST["nome-produto-alterar"];
            $recebeEstoqueProdutoAlterar = $_POST["estoque-produto-alterar"];
            //$recebeValorProdutoAlterar = $_POST["valor-produto-alterar"];
            $recebeValorProdutoAlterar = $_POST["valor_produto_numerico_alterar"];
            $recebeCodigoProdutoAlterar = $_POST["codigo-produto-alterar"];

            if(!empty($recebeCategoriaProdutoAlterar) && !empty($recebeNomeProdutoAlterar) && !empty($recebeEstoqueProdutoAlterar) && !empty($recebeValorProdutoAlterar))
            {
                $resultadoAlterarProduto = $produtoControladora->AlterarProdutoEspecifico($recebeCodigoProdutoAlterar,$recebeCategoriaProdutoAlterar,
                $recebeNomeProdutoAlterar,$recebeEstoqueProdutoAlterar,$recebeValorProdutoAlterar);
                
                echo json_encode($resultadoAlterarProduto);
            }else{
                echo json_encode("Favor preencher os campos");
            }
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
    }else if($recebeProcessoProduto === "recebe_consultar_imagens_produto")
    {
        $recebeCodigoImagensProduto = $_GET["valor_codigo_imagens_produto"];

        if(!empty($recebeCodigoImagensProduto))
        {
            $recebeConsultaImagensProduto = $produtoControladora->ConsultarImagensProduto($recebeCodigoImagensProduto);

            echo json_encode($recebeConsultaImagensProduto);
        }
    }else if($recebeProcessoProduto === "recebe_consultar_produto_especifico")
    {
        $recebeCodigoProdutoAlteracao = $_GET["valor_codigo_produto_especifico_alteracao"];

        if($recebeCodigoProdutoAlteracao)
        {
            $recebeConsultaProdutoEspecificoAlteracao = $produtoControladora->ConsultarProdutoEspecifico($recebeCodigoProdutoAlteracao);

            echo json_encode($recebeConsultaProdutoEspecificoAlteracao);
        }
    }else if($recebeProcessoProduto === "recebe_consultar_produto_especifico_qtd_produtos_estoque")
    {
        $recebeCodigoProdutoQtdPE = $_GET["valor_codigo_produto_especifico_qtdpe"];

        $recebeConsultaQtdPE = $produtoControladora->ConsultarQTDProdutoEstoque($recebeCodigoProdutoQtdPE);
        
        echo json_encode($recebeConsultaQtdPE);
    }
}else if($_SERVER["REQUEST_METHOD"] === "DELETE")
{
    $recebeProcessoProduto = json_decode(file_get_contents("php://input",true));

    if(!empty($recebeProcessoProduto->processo_produto === "recebe_exclui_produto"))
    {
        $resultadoExcluirProdutoEspecifico = $produtoControladora->ExcluirProdutoEspecifico($recebeProcessoProduto->valor_codigo_produto_exclui);

        echo json_encode($resultadoExcluirProdutoEspecifico);
    }else{
        echo json_encode("Falha ao excluir o produto devido não ter codigo");
    }
}
?>