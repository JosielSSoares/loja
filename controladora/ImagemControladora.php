<?php
require("../modelo/Imagem.php");

class ImagemControladora{
    private $imagem;

    public function __construct()
    {
        $this->imagem = new Imagem();
    }

    public function cadastrarImagem($recebe_imagem,$recebe_codigo_produto_imagem)
    {
        $this->imagem->setImagem($recebe_imagem);
        $this->imagem->setCodigo_Produto_Imagem($recebe_codigo_produto_imagem);

        $resultadoCadastroImagemProduto = $this->imagem->CadastrarImagens();

        return $resultadoCadastroImagemProduto;
    }

    public function ExcluirImagensEspecificas($recebeCodigoImagensProdutoEspecificoExclusao)
    {
        $this->imagem->setCodigo_Produto_Imagem($recebeCodigoImagensProdutoEspecificoExclusao);

        $resultadoExcluirImagensProdutoEspecifico = $this->imagem->ExcluirImagemEspecifica();

        return $resultadoExcluirImagensProdutoEspecifico;
    }
}
?>