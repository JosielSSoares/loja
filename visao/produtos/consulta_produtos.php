<div class="col-lg-3 mb-4">
    <a href="index.php?pagina=cadastro_produtos" class="btn btn-primary">Cadastrar Produto</a>
</div>
<div class="card">
    <div class="card-body table-responsive">
        <h5 class="card-title">Produtos</h5>
        <div class="row mb-4 col-lg-12">
            <label class="col-sm-1 col-form-label">Filtro</label>
            <div class="col-sm-2">
                <select class="form-select" aria-label="Default select example" id="filtro-produto">
                    <option selected value="selecione">Selecione</option>
                    <option value="categoria_produto">Categoria</option>
                    <option value="nome_produto">Nome</option>
                    <option value="todos_produto">Todos</option>
                </select>
            </div>

            <!-- <label class="col-sm-1 col-form-label"></label> -->
            <div class="col-sm-2" id="selecao-status">
                <select class="form-select" aria-label="Default select example" id="valor-filtro-categoria-produto">

                </select>
            </div>

            <div class="col-sm-4">
                <input type="text" class="form-control" name="valor-filtro-produto" placeholder="Informe o nome do produto" id="valor-filtro-produto">
            </div>
            <div class="col-sm-3">
                <button type="button" class="btn btn-primary" id="buscar-produto">Pesquisar</button>
            </div>
            <div class="col-12">
                <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show mt-3" id="recebe-mensagem-campo-vazio-buscar-produto" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <!-- Default Table -->
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Categoria</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Estoque</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Imagens</th>
                    <th scope="col" colspan="2">Opções</th>
                </tr>
            </thead>
            <tbody id="registros-produtos">
            </tbody>
        </table>
        <!-- End Default Table Example -->

        <div class="card-footer clearfix">
            <ul class="pagination pagination-sm m-0 justify-content-center">
                <li class="page-item"><input type="button" class="btn btn-primary mr-2" style="margin-right: 10px;" id="anterior-produtos" value="Anterior"></li>
                <!-- <li class="page-item"><a class="page-link" href="#" id="sequencia-medicos"></a></li>
            <li class="page-item"><a class="page-link" href="#" id="anterior-medicos"></a></li> -->
                <span id="numeracao-produtos"></span>
                <!-- <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                <li class="page-item"><input type="button" class="btn btn-primary ml-2" style="margin-left: 10px;" id="proximo-produtos" value="Próximo"></li>
            </ul>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-falha-buscar-produto-filtro" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-buscar-produto" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-exclusao-realizado-produto" role="alert">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-exclusao-produto" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
    <span style="color: black;" id="exibi-quantidade-produtos"></span>
</div>