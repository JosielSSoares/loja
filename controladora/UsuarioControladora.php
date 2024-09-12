<?php
require("../modelo/Usuario.php");

class UsuarioControladora
{
    private $usuario;

    public function __construct()
    {
        $this->usuario = new Usuario();
    }

    public function CadastroUsuario($recebeNomeUsuario, $recebeEmailUsuario, $recebeLoginUsuario, $recebeSenhaUsuario,$recebeSenhaDescriptgrafada, $recebePerfilUsuario, $recebeImagemUsuario)
    {

        $this->usuario->setNome_Usuario($recebeNomeUsuario);
        $this->usuario->setEmail_Usuario($recebeEmailUsuario);
        $this->usuario->setLogin_Usuario($recebeLoginUsuario);
        $this->usuario->setSenha_Usuario($recebeSenhaUsuario);
        $this->usuario->setSenha_Descritgrafada($recebeSenhaDescriptgrafada);
        $this->usuario->setPerfil_Usuario($recebePerfilUsuario);

        if (!empty($recebeImagemUsuario))
            $this->usuario->setImagem_Usuario($recebeImagemUsuario);

        $resultadoVerificaDuplicidadeEmail = $this->usuario->VerificaDuplicidadeEmail();

        if($resultadoVerificaDuplicidadeEmail === "email localizado")
        {
            return "email localizado";
        }

        $resultadoUsuario = $this->usuario->cadastroUsuario();
        return $resultadoUsuario;
    }

    public function AutenticacaoUsuario($recebeLoginUsuario, $recebeSenhaUsuario,$recebeSenhaDescriptgrafada)
    {
        $this->usuario->setLogin_Usuario($recebeLoginUsuario);
        $this->usuario->setSenha_Usuario($recebeSenhaUsuario);
        $this->usuario->setSenha_Descritgrafada($recebeSenhaDescriptgrafada);

        $resultadoAutenticacaoUsuario = $this->usuario->autenticacaoUsuario();

        return $resultadoAutenticacaoUsuario;
    }

    public function DeslogarUsuario()
    {
        //e inicializada a sessão
        //session_start();
        //e destruida a sessao
        session_destroy();
        //e declarada a variavel $recebe_sessao_usuario_deslogado que ira receber uma sessao chamada usuario_deslogado com o valor deslogado com sucesso
        $recebe_sessao_usuario_deslogado = $_SESSION["usuario_deslogado"] = "Deslogado com sucesso";
        //e retornado o valor da variavel $recebe_sessao_usuario_deslogado
        return $recebe_sessao_usuario_deslogado;
    }

    public function AlterarUsuario($recebeNomeUsuario, $recebeEmailUsuario, $recebeLoginUsuario, $recebeSenhaUsuario, $recebePerfilUsuario, $recebeImagemUsuario,$recebeCodigoUsuario)
    {
        $this->usuario->setCodigo_Usuario($recebeCodigoUsuario);
        $this->usuario->setNome_Usuario($recebeNomeUsuario);
        $this->usuario->setEmail_Usuario($recebeEmailUsuario);
        $this->usuario->setLogin_Usuario($recebeLoginUsuario);
        $this->usuario->setSenha_Usuario($recebeSenhaUsuario);
        $this->usuario->setPerfil_Usuario($recebePerfilUsuario);

        if (!empty($recebeImagemUsuario))
            $this->usuario->setImagem_Usuario($recebeImagemUsuario);

        $resultadoUsuarioAlterado = $this->usuario->alterarUsuario();
        return $resultadoUsuarioAlterado;
    }

    public function buscarUsuarioAlteracao($recebeCodigoUsuarioLogado)
    {
        $this->usuario->setCodigo_Usuario($recebeCodigoUsuarioLogado);

        $resultadoBuscarUsuarioAlteracao = $this->usuario->buscarUsuarioAlteracao();

        if(!empty($resultadoBuscarUsuarioAlteracao))
            return $resultadoBuscarUsuarioAlteracao;
    }

    public function AlterarSenhaUsuario($recebe_email_alterar_usuario,$recebe_senha_criptografada,$recebe_senha_nao_criptografada)
    {
        $registroCodigoLocalizado = $this->BuscarUsuarioPorEmail($recebe_email_alterar_usuario);

        $recebeCodigoUsuarioLocalizado = "";

        foreach($registroCodigoLocalizado as $indice => $valor)
        {
            $recebeCodigoUsuarioLocalizado = $valor;
        }

        $this->usuario->setCodigo_Usuario($recebeCodigoUsuarioLocalizado);
        $this->usuario->setSenha_Descritgrafada($recebe_senha_nao_criptografada);
        $this->usuario->setSenha_Usuario($recebe_senha_criptografada);

        return $this->usuario->AlterarSenhaUsuario();
    }

    public function BuscarUsuarioPorEmail($recebe_email_usuario)
    {
        $this->usuario->setEmail_Usuario($recebe_email_usuario);
        return $this->usuario->BuscarCodigoUsuarioPorEmail();
    }
}
