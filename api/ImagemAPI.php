<?php
require("../controladora/ImagemControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
$imagemControladora = new ImagemControladora();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $recebeProcessoImagem = $_POST["processo_imagem"];

    if ($recebeProcessoImagem === "recebe_cadastro_imagem") {
        $recebeImagensProduto = $_FILES["imagens-produtos"];

        $imagens_produto = array();
        $codigos_produto_imagem = array();

        foreach ($recebeImagensProduto["name"] as $indice => $valor) {
            array_push($imagens_produto, $valor);
        }

        $imagem_copiada = "sem sucesso";

        for ($contagem = 0; $contagem < count($recebeImagensProduto["name"]); $contagem++) {
            $caminho_temporario = $recebeImagensProduto["tmp_name"][$contagem];
            $destino_imagens = "../visao/produtos/imagens_produto/" . $recebeImagensProduto["name"][$contagem];

            if (copy($recebeImagensProduto["tmp_name"][$contagem], $destino_imagens)) {
                $imagem_copiada = "sucesso";
            }
        }

        if ($imagem_copiada === "sucesso") {

            for ($codigo_produto_imagem = 0; $codigo_produto_imagem < count($recebeImagensProduto["name"]); $codigo_produto_imagem++) {
                array_push($codigos_produto_imagem, $_POST["recebe_codigo_produto"]);
            }
            $resultadoCadastroImagem = $imagemControladora->cadastrarImagem($imagens_produto, $codigos_produto_imagem);
            echo json_encode($resultadoCadastroImagem);
        }
    } else if ($recebeProcessoImagem === "recebe_alterar_imagem") {
        if ($_POST["valor_metodo"] === "PUT") {
            $recebeCodigoImagensProdutoAlterar = $_POST["codigo-produto-alterar"];

            $imagens_produto_alterar = array();
            $codigos_imagens_alterar = array();

            if (!empty($recebeCodigoImagensProdutoAlterar)) {
                if ($_FILES["imagens-produtos-alterar"]["error"][0] != 4) {
                    $resultadoExcluirImagensProdutoEspecificas = $imagemControladora->ExcluirImagensEspecificas($recebeCodigoImagensProdutoAlterar);

                    if ($resultadoExcluirImagensProdutoEspecificas === "imagens excluidas com sucesso") {
                        //echo json_encode($_FILES["imagens-produtos-alterar"]);
                        $recebeImagensProdutoAlterar = $_FILES["imagens-produtos-alterar"];
                        foreach ($recebeImagensProdutoAlterar["name"] as $indice => $valor) {
                            array_push($imagens_produto_alterar, $valor);
                        }

                        $imagem_copiada_alterar = "sem sucesso";

                        for ($contagem_alterar = 0; $contagem_alterar < count($recebeImagensProdutoAlterar["name"]); $contagem_alterar++) {
                            //$caminho_temporario = $recebeImagensProdutoAlterar["tmp_name"][$contagem_alterar];
                            $destino_imagens_alterar = "../visao/produtos/imagens_produto/" . $recebeImagensProdutoAlterar["name"][$contagem_alterar];

                            if (copy($recebeImagensProdutoAlterar["tmp_name"][$contagem_alterar], $destino_imagens_alterar)) {
                                $imagem_copiada_alterar = "sucesso";
                            }
                        }

                        if ($imagem_copiada_alterar === "sucesso") {

                            for ($codigo_produto_imagem_alterar = 0; $codigo_produto_imagem_alterar < count($recebeImagensProdutoAlterar["name"]); $codigo_produto_imagem_alterar++) {
                                array_push($codigos_imagens_alterar, $_POST["codigo-produto-alterar"]);
                            }

                            $resultadoCadastroImagensProdutoAlterar = $imagemControladora->cadastrarImagem($imagens_produto_alterar, $codigos_imagens_alterar);
                            echo json_encode($resultadoCadastroImagensProdutoAlterar);
                        }
                    }
                } else {
                    echo json_encode("imagens cadastradas");
                }
            }
        }
    }
}
?>