<?php
require("../modelo/Catagoria.php");

class CategoriaControladora
{
    private $categoria;

    public function __construct()
    {
        $this->categoria = new Categoria();
    }
    
    public function CadastroCategoria($recebeNomeCategoria)
    {
        $this->categoria->setNome_Categoria($recebeNomeCategoria);

        $resultadoCadastroCategoria = $this->categoria->cadastrarCategoria();

        return $resultadoCadastroCategoria;
    }

    public function ConsultaCategoria()
    {
        $resultadoConsultaCategoria = $this->categoria->consultarCategoria();

        return $resultadoConsultaCategoria;
    }
}
?>