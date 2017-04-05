window.addEventListener("DOMContentLoaded", start);

let posilek = [];
var WierszProduktu;
function start() {
        
    let UsunZTabeli = document.getElementById("UsunZTabeli");

    let Czas = document.getElementById("Czas");

    let Wiadro = document.getElementById("Wiadro");

    let NazwaPosilku = document.getElementById("NazwaPosilku");
        WierszProduktu = document.getElementById("WierszProduktu");
    
    $(document).on("pageshow", "#Posilki", reloadPosilki);

    UsunZTabeli.addEventListener("click", dodajDoSession);



    Wiadro.addEventListener("click", function () {

        var eatObj = {};
        console.log("sdsd");
        if (posilek.length !== 0) {
            eatObj = {
                nazwa: NazwaPosilku.value,
                czas: Czas.value,
                produktyTab: posilek

            }

        }
        if (posilek.length === 0) {
            navigator.notification.alert("Nie stworzyles zadnego posilku", function () { }, "Pusto!", "ok");
        } else if (localStorage.getItem("eatObj") !== null) {//jesli jest taki obiekt w sessionStorage to:
            var tmpObj = JSON.parse(localStorage.getItem("eatObj"));//robie z niego obiekt JS,
            for (let z = 0; z < tmpObj.tablica.length; z++) {//sprawdzam czy w jego tablicy nie ma juz obiektu ktory chce dodac,
                if (tmpObj.tablica[z].nazwa === eatObj.nazwa) {

                    navigator.notification.alert(eatObj.nazwa + " jest ju¿ dodany", function () { }, "Juz Jest!", "ok");
                    return;//jesli jest koncze funkcje i wyswietlam komunikat jesli nie:
                }

            }
            tmpObj.tablica[tmpObj.tablica.length] = eatObj;//dodaje do jego tablicy nowy obiekt,
            localStorage.setItem("eatObj", JSON.stringify(tmpObj));//wysylam powiekszony obiekt do sessionStorage.



        } else {

            tmpObj = {
                tablica: [
                ]
            };//Tworze nowy obiekt z pusta tablica do przechowywania informacji o produkcie;
            tmpObj.tablica[0] = eatObj;//Doda³em produkt do pustej tablicy;
            localStorage.setItem("eatObj", JSON.stringify(tmpObj));//

        }
        navigator.notification.alert("Dodales nowy posilek do swojej listy", function () { }, "Zrobione!", "ok");

        WierszProduktu.empty();
        NazwaPosilku.value = "";


    });
    
    
}
function nowyElementOption(obiektProduktu,parentElement,number) {

   
  
    var nowy = document.createElement("p");
    nowy.value = number+1;
    nowy.innerHTML = obiektProduktu.nazwa + ", " + obiektProduktu.ilosc + " gram";
    nowy.classList.add("kreska");
    parentElement.appendChild(nowy);

    nowy.addEventListener("click", function () {

        
        parentElement.removeChild(nowy);
        posilek[posilek.length] = obiektProduktu;
        narysujTablice();
        usunZSession();



    })


}

function narysujTablice() {

    
    WierszProduktu.empty();
    for (var i = 0; i < posilek.length; i++) {

        var nowyWiersz = document.createElement("tr");
        nowyWiersz.innerHTML = "<td>" + posilek[i].nazwa + "</td>" + "<td>" + posilek[i].kalorie + "</td>" + "<td>" + posilek[i].weglowodane + "</td>" + "<td>" + posilek[i].bialka + "</td>" + "<td>" + posilek[i].tluszcze + "</td>";
        WierszProduktu.appendChild(nowyWiersz);
    }
    var razem = document.createElement("tr");
    razem.innerHTML = "<td>Razem:</td><td>" + sumujKalorie() + "</td><td>" + sumujWegle() + "</td><td>" + sumujBialka() + "</td>" + "</td><td>" + sumujTluszcze() + "</td>";
    WierszProduktu.appendChild(razem);

}








function usunZSession() {

    var doZmienienia = JSON.parse(sessionStorage.getItem("kalkObj"));
    for (let i = 0; i < doZmienienia.tablica.length; i++) {

        if (doZmienienia.tablica[i].nazwa === posilek[posilek.length-1].nazwa) {


            doZmienienia.tablica.splice(i, 1);
            var dlaSesji = JSON.stringify(doZmienienia);
            sessionStorage.setItem("kalkObj", dlaSesji);


        }
   
    }
}
function dodajDoSession() {
    if (posilek.length === 0) {
        return;

    } else{
    var doZmienienia = JSON.parse(sessionStorage.getItem("kalkObj"));
        doZmienienia.tablica[doZmienienia.tablica.length]=posilek[posilek.length-1];
        posilek.length = posilek.length - 1;
    var dlaSesji = JSON.stringify(doZmienienia);
        sessionStorage.setItem("kalkObj", dlaSesji);
        reloadPosilki();
        narysujTablice();
        
        }

    


}


function reloadPosilki() {

    var Czeski = document.getElementById("Czeski");
    var ukrytyDiv = Czeski.childNodes[1];
    ukrytyDiv.empty();
    if (sessionStorage.getItem("kalkObj") === null) {

        navigator.notification.alert("Nie dodales zadnych produktow, przejdz do kalkulatora albo listy produktow", function () { }, "Pusto!", "ok");
        return;
    }

    var obiektZ = JSON.parse(sessionStorage.getItem("kalkObj"));
    for (let i = 0; i < obiektZ.tablica.length; i++) {
        nowyElementOption(obiektZ.tablica[i], ukrytyDiv, i);

    }


}

//Funkcje sumujace
function sumujKalorie(){
    var suma=0;
    for(var i=0;i<posilek.length;i++){

        suma+=posilek[i].kalorie;


    }
    return Round(suma, 2);

}
function sumujBialka(){
    var suma=0;
    for(var i=0;i<posilek.length;i++){

        suma+=posilek[i].bialka;


    }
    return Round(suma, 2);

}
function sumujWegle(){
    var suma=0;
    for(var i=0;i<posilek.length;i++){

        suma+=posilek[i].weglowodane;


    }
    return Round(suma, 2);

}
function sumujTluszcze() {
    var suma = 0;
    for (var i = 0; i < posilek.length; i++) {

        suma += posilek[i].tluszcze;
        


    }
    return Round(suma,2);
}
function Round(n, k) 
{
    var factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}








