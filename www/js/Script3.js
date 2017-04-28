window.addEventListener("DOMContentLoaded", start3);

let posilek = [];
var WierszProduktu;
function start3() {
        
    let UsunZTabeli = document.getElementById("UsunZTabeli");

    let Czas = document.getElementById("Czas");

    let Wiadro = document.getElementById("Wiadro");

    let NazwaPosilku = document.getElementById("NazwaPosilku");
        WierszProduktu = document.getElementById("WierszProduktu");
    
    $(document).on("pageshow", "#Posilki", reloadPosilki);

    UsunZTabeli.addEventListener("click", dodajDoSession);


    //Po kliknieciu tworzy nowy objekt dodaje do niego nazwe podana przy tworzeniu, czas oraz produkty, ktore wrzucilismy do tabeli 
    //uruchamia funkcje addToSession i tworzy nowy objekt sesji
    //powinno czyscic po udanym dodaniu tabele oraz nazwe
    Wiadro.addEventListener("click", function () {

        var eatObj = {};
        if (posilek.length !== 0) {
            let procenty=confObj.getKcalInPercent(sumujKalorie(posilek));
            let waga = sumujWage(posilek);
            eatObj = {
                nazwa: NazwaPosilku.value,
                czas: Czas.value,
                produktyTab: posilek,
                waga: waga,
                dziennaDawka:procenty

            }

        }
 
        var czyDodal = addToSession(eatObj, "eatObj");
        if (czyDodal === false) {
            navigator.notification.alert(eatObj.nazwa + " jest juz dodany", function () { }, "Juz Jest!", "ok");
        }
        if (czyDodal === 1) {
            navigator.notification.alert("Nic nie dodales", function () { }, "Nie ma!", "ok");
        }
        if (czyDodal === true) {

            navigator.notification.alert("Dodales nowy posilek do swojej listy", function () { }, "Zrobione!", "ok");
            WierszProduktu.innerHTML = "";
            posilek = [];
            NazwaPosilku.value = "";
        }
       
    });
    
    
}
//tworzy nowy element DOM option dodajac go do *parentElement*
function nowyElementOption(obiektProduktu,parentElement,number) {

   
  
    var nowy = document.createElement("p");
    nowy.value = number+1;
    nowy.innerHTML = obiektProduktu.nazwa + ", " + obiektProduktu.ilosc + " gram";
    nowy.classList.add("kreska");
    parentElement.appendChild(nowy);
    //nowy element po kliknieciu:
    nowy.addEventListener("click", function () {

        parentElement.removeChild(nowy);//usuwa siebie z option w *parentElement*
        posilek[posilek.length] = obiektProduktu;//dodaje przechowywany przez siebie *obiektProduktu* do tablicy posilkow
        narysujTablice();//uzupelnia tabelke html 
        deleteOnSession(obiektProduktu,"kalkObj");//usuwa siebie  z obiektu sessji
    })


}
//rysuje tabelke html dodajac rekordy na podstawie zmiennej globalnej *posilek* przechowujacej produkty
function narysujTablice() {
    var nowyWiersz;
    var razem;
    var waga;
    
    WierszProduktu.empty();//czysci stara tabelke
    for (let i = 0; i < posilek.length; i++) {

        nowyWiersz = document.createElement("tr");
        nowyWiersz.innerHTML = "<td>" + posilek[i].nazwa + "</td>" + "<td>" + posilek[i].kalorie + "</td>" + "<td>" + posilek[i].weglowodany + "</td>" + "<td>" + posilek[i].bialko + "</td>" + "<td>" + posilek[i].tluszcz + "</td>";
        WierszProduktu.appendChild(nowyWiersz);
    }
    razem = document.createElement("tr");//pod ostatnim wierszem dodaje wiersz razem, ktory uzywajac funkcji przeliczajacych sumuje wartosci
    razem.innerHTML = "<td>Razem:</td><td>" + sumujKalorie(posilek) + "</td><td>" + sumujWegle(posilek) + "</td><td>" + sumujBialka(posilek) + "</td>" + "</td><td>" + sumujTluszcze(posilek) + "</td>";
    WierszProduktu.appendChild(razem);
    waga = document.createElement("tr");//pod razem dodaje informacje o wadze;
    waga.innerHTML = "<td>Waga:" + sumujWage(posilek) + " g</td><td colspan='3'>"+confObj.getKcalInPercent(sumujKalorie(posilek))+"% Dziennej dawki kalori</td>" ;
    WierszProduktu.appendChild(waga);

}

//Wycofuje ostatni element z tabelki DOM i dodaje go znow do sessionStorage oraz od nowa uzupelnia liste produktow;
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

//funkcja ktora pobiera elementy przekazane przez kalkulator i dodaje je do listy produktow
function reloadPosilki() {

    var Czeski = document.getElementById("Czeski");
    var ukrytyDiv = Czeski.childNodes[1];
    ukrytyDiv.empty();//skutki uzywania jQuery mobile <automatycznie opakowuje w diva elementy typu option>
    if (sessionStorage.getItem("kalkObj") === null) {

        navigator.notification.alert("Nie dodales zadnych produktow, przejdz do kalkulatora albo listy produktow", function () { window.location.href="#Kalkulator" }, "Pusto!", "ok");
        return;
    }

    var obiektZ = JSON.parse(sessionStorage.getItem("kalkObj"));
    for (let i = 0; i < obiektZ.tablica.length; i++) {
        nowyElementOption(obiektZ.tablica[i], ukrytyDiv, i);

    }


}
