<?php
//é importado a classe protocoloscontroladora.php
require("../controladora/ClienteControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
$clienteControladora = new ClienteControladora();

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    $recebeProcessoCliente = $_POST["processo_cliente"];

    if($recebeProcessoCliente === "recebe_cadastro_cliente")
    {
        $recebeNomeCliente = $_POST["nome-cliente"];
        $recebeTelefoneCliente = $_POST["telefone-cliente"];
        $recebeEmailCliente = $_POST["email-cliente"];
        $recebeEnderecoCliente = $_POST["endereco-cliente"];
        $recebeStatusCliente = $_POST["status-cliente"];

        if(!empty($recebeNomeCliente) && !empty($recebeTelefoneCliente) && !empty($recebeEmailCliente) &&
        !empty($recebeEnderecoCliente) && !empty($recebeStatusCliente))
        {
            $recebeCadastroCliente = $clienteControladora->CadastroCliente($recebeNomeCliente,$recebeTelefoneCliente,$recebeEmailCliente,
            $recebeEnderecoCliente,$recebeStatusCliente);

            if($recebeCadastroCliente > 0)
                echo json_encode($recebeCadastroCliente);
            else
                echo json_encode($recebeCadastroCliente);
        }else{
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    }else if($recebeProcessoCliente === "recebe_alteracao_cliente")
    {
        if($_POST["metodo"] === "PUT")
        {
            $recebeNomeClienteAlteracao = $_POST["nome-cliente-edicao"];
            $recebeTelefoneClienteAlteracao = $_POST["telefone-cliente-edicao"];
            $recebeEmailClienteAlteracao = $_POST["email-cliente-edicao"];
            $recebeEnderecoClienteAlteracao = $_POST["endereco-cliente-edicao"];
            $recebeStatusClienteAlteracao = $_POST["status-cliente-edicao"];
            $recebeCodigoClienteAlteracao = $_POST["codigo-cliente-edicao"];

            if(!empty($recebeNomeClienteAlteracao) && !empty($recebeTelefoneClienteAlteracao) && !empty($recebeEmailClienteAlteracao) &&
            !empty($recebeEnderecoClienteAlteracao)
            && !empty($recebeStatusClienteAlteracao))
            {
                $recebeAlterarCliente = $clienteControladora->AlteraClienteEspecifico($recebeNomeClienteAlteracao,$recebeTelefoneClienteAlteracao,
                $recebeEmailClienteAlteracao,$recebeEnderecoClienteAlteracao,$recebeStatusClienteAlteracao,$recebeCodigoClienteAlteracao);

                echo json_encode($recebeAlterarCliente);
            }else{
                echo json_encode("Favor verificar o preenchimento dos campos");
            }
        }
    }else if($recebeProcessoCliente === "recebe_envia_email_cobranca")
    {
        $recebeNomeProduto = $_POST["valor_nome_produto_venda"];
        $recebeValorFinal = $_POST["valor_final_venda"];
        $recebeNomeCliente = $_POST["valor_nome_cliente_venda"];
        $recebeEmailCliente = $_POST["valor_email_cliente_venda"];

        $recebeEnviarEmailCobranca = $clienteControladora->EncaminharEmailCobranca($recebeNomeCliente,$recebeNomeProduto,$recebeValorFinal,$recebeEmailCliente);

        echo json_encode($recebeEnviarEmailCobranca);
    }
}else if($_SERVER["REQUEST_METHOD"] === "GET")
{
    $recebeProcessoCliente = $_GET["processo_cliente"];

    if($recebeProcessoCliente === "recebe_consultar_clientes")
    {
        $recebeFiltroCliente = $_GET["filtro_cliente"];
        $recebeValorFiltroCliente = $_GET["valor_filtro_cliente"];

        if(!empty($recebeFiltroCliente) && !empty($recebeValorFiltroCliente))
        {
            $recebeConsultaCliente = $clienteControladora->ConsultarClientes($recebeFiltroCliente,$recebeValorFiltroCliente);

            echo json_encode($recebeConsultaCliente);
        }else{
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    }else if($recebeProcessoCliente === "recebe_consultar_cliente_especifico")
    {
        $recebeCodigoCliente = $_GET["valor_codigo_cliente"];

        if(!empty($recebeCodigoCliente))
        {
            $recebeConsultaClienteEspecifico = $clienteControladora->ConsultarClienteEspecifico($recebeCodigoCliente);

            echo json_encode($recebeConsultaClienteEspecifico);
        }
    }else if($recebeProcessoCliente === "recebe_consultar_clientes_para_venda")
    {
        $recebeConsultaCliente = $clienteControladora->ConsultarClientesVenda();

        echo json_encode($recebeConsultaCliente);
    }else if($recebeProcessoCliente === "recebe_consultar_total_clientes")
    {
        $recebeBuscaTotalCliente = $clienteControladora->BuscaTotalClientes();

        echo json_encode($recebeBuscaTotalCliente);
    }else if($recebeProcessoCliente === "recebe_consultar_email_cliente")
    {
        $recebeCodigoCliente = $_GET["valor_codigo_cliente_venda"];

        $resultadoBuscaEmailCliente = $clienteControladora->BuscarEmailCliente($recebeCodigoCliente);

        echo json_encode($resultadoBuscaEmailCliente);
    }
}else if($_SERVER["REQUEST_METHOD"] === "DELETE")
{
    $recebeProcessoCliente = json_decode(file_get_contents("php://input", true));

    if($recebeProcessoCliente->processo_cliente === "recebe_exclui_cliente")
    {
        if(!empty($recebeProcessoCliente->valor_codigo_cliente_exclui))
        {
            $recebeExcluiClienteEspecifico = $clienteControladora->ExcluiClienteEspecifico($recebeProcessoCliente->valor_codigo_cliente_exclui);
            echo json_encode($recebeExcluiClienteEspecifico);
        }else{
            echo json_encode("Falha ao excluir o cliente devido não ter codigo");
        }
    }
}
?>