window.addEventListener("DOMContentLoaded", start4);// JavaScript source code

var ListaPosilkow = [];

function start4() {

    $(document).on("pageshow", "#ListaPosilkow", reloadListaPosilkow);


}

function reloadListaPosilkow() {


    stringOnSession = sessionStorage.getItem("eatObj");
    ListaPosilkow = JSON.parse(stringOnSession).tablica;
    Wujek = document.getElementById("Wujek").innerHTML = ListaPosilkow[0].nazwa + " " + ListaPosilkow[0].waga;






}