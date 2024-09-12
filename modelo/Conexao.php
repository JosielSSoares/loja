<?php
class Conexao{
    public static $conexao;

    public static function Obtem()
    {
        if(self::$conexao === null)
        {
            try{
                self::$conexao = new PDO("mysql:dbname=idailneto03;host=mysql.idailneto.com.br","idailneto03","Elizamodas2024");
                return self::$conexao;
            }catch(PDOException $exception)
            {
                return $exception->getMessage();
            }catch(Exception $excecao)
            {
                return $excecao->getMessage();
            }
        }else{
            return self::$conexao;
        }
    }
}
?>