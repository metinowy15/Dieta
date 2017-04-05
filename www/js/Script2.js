window.addEventListener("DOMContentLoaded", start);

let ListaKalkulator;
let PrzyciskOblicz;
let Waga;
let Usun;
let Produkt;
let obiektPrzeliczony;
var test;

function start() {
    let zbir;
    let obiektKlikniety;
    let DodajDoPosilku = document.getElementById("DodajDoPosilku");
    PrzyciskOblicz = document.getElementById("PrzyciskOblicz");
    Waga = document.getElementById("Waga");
    //tworzy liste dodanych produktów z sessionStorage przy kazdym przejsciu do zakladki kalkulator
    $(document).on("pageshow", "#Kalkulator", function () {

        reloadKalkulator(obiektKlikniety);
    });
    PrzyciskOblicz.addEventListener("click", function () {

        if (obiektKlikniety == undefined) {
            navigator.notification.alert("Nie wybrales obiektu do przeliczenia", function () { }, "Pusto!", "ok");


        } else {
            Waga.value.trim();
            var iloscGram = parseInt(Waga.value);
            if (iloscGram <= 0) {
                navigator.notification.alert("Prosze podac liczbe wieksza od zera", function () { }, "B³¹d!", "ok");

            } else if (Waga.value == "") { navigator.notification.alert("Prosze podac liczbe wieksza od zera", function () { }, "B³¹d!", "ok"); }
            else {
                obiektPrzeliczony = mechanizmPrzeliczajacy(obiektKlikniety, iloscGram);
                Produkt.innerHTML = "<h1>" + obiektPrzeliczony.nazwa + "</h1><br/><h2>W " + obiektPrzeliczony.ilosc + " gramach:</h3><br/><h3>Kalorii:" + obiektPrzeliczony.kalorie + "</h3><br/><h3>Bialka:" + obiektPrzeliczony.bialka + "</h3><br/><h3>Weglowodane:" + obiektPrzeliczony.weglowodane + "</h3><br/><h3>Tluszcze:" + obiektPrzeliczony.tluszcze + "</h3>";
            }
        }

    });

    DodajDoPosilku.addEventListener("click", function () {


        var czyDodalo = addToSession(obiektPrzeliczony, "kalkObj");
        if (czyDodalo === true) {
            navigator.notification.alert("Wybrales " + obiektPrzeliczony.nazwa + ", przejdz do posilki zeby skomponowaæ swoj posilek.", function () { }, "Zrobione!", "ok");
        } else if(czyDodalo===false) {
            navigator.notification.alert(obiektPrzeliczony.nazwa + " jest juz dodany,przejdz do kalkulatora i zobacz", function () { }, "Juz Jest!", "ok");
        } else if (czyDodalo === 1) {
            navigator.notification.alert("Nic jeszcze nie przeliczyles", function () { }, "Nie ma!", "ok");
        }

    });
    Usun = document.getElementById("Usun");
    Usun.addEventListener("click", usun);
    
   

   
}

//po kliknieciu produktu pokazuje go
function pokazProdukt(obiektProduktu) {
    Produkt = document.getElementById("Produkt");
    Produkt.innerHTML = "<h1>" + obiektProduktu.nazwa + "</h1><br/><h2>W 100 gramach:</h3><br/><h3>Kalorii:" + obiektProduktu.kalorie + "</h3><br/><h3>Bialka:" + obiektProduktu.bialka + "</h3><br/><h3>Weglowodane:" + obiektProduktu.weglowodane + "</h3><br/><h3>Tluszcze:"+obiektProduktu.tluszcze+"</h3>";

}
//Waliduje dane i przekazuje je do mechanizmu obliczajacego na ktorego podstawie uzupelnia htmla o przeliczony obiekt

function mechanizmPrzeliczajacy(obiektDoPrzeliczenia,iloscGram) {

    noweKalorie = (obiektDoPrzeliczenia.kalorie * iloscGram) / 100;
    noweBialka = (obiektDoPrzeliczenia.bialka * iloscGram) / 100;
    noweWegle = (obiektDoPrzeliczenia.weglowodane * iloscGram) / 100;
    noweTluszcze = (obiektDoPrzeliczenia.tluszcze * iloscGram) / 100;

    return {
        nazwa: obiektDoPrzeliczenia.nazwa,
        kategoria:obiektDoPrzeliczenia.kategoria,
        kalorie: noweKalorie,
        bialka: noweBialka,
        weglowodane: noweWegle,
        tluszcze:noweTluszcze,
        ilosc:iloscGram

    }
}
//Czyszczenie listy



function usun()
{
  
    var doZmienienia = JSON.parse(sessionStorage.getItem("obj"));
    for (let i = 0; i < doZmienienia.tablica.length; i++) {

        if (doZmienienia.tablica[i].nazwa === obiektKlikniety.nazwa) {


            doZmienienia.tablica.splice(i, 1);
            var dlaSesji = JSON.stringify(doZmienienia);
            sessionStorage.setItem("obj", dlaSesji);

            reloadKalkulator();


        }
        


    }
    





}
function reloadKalkulator(itemToUpdate) {
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
                itemToUpdate = objektyZSesji.tablica[i];//ustawia obiekt do przeliczenia
            })
            ListaKalkulator.appendChild(nowy);
            

        }
        
    }


}