<?php
require("Conexao.php");
require("ProdutoInterface.php");
class Produto implements ProdutoInterface
{
    private $codigo_produto;
    private $categoria_produto;
    private $nome_produto;
    private $estoque_produto;
    private $valor_produto;
    private $filtro_produto;
    private $valor_filtro_produto;

    public function setCodigo_Produto($codigo_produto)
    {
        $this->codigo_produto = $codigo_produto;
    }

    public function getCodigo_Produto()
    {
        return $this->codigo_produto;
    }

    public function setCategoria_Produto($categoria_produto)
    {
        $this->categoria_produto = $categoria_produto;
    }

    public function getCategoria_Produto()
    {
        return $this->categoria_produto;
    }

    public function setNome_Produto($nome_produto)
    {
        $this->nome_produto = $nome_produto;
    }

    public function getNome_Produto()
    {
        return $this->nome_produto;
    }

    public function setEstoque_Produto($estoque_produto)
    {
        $this->estoque_produto = $estoque_produto;
    }

    public function getEstoque_Produto()
    {
        return $this->estoque_produto;
    }

    public function setValor_Produto($valor_produto)
    {
        $this->valor_produto = $valor_produto;
    }

    public function getValor_Produto()
    {
        return $this->valor_produto;
    }

    public function setFiltro_Produto($filtro_produto)
    {
        $this->filtro_produto = $filtro_produto;
    }

    public function getFiltro_Produto()
    {
        return $this->filtro_produto;
    }

    public function setValor_Filtro_Produto($valor_filtro_produto)
    {
        $this->valor_filtro_produto = $valor_filtro_produto;
    }

    public function getValor_Filtro_Produto()
    {
        return $this->valor_filtro_produto;
    }

    public function CadastrarProduto(): int
    {
        try {
            if (!empty($this->getCategoria_Produto()) && !empty($this->getNome_Produto()) && !empty($this->getEstoque_Produto()) && !empty($this->getValor_Produto())) {
                $instrucaoCadastroProduto = "insert into produtos(categoria_produto,nome_produto,estoque_produto,valor_produto)values(:recebe_categoria_produto,:recebe_nome_produto,:recebe_estoque_produto,:recebe_valor_produto)";
                $comandoCadastroProduto = Conexao::Obtem()->prepare($instrucaoCadastroProduto);
                $comandoCadastroProduto->bindValue(":recebe_categoria_produto", $this->getCategoria_Produto());
                $comandoCadastroProduto->bindValue(":recebe_nome_produto", $this->getNome_Produto());
                $comandoCadastroProduto->bindValue(":recebe_estoque_produto", $this->getEstoque_Produto());
                $comandoCadastroProduto->bindValue(":recebe_valor_produto", $this->getValor_Produto());

                $resultadoCadastroProduto = $comandoCadastroProduto->execute();

                $ultimoCodigoGeradoCadastroProduto = Conexao::Obtem()->lastInsertId();

                return $ultimoCodigoGeradoCadastroProduto;
            }
        } catch (PDOException $exception) {
            array_push($registro_cliente, $exception->getMessage());
            return $registro_cliente;
        } catch (Exception $excecao) {
            array_push($registro_cliente, $excecao->getMessage());
            return $registro_cliente;
        }
    }

    public function ConsultarProdutos(): array
    {
        $registros_produtos = array();
        try {
            if (!empty($this->getFiltro_Produto()) && !empty($this->getValor_Filtro_Produto())) 
            {
                if($this->getFiltro_Produto() === "categoria_produto")
                {
                    $instrucaoConsultaProdutos = "select p.codigo_produto,p.nome_produto,p.categoria_produto,p.estoque_produto,p.valor_produto
                    from produtos as p where p.categoria_produto = :recebe_categoria_produto";
                    $comandoConsultaProduto = Conexao::Obtem()->prepare($instrucaoConsultaProdutos);
                    $comandoConsultaProduto->bindValue(":recebe_categoria_produto",$this->getValor_Filtro_Produto());
                    $comandoConsultaProduto->execute();
                    $registros_produtos = $comandoConsultaProduto->fetchAll(PDO::FETCH_ASSOC);
                }else if($this->getFiltro_Produto() === "nome_produto")
                {
                    $recebeNomeProduto = $this->getValor_Filtro_Produto();
                    $instrucaoConsultaProdutos = "select p.codigo_produto,p.nome_produto,p.categoria_produto,p.estoque_produto,p.valor_produto
                    from produtos as p where p.nome_produto like :recebe_nome_produto";
                    $comandoConsultaProduto = Conexao::Obtem()->prepare($instrucaoConsultaProdutos);
                    $comandoConsultaProduto->bindValue(":recebe_nome_produto","%$recebeNomeProduto%");
                    $comandoConsultaProduto->execute();
                    $registros_produtos = $comandoConsultaProduto->fetchAll(PDO::FETCH_ASSOC);
                }else{
                    $instrucaoConsultaProdutos = "select p.codigo_produto,p.nome_produto,p.categoria_produto,p.estoque_produto,p.valor_produto
                    from produtos as p";
                    $comandoConsultaProduto = Conexao::Obtem()->prepare($instrucaoConsultaProdutos);
                    $comandoConsultaProduto->execute();
                    $registros_produtos = $comandoConsultaProduto->fetchAll(PDO::FETCH_ASSOC);
                }
            }

            if(!empty($registros_produtos))
                return $registros_produtos;
            else
                return $registros_produtos;
        } catch (PDOException $exception) {
            array_push($registros_produtos, $exception->getMessage());
            return $registros_produtos;
        } catch (Exception $excecao) {
            array_push($registros_produtos, $excecao->getMessage());
            return $registros_produtos;
        }
    }

    public function ConsultarImagensProduto():array
    {
        $registros_imagems_produto = array();

        try{
            if(!empty($this->getCodigo_Produto()))
            {
                $instrucaoConsultaImagensProduto = "select * from imagens_produtos as ip where ip.codigo_produto_imagem = :recebe_codigo_produto_imagem";
                $comandoConsultaImagensProduto = Conexao::Obtem()->prepare($instrucaoConsultaImagensProduto);
                $comandoConsultaImagensProduto->bindValue(":recebe_codigo_produto_imagem",$this->getCodigo_Produto());
                $comandoConsultaImagensProduto->execute();
                $registros_imagems_produto = $comandoConsultaImagensProduto->fetchAll(PDO::FETCH_ASSOC);

                if(!empty($registros_imagems_produto))
                    return $registros_imagems_produto;
                else
                    return $registros_imagems_produto;
            }
        }catch (PDOException $exception) {
            array_push($registros_produtos, $exception->getMessage());
            return $registros_produtos;
        } catch (Exception $excecao) {
            array_push($registros_produtos, $excecao->getMessage());
            return $registros_produtos;
        }
    }

    public function ConsultarProdutoEspecifico():array
    {
        $registro_produto_especifico = array();

        try{
            if(!empty($this->getCodigo_Produto()))
            {
                $instrucaoConsultaProdutoEspecifico = "select * from produtos as p inner join imagens_produtos as ip on p.codigo_produto = ip.codigo_produto_imagem where p.codigo_produto = :recebe_codigo_produto_imagem";
                $comandoConsultaProdutoEspecifico = Conexao::Obtem()->prepare($instrucaoConsultaProdutoEspecifico);
                $comandoConsultaProdutoEspecifico->bindValue(":recebe_codigo_produto_imagem",$this->getCodigo_Produto());
                $comandoConsultaProdutoEspecifico->execute();
                $registro_produto_especifico = $comandoConsultaProdutoEspecifico->fetchAll(PDO::FETCH_ASSOC);

                if(!empty($registro_produto_especifico))
                    return $registro_produto_especifico;
                else
                    return $registro_produto_especifico;
            }
        }catch (PDOException $exception) {
            array_push($registro_produto_especifico, $exception->getMessage());
            return $registro_produto_especifico;
        } catch (Exception $excecao) {
            array_push($registro_produto_especifico, $excecao->getMessage());
            return $registro_produto_especifico;
        }
    }

    public function ConsultarQTDProdutoEstoque():array
    {
        $registro_produto_qtd_estoque = array();
        try{
            if(!empty($this->getCodigo_Produto()))
            {
                $instrucaoConsultaQTDProdutoEstoque = "select * from produtos as p where p.codigo_produto = :recebe_codigo_produto_qtd_estoque";
                $comandoConsultaQTDProdutoEstoque = Conexao::Obtem()->prepare($instrucaoConsultaQTDProdutoEstoque);
                $comandoConsultaQTDProdutoEstoque->bindValue(":recebe_codigo_produto_qtd_estoque",$this->getCodigo_Produto());
                $comandoConsultaQTDProdutoEstoque->execute();
                $registro_produto_qtd_estoque = $comandoConsultaQTDProdutoEstoque->fetchAll(PDO::FETCH_ASSOC);

                if(!empty($registro_produto_qtd_estoque))
                    return $registro_produto_qtd_estoque;
                else
                    return $registro_produto_qtd_estoque;
            }
        }catch (PDOException $exception) {
            array_push($registro_produto_qtd_estoque, $exception->getMessage());
            return $registro_produto_qtd_estoque;
        } catch (Exception $excecao) {
            array_push($registro_produto_qtd_estoque, $excecao->getMessage());
            return $registro_produto_qtd_estoque;
        }
    }

    public function AlterarProdutoEspecifico():string
    {
        try{
            if(!empty($this->getCategoria_Produto()) && !empty($this->getNome_Produto())
             && !empty($this->getEstoque_Produto()) && !empty($this->getValor_Produto()) && !empty($this->getCodigo_Produto()))
            {
                $instrucaoAlterarProdutoEspecifico = "update produtos set categoria_produto = :recebe_categoria_produto_alterar,nome_produto = :recebe_nome_produto_alterar,
                estoque_produto = :recebe_estoque_produto_alterar,valor_produto = :recebe_valor_produto_alterar where codigo_produto = :recebe_codigo_produto_alterar";
                $comandoAlterarProdutoEspecifico = Conexao::Obtem()->prepare($instrucaoAlterarProdutoEspecifico);
                $comandoAlterarProdutoEspecifico->bindValue(":recebe_categoria_produto_alterar",$this->getCategoria_Produto());
                $comandoAlterarProdutoEspecifico->bindValue(":recebe_nome_produto_alterar",$this->getNome_Produto());
                $comandoAlterarProdutoEspecifico->bindValue(":recebe_estoque_produto_alterar",$this->getEstoque_Produto());
                $comandoAlterarProdutoEspecifico->bindValue(":recebe_valor_produto_alterar",$this->getValor_Produto());
                $comandoAlterarProdutoEspecifico->bindValue(":recebe_codigo_produto_alterar",$this->getCodigo_Produto());

                $resultadoAlterarProdutoEspecifico = $comandoAlterarProdutoEspecifico->execute();

                if($resultadoAlterarProdutoEspecifico)
                    return "Produto alterado com sucesso";
                else
                    return "Produto não foi alterado";
            }
        }catch (PDOException $exception) {
            $recebe_erro =  $exception->getMessage();
            return $recebe_erro;
        } catch (Exception $excecao) {
            $recebe_erro =  $excecao->getMessage();
            return $recebe_erro;
        }
    }

    public function ExcluirProdutoEspecifico():string
    {
        try{
            if(!empty($this->getCodigo_Produto()))
            {
                $instrucaoExcluirProdutoEspecifico = "delete from produtos where codigo_produto = :recebe_codigo_produto_exclusao";
                $comandoExcluirProdutoEspecifico = Conexao::Obtem()->prepare($instrucaoExcluirProdutoEspecifico);
                $comandoExcluirProdutoEspecifico->bindValue(":recebe_codigo_produto_exclusao",$this->getCodigo_Produto());
                $resultadoExcluirProdutoEspecifico = $comandoExcluirProdutoEspecifico->execute();

                if($resultadoExcluirProdutoEspecifico)
                    return "Produto excluido com sucesso";
                else
                    return "Produto não foi excluido com sucesso";
            }
        }catch (PDOException $exception) {
            $recebe_erro =  $exception->getMessage();
            return $recebe_erro;
        } catch (Exception $excecao) {
            $recebe_erro =  $excecao->getMessage();
            return $recebe_erro;
        }
    }

    public function AtualizarQTDEstoqueProduto():int
    {
        $registro_produto = array();

        try{
            $instrucaoBuscarQTDProdutoEstoque = "select estoque_produto from produtos as p where p.codigo_produto = :recebe_codigo_produto";
            $comandoBuscarQTDProdutoEstoque = Conexao::Obtem()->prepare($instrucaoBuscarQTDProdutoEstoque);
            $comandoBuscarQTDProdutoEstoque->bindValue(":recebe_codigo_produto",$this->getCodigo_Produto());
            $comandoBuscarQTDProdutoEstoque->execute();
            $registro_produto = $comandoBuscarQTDProdutoEstoque->fetchAll(PDO::FETCH_ASSOC);

            return $registro_produto;
        }catch (PDOException $exception) {
            array_push($registro_produto, $exception->getMessage());
            return $registro_produto;
        } catch (Exception $excecao) {
            array_push($registro_produto, $excecao->getMessage());
            return $registro_produto;
        }
    }
}
?>