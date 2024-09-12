<!-- Disabled Backdrop Modal -->
<div class="modal fade" id="inserir-categoria" tabindex="-1" data-bs-backdrop="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card mb-3">

                    <div class="card-body">

                        <div class="pt-4 pb-2">
                            <h5 class="card-title text-center pb-0 fs-4">Cadastro de Categoria</h5>
                        </div>

                        <form class="row g-3" id="formulario-cadastro-categoria" novalidate>
                            <div class="col-12">
                                <label for="yourName" class="form-label">Nome</label>
                                <input type="text" name="nome-categoria" class="form-control" id="nome-categoria" required>
                            </div>

                            <!-- <div class="col-12">
                                <label for="yourEmail" class="form-label">Telefone</label>
                                <input type="text" name="telefone-cliente-edicao" class="form-control" id="telefone-cliente-edicao" required>
                            </div>

                            <div class="col-12">
                                <label for="yourEmail" class="form-label">Email</label>
                                <input type="text" name="email-cliente-edicao" class="form-control" id="email-cliente-edicao" required>
                            </div>

                            <div class="col-12">
                                <label for="yourUsername" class="form-label">Endereço</label>
                                <div class="input-group has-validation">
                                    <input type="text" name="endereco-cliente-edicao" class="form-control" id="endereco-cliente-edicao" required>
                                </div>
                            </div>

                            <div class="col-12">
                                <label class="col-sm-2 col-form-label">Cliente</label>
                                <select class="form-select" aria-label="Default select example" name="status-cliente-edicao" id="status-cliente-edicao">
                                    <option selected>Selecione</option>
                                    <option value="1">Ativo</option>
                                    <option value="2">Inativo</option>
                                </select>
                            </div>

                            <input type="hidden" name="codigo-cliente-edicao" id="codigo-cliente-edicao"> -->

                            <div class="col-12">
                                <button id="cadastro-categoria" class="btn btn-primary w-100" type="button">Cadastrar Categoria</button>
                            </div>
                            <!-- <div class="col-12">
                                <p class="small mb-0">Já possui uma conta? <a href="#">Faça Login</a></p>
                            </div> -->

                            <div class="col-12">
                                <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-cadastro-realizado-categoria" role="alert">
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>

                            <!-- <div class="col-12">
                                <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-alteraracao-sendo-realizada-cliente" role="alert">
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div> -->

                            <div class="col-12">
                                <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-vazio-cadastro-categoria" role="alert">
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-cadastro-categoria" role="alert">
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>
<!-- End Disabled Backdrop Modal-->