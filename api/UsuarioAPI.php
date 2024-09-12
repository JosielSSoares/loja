<?php
//é importado a classe protocoloscontroladora.php
require("../controladora/UsuarioControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");


//com a variavel super global $_SERVER e verificado qual metodo de requisição e utilizado para acessar a API protocolosapi
$usuarioControladora = new UsuarioControladora();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $recebeProcessoUsuario = $_POST["processo_usuario"];
    if ($recebeProcessoUsuario === "recebe_cadastro_usuario") {

        $nomeUsuario = $_POST["nome-completo"];
        $emailUsuario = $_POST["email-usuario"];
        $nomeDeUsuario = $_POST["nome-de-usuario"];
        $senhaUsuario = $_POST["senha-usuario"];
        $perfilUsuario = $_POST["perfil-usuario"];
        $recebeImagemUsuario = $_FILES["foto-perfil"];
        $recebeNomeImagem = "usuario_sem_foto.jpg";

        $recebeSenhaDescriptografadaCriacao = $senhaUsuario;

        $recebeSenhaUsuarioCriptograda = md5($senhaUsuario);

        if (!empty($recebeImagemUsuario)) {
            $tipo_imagem = $recebeImagemUsuario["type"];

            if ($tipo_imagem === "image/png" || $tipo_imagem === "image/jpeg" || $tipo_imagem === "image/jpg") {
                $destino_imagem = "../visao/acesso/imagem_perfil/" . $recebeImagemUsuario["name"];
                $recebeNomeImagem = $recebeImagemUsuario["name"];
                copy($recebeImagemUsuario["tmp_name"], $destino_imagem);
            }
        }

        if (
            !empty($nomeDeUsuario) && !empty($emailUsuario) && !empty($nomeDeUsuario) && !empty($senhaUsuario) && !empty($perfilUsuario)
        ) {
            $recebeCadastroUsuario = $usuarioControladora->CadastroUsuario(
                $nomeUsuario,
                $emailUsuario,
                $nomeDeUsuario,
                $recebeSenhaUsuarioCriptograda,
                $recebeSenhaDescriptografadaCriacao,
                $perfilUsuario,
                $recebeNomeImagem
            );

            if($recebeCadastroUsuario > 0)
                echo json_encode($recebeCadastroUsuario);
            elseif($recebeCadastroUsuario === "email localizado")
                echo json_encode($recebeCadastroUsuario);
        } else {
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    } elseif ($recebeProcessoUsuario === "recebe_autenticacao_usuario") {
        $recebeLoginUsuario = $_POST["login-usuario-autenticacao"];
        $recebeSenhaUsuario = $_POST["senha-usuario-autenticacao"];

        $recebeSenhaDescriptografadaAutenticacao = $recebeSenhaUsuario;

        $recebeSenhaCriptografadaUsuario = md5($recebeSenhaUsuario);

        if (!empty($recebeLoginUsuario) && !empty($recebeSenhaUsuario)) {
            //$usuarioControladora = new UsuarioControladora();
            $recebeAutenticacaoUsuario = $usuarioControladora->AutenticacaoUsuario($recebeLoginUsuario, $recebeSenhaCriptografadaUsuario, $recebeSenhaDescriptografadaAutenticacao);

            if (!empty($recebeAutenticacaoUsuario))
                echo json_encode($recebeAutenticacaoUsuario);
            else
                echo json_encode("Favor verificar os dados preenchidos");
        }
    } elseif ($recebeProcessoUsuario == "deslogar") {

        //$usuario_controladora = new UsuarioControladora();

        $resultado_DeslogarUsuario = $usuarioControladora->DeslogarUsuario();

        echo json_encode($resultado_DeslogarUsuario);
    } elseif ($recebeProcessoUsuario === "recebe_alteracao_usuario") {
        if ($_POST["metodo"] === "PUT") {
            $recebeCodigoUsuarioAlterar = $_POST["codigo-usuario-logado"];
            $recebeNomeUsuarioAlterar = $_POST["nome-completo"];
            $recebeEmailUsuarioAlterar = $_POST["email-usuario"];
            $recebeUsuarioAlterar = $_POST["nome-de-usuario"];
            $recebeSenhaUsuarioAlterar = $_POST["senha-usuario"];
            $recebePerfilUsuarioAlterar = $_POST["perfil-usuario"];
            $recebeImagemUsuarioAlterar = $_FILES["foto-perfil"];

            $recebeSenhaUsuarioCriptografadaAlterar = md5($recebeSenhaUsuarioAlterar);

            $recebeNomeImagemAlterar = "usuario_sem_foto.jpg";

            if (!empty($recebeImagemUsuarioAlterar)) {
                $tipo_imagem = $recebeImagemUsuarioAlterar["type"];

                if ($tipo_imagem === "image/png" || $tipo_imagem === "image/jpeg" || $tipo_imagem === "image/jpg") {
                    $destino_imagem = "../visao/acesso/imagem_perfil/" . $recebeImagemUsuarioAlterar["name"];
                    $recebeNomeImagemAlterar = $recebeImagemUsuarioAlterar["name"];
                    copy($recebeImagemUsuarioAlterar["tmp_name"], $destino_imagem);
                }
            }

            if (
                !empty($recebeCodigoUsuarioAlterar) && !empty($recebeNomeUsuarioAlterar) && !empty($recebeEmailUsuarioAlterar) && !empty($recebeUsuarioAlterar) && !empty($recebeSenhaUsuarioAlterar)
                && !empty($recebePerfilUsuarioAlterar)
            ) {
                $recebeAlterarUsuario = $usuarioControladora->AlterarUsuario(
                    $recebeNomeUsuarioAlterar,
                    $recebeEmailUsuarioAlterar,
                    $recebeUsuarioAlterar,
                    $recebeSenhaUsuarioCriptografadaAlterar,
                    $recebePerfilUsuarioAlterar,
                    $recebeNomeImagemAlterar,
                    $recebeCodigoUsuarioAlterar,
                );
                echo json_encode($recebeAlterarUsuario);
            } else {
                echo json_encode("Favor verificar os dados preenchidos");
            }
        }
    } elseif ($recebeProcessoUsuario === "recebe_alterar_senha_usuario") {
        if ($_POST["metodo"] === "put") {
            $recebeEmailUsuarioSenhaAlterar = $_POST["recebe_email_usuario_alterar_senha"];
            $tamanhoSenha = 6;
            $caracteresPermitidos = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_!@#';

            $nova_senha_usuario = '';
            for ($i = 0; $i < $tamanhoSenha; $i++) {
                $nova_senha_usuario .= $caracteresPermitidos[rand(0, strlen($caracteresPermitidos))];
            }
            $recebe_senha_criptografada = md5($nova_senha_usuario);

            $resultadoAlterarSenhaUsuario = 
            $usuarioControladora->AlterarSenhaUsuario($recebeEmailUsuarioSenhaAlterar,$recebe_senha_criptografada,$nova_senha_usuario);

            echo json_encode($resultadoAlterarSenhaUsuario);
        }
    }
} else if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $recebeProcessoUsuario = $_GET["processo_usuario"];

    if ($recebeProcessoUsuario === "recebe_buscar_usuario_logado") {
        if (isset($_GET["valor_codigo_usuario"])) {
            $recebeRegistroUsuarioAlterar = $usuarioControladora->buscarUsuarioAlteracao($_GET["valor_codigo_usuario"]);
            echo json_encode($recebeRegistroUsuarioAlterar);
        }
    }
}
?>