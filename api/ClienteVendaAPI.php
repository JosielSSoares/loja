<?php
//é importado a classe protocoloscontroladora.php
require("../controladora/ClienteVendaControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
$clientevendaControladora = new ClienteVendaControladora();

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    if($_POST["processo_cliente_venda"] === "recebe_cadastro_cliente_venda")
    {
        $recebeNomeClienteVenda = $_POST["valor_nomeclientevenda"];
        $recebeCodigoClienteVenda = $_POST["valor_codigoclientevenda"];

        $resultadoCadClienteVenda = $clientevendaControladora->cadastrarClienteVenda($recebeNomeClienteVenda,$recebeCodigoClienteVenda);

        echo json_encode($resultadoCadClienteVenda);
    }
}
?>