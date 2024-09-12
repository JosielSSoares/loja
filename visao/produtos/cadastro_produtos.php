<style>
    #imagens-produtos {
        opacity: 0;
        margin: -10px;
    }
</style>
<div class="col-lg-12">

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Cadastro de Produto</h5>

            <!-- General Form Elements -->
            <form id="formulario-cadastro-produto">

                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label class="col-sm-2 col-form-label">Categoria</label>
                        <select class="form-select" aria-label="Default select example" name="categoria-produto" id="categoria-produto">
                            <!-- <option selected value="selecione">Selecione</option> -->
                            <!-- <option value="short">Short</option>
                            <option value="camisa">Camisa</option>
                            <option value="camiseta">Camiseta</option>
                            <option value="blusa">Blusa</option>
                            <option value="vestido">Vestido</option>
                            <option value="calca">Calça</option>
                            <option value="calca">Casaco</option>
                            <option value="bolsa">Bolsa</option>
                            <option value="joia">Joia</option>
                            <option value="colar">Colar</option>
                            <option value="anel">Anel</option> -->
                        </select>
                    </div>
                    <div class="col-lg-3" style="margin-top: 35px;">
                        <a href="#"><i class="bi bi-bookmark-plus-fill fs-3" title="Adicionar Categoria"
                         data-bs-toggle='modal' data-bs-target='#inserir-categoria' data-backdrop='static'></i></a>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputText" class="col-sm-2 col-lg-12 mb-3 col-form-label">Imagens</label>
                        <i class="bi bi-paperclip"><input type="file" name="imagens-produtos[]" id="imagens-produtos" title="Selecione as imagens" multiple></i>
                    </div>
                </div>

                <div class="col-lg-12" style="display: block ruby;">

                    <div id="exibi-imagens-produtos"></div>

                </div>


                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputText" class="col-sm-2 col-form-label">Nome</label>
                        <input type="text" class="form-control" name="nome-produto" placeholder="Informe o nome do produto" id="nome-produto">
                    </div>
                </div>


                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Estoque</label>
                        <input type="text" class="form-control" name="estoque-produto" placeholder="Informe o telefone do cliente" id="estoque-produto">
                    </div>
                </div>

                <!-- <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label class="col-sm-2 col-form-label">Disponibilidade</label>
                        <select class="form-select" aria-label="Default select example" name="status-produto" id="status-produto">
                            <option selected value="selecione">Selecione</option>
                            <option value="1">Sim</option>
                            <option value="2">Não</option>
                        </select>
                    </div>
                </div> -->


                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Valor</label>
                        <input type="text" class="form-control" name="valor-produto" placeholder="Informe o valor do produto" id="valor-produto">
                    </div>
                </div>





                <div class="row mb-3">
                    <!-- <label class="col-sm-2 col-form-label">Submit Button</label> -->
                    <div class="col-sm-10">
                        <button type="button" class="btn btn-primary" id="cadastro-produto">Cadastrar</button>
                        <button type="button" class="btn btn-secondary" id="limpar-campos-cadastro-produto">Limpar</button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-cadastro-alterar-realizado-produto" role="alert">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-cadastro-alterar-sendo-realizada-produto" role="alert">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-vazio-cadastro-alterar-produto" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-cadastro-alterar-produto" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

            </form><!-- End General Form Elements -->

        </div>
    </div>

</div>