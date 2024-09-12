<?php

require("UsuarioInterface.php");
require("Conexao.php");

require("../vendor/phpmailer/phpmailer/src/PHPMailer.php");
require("../vendor/phpmailer/phpmailer/src/SMTP.php");
require("../vendor/phpmailer/phpmailer/src/Exception.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPmailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if (!isset($_SESSION)) {
    session_start();
}
class Usuario implements UsuarioInterface
{

    private $codigo_usuario;
    private $nome_usuario;
    private $login_usuario;
    private $senha_usuario;
    private $senha_descriptografada;
    private $email_usuario;
    private $perfil_usuario;
    private $imagem_usuario;

    public function setCodigo_Usuario($codigo_usuario)
    {
        $this->codigo_usuario = $codigo_usuario;
    }

    public function getCodigo_Usuario()
    {
        return $this->codigo_usuario;
    }

    public function setNome_Usuario($nome_usuario)
    {
        $this->nome_usuario = $nome_usuario;
    }

    public function getNome_Usuario()
    {
        return $this->nome_usuario;
    }

    public function setLogin_Usuario($login_usuario)
    {
        $this->login_usuario = $login_usuario;
    }

    public function getLogin_Usuario()
    {
        return $this->login_usuario;
    }

    public function setSenha_Usuario($senha_usuario)
    {
        $this->senha_usuario = $senha_usuario;
    }

    public function getSenha_Usuario()
    {
        return $this->senha_usuario;
    }

    public function setSenha_Descritgrafada($senha_descriptografada)
    {
        $this->senha_descriptografada = $senha_descriptografada;
    }

    public function getSenha_Descritgrafada()
    {
        return $this->senha_descriptografada;
    }

    public function setEmail_Usuario($email_usuario)
    {
        $this->email_usuario = $email_usuario;
    }

    public function getEmail_Usuario()
    {
        return $this->email_usuario;
    }

    public function setPerfil_Usuario($perfil_usuario)
    {
        $this->perfil_usuario = $perfil_usuario;
    }

    public function getPerfil_Usuario()
    {
        return $this->perfil_usuario;
    }

    public function setImagem_Usuario($imagem_usuario)
    {
        $this->imagem_usuario = $imagem_usuario;
    }

    public function getImagem_Usuario()
    {
        return $this->imagem_usuario;
    }

    public function cadastroUsuario(): int
    {
        try {

            if (
                !empty($this->getNome_Usuario()) && !empty($this->getEmail_Usuario()) && !empty($this->getLogin_Usuario()) &&
                !empty($this->getSenha_Usuario()) && !empty($this->getPerfil_Usuario())
            ) {
                if (!empty($this->getImagem_Usuario())) {
                    $instrucaoCadastroUsuario = "insert into usuarios(nome_usuario, email_usuario, login_usuario, senha_usuario, perfil_usuario, imagem_usuario)
                    values(:recebeNomeUsuario, :recebeEmailUsuario, :recebeLoginUsuario, :recebeSenhaUsuario, :recebePerfilUsuario, :recebeImagemUsuario)";
                    $conexaoExecutada = Conexao::Obtem()->prepare($instrucaoCadastroUsuario);
                    $conexaoExecutada->bindValue(":recebeNomeUsuario", $this->getNome_Usuario());
                    $conexaoExecutada->bindValue(":recebeEmailUsuario", $this->getEmail_Usuario());
                    $conexaoExecutada->bindValue(":recebeLoginUsuario", $this->getLogin_Usuario());
                    $conexaoExecutada->bindValue(":recebeSenhaUsuario", $this->getSenha_Usuario());
                    $conexaoExecutada->bindValue(":recebePerfilUsuario", $this->getPerfil_Usuario());
                    $conexaoExecutada->bindValue(":recebeImagemUsuario", $this->getImagem_Usuario());
                } else {
                    $instrucaoCadastroUsuario = "insert into usuarios(nome_usuario, email_usuario, login_usuario, senha_usuario, perfil_usuario, imagem_usuario)
                    values(:recebeNomeUsuario, :recebeEmailUsuario, :recebeLoginUsuario, :recebeSenhaUsuario, :recebePerfilUsuario, :recebeImagemUsuario)";
                    $conexaoExecutada = Conexao::Obtem()->prepare($instrucaoCadastroUsuario);
                    $conexaoExecutada->bindValue(":recebeNomeUsuario", $this->getNome_Usuario());
                    $conexaoExecutada->bindValue(":recebeEmailUsuario", $this->getEmail_Usuario());
                    $conexaoExecutada->bindValue(":recebeLoginUsuario", $this->getLogin_Usuario());
                    $conexaoExecutada->bindValue(":recebeSenhaUsuario", $this->getSenha_Usuario());
                    $conexaoExecutada->bindValue(":recebePerfilUsuario", $this->getPerfil_Usuario());
                }


                $resultadoCadastroUsuario = $conexaoExecutada->execute();
                $ultimoCodigoCadastrado = Conexao::Obtem()->lastInsertId();

                if (!empty($resultadoCadastroUsuario)) {
                    $_SESSION["nome_usuario"] = $this->getNome_Usuario();
                    $_SESSION["email_usuario"] = $this->getEmail_Usuario();
                    $_SESSION["login_usuario"] = $this->getLogin_Usuario();
                    $_SESSION["senha_usuario"] = $this->getSenha_Descritgrafada();
                    $_SESSION["perfil_usuario"] = $this->getPerfil_Usuario();
                    $_SESSION["nome_imagem"] = $this->getImagem_Usuario();
                    $_SESSION["codigo_usuario"] = $ultimoCodigoCadastrado;
                }

                if (!empty($ultimoCodigoCadastrado))
                    return $ultimoCodigoCadastrado;
                else
                    return 0;
            }
        } catch (PDOException $exception) {
            return $exception->getMessage();
        } catch (Exception $excecao) {
            return $excecao->getMessage();
        }
    }

    public function autenticacaoUsuario(): array
    {
        $registro_autenticado = array();
        try {
            //e declarada a variavel $sql_ValidaUsuario que recebera o sql para busca de usuario no banco de dados
            $sql_ValidaUsuario = "select * from usuarios where login_usuario = :login_recebido and senha_usuario = :senha_recebida";
            //e declarada a variavel $comando_BuscaValidacaoUsuario que ira receber a consulta a ser realizada
            $comando_BuscaValidacaoUsuario = Conexao::Obtem()->prepare($sql_ValidaUsuario);
            //e atribuido aos parametros :login_recebido e :senha_recebida os valores setados na classe usuariocontroladora
            $comando_BuscaValidacaoUsuario->bindValue(":login_recebido", $this->getLogin_Usuario());
            $comando_BuscaValidacaoUsuario->bindValue(":senha_recebida", $this->getSenha_Usuario());
            //e feita a execução
            $comando_BuscaValidacaoUsuario->execute();
            //e declarada a variavel $registro_UsuarioRetornado e atribuido a ele um array associativo com as informações do usuario localizado
            $registro_autenticado = $comando_BuscaValidacaoUsuario->fetch(PDO::FETCH_ASSOC);


            //ira verificar se a variavel $usuario_retornado nao e vazia e caso nao seja ira retornar "verdeiro" caso contrato retornara "falso"
            if (!empty($registro_autenticado)) {
                //$this->setNome_Usuario_Logado_PDF($registro_autenticado["nome_usuario"]);
                //cria uma sessao chamado nome_usuario e recebe do banco de dados o nome da pessoa localizada que sera exibido na pagina
                $_SESSION["nome_usuario"] = $registro_autenticado["nome_usuario"];
                $_SESSION["email_usuario"] = $registro_autenticado["email_usuario"];
                $_SESSION["login_usuario"] = $registro_autenticado["login_usuario"];
                $_SESSION["senha_usuario"] = $this->getSenha_Descritgrafada();
                $_SESSION["perfil_usuario"] = $registro_autenticado["perfil_usuario"];
                $_SESSION["nome_imagem"] = $registro_autenticado["imagem_usuario"];
                $_SESSION["codigo_usuario"] = $registro_autenticado["codigo_usuario"];
                return $registro_autenticado;
            } else {
                $registro_autenticado = array();
                return $registro_autenticado;
            }
            //caso ocorra algum erro na execução do try sobre o pdo será retornado a mensagem de erro
        } catch (PDOException $exception) {
            return $exception->getMessage();
            //caso ocorre algum erro na execução do try de exceção será retornado a mensagem de erro
        } catch (Exception $excecao) {
            return $excecao->getMessage();
        }
    }

    public function alterarUsuario():string
    {
        if(!empty($this->getNome_Usuario()) && !empty($this->getEmail_Usuario()) && !empty($this->getLogin_Usuario())
         && !empty($this->getSenha_Usuario()) && !empty($this->getPerfil_Usuario()) && !empty($this->getImagem_Usuario())){
            $instrucaoAlterarUsuario = "update usuarios set nome_usuario = :recebe_nome_usuario,email_usuario = :recebe_email_usuario,
            login_usuario = :recebe_login_usuario, senha_usuario = :recebe_senha_usuario, perfil_usuario = :recebe_perfil_usuario,
            imagem_usuario = :recebe_imagem_usuario where codigo_usuario = :recebe_codigo_usuario";
            $comando_AlterarUsuario = Conexao::Obtem()->prepare($instrucaoAlterarUsuario);
            $comando_AlterarUsuario->bindValue(":recebe_nome_usuario",$this->getNome_Usuario());
            $comando_AlterarUsuario->bindValue(":recebe_email_usuario",$this->getEmail_Usuario());
            $comando_AlterarUsuario->bindValue(":recebe_login_usuario",$this->getLogin_Usuario());
            $comando_AlterarUsuario->bindValue(":recebe_senha_usuario",$this->getSenha_Usuario());
            $comando_AlterarUsuario->bindValue(":recebe_perfil_usuario",$this->getPerfil_Usuario());
            $comando_AlterarUsuario->bindValue(":recebe_imagem_usuario",$this->getImagem_Usuario());
            $comando_AlterarUsuario->bindValue(":recebe_codigo_usuario",$this->getCodigo_Usuario());

            $resultadoAlterarUsuario = $comando_AlterarUsuario->execute();

            if(!empty($resultadoAlterarUsuario))
            {
                return "Usuário alterado com sucesso , no próximo acesso utilize a nova senha";
            }
        }
    }

    public function buscarUsuarioAlteracao():array
    {
        $registro_usuario = array();

        if(!empty($this->getCodigo_Usuario()))
        {
            //e declarada a variavel $sql_ValidaUsuario que recebera o sql para busca de usuario no banco de dados
            $sql_BuscaUsuarioAlteracao = "select codigo_usuario,nome_usuario,email_usuario,login_usuario,perfil_usuario,imagem_usuario from usuarios where codigo_usuario = :recebe_codigo_usuario";
            //e declarada a variavel $comando_BuscaValidacaoUsuario que ira receber a consulta a ser realizada
            $comando_BuscaUsuarioAlteracao = Conexao::Obtem()->prepare($sql_BuscaUsuarioAlteracao);
            //e atribuido aos parametros :login_recebido e :senha_recebida os valores setados na classe usuariocontroladora
            $comando_BuscaUsuarioAlteracao->bindValue(":recebe_codigo_usuario", $this->getCodigo_Usuario());
            //e feita a execução
            $comando_BuscaUsuarioAlteracao->execute();
            //e declarada a variavel $registro_UsuarioRetornado e atribuido a ele um array associativo com as informações do usuario localizado
            $registro_usuario = $comando_BuscaUsuarioAlteracao->fetch(PDO::FETCH_ASSOC);
        }

        array_push($registro_usuario,$_SESSION["senha_usuario"]);

        return $registro_usuario;
    }

    public function BuscarCodigoUsuarioPorEmail():array
    {
        try{
            $instrucaoBuscaEmailUsuario = "select codigo_usuario from usuarios where email_usuario = :recebe_email_usuario";
            $comandoBuscaUsuarioEmail = Conexao::Obtem()->prepare($instrucaoBuscaEmailUsuario);
            $comandoBuscaUsuarioEmail->bindValue(":recebe_email_usuario",$this->getEmail_Usuario());
            $comandoBuscaUsuarioEmail->execute();
            return $comandoBuscaUsuarioEmail->fetch(PDO::FETCH_ASSOC);
        }catch(PDOException $exception)
        {
            return $exception->getMessage();
        }catch(Exception $excecao)
        {
            return $excecao->getMessage();
        } 
    }

    public function AlterarSenhaUsuario():string
    {
        try{
            $instrucaoAlterarSenhaUsuario = "update usuarios set senha_usuario = :recebe_senha_alterada where codigo_usuario = :recebe_codigo_usuario";
            $comandoAlterarSenhaUsuario = Conexao::Obtem()->prepare($instrucaoAlterarSenhaUsuario);
            $comandoAlterarSenhaUsuario->bindValue(":recebe_senha_alterada",$this->getSenha_Usuario());
            $comandoAlterarSenhaUsuario->bindValue(":recebe_codigo_usuario",$this->getCodigo_Usuario());
            $resultadoAlterarSenhaUsuario = $comandoAlterarSenhaUsuario->execute();

            if($resultadoAlterarSenhaUsuario)
            {
                $recebe_senha_descriptografada = $this->getSenha_Descritgrafada();
                $mail = new PHPMailer(true);
                $mail->SMTPDebug = 0;
                $mail->isSMTP();
                $mail->CharSet = 'UTF-8';
                $mail->Host = "smtp.kinghost.net";
                
                $mail->SMTPAuth = true;
                $mail->Username = "eliza@idailneto.com.br";
                $mail->Password = "Loja@2024";
                //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->SMTPSecure = "ssl";
                $mail->Port = 465;
                //$mail->Port = 587;
                $mail->setFrom("eliza@idailneto.com.br","E-mail de alteração de senha painel loja");
                $mail->addAddress($this->getEmail_Usuario());
                $mail->isHTML(true);
                $mail->Subject = "Alteração de senha painel loja";
                $mail->Body = "Senha alterada com sucesso:$recebe_senha_descriptografada, use-a no próximo acesso ao sistema,
                você poderá alterá-la na alteração do perfil";
                $mail->AltBody = "Sistema de Gerencimento de Loja";
                
                if ($mail->send()) {
                    return "Senha alterada com sucesso , e-mail com a nova senha enviado com sucesso, favor verificar seu e-mail";
                } else {
                    return "Senha não foi alterada com sucesso";
                }
            }
        }catch(PDOException $exception)
        {
            return $exception->getMessage();
        }catch(Exception $excecao)
        {
            return $excecao->getMessage();
        } 
    }   

    public function VerificaDuplicidadeEmail():string
    {
        try{
            $instrucaoVerificaEmailDuplicado = "select email_usuario from usuarios where email_usuario = :recebe_email_usuario";
            $comandoVerificaEmailDuplicado = Conexao::Obtem()->prepare($instrucaoVerificaEmailDuplicado);
            $comandoVerificaEmailDuplicado->bindValue(":recebe_email_usuario",$this->getEmail_Usuario());
            $comandoVerificaEmailDuplicado->execute();
            $resultadoVerificaEmailDuplicado = $comandoVerificaEmailDuplicado->fetch(PDO::FETCH_ASSOC);
            if(!empty($resultadoVerificaEmailDuplicado))
            {
                return "email localizado";
            }else{
                return "nenhum email localizado";
            }
        }catch(PDOException $exception)
        {
            return $exception->getMessage();
        }catch(Exception $excecao)
        {
            return $excecao->getMessage();
        }
    }
}