<?php
require("Conexao.php");
require("ClienteInterface.php");
class Cliente implements ClienteInterface
{
    private $codigo_cliente;
    private $nome_cliente;
    private $telefone_cliente;
    private $endereco_cliente;
    private $status_cliente;
    private $filtro_cliente;
    private $valor_filtro_cliente;

    public function setCodigo_Cliente($codigo_cliente)
    {
        $this->codigo_cliente = $codigo_cliente;
    }

    public function getCodigo_Cliente()
    {
        return $this->codigo_cliente;
    }

    public function setNome_Cliente($nome_cliente)
    {
        $this->nome_cliente = $nome_cliente;
    }

    public function getNome_Cliente()
    {
        return $this->nome_cliente;
    }

    public function setTelefone_Cliente($telefone_cliente)
    {
        $this->telefone_cliente = $telefone_cliente;
    }

    public function getTelefone_Cliente()
    {
        return $this->telefone_cliente;
    }

    public function setEndereco_Cliente($endereco_cliente)
    {
        $this->endereco_cliente = $endereco_cliente;
    }

    public function getEndereco_Cliente()
    {
        return $this->endereco_cliente;
    }

    public function setStatus_Cliente($status_cliente)
    {
        $this->status_cliente = $status_cliente;
    }

    public function getStatus_Cliente()
    {
        return $this->status_cliente;
    }

    public function setFiltro_Cliente($filtro_cliente)
    {
        $this->filtro_cliente = $filtro_cliente;
    }

    public function getFiltro_Cliente()
    {
        return $this->filtro_cliente;
    }

    public function setValor_Filtro_Cliente($valor_filtro_cliente)
    {
        $this->valor_filtro_cliente = $valor_filtro_cliente;
    }

    public function getValor_Filtro_Cliente()
    {
        return $this->valor_filtro_cliente;
    }

    public function cadastrarCliente(): int
    {
        try {
            $instrucaoCadastroCliente = "insert into clientes(nome_cliente,telefone_cliente,endereco_cliente,status_cliente)values(:recebe_nome_cliente,:recebe_telefone_cliente,:recebe_endereco_cliente,
            :recebe_status_cliente)";
            $comandoCadastroCliente = Conexao::Obtem()->prepare($instrucaoCadastroCliente);
            $comandoCadastroCliente->bindValue(":recebe_nome_cliente", $this->getNome_Cliente());
            $comandoCadastroCliente->bindValue(":recebe_telefone_cliente", $this->getTelefone_Cliente());
            $comandoCadastroCliente->bindValue(":recebe_endereco_cliente", $this->getEndereco_Cliente());
            $comandoCadastroCliente->bindValue(":recebe_status_cliente", $this->getStatus_Cliente());

            $resultadoCadastroCliente = $comandoCadastroCliente->execute();

            if (!empty($resultadoCadastroCliente))
                return $resultadoCadastroCliente;
        } catch (PDOException $exception) {
            return $exception->getMessage();
        } catch (Exception $excecao) {
            return $excecao->getMessage();
        }
    }

    public function consultarClientes():array
    {
        $registro_clientes = array();

        try {
            if (!empty($this->getFiltro_Cliente()) && !empty($this->getValor_Filtro_Cliente())) {
                if ($this->getFiltro_Cliente() === "nome_cliente") {
                    $instrucaoConsultaClientes = "select * from clientes where nome_cliente like = :recebe_nome_cliente";
                    $comandoConsultaClientes = Conexao::Obtem()->prepare($instrucaoConsultaClientes);
                    $comandoConsultaClientes->bindValue(":recebe_nome_cliente", $this->getValor_Filtro_Cliente());
                    $comandoConsultaClientes->execute();
                    $registro_clientes = $comandoConsultaClientes->fetchAll(PDO::FETCH_ASSOC);
                } else if ($this->getFiltro_Cliente() === "status_cliente") {
                    $instrucaoConsultaClientes = "select * from clientes where status_cliente like = :recebe_status_cliente";
                    $comandoConsultaClientes = Conexao::Obtem()->prepare($instrucaoConsultaClientes);
                    $comandoConsultaClientes->bindValue(":recebe_status_cliente", $this->getValor_Filtro_Cliente());
                    $comandoConsultaClientes->execute();
                    $registro_clientes = $comandoConsultaClientes->fetchAll(PDO::FETCH_ASSOC);
                } else {
                    $instrucaoConsultaClientes = "select * from clientes";
                    $comandoConsultaClientes = Conexao::Obtem()->prepare($instrucaoConsultaClientes);
                    $comandoConsultaClientes->execute();
                    $registro_clientes = $comandoConsultaClientes->fetchAll(PDO::FETCH_ASSOC);
                }
            }

            if(!empty($registro_clientes))
                return $registro_clientes;
            else
                return $registro_clientes;
        } catch (PDOException $exception) {
            array_push($registro_clientes,$exception->getMessage());
            return $registro_clientes;
        } catch (Exception $excecao) {
            array_push($registro_clientes,$excecao->getMessage());
            return $registro_clientes;
        }

        return $registro_clientes;
    }
}
