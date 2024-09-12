<?php
interface ProdutoInterface{
    public function CadastrarProduto():int;
    public function ConsultarProdutos():array;
    public function ConsultarImagensProduto():array;
    public function ConsultarProdutoEspecifico():array;
    public function AlterarProdutoEspecifico():string;
    public function ExcluirProdutoEspecifico():string;
}
?>