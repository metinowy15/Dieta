window.addEventListener("DOMContentLoaded", start2);

let obiektKlikniety;


function start2() { 
    let obiektPrzeliczony;
    let Produkt = document.getElementById("Produkt");
    let DodajDoPosilku = document.getElementById("DodajDoPosilku");
    let PrzyciskOblicz = document.getElementById("PrzyciskOblicz");
    let Waga = document.getElementById("Waga");
    let Usun = document.getElementById("Usun");
    //tworzy liste dodanych produktów z sessionStorage przy kazdym przejsciu do zakladki kalkulator
    $(document).on("pageshow", "#Kalkulator", reloadKalkulator);
    
    //Waliduje dane i przekazuje je do mechanizmu obliczajacego na ktorego podstawie uzupelnia htmla o przeliczony obiekt
    PrzyciskOblicz.addEventListener("click", function () {

        if (obiektKlikniety == undefined) {
            navigator.notification.alert("Nie wybrales obiektu do przeliczenia", function () { }, "Pusto!", "ok");


        } else {
            Waga.value.trim();
            var iloscGram = parseInt(Waga.value);
            if (iloscGram <= 0) {
                navigator.notification.alert("Prosze podac liczbe wieksza od zera", function () { }, "B³¹d!", "ok");

            } else if (Waga.value == "") { navigator.notification.alert("Nie moze byc puste", function () { }, "B³¹d!", "ok"); }
            else {
                obiektPrzeliczony = mechanizmPrzeliczajacy(obiektKlikniety, iloscGram);
                pokazProdukt(obiektPrzeliczony, iloscGram);
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

    Usun.addEventListener("click", function () {

        deleteOnSession(obiektKlikniety, "obj", reloadKalkulator);
    });
    
   

   
}

//po kliknieciu produktu pokazuje go
function pokazProdukt(obiektProduktu,ileGram) {
    if (ileGram == null) {
        ileGram = "100";
    }
    var wsadzTresc = document.getElementById("Produkt");
    wsadzTresc.innerHTML = "<h3>" + obiektProduktu.nazwa + ", w "+ ileGram+" gramach:</h3><h4>Kalorii:" + obiektProduktu.kalorie + "</h4><h4>Bialka:" + obiektProduktu.bialka + "</h4><h4>Weglowodane:" + obiektProduktu.weglowodane + "</h4><h4>Tluszcze:"+obiektProduktu.tluszcze+"</h4>";

}


function reloadKalkulator() {
    var objectOnSession;
    var ListaKalkulator = document.getElementById("ListaKalkulator");

    if (sessionStorage.getItem("obj") === null) {
        navigator.notification.alert("Nie dodales zadnych produktow, przejdz do zakladki lista produktow", function () { window.location.href = "#ListaProduktow"; }, "Pusto!", "ok");
        return;
    }
        objectOnSession =JSON.parse(sessionStorage.getItem("obj"));
    if (objectOnSession !== undefined) { 
          ListaKalkulator.empty();
        for (let i = 0; i < objectOnSession.tablica.length; i++) {
                
           
            newElementLi(objectOnSession.tablica[i],ListaKalkulator,callbackShowText);

        }
        
    }


}

function callbackShowText(objectToShow) {

    return function (data) {

        pokazProdukt(objectToShow);
        obiektKlikniety = objectToShow;
    }
}

