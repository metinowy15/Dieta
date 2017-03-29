window.addEventListener("DOMContentLoaded", start);
var myObj;
let Wyszukiwarka;
let Wyszukaj;
let Lista;
function start() {

    Lista = document.getElementById("Lista");
    Wyszukiwarka = document.getElementById("Wyszukiwarka");
    Wyszukaj = document.getElementById("Wyszukaj");
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


function nowyElementLi(obiektProduktu)
{
    var tmpObj;
    var nowy = document.createElement("li");
        nowy.classList.add('lista', 'ui-li-static', 'ui-body-inherit');
        nowy.innerHTML = obiektProduktu.nazwa;
        nowy.addEventListener("click", function () {
            if (sessionStorage.getItem("obj")!==null) {
                tmpObj = JSON.parse(sessionStorage.getItem("obj"));
                tmpObj.tablica[tmpObj.tablica.length] = obiektProduktu;
                sessionStorage.setItem("obj", JSON.stringify(tmpObj));



            } else {

            tmpObj = {
                tablica: [
                ]
            };//Tworze nowy obiekt z pusta tablica do przechowywania informacji o produkcie;
            tmpObj.tablica[0] = obiektProduktu;//Doda³em produkt do pustej tablicy;
            sessionStorage.setItem("obj", JSON.stringify(tmpObj));//

        }

        
     

    })
    Lista.appendChild(nowy);

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