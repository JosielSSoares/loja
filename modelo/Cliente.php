<?php
require("Conexao.php");
require("ClienteInterface.php");

require("../vendor/phpmailer/phpmailer/src/PHPMailer.php");
require("../vendor/phpmailer/phpmailer/src/SMTP.php");
require("../vendor/phpmailer/phpmailer/src/Exception.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPmailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Cliente implements ClienteInterface
{
    private $codigo_cliente;
    private $nome_cliente;
    private $telefone_cliente;
    private $email_cliente;
    private $endereco_cliente;
    private $status_cliente;
    private $filtro_cliente;
    private $valor_filtro_cliente;
    private $valor_produto_email;
    private $nome_produto_email;

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

    public function setEmail_Cliente($email_cliente)
    {
        $this->email_cliente = $email_cliente;
    }

    public function getEmail_Cliente()
    {
        return $this->email_cliente;
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

    public function setValor_Produto_Email($valor_produto_email)
    {
        $this->valor_produto_email = $valor_produto_email;
    }

    public function getValor_Produto_Email()
    {
        return $this->valor_produto_email;
    }

    public function setNome_Produto_Email($nome_produto_email)
    {
        $this->nome_produto_email = $nome_produto_email;
    }

    public function getNome_Produto_Email()
    {
        return $this->nome_produto_email;
    }

    public function cadastrarCliente(): int
    {
        try {
            $instrucaoCadastroCliente = "insert into clientes(nome_cliente,telefone_cliente,email_cliente,endereco_cliente,status_cliente)
            values(:recebe_nome_cliente,:recebe_telefone_cliente,:recebe_email_cliente,:recebe_endereco_cliente,
            :recebe_status_cliente)";
            $comandoCadastroCliente = Conexao::Obtem()->prepare($instrucaoCadastroCliente);
            $comandoCadastroCliente->bindValue(":recebe_nome_cliente", $this->getNome_Cliente());
            $comandoCadastroCliente->bindValue(":recebe_telefone_cliente", $this->getTelefone_Cliente());
            $comandoCadastroCliente->bindValue(":recebe_email_cliente",$this->getEmail_Cliente());
            $comandoCadastroCliente->bindValue(":recebe_endereco_cliente", $this->getEndereco_Cliente());
            $comandoCadastroCliente->bindValue(":recebe_status_cliente", $this->getStatus_Cliente());

            $resultadoCadastroCliente = $comandoCadastroCliente->execute();
            $ultimoCodigoCadastrado = Conexao::Obtem()->lastInsertId();

            return $ultimoCodigoCadastrado;
        } catch (PDOException $exception) {
            return $exception->getMessage();
        } catch (Exception $excecao) {
            return $excecao->getMessage();
        }
    }

    public function consultarClientes(): array
    {
        $registro_clientes = array();

        try {
            if (!empty($this->getFiltro_Cliente()) && !empty($this->getValor_Filtro_Cliente())) {
                if ($this->getFiltro_Cliente() === "nome_cliente") {
                    $recebeNomeCliente = $this->getValor_Filtro_Cliente();
                    $instrucaoConsultaClientes = "select * from clientes where nome_cliente like :recebe_nome_cliente";
                    $comandoConsultaClientes = Conexao::Obtem()->prepare($instrucaoConsultaClientes);
                    $comandoConsultaClientes->bindValue(":recebe_nome_cliente", "%$recebeNomeCliente%");
                    $comandoConsultaClientes->execute();
                    $registro_clientes = $comandoConsultaClientes->fetchAll(PDO::FETCH_ASSOC);
                } else if ($this->getFiltro_Cliente() === "status_cliente") {
                    $instrucaoConsultaClientes = "select * from clientes where status_cliente = :recebe_status_cliente";
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

            if (!empty($registro_clientes))
                return $registro_clientes;
            else
                return $registro_clientes;
        } catch (PDOException $exception) {
            array_push($registro_clientes, $exception->getMessage());
            return $registro_clientes;
        } catch (Exception $excecao) {
            array_push($registro_clientes, $excecao->getMessage());
            return $registro_clientes;
        }

        return $registro_clientes;
    }

    public function consultarClientesVenda():array
    {
        $registro_clientes = array();
        try {
            $instrucaoConsultaClientes = "select * from clientes as c where c.status_cliente = 1";
            $comandoConsultaClientes = Conexao::Obtem()->prepare($instrucaoConsultaClientes);
            $comandoConsultaClientes->execute();
            $registro_clientes = $comandoConsultaClientes->fetchAll(PDO::FETCH_ASSOC);
            
            if (!empty($registro_clientes))
                return $registro_clientes;
            else
                return $registro_clientes;
        } catch (PDOException $exception) {
            array_push($registro_clientes, $exception->getMessage());
            return $registro_clientes;
        } catch (Exception $excecao) {
            array_push($registro_clientes, $excecao->getMessage());
            return $registro_clientes;
        }
    }

    public function consultarClienteEspecifico(): array
    {
        $registro_cliente = array();

        try {
            if (!empty($this->getCodigo_Cliente())) {
                $instrucaoConsultaClienteEspecifico = "select * from clientes where codigo_cliente = :recebe_codigo_cliente";
                $instrucaoConsultaClienteEspecifico = Conexao::Obtem()->prepare($instrucaoConsultaClienteEspecifico);
                $instrucaoConsultaClienteEspecifico->bindValue(":recebe_codigo_cliente", $this->getCodigo_Cliente());
                $instrucaoConsultaClienteEspecifico->execute();
                $registro_cliente = $instrucaoConsultaClienteEspecifico->fetch(PDO::FETCH_ASSOC);
            }
            return $registro_cliente;
        } catch (PDOException $exception) {
            array_push($registro_cliente, $exception->getMessage());
            return $registro_cliente;
        } catch (Exception $excecao) {
            array_push($registro_cliente, $excecao->getMessage());
            return $registro_cliente;
        }
    }

    public function alterarClienteEspecifico():string
    {
        try{
            if(!empty($this->getNome_Cliente()) && !empty($this->getTelefone_Cliente()) && !empty($this->getEndereco_Cliente()) && !empty($this->getStatus_Cliente()))
            {
                $instrucaoAlteraClienteEspecifico = "update clientes set nome_cliente = :recebe_nome_cliente, telefone_cliente = :recebe_telefone_cliente,
                email_cliente = :recebe_email_cliente, endereco_cliente = :recebe_endereco_cliente, 
                status_cliente = :recebe_status_cliente where codigo_cliente = :recebe_codigo_cliente";
                $comandoAlteraClienteEspecifico = Conexao::Obtem()->prepare($instrucaoAlteraClienteEspecifico);
                $comandoAlteraClienteEspecifico->bindValue(":recebe_nome_cliente",$this->getNome_Cliente());
                $comandoAlteraClienteEspecifico->bindValue(":recebe_telefone_cliente",$this->getTelefone_Cliente());
                $comandoAlteraClienteEspecifico->bindValue(":recebe_email_cliente",$this->getEmail_Cliente());
                $comandoAlteraClienteEspecifico->bindValue(":recebe_endereco_cliente",$this->getEndereco_Cliente());
                $comandoAlteraClienteEspecifico->bindValue(":recebe_status_cliente",$this->getStatus_Cliente());
                $comandoAlteraClienteEspecifico->bindValue(":recebe_codigo_cliente",$this->getCodigo_Cliente());
                $resultadoAlteraClienteEspecifico = $comandoAlteraClienteEspecifico->execute();

                if($resultadoAlteraClienteEspecifico)
                    return "Cliente alterado com sucesso";
                else
                    return "Cliente não foi alterado";
            }
        }catch (PDOException $exception) {
            $recebe_erro =  $exception->getMessage();
            return $recebe_erro;
        } catch (Exception $excecao) {
            $recebe_erro =  $excecao->getMessage();
            return $recebe_erro;
        }
    }

    public function excluirClienteEspecifico():string
    {
        try{
            if(!empty($this->getCodigo_Cliente()))
            {
                $instrucaoExcluiClienteEspecifico = "delete from clientes where codigo_cliente = :recebe_codigo_cliente";
                $comandoExcluirClienteEspecifico = Conexao::Obtem()->prepare($instrucaoExcluiClienteEspecifico);
                $comandoExcluirClienteEspecifico->bindValue(":recebe_codigo_cliente",$this->getCodigo_Cliente());
                $resultadoExcluiClienteEspecifico = $comandoExcluirClienteEspecifico->execute();

                if($resultadoExcluiClienteEspecifico)
                    return "Cliente excluido com sucesso";
                else
                    return "Cliente não foi excluido";
            }
        }catch (PDOException $exception) {
            $recebe_erro =  $exception->getMessage();
            return $recebe_erro;
        } catch (Exception $excecao) {
            $recebe_erro =  $excecao->getMessage();
            return $recebe_erro;
        }
    }

    public function BuscaTotalClientes():int
    {
        try{
            $instrucaoBuscaTotalClientes = "select count(codigo_cliente) as total_cliente from clientes";
            $comandoBuscaTotalClientes = Conexao::Obtem()->prepare($instrucaoBuscaTotalClientes);
            $comandoBuscaTotalClientes->execute();
            $recebe_registro_total = $comandoBuscaTotalClientes->fetch(PDO::FETCH_ASSOC);

            $recebe_total_clientes = $recebe_registro_total["total_cliente"];

            return $recebe_total_clientes;
        }catch (PDOException $exception) {
            return $exception->getMessage();
        } catch (Exception $excecao) {
            return $excecao->getMessage();
        }
    }

    public function BuscarEmailCliente():string
    {
        try{
            $instrucaoBuscaEmailCliente = "select email_cliente from clientes where codigo_cliente = :recebe_codigo_cliente";
            $comandoBuscaEmailCliente = Conexao::Obtem()->prepare($instrucaoBuscaEmailCliente);
            $comandoBuscaEmailCliente->bindValue(":recebe_codigo_cliente",$this->getCodigo_Cliente());
            $comandoBuscaEmailCliente->execute();
            $recebe_email_cliente = $comandoBuscaEmailCliente->fetch(PDO::FETCH_ASSOC);

            $recebe_email_localizado = $recebe_email_cliente["email_cliente"];

            return $recebe_email_localizado;
        }catch (PDOException $exception) {
            return $exception->getMessage();
        } catch (Exception $excecao) {
            return $excecao->getMessage();
        }
    }

    public function VerificaDuplicidadeEmailCliente():string
    {
        try{
            $instrucaoBuscaEmailClienteEsp = "select email_cliente from clientes where email_cliente = :recebe_email_cliente";
            $comandoBuscaEmailClienteEsp = Conexao::Obtem()->prepare($instrucaoBuscaEmailClienteEsp);
            $comandoBuscaEmailClienteEsp->bindValue(":recebe_email_cliente",$this->getEmail_Cliente());
            $comandoBuscaEmailClienteEsp->execute();
            $resultadoVerificaDuplicidadeEmailC = $comandoBuscaEmailClienteEsp->fetch(PDO::FETCH_ASSOC);

            if(!empty($resultadoVerificaDuplicidadeEmailC["email_cliente"]))
                return "email localizado";
            else
                return "nenhum email localizado";
        }catch(PDOException $exception)
        {
            return $exception->getMessage();
        }catch(Exception $excecao)
        {
            return $excecao->getMessage();
        } 
    }

    public function EncaminharEmailCobranca():string
    {
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
        $mail->setFrom("eliza@idailneto.com.br");
        $mail->addAddress($this->getEmail_Cliente());
        $mail->addCC('elizaregina@gmail.com');
        $mail->isHTML(true);
        $mail->Subject = "E-mail de cobrança da venda";
        $mail->Body = "Olá, ".$this->getNome_Cliente()." <br><br> Faltam 10 dias para o vencimento do pagamento do produto:".$this->getNome_Produto_Email()." , no valor de:".$this->getValor_Produto_Email()."<br><br>
        <img src='cid:logo' style='height:100px;width:200px;'>";
        $mail->addEmbeddedImage('../visao/logo.jpg', 'logo');
        $mail->AltBody = "";
            
        if ($mail->send()) {
           return "E-mail de cobrança encaminhado";
        } else {
           return "E-mail de cobrança não encaminhado";
        }
    }
}