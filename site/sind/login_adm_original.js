var ie = false || !!document.documentMode;
if (ie) {
  alert("AVISO!, ATUALIZAMOS O SISTEMA! abre o 'GOOGLE CHROME' ou 'MOZILLA FIREFOX' e acesse 'www.makecard.com.br' para abrir o sistema do convenio, no INTERNET EXPLORER não funciona mais.");
};
var usuario;
var senha;
$(document).ready(function () {
  $("#btn-login").click(function (e) {
    waitingDialog.show("Carregando, aguarde ...");
    e.preventDefault();
    var tipo_loginx;
    usuario = $("#login-username").val();
    senha = $("#login-password").val();
    var divisao = $("#divisao").val();
    var divisao_nome = $("#divisao_nome").val();
    if (usuario === "" && senha === "") {
      Swal.fire({icon: "error", title: "Atenção!", text: "Informe o usuário e a senha !"});
      waitingDialog.hide();
    } else {
      if (usuario === "" && senha !== "") {
        Swal.fire({icon: "error", title: "Atenção!", text: "Informe o usuário !"});
        waitingDialog.hide();
      } else {
        if (usuario !== "" && senha === "") {
          Swal.fire({title: "Atenção!", text: "Informe a senha !", icon: "error"});
          waitingDialog.hide();
        } else {
          $.ajax({url: "login_adm_localiza.php", type: "POST", async: true, cache: false, data: $("#loginform").serialize(), dataType: "json", beforeSend: function () {
            $("#divLoading").css("display", "block");
          }, done: function () {
            $("#divLoading").css("display", "none");
          }, success: function (data) {
            tipo_loginx = data.tipo_login;
            if (tipo_loginx === "login sucesso") {
              sessionStorage.setItem("divisao", data.divisao);
              sessionStorage.setItem("divisao_nome", data.divisao_nome);
              sessionStorage.setItem("usuario_global", data.Username);
              sessionStorage.setItem("passuser", data.senha);
              sessionStorage.setItem("usuario_cod", data.codigo);
              sessionStorage.setItem("descricao", data.descricao);
              sessionStorage.setItem("card1", data.card1);
              sessionStorage.setItem("nomecard1", data.nomecard1);
              sessionStorage.setItem("card2", data.card2);
              sessionStorage.setItem("nomecard2", data.nomecard2);
              sessionStorage.setItem("card3", data.card3);
              sessionStorage.setItem("nomecard3", data.nomecard3);
              sessionStorage.setItem("card4", data.card4);
              sessionStorage.setItem("nomecard4", data.nomecard4);
              sessionStorage.setItem("card5", data.card5);
              sessionStorage.setItem("nomecard5", data.nomecard5);
              sessionStorage.setItem("card6", data.card6);
              sessionStorage.setItem("nomecard6", data.nomecard6);
              waitingDialog.hide();
              $.redirect("Adm/index.php", data);
            } else {
              if (tipo_loginx === "login inativo") {
                $("#divLoading").css("display", "none");
                Swal.fire({icon: "error", title: "Atenção!", text: "Login Inativo !"});
                waitingDialog.hide();
              } else {
                if (tipo_loginx === "login bloqueado") {
                  $("#divLoading").css("display", "none");
                  Swal.fire({title: "Atenção!", text: "Login bloqueado !", icon: "error"});
                  waitingDialog.hide();
                } else {
                  if (tipo_loginx === "login incorreto") {
                    $("#divLoading").css("display", "none");
                    Swal.fire({title: "Atenção!", text: "Login Incorreto !", icon: "error"});
                    waitingDialog.hide();
                  }
                }
              }
            }
          }});
        }
      }
    }
  });
  $("#recuperar_senha").click(function () {
    $.redirect("esqueci_a_senha.php", {usuario: $("#login-username").val()});
  });
  $("#btnEntrarAss").click(function (e) {
    e.preventDefault();
    var tipo_loginx;
    var cartao = $("#cod_carteira_login").val();
    var senha = $("#passasso").val();
    if (cartao === "" && senha === "") {
      if (browser_name === "iexplorer") {
        $.fallr.show({icon: "error", content: "<p>Informe o cartão e a senha !</p>", position: "center"});
      } else {
        swal({title: "Atenção!", text: "Informe o cartão e a senha !", icon: "warning", dangerMode: true});
      }
    } else {
      if (cartao === "" && senha !== "") {
        if (browser_name === "iexplorer") {
          $.fallr.show({icon: "error", content: "<p>Informe o cartão !</p>", position: "center"});
        } else {
          swal({title: "Atenção!", text: "Informe o cartão ! !", icon: "warning", dangerMode: true});
        }
      } else {
        if (cartao !== "" && senha === "") {
          if (browser_name === "iexplorer") {
            $.fallr.show({icon: "error", content: "<p>Informe a senha !</p>", position: "center"});
          } else {
            swal({title: "Atenção!", text: "Informe a senha !", icon: "warning", dangerMode: true});
          }
        } else {
          $.ajax({url: "localiza_associado.php", type: "POST", async: true, cache: false, data: $("#form_index").serialize(), dataType: "json", beforeSend: function () {
            $("#divLoading").css("display", "block");
          }, done: function () {
            $("#divLoading").css("display", "none");
          }, success: function (data) {
            tipo_loginx = data.situacao;
            if (tipo_loginx === "1") {
              $.redirect("extratocartao/extrato.php", data);
            } else {
              if (tipo_loginx === "login cob") {
                $.redirect("msg_cob.php", data);
              } else {
                if (tipo_loginx === "login inativo") {
                  $("#divLoading").css("display", "none");
                  if (browser_name === "iexplorer") {
                    $.fallr.show({icon: "info", content: "<p>Convênio inativo !</p>", position: "center"});
                  } else {
                    swal({title: "Atenção!", text: "Convênio inativo !", icon: "warning", dangerMode: true});
                  }
                } else {
                  if (tipo_loginx === "login incorreto") {
                    $("#divLoading").css("display", "none");
                    if (browser_name === "iexplorer") {
                      $.fallr.show({icon: "info", content: "<p>Login Incorreto !</p>", position: "center"});
                    } else {
                      swal({title: "Atenção!", text: "Login Incorreto !", icon: "warning", dangerMode: true});
                    }
                  }
                }
              }
            }
          }});
        }
      }
    }
  });
});