window.addEventListener("DOMContentLoaded", start);



function start() {
  
   let Lista = document.getElementById("Lista");
  let Wyszukiwarka = document.getElementById("Wyszukiwarka");
   let Wyszukaj = document.getElementById("Wyszukaj");
    window.addEventListener("deviceready", startTelefonu);
    Wyszukaj.addEventListener("click", function () {
        
        var nazwaSkladnika = Wyszukiwarka.value.toLowerCase();
        Lista.empty();
        //tutaj Ajax, który wywo³a skrypt php, który zwraca JSONA z bazy danych jesli w nazwie produktu wystepuje zmienna $nazwaSkladnika po czym przerobi to na obiekt JS
        //Wykorzystane tymczasowe repozytorium dla testów

        for (let i = 0; i < objTmp.tabTmp.length; i++) {

            if (objTmp.tabTmp[i].nazwa === nazwaSkladnika||objTmp.tabTmp[i].kategoria===nazwaSkladnika) {

                nowyElementLi(objTmp.tabTmp[i],Lista);

            }

        }

    })
    


}


function startTelefonu() {

    navigator.notification.alert("Witamy w naszej aplikacji", function () { }, "Zrobione", "ok");
}

function nowyElementLi(obiektProduktu,parentElement)
{
    var tmpObj;
    var nowy = document.createElement("li");

        nowy.classList.add('lista', 'ui-li-static', 'ui-body-inherit');

        nowy.innerHTML = obiektProduktu.nazwa;

        nowy.addEventListener("click", function () {

          var czyDodal= addToSession(obiektProduktu, "obj");
          if (czyDodal === true) {

              navigator.notification.alert("Wybrales " + obiektProduktu.nazwa + ", przejdz do kalkulatora zeby obliczyc jego wartosci odzywcze.", function () { }, "Zrobione!", "ok");
          } else {
              navigator.notification.alert(obiektProduktu.nazwa + " jest juz dodany", function () { }, "Juz Jest!", "ok");
          }
    })
    parentElement.appendChild(nowy);//dodaje element do listy

}





//Czyszczenie listy
Node.prototype.empty = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
}


function addToSession(itemToAdd, nameOnSession) {

    var sessionItem = sessionStorage.getItem(nameOnSession);
    if (sessionItem !== null) {//jesli jest taki obiekt w sessionStorage to:
        tmpObj = JSON.parse(sessionItem);//robie z niego obiekt JS,
        for (let z = 0; z < tmpObj.tablica.length; z++) {//sprawdzam czy w jego tablicy nie ma juz obiektu ktory chce dodac,
            if (tmpObj.tablica[z].nazwa === itemToAdd.nazwa) {

                
                return false;//jesli jest koncze funkcje  jesli nie:
            }

        }
        tmpObj.tablica[tmpObj.tablica.length] = itemToAdd;//dodaje do jego tablicy nowy obiekt,
        sessionStorage.setItem(nameOnSession, JSON.stringify(tmpObj));//wysylam powiekszony obiekt do sessionStorage.



    } else {

        tmpObj = {
            tablica: [
            ]
        };//Tworze nowy obiekt z pusta tablica do przechowywania informacji o produkcie;
        tmpObj.tablica[0] = itemToAdd;//Doda³em produkt do pustej tablicy;
        sessionStorage.setItem(nameOnSession, JSON.stringify(tmpObj));//

        

    }
    return true;
}

//Przykladowe Repozytorium
var objTmp={

tabTmp:[

 {
    nazwa: "cipsy",
    kalorie: 300,
    bialka: 30,
    weglowodane: 50,
    tluszcze:22,
    kategoria: "przek¹ska"
},
 {
    nazwa: "banan",
    kalorie: 90,
    bialka: 50,
    weglowodane: 0,
    tluszcze: 221,
    kategoria: "owoc"
},
 {
    nazwa: "sa³ata",
    kalorie: 10,
    bialka: 10,
    weglowodane: 10,
    tluszcze: 31,
    kategoria: "warzywa"
},
 {
    nazwa: "piers z kurczaka",
    kalorie: 300,
    bialka: 30,
    weglowodane: 50,
    tluszcze: 99,
    kategoria: "mieso"
},
{
    nazwa: "schabowy",
    kalorie: 700,
    bialka: 60,
    weglowodane: 60,
    tluszcze: 12,
    kategoria: "mieso"
},
 {
    nazwa: "ziemniaki",
    kalorie: 200,
    bialka: 35,
    weglowodane: 10,
    tluszcze: 41,
    kategoria: "warzywa"
},
{
    nazwa: "ziemniaki gotowane",
    kalorie: 500,
    bialka: 21,
    weglowodane: 3,
    tluszcze: 100,
    kategoria: "warzywa"
}
]
}
