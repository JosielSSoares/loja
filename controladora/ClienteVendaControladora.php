<?php
require("../modelo/ClienteVenda.php");

class ClienteVendaControladora{
    private $cliente_venda;

    public function __construct()
    {
        $this->cliente_venda = new ClienteVenda();
    }

    public function cadastrarClienteVenda($recebe_nome_cliente,$recebe_codigo_cliente)
    {
        $this->cliente_venda->setNome_Cliente_Venda($recebe_nome_cliente);
        $this->cliente_venda->setCodigo_Cliente($recebe_codigo_cliente);

        $resultadoCadClienteVenda = $this->cliente_venda->cadastrarClienteVenda();

        return $resultadoCadClienteVenda;
    }
}
?>