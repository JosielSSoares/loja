<?php
//verificar utilização dos codigos abaixo dentro da pasta visao no template

// if(!empty($_GET))
// {
//     echo $_GET;
// }

//ira verificar se o parametro na url pagiga existe e caso exista ele nao ira cair no if($url[0] == "inicio") pois o valor do parametro pagina ja sera um dos valores do menu, caso nao existir valor nesse parametro
//ira cair no else do if ternario e ira importar o arquivo inicio.php , lembrando que o parametro pagina e definido dentro do arquivo .htaccess que rescreve as url e faz url amigavel por isso verificamos
//o GET['pagina'] ele e o parametro que ira receber a pagina solicitada
$url = (isset($_GET['pagina'])) ? $_GET['pagina'] : 'inicio';
//o array_filter ira fazer a iteração em cada item recebido na variavel $url e apos ira quebrar em um array de string e sera atribuido o valor na variavel $url
$url = array_filter(explode('/', $url));
//e verificado se e diferente de vazio o valor do primeiro indice do array $url e como sera vai entrar na condição
if (!empty($url[0])) {
    //e verificado se o valor do primeiro indice e inicio , como no primeiro acesso o parametro pagina esta vazio ira ser sim igual a inicio e sera importado o arquivo inicio.php
    if ($url[0] === "inicio" || $url[0] === "cadastro_clientes" || $url[0] === "consulta_clientes"
    || $url[0] === "cadastro_produtos" || $url[0] === "consulta_produtos" || $url[0] === "cadastro_venda" || $url[0] === "consulta_venda" || $url[0] === "relatorio_venda") {
        //e criada uma variavel $url_final que recebe o valor do array no seu primeiro indice concatenado com .php
        $url_final = "inicio.php";
        //e feito a importacao do arquivo inicio.php
        require($url_final);
        //e verificado se o valor do primeiro indice e cadastros_insumos, como foi clicado na opção no menu para cadastro de insumos ira ser igual sim e entrada na condicao e sera importado o arquivo inicio.php
    }
} else {
    //var_dump($url);
}
?>