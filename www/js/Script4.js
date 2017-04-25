window.addEventListener("DOMContentLoaded", start4);// JavaScript source code
var zaznaczone = [];
var ListaPosilkow = [];
var pojemnik;
var listyzLokalki;
let TwojeListy;
var nowaLista = {

    nazwaListy:"",
    posilki: "",
    procenty:"",
    aktywna:false,
    czyAktywna: function (prawdaFalsz) {

        this.aktywna = prawdaFalsz;

    }
}

function start4() {



    
    TwojeListy = document.getElementById("TwojeListy");
    ZapiszListe = document.getElementById("ZapiszListe");
    UsunZListy = document.getElementById("UsunZListy");
    ZapiszListe.addEventListener("click", zapiszListe);
    UsunZListy.addEventListener("click", usunZListy);
    pojemnik = document.getElementById("NowePosilki");
    listyzLokalki = localStorage.getItem("listObj");
    if (listyzLokalki !== undefined) { ladujListe();}
   $(document).on("pageshow", "#ListaPosilkow", reloadListaPosilkow);



}

function reloadListaPosilkow() {
    var nowy;



    stringOnSession = sessionStorage.getItem("eatObj");
    if (stringOnSession == undefined) { return; }
    if (stringOnSession == null) { return;}
    ListaPosilkow = JSON.parse(stringOnSession).tablica;
    if (ListaPosilkow == undefined) { return;}
    if (ListaPosilkow.length > 0) { rysujListe(); }
      

    }
    


  



function zapiszListe() {
    

function onPrompt(result) {

    if (result.buttonIndex == 2) {
       return;
    } else {
        let procenty=sumujProcenty(zaznaczone);
        nowaLista = {

            nazwaListy:result.input1,
            posilki: zaznaczone,
            procenty: procenty,
            aktywna:false

        }
        if (listyzLokalki !== null) {//jesli jest taki obiekt w localStorage to:
            tmpObj = JSON.parse(listyzLokalki);//robie z niego obiekt JS,
            for (let z = 0; z < tmpObj.tablica.length; z++) {//sprawdzam czy w jego tablicy nie ma juz obiektu ktory chce dodac,
                if (tmpObj.tablica[z].nazwa === nowaLista.nazwaListy) {

                    navigator.notification.alert(nowaLista.nazwaListy + " jest juz dodany", function () { }, "Juz Jest!", "ok");
                    return false;//jesli jest koncze funkcje  jesli nie:
                }

            }
            tmpObj.tablica[tmpObj.tablica.length] = nowaLista;//dodaje do jego tablicy nowy obiekt,
            localStorage.setItem("listObj", JSON.stringify(tmpObj));//wysylam powiekszony obiekt do localStorage.



        } else {

            tmpObj = {
                tablica: [
                ]
            };//Tworze nowy obiekt z pusta tablica do przechowywania informacji o produkcie;
            tmpObj.tablica[0] = nowaLista;//Doda³em produkt do pustej tablicy;
            localStorage.setItem("listObj", JSON.stringify(tmpObj));//



        }
        odNowa();
        
       



    }
  

    }


    navigator.notification.prompt(
    'Podaj nazwe nowej Listy',  // message
    onPrompt,                  // callback to invoke
    'Nowa lista posilkow',            // title
    ['Ok', 'Exit'],             // buttonLabels
    ''                 // defaultText
);




}
function odNowa() {
    ladujListe();
    zaznaczone = [];

    tabElement = document.getElementsByClassName("posilekZaznaczony");
    for (var i = 0; i < tabElement.length; i++) {

        pojemnik.removeChild(tabElement[i]); 

    }
   
    


}
function usunZListy() {






    zaznaczone = [];

    for (let i = 0; i < ListaPosilkow.length; i++) {

        for (let j = 0; j < zaznaczone.length; j++) {

            if (zaznaczone[j].nazwa == ListaPosilkow[z].nazwa) {

                ListaPosilkow.splice(z, 1);
            }

        }

    }
    sessionStorage.setItem("eatObj", JSON.stringify(ListaPosilkow));




    tabElement = document.getElementsByClassName("posilekZaznaczony");
    for (var i = 0; i < tabElement.length; i++) {

        pojemnik.removeChild(tabElement[i]);

    }


}
function ladujListe() {
  
    listyzLokalki = localStorage.getItem("listObj");
    var tmp = JSON.parse(listyzLokalki);
    if (tmp == undefined) {
        return;
    }
    if (tmp == null) { return;}

    for (let i = 0; i < tmp.tablica.length; i++) {

        let nowy = document.createElement("option");
        nowy.value = tmp.tablica[i].nazwaListy;
        nowy.innerHTML = tmp.tablica[i].nazwaListy + "  " + tmp.tablica[i].procenty + "% CPM" + "lista jest ";
        nowy.innerHTML +=(tmp.tablica[i].aktywna == true) ? "aktywna" : "nie aktywna";
        
        TwojeListy.appendChild(nowy);


    }


}
function wybierzElement(aktywny) {

    listyzLokalki = localStorage.getItem("listObj");
    var tmp = JSON.parse(listyzLokalki);
    if (tmp == undefined) {
        return;
    }
    if (aktywny == null) {

        for (let i = 0; i < tmp.tablica.length; i++) {
            if (tmp.tablica[i].nazwaListy == TwojeListy.value) {

                ListaPosilkow = tmp.tablica[i].posilki;
                rysujListe()

            }

        }



    } else {



        for (let i = 0; i < tmp.tablica.length; i++) {
            if (tmp.tablica[i].aktywna == true) {

                ListaPosilkow = tmp.tablica[i].posilki;
                 rysujListe()


            }

        }


    }


}
function rysujListe(){
    var nowy;
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
        nowy.addEventListener("click", callbackDla(nowy, ListaPosilkow[i]));
           
    }



    function callbackDla(nowyElement, elementTablicy) {

        return function (data) {

            for (let k = 0; k < zaznaczone.length; k++) {

                if (zaznaczone[k].nazwa === elementTablicy.nazwa) {
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
