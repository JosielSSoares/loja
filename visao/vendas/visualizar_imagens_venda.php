<style>
    .imagem {
        /* background-image: url("../usuario/imagem_perfil/usuario_sem_foto.jpg");
     background-repeat: no-repeat;
     
     background-size: 70px;
     
     background-position: center; */
    }
</style>
<!-- Disabled Backdrop Modal -->
<div class="modal fade" id="visualiza-vendas-cliente" tabindex="-1" data-bs-backdrop="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card mb-3">

                    <div class="card-body table-responsive">

                        <div class="pt-4 pb-2">
                            <h5 class="card-title text-center pb-0 fs-4">Visualização Vendas</h5>
                        </div>

                        <!-- <form class="row g-3" id="" novalidate>

                            <div class="col-lg-12" style="display: block;">

                                <div id="exibi-vendas-cliente"></div>

                            </div>
                        </form> -->

                        <table class="table" id="">
                            <thead>
                                <tr>
                                    <th scope="col" class="col-3 text-center">Produto</th>
                                    <th scope="col" class="col-1 text-center">Quantidade</th>
                                    <th scope="col" class="col-3 text-center">Desconto Final</th>
                                    <th scope="col" class="col-2 text-center">Valor Total</th>
                                    <th scope="col" class="col-1 text-center">Pago</th>
                                    <th scope="col" class="col-2 text-center">Data Pagamento</th>
                                    <th scope="col" colspan="3">Opções</th>
                                </tr>
                            </thead>
                            <tbody id="registros-vendas-cliente">
                            </tbody>
                        </table>
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