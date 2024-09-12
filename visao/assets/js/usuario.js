$(document).ready(function (e) {
  debugger;
  $("#recebe-mensagem-campo-vazio-cadastro-usuario").hide();
  $("#recebe-mensagem-cadastro-realizado-usuario").hide();
  $("#recebe-mensagem-campo-falha-cadastro-usuario").hide();
  $("#recebe-mensagem-campo-vazio-autentica-usuario").hide();
  $("#recebe-mensagem-campo-falha-autentica-usuario").hide();
  $("#recebe-mensagem-autenticacao-realizado-usuario").hide();
  $("#recebe-mensagem-campo-email-duplicado-cadastro-usuario").hide();

  $("#recebe-mensagem-alterar-realizado-usuario").hide();
  $("#recebe-mensagem-campo-vazio-alterar-usuario").hide();
  $("#recebe-mensagem-campo-falha-alterar-usuario").hide();
  $("#recebe-mensagem-alteraracao-sendo-realizada-usuario").hide();

  $("#recebe-mensagem-alteracao-senha-realizado-usuario").hide();
  $("#recebe-mensagem-campo-vazio-alteracao-senha-usuario").hide();
  $("#recebe-mensagem-campo-falha-alteracao-senha-usuario").hide();

  let url_login = window.location.href;

  if (
    url_login === "https://www.idailneto.com.br/loja/visao/acesso/login.php"
  ) {
    document.getElementById("exibi-foto-perfil").src =
      "../acesso/imagem_perfil/usuario_sem_foto.jpg";
  }

  // let imagem_perfil = new Image();

  // let recebe_imagem = document.querySelector("#exibi-foto-perfil");

  // imagem_perfil.src = "../usuario/imagem_perfil/usuario_sem_foto.jpg";

  // recebe_imagem.innerHTML +=
  //   "<img src='" + imagem_perfil.src + "' style='height:85px;'/>";
});

$("#criacao-conta").click(function (e) {
  e.preventDefault();
  debugger;

  let nomeCompletoUsuario = $("#nome-completo").val();
  let emailUsuario = $("#email-usuario").val();
  let nomeDeUsuario = $("#nome-de-usuario").val();
  let senhaUsuario = $("#senha-usuario").val();
  let repetirSenhaUsuario = $("#repetir-senha-usuario").val();
  let recebePerfilUsuario = $('input[name="perfil-usuario"]:checked').val();

  if (
    nomeCompletoUsuario != "" &&
    emailUsuario != "" &&
    nomeDeUsuario != "" &&
    senhaUsuario != "" &&
    repetirSenhaUsuario != "" &&
    recebePerfilUsuario != undefined
  ) {
    let formularioCadastroUsuario = $("#formulario-cadastro-usuario")[0];
    let dadosFormularioCadastro = new FormData(formularioCadastroUsuario);

    dadosFormularioCadastro.append(
      "processo_usuario",
      "recebe_cadastro_usuario"
    );

    $.ajax({
      url: "../../api/UsuarioAPI.php",
      type: "POST",
      dataType: "json",
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      data: dadosFormularioCadastro,
      success: function (retorno) {
        debugger;

        console.log(retorno);
        if (retorno > 0) {
          $("#recebe-mensagem-cadastro-realizado-usuario").html(
            "Usuário cadastrado com sucesso, bem-vindo"
          );
          $("#recebe-mensagem-cadastro-realizado-usuario").show();
          $("#recebe-mensagem-cadastro-realizado-usuario").fadeOut(4000);

          setTimeout(() => {
            var url_inicio = "../../visao/index.php";
            $(window.document.location).attr("href", url_inicio);
          }, 2000);
        } else if(retorno === "email localizado"){
          $("#recebe-mensagem-campo-email-duplicado-cadastro-usuario").html("E-mail já cadastrado");
          $("#recebe-mensagem-campo-email-duplicado-cadastro-usuario").show();
          $("#recebe-mensagem-campo-email-duplicado-cadastro-usuario").fadeOut(4000);
        } else {
          $("#recebe-mensagem-campo-falha-cadastro-usuario").html(
            "Falha ao cadastrar usuário"
          );
          $("#recebe-mensagem-campo-falha-cadastro-usuario").show();
          $("#recebe-mensagem-campo-falha-cadastro-usuario").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-cadastro-usuario").html(
          "Falha ao cadastrar usuário:" + error
        );
        $("#recebe-mensagem-campo-falha-cadastro-usuario").show();
        $("#recebe-mensagem-campo-falha-cadastro-usuario").fadeOut(4000);
      },
    });
  } else if (nomeCompletoUsuario === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor preencher o nome completo"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  } else if (emailUsuario === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor preencher o e-mail"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  } else if (nomeDeUsuario === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor preencher o nome do usuário"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  } else if (senhaUsuario === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor preencher a senha do usuário"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  } else if (repetirSenhaUsuario === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor preencher o repetir senha do usuário"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  } else if (recebePerfilUsuario === undefined) {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor selecionar o perfil do usuário"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  }
});

$("#autenticacao-usuario").click(function (e) {
  e.preventDefault();

  debugger;

  let recebeLoginUsuario = $("#login-usuario-autenticacao").val();
  let recebeSenhaUsuario = $("#senha-usuario-autenticacao").val();

  let recebeFormularioLogin = $("#formulario-autentica-usuario")[0];

  let dadosFormularioLogin = new FormData(recebeFormularioLogin);

  dadosFormularioLogin.append(
    "processo_usuario",
    "recebe_autenticacao_usuario"
  );

  if (recebeLoginUsuario != "" && recebeSenhaUsuario != "") {
    $.ajax({
      // url: "http://localhost/software-medicos/api/UsuarioAPI.php",
      url: "../../api/UsuarioAPI.php",
      type: "POST",
      dataType: "json",
      processData: false,
      contentType: false,
      data: dadosFormularioLogin,
      success: function (retorno) {
        debugger;

        if (retorno != "") {
          if (retorno === "Favor verificar os dados preenchidos") {
            $("#recebe-mensagem-campo-falha-autentica-usuario").html(retorno);
            $("#recebe-mensagem-campo-falha-autentica-usuario").show();
            $("#recebe-mensagem-campo-falha-autentica-usuario").fadeOut(4000);
          } else {
            $("#recebe-mensagem-autenticacao-realizado-usuario").html(
              "Bem-vindo ao sistema"
            );
            $("#recebe-mensagem-autenticacao-realizado-usuario").show();
            $("#recebe-mensagem-autenticacao-realizado-usuario").fadeOut(4000);

            setTimeout(() => {
              var url_inicio = "../../visao/index.php";
              $(window.document.location).attr("href", url_inicio);
            }, 2000);
          }
        } else {
          $("#recebe-mensagem-campo-falha-autentica-usuario").html(
            "Falha ao autenticar:" + retorno
          );
          $("#recebe-mensagem-campo-falha-autentica-usuario").show();
          $("#recebe-mensagem-campo-falha-autentica-usuario").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-autentica-usuario").html(
          "Falha ao autenticar:" + error
        );
        $("#recebe-mensagem-campo-falha-autentica-usuario").show();
        $("#recebe-mensagem-campo-falha-autentica-usuario").fadeOut(4000);
      },
    });
  } else if (recebeLoginUsuario === "") {
    $("#recebe-mensagem-campo-vazio-autentica-usuario").html(
      "Favor preencher o login do usuário"
    );
    $("#recebe-mensagem-campo-vazio-autentica-usuario").show();
    $("#recebe-mensagem-campo-vazio-autentica-usuario").fadeOut(4000);
  } else if (recebeSenhaUsuario === "") {
    $("#recebe-mensagem-campo-vazio-autentica-usuario").html(
      "Favor preencher a senha do usuário"
    );
    $("#recebe-mensagem-campo-vazio-autentica-usuario").show();
    $("#recebe-mensagem-campo-vazio-autentica-usuario").fadeOut(4000);
  }
});

$("#cadastro-usuario").on("hidden.bs.modal", function (e) {
  debugger;

  /*document.getElementById("exibi-foto-perfil").src =
    "../usuario/imagem_perfil/usuario_sem_foto.jpg";*/

  document.getElementById("exibi-foto-perfil").src =
    "../acesso/imagem_perfil/usuario_sem_foto.jpg";

  $("#foto-perfil").val(null);
});

$("#foto-perfil").change(function (e) {
  e.preventDefault();

  debugger;

  var arquivo = $("#foto-perfil")[0].files;

  if (
    arquivo[0].type === "image/png" ||
    arquivo[0].type === "image/jpeg" ||
    arquivo[0].type === "image/jpg"
  ) {
    var recebe = new FileReader();

    recebe.onload = function (e) {
      document.getElementById("exibi-foto-perfil").src = e.target.result;
    };
    recebe.readAsDataURL(arquivo[0]);
  }
});

$("#sair").click(function (e) {
  e.preventDefault();
  debugger;
  $.ajax({
    //url: "http://localhost/software-medicos/api/UsuarioAPI.php",
    url: "../api/UsuarioAPI.php",
    dataType: "json",
    type: "post",
    //e informado o campo processo_usuario que encaminha o processo a ser realizado
    //sera recebido no arquivo usuarioapi.php para realizar o procedimento de deslogar
    data: { processo_usuario: "deslogar" },
    success: function (retorno) {
      debugger;
      //console.log(retorno);
      //o retorno contem o valor da sessao criada em logoffcontroladora.php e com isso estara = deslogado com sucesso,
      //aqui e verificado se retorno e igual a deslogado com sucesso e caso seja e criado a variavel
      //url_login e realizado redirecionamento paga a pagina de login
      if (retorno == "Deslogado com sucesso") {
        var url_login = "../";
        $(window.document.location).attr("href", url_login);
      }
    },
    error: function (xhr, status, error) {
      $("#recebe-mensagem-campo-falha-autentica-usuario").html(
        "Falha ao autenticar:" + error
      );
      $("#recebe-mensagem-campo-falha-autentica-usuario").show();
      $("#recebe-mensagem-campo-falha-autentica-usuario").fadeOut(4000);
    },
  });
});

$("#carregar-dados-usuario").click(function (e) {
  e.preventDefault();
  debugger;

  let recebeRequisicaoDadosUsuario = "";

  let recebeDados = "";

  recebeRequisicaoDadosUsuario = $.ajax({
    // url: "http://localhost/software-medicos/api/ProtocolosAPI.php",
    url: "../api/UsuarioAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_usuario: "recebe_buscar_usuario_logado",
      valor_codigo_usuario: $("#codigo-usuario-logado").val(),
    },
    success: function (retorno) {
      debugger;
      if (retorno != "") {
        recebeDados = retorno;
      }
    },
    error: function (xhr, error, status) {},
  });

  $.when(recebeRequisicaoDadosUsuario).done(function () {
    debugger;
    console.log(recebeDados);

    $("#nome-completo").val(recebeDados.nome_usuario);
    $("#email-usuario").val(recebeDados.email_usuario);
    $("#nome-de-usuario").val(recebeDados.login_usuario);

    if (recebeDados[0]) {
      $("#senha-usuario").val(recebeDados[0]);
      $("#repetir-senha-usuario").val(recebeDados[0]);
    }

    if (recebeDados.perfil_usuario === "administrador")
      $("#perfil-admin-sim").prop("checked", "true");
    else $("#perfil-admin-nao").prop("checked", "true");

    const campo_imagem_usuario = document.querySelector('input[type="file"]');
    const arquivo = new File(
      [recebeDados.imagem_usuario],
      recebeDados.imagem_usuario,
      {
        type: "image/jpg",
      }
    );

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(arquivo);
    campo_imagem_usuario.files = dataTransfer.files;

    document.getElementById("exibi-foto-perfil").src =
      "acesso/imagem_perfil/" + recebeDados.imagem_usuario;

    $("#codigo-usuario-logado-alterar").val(recebeDados.codigo_usuario);
  });
});

$("#alterar-conta-usuario").click(function (e) {
  e.preventDefault();

  debugger;

  let recebeNomeUsuarioAlterar = $("#nome-completo").val();

  let recebeEmailUsuarioAlterar = $("#email-usuario").val();

  let recebeNomedeUsuarioAlterar = $("#email-usuario").val();

  let recebeSenhaUsuarioAlterar = $("#senha-usuario").val();

  let recebeRepetirSenhaUsuarioAlterar = $("#repetir-senha-usuario").val();

  let recebePerfilUsuarioAlterar = $(
    'input[name="perfil-usuario"]:checked'
  ).val();

  let formulario_alterar_usuario = $("#formulario-edicao-usuario")[0];

  let dados_formulario_alterar_usuario = new FormData(
    formulario_alterar_usuario
  );

  dados_formulario_alterar_usuario.append(
    "processo_usuario",
    "recebe_alteracao_usuario"
  );

  dados_formulario_alterar_usuario.append("metodo", "PUT");
  if (
    recebeNomeUsuarioAlterar != "" &&
    recebeEmailUsuarioAlterar != "" &&
    recebeNomedeUsuarioAlterar != "" &&
    recebeSenhaUsuarioAlterar != "" &&
    recebeRepetirSenhaUsuarioAlterar != "" &&
    recebePerfilUsuarioAlterar != ""
  ) {
    $.ajax({
      // url: "http://localhost/software-medicos/api/UsuarioAPI.php",
      url: "../api/UsuarioAPI.php",
      type: "POST",
      dataType: "json",
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      data: dados_formulario_alterar_usuario,
      beforeSend: function () {
        debugger;
        // $("#recebe-mensagem-alteraracao-sendo-realizada-usuario").html(
        //   "Aguarde a alteração do usuário"
        // );
        // $("#recebe-mensagem-alteraracao-sendo-realizada-usuario").show();
        // $("#recebe-mensagem-alteraracao-sendo-realizada-usuario").fadeOut(2000);
      },
      success: function (retorno) {
        debugger;

        if (retorno != "") {
          if (
            retorno ===
            "Usuário alterado com sucesso , no próximo acesso utilize a nova senha"
          ) {
            $("#recebe-mensagem-alterar-realizado-usuario").html(retorno);
            $("#recebe-mensagem-alterar-realizado-usuario").show();
            $("#recebe-mensagem-alterar-realizado-usuario").fadeOut(4000);

            setTimeout(() => {
              var url_inicio = "../";
              $(window.document.location).attr("href", url_inicio);
            }, 2000);
          }
        } else {
          $("#recebe-mensagem-campo-falha-alterar-usuario").html(
            "Falha ao alterar o usuário:" + retorno
          );
          $("#recebe-mensagem-campo-falha-alterar-usuario").show();
          $("#recebe-mensagem-campo-falha-alterar-usuario").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-alterar-usuario").html(
          "Falha ao alterar o usuário:" + error
        );
        $("#recebe-mensagem-campo-falha-alterar-usuario").show();
        $("#recebe-mensagem-campo-falha-alterar-usuario").fadeOut(4000);
      },
    });
  } else if (recebeNomeUsuarioAlterar === "") {
    $("#recebe-mensagem-campo-vazio-alterar-usuario").html(
      "Favor preencher o nome completo"
    );
    $("#recebe-mensagem-campo-vazio-alterar-usuario").show();
    $("#recebe-mensagem-campo-vazio-alterar-usuario").fadeOut(4000);
  } else if (recebeEmailUsuarioAlterar === "") {
    $("#recebe-mensagem-campo-vazio-alterar-usuario").html(
      "Favor preencher o nome completo"
    );
    $("#recebe-mensagem-campo-vazio-alterar-usuario").show();
    $("#recebe-mensagem-campo-vazio-alterar-usuario").fadeOut(4000);
  } else if (recebeNomedeUsuarioAlterar === "") {
    $("#recebe-mensagem-campo-vazio-alterar-usuario").html(
      "Favor preencher o nome completo"
    );
    $("#recebe-mensagem-campo-vazio-alterar-usuario").show();
    $("#recebe-mensagem-campo-vazio-alterar-usuario").fadeOut(4000);
  } else if (recebeSenhaUsuarioAlterar === "") {
    $("#recebe-mensagem-campo-vazio-alterar-usuario").html(
      "Favor preencher o nome completo"
    );
    $("#recebe-mensagem-campo-vazio-alterar-usuario").show();
    $("#recebe-mensagem-campo-vazio-alterar-usuario").fadeOut(4000);
  } else if (recebeRepetirSenhaUsuarioAlterar === "") {
    $("#recebe-mensagem-campo-vazio-alterar-usuario").html(
      "Favor preencher o nome completo"
    );
    $("#recebe-mensagem-campo-vazio-alterar-usuario").show();
    $("#recebe-mensagem-campo-vazio-alterar-usuario").fadeOut(4000);
  } else if (recebePerfilUsuarioAlterar === "") {
    $("#recebe-mensagem-campo-vazio-alterar-usuario").html(
      "Favor preencher o nome completo"
    );
    $("#recebe-mensagem-campo-vazio-alterar-usuario").show();
    $("#recebe-mensagem-campo-vazio-alterar-usuario").fadeOut(4000);
  }
});

$("#alterar-senha-usuario").click(function (e) {
  e.preventDefault();

  debugger;

  let recebeEmailUsuario = $("#email-usuario-alterar-senha").val();

  if (recebeEmailUsuario === "") {
    $("#recebe-mensagem-campo-vazio-alteracao-senha-usuario").html(
      "Favor preencher o e-mail do usuário para alteração de senha"
    );
    $("#recebe-mensagem-campo-vazio-alteracao-senha-usuario").show();
    $("#recebe-mensagem-campo-vazio-alteracao-senha-usuario").fadeOut(4000);
  } else {
    $.ajax({
      url: "../../api/UsuarioAPI.php",
      dataType: "json",
      type: "post",
      data: {
        processo_usuario: "recebe_alterar_senha_usuario",
        metodo: "put",
        recebe_email_usuario_alterar_senha: recebeEmailUsuario,
      },
      success: function (retorno_alterar_senha) {
        debugger;

        if (
          retorno_alterar_senha ===
          "Senha alterada com sucesso , e-mail com a nova senha enviado com sucesso, favor verificar seu e-mail"
        ) {
          $("#recebe-mensagem-alteracao-senha-realizado-usuario").html(
            retorno_alterar_senha
          );
          $("#recebe-mensagem-alteracao-senha-realizado-usuario").show();
          $("#recebe-mensagem-alteracao-senha-realizado-usuario").fadeOut(4000);
        } else {
          $("#recebe-mensagem-campo-falha-cadastro-usuario").html(
            "Falha ao alterar senha do usuário:" + retorno_alterar_senha
          );
          $("#recebe-mensagem-campo-falha-cadastro-usuario").show();
          $("#recebe-mensagem-campo-falha-cadastro-usuario").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-cadastro-usuario").html(
          "Falha ao alterar senha do usuário:" + error
        );
        $("#recebe-mensagem-campo-falha-cadastro-usuario").show();
        $("#recebe-mensagem-campo-falha-cadastro-usuario").fadeOut(4000);
      },
    });
  }
});
