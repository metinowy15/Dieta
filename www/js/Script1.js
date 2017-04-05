window.addEventListener("DOMContentLoaded", start);



function start() {
  
    let Lista = document.getElementById("Lista");
    let Wyszukiwarka = document.getElementById("Wyszukiwarka");
    let Wyszukaj = document.getElementById("Wyszukaj");
        Wyszukaj.addEventListener("click", function () {
        
        var nazwaSkladnika = Wyszukiwarka.value.toLowerCase();
        Lista.empty();
        //tutaj Ajax, który wywo³a skrypt php, który zwraca JSONA z bazy danych jesli w nazwie produktu wystepuje zmienna $nazwaSkladnika po czym przerobi to na obiekt JS
        //Wykorzystane tymczasowe repozytorium dla testów

        for (let i = 0; i < objTmp.tabTmp.length; i++) {

            if (objTmp.tabTmp[i].nazwa === nazwaSkladnika||objTmp.tabTmp[i].kategoria===nazwaSkladnika) {

                newElementLi(objTmp.tabTmp[i], Lista, callbackToNewElement);

            }

        }

    })
    
}



function callbackToNewElement(newElement) {
    return function (data) {

        var czyDodal = addToSession(newElement, "obj");
        if (czyDodal === true) {

            navigator.notification.alert("Wybrales " + newElement.nazwa + ", przejdz do kalkulatora zeby obliczyc jego wartosci odzywcze.", function () { }, "Zrobione!", "ok");
        } else {
            navigator.notification.alert(newElement.nazwa + " jest juz dodany", function () { }, "Juz Jest!", "ok");
        }
    }
}


