window.addEventListener("DOMContentLoaded", start);

let ListaKalkulator;
let PrzyciskOblicz;
let DodajDoPosilku;
let Waga;
let Produkt;
let obiektKlikniety;
let obiektPrzeliczony;
var iloscGram;
function start() {

    PrzyciskOblicz = document.getElementById("PrzyciskOblicz");
    DodajDoPosilku = document.getElementById("DodajDoPosilku");
    Waga = document.getElementById("Waga");
    PrzyciskOblicz.addEventListener("click", przekazDanych);
   
   
    $(document).on("pageshow", "#Kalkulator", function () {
        if (sessionStorage.getItem("obj") === null) {
            navigator.notification.alert("Nie dodales zadnych produktow, przejdz do zakladki lista produktow", function () { }, "Pusto!", "ok");
            return;
        }
        var objektyZSesji =JSON.parse(sessionStorage.getItem("obj"));
        if (objektyZSesji !== undefined) {
            ListaKalkulator = document.getElementById("ListaKalkulator");
            for (let i = 0; i < objektyZSesji.tablica.length; i++) {
                
                let nowy = document.createElement("li");
                    nowy.classList.add('lista', 'ui-li-static', 'ui-body-inherit');
                    nowy.innerHTML = objektyZSesji.tablica[i].nazwa;
                    nowy.addEventListener("click", function () {

                        pokazProdukt(objektyZSesji.tablica[i])
                        obiektKlikniety = objektyZSesji.tablica[i];
                })
                ListaKalkulator.appendChild(nowy);

            }
       }


    })
   
}

function pokazProdukt(obiektProduktu) {
    Produkt = document.getElementById("Produkt");
    Produkt.innerHTML = "<h1>"+obiektProduktu.nazwa+"</h1><br/><h2>W 100 gramach:</h3><br/><h3>Kalorii:" + obiektProduktu.kalorie + "</h3><br/><h3>Bialka:" + obiektProduktu.bialka + "</h3><br/><h3>Sole:" + obiektProduktu.sole;

}

function przekazDanych() {

    if (obiektKlikniety == undefined) {
        navigator.notification.alert("Nie wybrales obiektu do przeliczenia", function () { }, "Pusto!", "ok");


    } else {
        Waga.value.trim();
        iloscGram = parseInt(Waga.value);
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