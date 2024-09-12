<?php
interface ClienteInterface{
    public function cadastrarCliente():int;
    public function consultarClientes():array;
    public function consultarClienteEspecifico():array;
    public function alterarClienteEspecifico():string;
    public function excluirClienteEspecifico():string;
}
?>