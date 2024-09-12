<?php
require("../modelo/Produto.php");
class ProdutoControladora{
    private $produto;

    public function __construct()
    {
        $this->produto = new Produto();
    }

    public function CadastrarProduto($recebe_categoria_produto,$recebe_nome_produto,$recebe_estoque_produto,$recebe_valor_produto)
    {
        $this->produto->setCategoria_Produto($recebe_categoria_produto);
        $this->produto->setNome_Produto($recebe_nome_produto);
        $this->produto->setEstoque_Produto($recebe_estoque_produto);
        $this->produto->setValor_Produto($recebe_valor_produto);

        $resultadoCadastroProduto = $this->produto->CadastrarProduto();

        return $resultadoCadastroProduto;
    }

    public function ConsultarProdutos($recebeFiltroProduto,$recebeValorFiltroProduto)
    {
        $this->produto->setFiltro_Produto($recebeFiltroProduto);
        $this->produto->setValor_Filtro_Produto($recebeValorFiltroProduto);

        $registrosProdutos = $this->produto->ConsultarProdutos();
        return $registrosProdutos;
    }

    public function ConsultarImagensProduto($recebeCodigoImagemProduto)
    {
        $this->produto->setCodigo_Produto($recebeCodigoImagemProduto);

        $registrosImagensProduto = $this->produto->ConsultarImagensProduto();

        return $registrosImagensProduto;
    }

    public function ConsultarProdutoEspecifico($recebeCodigoProdutoEspecifico)
    {
        $this->produto->setCodigo_Produto($recebeCodigoProdutoEspecifico);

        $registroProdutoEspecifico = $this->produto->ConsultarProdutoEspecifico();

        return $registroProdutoEspecifico;
    }

    public function ConsultarQTDProdutoEstoque($recebeCodigoQTDPE)
    {
        $this->produto->setCodigo_Produto($recebeCodigoQTDPE);

        $registroQTDPE = $this->produto->ConsultarQTDProdutoEstoque();

        return $registroQTDPE;
    }

    public function AlterarProdutoEspecifico($recebeCodigoProdutoAlterarEspecifico,$recebeCategoriaProdutoAlterarEspecifico,$recebeNomeProdutoAlterarEspecifico,
    $recebeEstoqueProdutoAlterarEspecifico,$recebeValorProdutoEspecificoAlterar)
    {
        $this->produto->setCodigo_Produto($recebeCodigoProdutoAlterarEspecifico);
        $this->produto->setCategoria_Produto($recebeCategoriaProdutoAlterarEspecifico);
        $this->produto->setNome_Produto($recebeNomeProdutoAlterarEspecifico);
        $this->produto->setEstoque_Produto($recebeEstoqueProdutoAlterarEspecifico);
        $this->produto->setValor_Produto($recebeValorProdutoEspecificoAlterar);

        $resultadoAlterarProdutoEspecifico = $this->produto->AlterarProdutoEspecifico();

        return $resultadoAlterarProdutoEspecifico;
    }

    public function ExcluirProdutoEspecifico($recebeCodigoProdutoEspecificoExcluir)
    {
        $this->produto->setCodigo_Produto($recebeCodigoProdutoEspecificoExcluir);

        $resultadoExcluirProdutoEspecifico = $this->produto->ExcluirProdutoEspecifico();

        return $resultadoExcluirProdutoEspecifico;
    }
}
?>