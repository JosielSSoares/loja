<?php
require("../modelo/Venda.php");

class VendaControladora{
    private $venda;

    public function __construct()
    {
        $this->venda = new Venda();
    }

    public function CadastrarVenda($recebeNomeClienteV,$recebeNomePV,$recebeQuantidadePV,$recebeDescontoV,$recebeDescontoFV,$recebeValorFV,
    $recebePagoV,$recebePagamentoAV,$recebeDataPV,$recebeCodigoClienteV)
    {
        $this->venda->setNome_Cliente_Venda($recebeNomeClienteV);
        $this->venda->setNome_Produto_Venda($recebeNomePV);
        $this->venda->setQuantidade_Produtos_Venda($recebeQuantidadePV);
        $this->venda->setDesconto_Venda($recebeDescontoV);
        $this->venda->setDesconto_Final_Venda($recebeDescontoFV);
        $this->venda->setValor_Final_Venda($recebeValorFV);
        $this->venda->setPago_Venda($recebePagoV);
        $this->venda->setPagamento_Agendado_Venda($recebePagamentoAV);
        $this->venda->setData_Pagamento_Venda($recebeDataPV);
        $this->venda->setCodigo_Cliente_Vendas($recebeCodigoClienteV);

        $resultadoCadastrarVenda = $this->venda->CadastrarVenda();

        return $resultadoCadastrarVenda;
    }

    public function BuscarVendas($recebeFiltroV,$recebeValorFiltroV)
    {
        $this->venda->setFiltro_Venda($recebeFiltroV);
        $this->venda->setValor_Filtro_Venda($recebeValorFiltroV);

        $resultadoBuscarVendas = $this->venda->BuscarVendas();

        return $resultadoBuscarVendas;
    }

    public function BuscarVendasClienteEspecifico($recebeCodigoClienteVEspecifico)
    {
        $this->venda->setCodigo_Cliente_Vendas($recebeCodigoClienteVEspecifico);

        $resultadoBuscarVEspecificasCliente = $this->venda->BuscarVendasEspecificas();

        return $resultadoBuscarVEspecificasCliente;
    }

    public function AtualizarEstoqueVenda($recebeDadosAtualizarEstoque)
    {
        $this->venda->setAtualizar_Estoque($recebeDadosAtualizarEstoque);

        $resultadoAtualizarEstoqueVenda = $this->venda->AtualizarQuantidadeEstoque();

        return $resultadoAtualizarEstoqueVenda;
    }

    public function BuscaTotalVendas()
    {
        $resultadoBuscaTotalVendas = $this->venda->BuscaTotalVendas();

        return $resultadoBuscaTotalVendas;
    }

    public function BuscaVendasVencer()
    {
        $resultadoBuscaVendasVencer = $this->venda->BuscarVendasVencer();

        return $resultadoBuscaVendasVencer;
    }

    public function BuscaVendasVencerHoje()
    {
        $resultadoBuscaVendasVencerHoje = $this->venda->BuscarVendasVencerHoje();

        return $resultadoBuscaVendasVencerHoje;
    }

    public function BuscarVendasMeses()
    {
        $resultadoBuscaVendasMeses = $this->venda->BuscarVendasMeses();

        return $resultadoBuscaVendasMeses;
    }

    public function AtualizarPagamento($recebe_codigo_venda)
    {
        $this->venda->setPago_Venda(1);
        $this->venda->setCodigo_Venda($recebe_codigo_venda);

        $resultadoAtualizarPagamento = $this->venda->AtualizarPagamento();

        return $resultadoAtualizarPagamento;
    }

    public function ExcluirVenda($recebe_codigo_venda)
    {
        $this->venda->setCodigo_Venda($recebe_codigo_venda);

        return $this->venda->ExcluirVenda();
    }

    public function BuscaVendasRelatorio()
    {
        return $this->venda->VendasRelatorio();
    }
}
?>