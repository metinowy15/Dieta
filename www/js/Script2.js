window.addEventListener("DOMContentLoaded", start);

let ListaKalkulator;
let PrzyciskOblicz;
let DodajDoPosilku;
let Waga;
let obiektKlikniety;
let obiektPrzeliczony;

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
    var Produkt = document.getElementById("Produkt");
    Produkt.innerHTML = "<h1>"+obiektProduktu.nazwa+"</h1><br/><h2>W 100 gramach:</h3><br/><h3>Kalorii:" + obiektProduktu.kalorie + "</h3><br/><h3>Bialka:" + obiektProduktu.bialka + "</h3><br/><h3>Sole:" + obiektProduktu.sole;

}

function przekazDanych() {

    if (obiektKlikniety === null) {
        navigator.notification.alert("Nie wybrales obiektu do przeliczenia", function () { }, "Pusto!", "ok");
        return;

    }
    var iloscGram = parseInt(Waga.value);
    if(iloscGram<=0||iloscGram===NaN||iloscGram===undefined||iloscGram===null){
        navigator.notification.alert("Prosze podac liczbe wieksza od zera", function () { }, "B³¹d!", "ok");
        return;
    }
    obiektPrzeliczony=mechanizmPrzeliczajacy(obiektKlikniety, iloscGram);


}
function mechanizmPrzeliczajacy(obiektDoPrzeliczenia,iloscGram) {

    noweKalorie=obiektDoPrzeliczenia.kalorie


}