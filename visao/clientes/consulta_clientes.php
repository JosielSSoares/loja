<div class="col-lg-3 mb-4">
    <a href="index.php?pagina=cadastro_clientes" class="btn btn-primary">Cadastrar Cliente</a>
</div>
<div class="card">
    <div class="card-body table-responsive">
        <h5 class="card-title">Clientes</h5>
        <div class="row mb-4 col-lg-12">
            <label class="col-sm-1 col-form-label">Filtro</label>
            <div class="col-sm-2">
                <select class="form-select" aria-label="Default select example" id="filtro-cliente">
                    <option selected value="selecione">Selecione</option>
                    <option value="nome_cliente">Nome</option>
                    <option value="status_cliente">Status</option>
                    <option value="todos">Todos</option>
                </select>
            </div>

            <!-- <label class="col-sm-1 col-form-label"></label> -->
            <div class="col-sm-2" id="selecao-status">
                <select class="form-select" aria-label="Default select example" id="valor-filtro-status-cliente">
                    <option selected>Selecione</option>
                    <option value="1">Ativo</option>
                    <option value="2">Inativo</option>
                </select>
            </div>

            <div class="col-sm-4">
                <input type="text" class="form-control" name="valor-filtro-cliente" placeholder="Informe o nome do cliente" id="valor-filtro-cliente">
            </div>
            <div class="col-sm-3">
                <button type="button" class="btn btn-primary" id="buscar-cliente">Pesquisar</button>
            </div>
            <div class="col-12">
                <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show mt-3" id="recebe-mensagem-campo-vazio-buscar-cliente" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <!-- Default Table -->
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Situação</th>
                    <th scope="col" colspan="2">Opções</th>
                </tr>
            </thead>
            <tbody id="registros-clientes">
            </tbody>
        </table>
        <!-- End Default Table Example -->

        <div class="card-footer clearfix">
            <ul class="pagination pagination-sm m-0 justify-content-center">
                <li class="page-item"><input type="button" class="btn btn-primary mr-2" style="margin-right: 10px;" id="anterior-clientes" value="Anterior"></li>
                <!-- <li class="page-item"><a class="page-link" href="#" id="sequencia-medicos"></a></li>
            <li class="page-item"><a class="page-link" href="#" id="anterior-medicos"></a></li> -->
                <span id="numeracao"></span>
                <!-- <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                <li class="page-item"><input type="button" class="btn btn-primary ml-2" style="margin-left: 10px;" id="proximo-clientes" value="Próximo"></li>
            </ul>
        </div>
    </div>



    <div class="col-12">
        <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-falha-buscar-clientes-filtro" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-buscar-cliente" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-exclusao-realizado-cliente" role="alert">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-exclusao-cliente" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
    <span style="color: black;" id="exibi-quantidade-clientes"></span>
</div>