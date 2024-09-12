<?php
require("Conexao.php");
require("ImagemInterface.php");

class Imagem implements ImagemInterface{
    private $codigo_imagem;
    private $imagem;
    private $codigo_produto_imagem;

    public function setCodigo_Imagem($codigo_imagem)
    {
        $this->codigo_imagem = $codigo_imagem;
    }

    public function getCodigo_Imagem()
    {
        return $this->codigo_imagem;
    }

    public function setImagem($imagem)
    {
        $this->imagem = $imagem;
    }

    public function getImagem()
    {
        return $this->imagem;
    }

    public function setCodigo_Produto_Imagem($codigo_produto_imagem)
    {
        $this->codigo_produto_imagem = $codigo_produto_imagem;
    }

    public function getCodigo_Produto_Imagem()
    {
        return $this->codigo_produto_imagem;
    }

    public function CadastrarImagens(): string
    {
        try{
            if(!empty($this->getImagem()) && !empty($this->getCodigo_Produto_Imagem()))
            {
                for ($indice=0; $indice < count($this->getImagem()); $indice++)
                { 
                    $instrucaoCadastroImagem = "insert into imagens_produtos(imagem,codigo_produto_imagem)values(:recebe_imagem,
                    :recebe_codigo_produto_imagem)";
                    $comandoCadastroImagem = Conexao::Obtem()->prepare($instrucaoCadastroImagem);
                    $comandoCadastroImagem->bindValue(":recebe_imagem",$this->getImagem()[$indice]);
                    $comandoCadastroImagem->bindValue(":recebe_codigo_produto_imagem",$this->getCodigo_Produto_Imagem()[$indice]);

                    $resultadoCadastroImagem = $comandoCadastroImagem->execute();

                    $ultimoCodigoCadastradoImagem = Conexao::Obtem()->lastInsertId();
                }

                if($ultimoCodigoCadastradoImagem > 0)
                    return "imagens cadastradas";
                else
                    return "imagens nao cadastradas";
            }
        }catch(PDOException $exception)
        {
            return $exception->getMessage();
        //caso ocorre algum erro na execução do try de exceção será retornado a mensagem de erro
        }catch(Exception $excecao)
        {
            return $excecao->getMessage();
        }
    }

    public function ExcluirImagemEspecifica():string
    {
        try{
            if(!empty($this->getCodigo_Produto_Imagem()))
            {
                $instrucaoExcluirImagensEspecifica = "delete from imagens_produtos where codigo_produto_imagem = :recebe_codigo_produto_imagem_exclusao";
                $comandoExcluirImagensEspecificas = Conexao::Obtem()->prepare($instrucaoExcluirImagensEspecifica);
                $comandoExcluirImagensEspecificas->bindValue(":recebe_codigo_produto_imagem_exclusao",$this->getCodigo_Produto_Imagem());
                $resultadoExclurImagensEspecificas = $comandoExcluirImagensEspecificas->execute();

                if($resultadoExclurImagensEspecificas)
                    return "imagens excluidas com sucesso";
                else
                    return "imagens não foram excluidas com sucesso";
            }
        }catch (PDOException $exception) {
            $recebe_erro =  $exception->getMessage();
            return $recebe_erro;
        } catch (Exception $excecao) {
            $recebe_erro =  $excecao->getMessage();
            return $recebe_erro;
        }
    }
}
?>