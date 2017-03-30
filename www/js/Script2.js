window.addEventListener("DOMContentLoaded", start);

let ListaMatematyczna;
let Kalk;

function start() {

    ListaMatematyczna = document.getElementById("ListaMatematyczna");
    $(document).on("pageshow", "#Kalkulator", function () {
        if (sessionStorage.getItem("obj") === null) {
            return;
        }
        var objektyZSesji =JSON.parse(sessionStorage.getItem("obj"));
        if (objektyZSesji !== undefined) {

           // ListaMatematyczna.innerHTML = objektyZSesji.tablica[0].nazwa;
       }


    })
   
}