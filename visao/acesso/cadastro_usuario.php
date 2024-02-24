 <!-- Disabled Backdrop Modal -->
 <div class="modal fade" id="cadastro-usuario" tabindex="-1" data-bs-backdrop="false">
   <div class="modal-dialog">
     <div class="modal-content">
       <div class="modal-header">
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body">
         <div class="card mb-3">

           <div class="card-body">

             <div class="pt-4 pb-2">
               <h5 class="card-title text-center pb-0 fs-4">Crie sua Conta</h5>
               <p class="text-center small">Insira os dados para criação da conta</p>
             </div>

             <form class="row g-3" id="formulario-cadastro-usuario" novalidate>
               <div class="col-12">
                 <label for="yourName" class="form-label">Nome Completo</label>
                 <input type="text" name="nome-completo" class="form-control" id="nome-completo" required>
               </div>

               <div class="col-12">
                 <label for="yourEmail" class="form-label">Seu Email</label>
                 <input type="email" name="email-usuario" class="form-control" id="email-usuario" required>
               </div>

               <div class="col-12">
                 <label for="yourUsername" class="form-label">Nome de Usuário</label>
                 <div class="input-group has-validation">
                   <input type="text" name="nome-de-usuario" class="form-control" id="nome-de-usuario" required>
                 </div>
               </div>

               <div class="col-12">
                 <label for="yourPassword" class="form-label">Senha</label>
                 <input type="password" name="senha-usuario" class="form-control" id="senha-usuario" required>
               </div>

               <div class="col-12">
                 <label for="yourPassword" class="form-label">Repetir Senha</label>
                 <input type="password" name="repetir-senha-usuario" class="form-control" id="repetir-senha-usuario" required>
               </div>

               <div class="col-12">
                 <p>Perfil do Usuário é Administrador?</p>
                 <div class="form-check">
                   <input class="form-check-input" type="radio" name="perfil-usuario" id="perfil-admin-sim" value="administrador">
                   <label class="form-check-label" for="perfil-sim">Sim</label>
                 </div>
                 <div class="form-check">
                   <input class="form-check-input" type="radio" name="perfil-usuario" id="perfil-admin-nao" value="funcionario">
                   <label class="form-check-label" for="perfil-nao">Não</label>
                 </div>
               </div>

               <!-- <div class="col-12">
                 <div class="form-check">
                   <input class="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required>
                   <label class="form-check-label" for="acceptTerms">Eu concordo e aceito <a href="#">termos e condições</a></label>
                   <div class="invalid-feedback">Você deve concordar antes de enviar.</div>
                 </div>
               </div> -->

               <div class="col-12">
                 <button id="criacao-conta" class="btn btn-primary w-100" type="button">Criar Conta</button>
               </div>
               <div class="col-12">
                 <p class="small mb-0">Já possui uma conta? <a href="#">Faça Login</a></p>
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

