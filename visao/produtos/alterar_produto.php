<style>
    .imagem {
        /* background-image: url("../usuario/imagem_perfil/usuario_sem_foto.jpg");
     background-repeat: no-repeat;
     
     background-size: 70px;
     
     background-position: center; */
    }

    #imagens-produtos-alterar {
        opacity: 0;
        margin: -10px;
    }

    .exibi_imagems_lado_lado{
        display: block;
    }

    .exibi_imagens_selecionadas_alterar{
        display: block ruby;
    }
</style>
<!-- Disabled Backdrop Modal -->
<div class="modal fade" id="alteraracao-produto" tabindex="-1" data-bs-backdrop="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card mb-3">

                    <div class="card-body">

                        <div class="pt-4 pb-2">
                            <h5 class="card-title text-center pb-0 fs-4">Alterar Produto</h5>
                        </div>

                        <form id="formulario-alterar-produto">

                            <div class="row mb-3">
                                <div class="col-sm-10 col-lg-12">
                                    <label class="col-sm-2 col-lg-12 col-form-label">Categoria</label>
                                    <select class="form-select" aria-label="Default select example" name="categoria-produto-alterar" id="categoria-produto-alterar">
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
                                <!-- <div class="col-lg-3" style="margin-top: 35px;">
                                    <a href="#"><i class="bi bi-bookmark-plus-fill fs-3" title="Adicionar Categoria" data-bs-toggle='modal' data-bs-target='#inserir-categoria' data-backdrop='static'></i></a>
                                </div> -->
                            </div>

                            <div class="row mb-3">
                                <div class="col-sm-10 col-lg-7">
                                    <label for="inputText" class="col-sm-2 col-lg-12 mb-3 col-form-label">Imagens</label>
                                    <i class="bi bi-paperclip"><input type="file" name="imagens-produtos-alterar[]" id="imagens-produtos-alterar" title="Selecione as imagens" multiple/></i>
                                </div>
                            </div>

                            <div class="col-lg-12" id="imagens-produtos-visualiza-alterar">

                                <div id="exibi-imagens-produtos-alterar"></div>

                            </div>


                            <div class="row mb-3">
                                <div class="col-sm-10 col-lg-12">
                                    <label for="inputText" class="col-sm-2 col-lg-12 col-form-label">Nome</label>
                                    <input type="text" class="form-control" name="nome-produto-alterar" placeholder="Informe o nome do produto" id="nome-produto-alterar">
                                </div>
                            </div>


                            <div class="row mb-3">
                                <div class="col-sm-10 col-lg-12">
                                    <label for="inputEmail" class="col-sm-2 col-lg-12 col-form-label">Estoque</label>
                                    <input type="text" class="form-control" name="estoque-produto-alterar" placeholder="Informe o telefone do cliente" id="estoque-produto-alterar">
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
                                <div class="col-sm-10 col-lg-12">
                                    <label for="inputPassword" class="col-sm-2 col-lg-12 col-form-label">Valor</label>
                                    <input type="text" class="form-control" name="valor-produto-alterar" placeholder="Informe o valor do produto" id="valor-produto-alterar">
                                </div>
                            </div>

                            <input type="hidden" name="codigo-produto-alterar" id="codigo-produto-alterar">



                            <div class="row mb-3">
                                <!-- <label class="col-sm-2 col-form-label">Submit Button</label> -->
                                <div class="col-sm-10">
                                    <button type="button" class="btn btn-primary" id="alterar-produto">Alterar</button>
                                    <button type="button" class="btn btn-secondary" id="limpar-campos-alterar-produto">Limpar</button>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-alterar-realizado-produto" role="alert">
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-alterar-sendo-realizada-produto" role="alert">
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-vazio-alterar-produto" role="alert">
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-alterar-produto" role="alert">
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>

                        </form><!-- End General Form Elements -->
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