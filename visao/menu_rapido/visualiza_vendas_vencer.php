<!-- Disabled Backdrop Modal -->
<div class="modal fade" id="visualiza-vendas-cliente-vencer" tabindex="-1" data-bs-backdrop="false">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card mb-3">

                    <div class="card-body table-responsive">

                        <div class="pt-4 pb-2">
                            <h5 class="card-title text-center pb-0 fs-4">Vendas a Vencer<br><span id="exibi-nome-cliente-vendas-vencer" style="font-size: 19px;color:black;"></span></h5>
                        </div>

                        <table class="table" id="">
                            <thead>
                                <tr>
                                    <th class="col-4">Nome</th>
                                    <th scope="col" class="col-1 text-center">Produto</th>
                                    <th scope="col" class="col-1 text-center">Quantidade</th>
                                    <th scope="col" class="col-3 text-center">Desconto Final</th>
                                    <th scope="col" class="col-1 text-center">Valor Total</th>
                                    <th scope="col" class="col-1 text-center">Pago</th>
                                    <th scope="col" class="col-2 text-center">Data Pagamento</th>
                                    <th scope="col" colspan="3">Opções</th>
                                </tr>
                            </thead>
                            <tbody id="registros-vendas-cliente-a-vencer">
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-pagamento-atualizado-vendas-vencer" role="alert">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-falha-pagamento-atualizado-vendas-vencer" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-email-cobranca-vendas-vencer-encaminhado" role="alert">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-falha-email-cobranca-vendas-vencer-encaminhar" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-falha-localizar-email-cobranca-vendas-vencer-encaminhar" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>