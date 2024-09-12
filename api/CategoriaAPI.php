<?php
//é importado a classe protocoloscontroladora.php
require("../controladora/CategoriaControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
$categoriaControladora = new CategoriaControladora();

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    $recebeProcessoCategoria = $_POST["processo_categoria"];

    if($recebeProcessoCategoria === "recebe_cadastro_categoria")
    {
        $recebeNomeCategoria = $_POST["nome-categoria"];

        if(!empty($recebeNomeCategoria))
        {
            $recebeCadastroCategoria = $categoriaControladora->CadastroCategoria($recebeNomeCategoria);

            echo json_encode($recebeCadastroCategoria);
        }else{
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    }
}else if($_SERVER["REQUEST_METHOD"] === "GET")
{
    $recebeProcessoCategoria = $_GET["processo_categoria"];

    if($recebeProcessoCategoria === "recebe_consultar_categorias")
    {
        $recebeConsultaCategoria = $categoriaControladora->ConsultaCategoria();

        echo json_encode($recebeConsultaCategoria);
    }
}