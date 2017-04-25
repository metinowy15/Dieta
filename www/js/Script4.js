window.addEventListener("DOMContentLoaded", start4);// JavaScript source code
var zaznaczone = [];
var ListaPosilkow = [];
var pojemnik;
function start4() {
   pojemnik=document.getElementById("NowePosilki");
    $(document).on("pageshow", "#ListaPosilkow", reloadListaPosilkow);


}

function reloadListaPosilkow() {
    var nowy;


    stringOnSession = sessionStorage.getItem("eatObj");
    ListaPosilkow = JSON.parse(stringOnSession).tablica;
    if (ListaPosilkow.length > 0) {
        pojemnik.empty();
        for (let i = 0; i < ListaPosilkow.length; i++) {
            nowy = document.createElement("div");
            nowy.classList.add("posilek");
            nowy.innerHTML = "<p><b>" + ListaPosilkow[i].nazwa +"</b>, godz:" + ListaPosilkow[i].czas + ", waga:" + ListaPosilkow[i].waga + "g, kal:" + ListaPosilkow[i].dziennaDawka + "% dziennej dawki</p>";
            for (let j = 0; j < ListaPosilkow[i].produktyTab.length; j++) {

                nowy.innerHTML += "<li><b>" + ListaPosilkow[i].produktyTab[j].nazwa + "</b>, bialka:" + ListaPosilkow[i].produktyTab[j].bialka + ", tluszcze:" + ListaPosilkow[i].produktyTab[j].tluszcze + ", weglowodane:" + ListaPosilkow[i].produktyTab[j].weglowodane + "</li>";

            }
            nowy.innerHTML += "<p>w sumie=Bialek:<b>" + sumujBialka(ListaPosilkow[i].produktyTab) + "g</b>, Tluszczy:<b>" + sumujTluszcze(ListaPosilkow[i].produktyTab) + "g</b>, Weglowodanych:<b>" + sumujWegle(ListaPosilkow[i].produktyTab)+"g</b></p>";
            pojemnik.appendChild(nowy);
            nowy.addEventListener("click",callbackDla(nowy,ListaPosilkow[i])) /*function () {
                nowy.classList.add("posilekZaznaczony");
                
                
                console.log(ListaPosilkow[i].nazwa);
            
                

                

            });
            */
           
        }



    }
    


    function callbackDla(nowyElement,elementTablicy) {

        return function (data) {

            for (let k = 0; k < zaznaczone.length; k++) {

                if (zaznaczone[k].nazwa ===elementTablicy.nazwa) {
                    zaznaczone.splice(k, 1);

                    nowyElement.classList.remove("posilekZaznaczony");
                    return;

                }

            }
            zaznaczone[zaznaczone.length] = elementTablicy;

            nowyElement.classList.add("posilekZaznaczony");



        
        }

    }


}