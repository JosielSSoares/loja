<?php
require("Conexao.php");
require("ClienteVendaInterface.php");

class ClienteVenda implements ClienteVendaInterface
{
    private $codigo_cliente_venda;
    private $nome_cliente_venda;
    private $codigo_cliente;

    public function setCodigo_Cliente_Venda($codigo_cliente_venda)
    {
        $this->codigo_cliente = $codigo_cliente_venda;
    }

    public function getCodigo_Cliente_Venda()
    {
        return $this->codigo_cliente_venda;
    }

    public function setNome_Cliente_Venda($nome_cliente_venda)
    {
        $this->nome_cliente_venda = $nome_cliente_venda;
    }

    public function getNome_Cliente_Venda()
    {
        return $this->nome_cliente_venda;
    }

    public function setCodigo_Cliente($codigo_cliente)
    {
        $this->codigo_cliente = $codigo_cliente;
    }

    public function getCodigo_Cliente()
    {
        return $this->codigo_cliente;
    }

    public function cadastrarClienteVenda(): int
    {
        try {
            for ($indice = 0; $indice < count($this->getNome_Cliente_Venda()); $indice++) {
                $instrucaoCadastroCliente = "insert into cliente_venda(nome_cliente_venda,codigo_cliente)
            values(:recebe_nome_cliente,:recebe_codigo_cliente)";
                $comandoCadastroCliente = Conexao::Obtem()->prepare($instrucaoCadastroCliente);
                $comandoCadastroCliente->bindValue(":recebe_nome_cliente", $this->getNome_Cliente_Venda()[$indice]);
                $comandoCadastroCliente->bindValue(":recebe_codigo_cliente", $this->getCodigo_Cliente()[$indice]);
                $comandoCadastroCliente->execute();

                $resultadoCodigoRegistrado = Conexao::Obtem()->lastInsertId();

                return $resultadoCodigoRegistrado;
            }

            if (!empty($resultadoCadastroCliente))
                return $resultadoCadastroCliente;
        } catch (PDOException $exception) {
            return $exception->getMessage();
        } catch (Exception $excecao) {
            return $excecao->getMessage();
        }
    }
}
?>