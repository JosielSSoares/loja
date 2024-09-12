<div class="modal fade" id="esqueci-minha-senha-usuario" tabindex="-1" data-bs-backdrop="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card mb-3">

                    <div class="card-body">

                        <div class="pt-4 pb-2">
                            <h5 class="card-title text-center pb-0 fs-4">Recuperação de senha</h5>
                            <p class="text-center small">Insira o e-mail para alteração de senha</p>
                        </div>

                        <form class="row g-3" id="formulario-cadastro-usuario" novalidate>
                            <div class="col-12">
                                <label for="yourName" class="form-label">E-mail</label>
                                <input type="text" name="email_usuario_alterar_senha" class="form-control" id="email-usuario-alterar-senha" required placeholder="Informa seu email">
                            </div>

                            <div class="col-12">
                                <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-alteracao-senha-realizado-usuario" role="alert">
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-vazio-alteracao-senha-usuario" role="alert">
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-alteracao-senha-usuario" role="alert">
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </form>
                        <button id="alterar-senha-usuario" class="btn btn-primary w-100" type="button">Alterar Senha</button>

                    </div>

                </div>

            </div>
            <div class="modal-footer">



                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>