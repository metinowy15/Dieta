window.addEventListener("DOMContentLoaded", start);

let ListaKalkulator;
let PrzyciskOblicz;
let DodajDoPosilku;
let Waga;
let Usun;
let Produkt;
let obiektKlikniety;
let obiektPrzeliczony;
var test;

function start() {

    PrzyciskOblicz = document.getElementById("PrzyciskOblicz");
    DodajDoPosilku = document.getElementById("DodajDoPosilku");
    Waga = document.getElementById("Waga");
    PrzyciskOblicz.addEventListener("click", przekazDanych);
    DodajDoPosilku = document.getElementById("DodajDoPosilku");
    DodajDoPosilku.addEventListener("click", dodajDoSesji);
    Usun = document.getElementById("Usun");
    Usun.addEventListener("click", usun);
   
   //tworzy liste dodanych produktów z sessionStorage przy kazdym przejsciu do zakladki kalkulator
    $(document).on("pageshow", "#Kalkulator", function () {
        if (sessionStorage.getItem("obj") === null) {
            navigator.notification.alert("Nie dodales zadnych produktow, przejdz do zakladki lista produktow", function () { }, "Pusto!", "ok");
            return;
        }
        var objektyZSesji =JSON.parse(sessionStorage.getItem("obj"));
        if (objektyZSesji !== undefined) {
            ListaKalkulator = document.getElementById("ListaKalkulator");
            ListaKalkulator.empty();
            for (let i = 0; i < objektyZSesji.tablica.length; i++) {
                
                let nowy = document.createElement("li");
                    nowy.classList.add('lista', 'ui-li-static', 'ui-body-inherit');
                    nowy.innerHTML = objektyZSesji.tablica[i].nazwa;
                    nowy.addEventListener("click", function () {

                        pokazProdukt(objektyZSesji.tablica[i])
                        obiektKlikniety = objektyZSesji.tablica[i];//ustawia obiekt do przeliczenia
                })
                ListaKalkulator.appendChild(nowy);

            }
       }


    })
   
}
//po kliknieciu produktu pokazuje go
function pokazProdukt(obiektProduktu) {
    Produkt = document.getElementById("Produkt");
    Produkt.innerHTML = "<h1>"+obiektProduktu.nazwa+"</h1><br/><h2>W 100 gramach:</h3><br/><h3>Kalorii:" + obiektProduktu.kalorie + "</h3><br/><h3>Bialka:" + obiektProduktu.bialka + "</h3><br/><h3>Sole:" + obiektProduktu.sole;

}
//Waliduje dane i przekazuje je do mechanizmu obliczajacego na ktorego podstawie uzupelnia htmla o przeliczony obiekt
function przekazDanych() {

    if (obiektKlikniety == undefined) {
        navigator.notification.alert("Nie wybrales obiektu do przeliczenia", function () { }, "Pusto!", "ok");


    } else {
        Waga.value.trim();
       var iloscGram = parseInt(Waga.value);
        if (iloscGram<=0) {
            navigator.notification.alert("Prosze podac liczbe wieksza od zera", function () { }, "B³¹d!", "ok");

        } else if (Waga.value=="") { navigator.notification.alert("Prosze podac liczbe wieksza od zera", function () { }, "B³¹d!", "ok"); }
        else {
            obiektPrzeliczony = mechanizmPrzeliczajacy(obiektKlikniety, iloscGram);
            Produkt.innerHTML = "<h1>" + obiektPrzeliczony.nazwa + "</h1><br/><h2>W " + obiektPrzeliczony.ilosc + " gramach:</h3><br/><h3>Kalorii:" + obiektPrzeliczony.kalorie + "</h3><br/><h3>Bialka:" + obiektPrzeliczony.bialka + "</h3><br/><h3>Sole:" + obiektPrzeliczony.sole;
        }
    }
   


}
function mechanizmPrzeliczajacy(obiektDoPrzeliczenia,iloscGram) {

    noweKalorie = (obiektDoPrzeliczenia.kalorie * iloscGram) / 100;
    noweBialka = (obiektDoPrzeliczenia.bialka * iloscGram) / 100;
    noweSole=(obiektDoPrzeliczenia.sole * iloscGram) / 100;

    return {
        nazwa: obiektDoPrzeliczenia.nazwa,
        kategoria:obiektDoPrzeliczenia.kategoria,
        kalorie: noweKalorie,
        bialka: noweBialka,
        sole: noweSole,
        ilosc:iloscGram

    }
}
//Czyszczenie listy
Node.prototype.empty = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
}

function dodajDoSesji() {


    if (obiektPrzeliczony == undefined) {
        navigator.notification.alert("Nie wybrales obiektu do przeliczenia", function () { }, "Pusto!", "ok");
    } else if (sessionStorage.getItem("kalkObj") !== null) {//jesli jest taki obiekt w sessionStorage to:
       var tmpObj = JSON.parse(sessionStorage.getItem("kalkObj"));//robie z niego obiekt JS,
        for (let z = 0; z < tmpObj.tablica.length; z++) {//sprawdzam czy w jego tablicy nie ma juz obiektu ktory chce dodac,
            if (tmpObj.tablica[z].nazwa === obiektPrzeliczony.nazwa) {

                navigator.notification.alert(obiektPrzeliczony.nazwa + " jest ju¿ dodany,przejdz do kalkulatora i zobacz", function () { }, "Juz Jest!", "ok");
                return;//jesli jest koncze funkcje i wyswietlam komunikat jesli nie:
            }

        }
        tmpObj.tablica[tmpObj.tablica.length] = obiektPrzeliczony;//dodaje do jego tablicy nowy obiekt,
        sessionStorage.setItem("kalkObj", JSON.stringify(tmpObj));//wysylam powiekszony obiekt do sessionStorage.



    } else {

        tmpObj = {
            tablica: [
            ]
        };//Tworze nowy obiekt z pusta tablica do przechowywania informacji o produkcie;
        tmpObj.tablica[0] = obiektPrzeliczony;//Doda³em produkt do pustej tablicy;
        sessionStorage.setItem("kalkObj", JSON.stringify(tmpObj));//

    }
    navigator.notification.alert("Wybrales " + obiektPrzeliczony.nazwa + ", przejdz do posilki zeby skomponowaæ swoj posilek.", function () { }, "Zrobione!", "ok");


}
function usun()
{
    var doUsuniecia;
    var doZmienienia = JSON.parse(sessionStorage.getItem("obj"));
    for (let i = 0; i < doZmienienia.tablica.length; i++) {

        if (doZmienienia.tablica[i].nazwa === obiektKlikniety.nazwa) {


            doZmienienia.tablica.splice(i, 1);
            var dlaSesji = JSON.stringify(doZmienienia);
            sessionStorage.setItem("obj", dlaSesji);
            location.reload();


        }


    }
    





}