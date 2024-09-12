<?php
require("Conexao.php");
require("CategoriaInterface.php");

class Categoria implements CategoriaInterface{
    private $codigo_categoria;
    private $nome_categoria;

    public function setCodigo_Categoria($codigo_categoria)
    {
        $this->codigo_categoria = $codigo_categoria;
    }

    public function getCodigo_Categoria()
    {
        return $this->codigo_categoria;
    }

    public function setNome_Categoria($nome_categoria)
    {
        $this->nome_categoria = $nome_categoria;
    }

    public function getNome_Categoria()
    {
        return $this->nome_categoria;
    }

    public function cadastrarCategoria():int
    {
        try{
            $instrucaoCadastroCategoria = "insert into categorias(nome_categoria)values(:recebe_nome_categoria)";
            $comandoCadastroCategoria = Conexao::Obtem()->prepare($instrucaoCadastroCategoria);
            $comandoCadastroCategoria->bindValue(":recebe_nome_categoria",$this->getNome_Categoria());
            $resultadoCadastroCategoria = $comandoCadastroCategoria->execute();

            $ultimoCodigoGeradoCategoria = Conexao::Obtem()->lastInsertId();

            if(!empty($ultimoCodigoGeradoCategoria))
                return $ultimoCodigoGeradoCategoria;
            else
                return 0;

        }catch (PDOException $exception) {
            return $exception->getMessage();
        } catch (Exception $excecao) {
            return $excecao->getMessage();
        }
    }

    public function consultarCategoria():array
    {
        $registros_categoria = array();
        try{
            $instrucaoConsultaCategoria = "select * from categorias";
            $comandoConsultaCategoria = Conexao::Obtem()->prepare($instrucaoConsultaCategoria);
            $comandoConsultaCategoria->execute();
            $registros_categoria = $comandoConsultaCategoria->fetchAll(PDO::FETCH_ASSOC);

            return $registros_categoria;
        }catch (PDOException $exception) {
            return $exception->getMessage();
        } catch (Exception $excecao) {
            return $excecao->getMessage();
        }
    }
}
?>