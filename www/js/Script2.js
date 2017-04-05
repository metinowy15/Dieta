window.addEventListener("DOMContentLoaded", start);

let obiektKlikniety;


function start() { 
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

    Usun.addEventListener("click", usun);
    
   

   
}

//po kliknieciu produktu pokazuje go
function pokazProdukt(obiektProduktu,ileGram) {
    if (ileGram == null) {
        ileGram = "100";
    }
    var wsadzTresc = document.getElementById("Produkt");
    wsadzTresc.innerHTML = "<h1>" + obiektProduktu.nazwa + "</h1><br/><h2>W "+ ileGram+" gramach:</h3><br/><h3>Kalorii:" + obiektProduktu.kalorie + "</h3><br/><h3>Bialka:" + obiektProduktu.bialka + "</h3><br/><h3>Weglowodane:" + obiektProduktu.weglowodane + "</h3><br/><h3>Tluszcze:"+obiektProduktu.tluszcze+"</h3>";

}




function usun()
{
    var dlaSesji; 
    var objectOnSession = JSON.parse(sessionStorage.getItem("obj"));


    for (let i = 0; i < objectOnSession.tablica.length; i++) {

        if (objectOnSession.tablica[i].nazwa === obiektKlikniety.nazwa) {


            objectOnSession.tablica.splice(i, 1);
            dlaSesji = JSON.stringify(objectOnSession);
            sessionStorage.setItem("obj", dlaSesji);

            reloadKalkulator();

        }
        
    }
    
}

function reloadKalkulator() {
    var objectOnSession;
    var ListaKalkulator = document.getElementById("ListaKalkulator");

    if (sessionStorage.getItem("obj") === null) {
        navigator.notification.alert("Nie dodales zadnych produktow, przejdz do zakladki lista produktow", function () { }, "Pusto!", "ok");
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

