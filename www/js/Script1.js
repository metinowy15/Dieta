window.addEventListener("DOMContentLoaded", start);
var myObj;
let Wyszukiwarka;
let Wyszukaj;
let Lista;
function start() {
  
    Lista = document.getElementById("Lista");
    Wyszukiwarka = document.getElementById("Wyszukiwarka");
    Wyszukaj = document.getElementById("Wyszukaj");
    window.addEventListener("deviceready", startTelefonu);
    Wyszukaj.addEventListener("click", function () {
        
        var nazwaSkladnika = Wyszukiwarka.value.toLowerCase();
        Lista.empty();
        //tutaj Ajax, który wywo³a skrypt php, który zwraca JSONA z bazy danych jesli w nazwie produktu wystepuje zmienna $nazwaSkladnika po czym przerobi to na obiekt JS
        //Wykorzystane tymczasowe repozytorium dla testów

        for (let i = 0; i < objTmp.tabTmp.length; i++) {

            if (objTmp.tabTmp[i].nazwa === nazwaSkladnika||objTmp.tabTmp[i].kategoria===nazwaSkladnika) {

                nowyElementLi(objTmp.tabTmp[i]);

            }

        }

    })
    


}


function startTelefonu() {

    navigator.notification.alert("Witamy w naszej aplikacji", function () { }, "Zrobione", "ok");
}

function nowyElementLi(obiektProduktu)
{
    var tmpObj;
    var nowy = document.createElement("li");

        nowy.classList.add('lista', 'ui-li-static', 'ui-body-inherit');

        nowy.innerHTML = obiektProduktu.nazwa;

        nowy.addEventListener("click", function () {

            if (sessionStorage.getItem("obj")!==null) {//jesli jest taki obiekt w sessionStorage to:
                tmpObj = JSON.parse(sessionStorage.getItem("obj"));//robie z niego obiekt JS,
                for (let z = 0; z < tmpObj.tablica.length; z++) {//sprawdzam czy w jego tablicy nie ma juz obiektu ktory chce dodac,
                    if (tmpObj.tablica[z].nazwa === obiektProduktu.nazwa) {
                        
                        navigator.notification.alert(obiektProduktu.nazwa + " jest juz dodany,przejdz do kalkulatora i zobacz", function () { },"Juz Jest!","ok");
                        return;//jesli jest koncze funkcje i wyswietlam komunikat jesli nie:
                    }

                }
                tmpObj.tablica[tmpObj.tablica.length] = obiektProduktu;//dodaje do jego tablicy nowy obiekt,
                sessionStorage.setItem("obj", JSON.stringify(tmpObj));//wysylam powiekszony obiekt do sessionStorage.



            } else {

            tmpObj = {
                tablica: [
                ]
            };//Tworze nowy obiekt z pusta tablica do przechowywania informacji o produkcie;
            tmpObj.tablica[0] = obiektProduktu;//Doda³em produkt do pustej tablicy;
            sessionStorage.setItem("obj", JSON.stringify(tmpObj));//

            }
            navigator.notification.alert("Wybrales "+ obiektProduktu.nazwa + ", przejdz do kalkulatora aby przeliczyc wartosci odzywcze.", function () { }, "Zrobione!", "ok");


    })
    Lista.appendChild(nowy);//dodaje element do listy

}





//Czyszczenie listy
Node.prototype.empty = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
}

//Przykladowe Repozytorium
var objTmp={

tabTmp:[

 {
    nazwa: "cipsy",
    kalorie: 300,
    bialka: 30,
    sole: 50,
    kategoria: "przek¹ska"
},
 {
    nazwa: "banan",
    kalorie: 90,
    bialka: 50,
    sole: 0,
    kategoria: "owoc"
},
 {
    nazwa: "sa³ata",
    kalorie: 10,
    bialka: 10,
    sole: 10,
    kategoria: "warzywa"
},
 {
    nazwa: "piers z kurczaka",
    kalorie: 300,
    bialka: 30,
    sole: 50,
    kategoria: "mieso"
},
{
    nazwa: "schabowy",
    kalorie: 700,
    bialka: 60,
    sole: 60,
    kategoria: "mieso"
},
 {
    nazwa: "ziemniaki",
    kalorie: 200,
    bialka: 35,
    sole: 10,
    kategoria: "warzywa"
},
{
    nazwa: "ziemniaki gotowane",
    kalorie: 500,
    bialka: 21,
    sole: 3,
    kategoria: "warzywa"
}
]
}
