<div class="col-lg-12">

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Cadastro de Cliente</h5>

            <!-- General Form Elements -->
            <form id="formulario-cadastro-cliente">
                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputText" class="col-sm-2 col-form-label">Nome Completo</label>
                        <input type="text" class="form-control" name="nome-cliente" placeholder="Informe o nome do cliente" id="nome-cliente">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Telefone</label>
                        <input type="text" class="form-control" name="telefone-cliente" placeholder="Somente números" id="telefone-cliente">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                        <input type="text" class="form-control" name="email-cliente" placeholder="Informe o email do cliente" id="email-cliente">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Endereço</label>
                        <input type="text" class="form-control" name="endereco-cliente" placeholder="Exemplo: Rua, Avenida, BR KM" id="endereco-cliente">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label class="col-sm-2 col-form-label">Situação</label>
                        <select class="form-select" aria-label="Default select example" name="status-cliente" id="status-cliente">
                            <option selected value="selecione">Selecione</option>
                            <option value="1">Ativo</option>
                            <option value="2">Inativo</option>
                        </select>
                    </div>
                </div>



                <div class="row mb-3">
                    <!-- <label class="col-sm-2 col-form-label">Submit Button</label> -->
                    <div class="col-sm-10">
                        <button type="button" class="btn btn-primary" id="cadastro-cliente">Cadastrar</button>
                        <button type="button" class="btn btn-secondary" id="limpar-campos-cadastro-cliente">Limpar</button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-cadastro-alterar-realizado-cliente" role="alert">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-cadastro-alterar-sendo-realizada-cliente" role="alert">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-vazio-cadastro-alterar-cliente" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-cadastro-alterar-cliente" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                 <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-email-duplicado-cadastro-cliente" role="alert">
                   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>
               </div>

            </form><!-- End General Form Elements -->

        </div>
    </div>

</div>