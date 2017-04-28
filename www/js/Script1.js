window.addEventListener("DOMContentLoaded", start);

var BazaDanych;

function start() {
    
    let Lista = document.getElementById("Lista");
    let Wyszukiwarka = document.getElementById("Wyszukiwarka");
    let Wyszukaj = document.getElementById("Wyszukaj");
        Wyszukaj.addEventListener("click", function () {
        
        var nazwaSkladnika = Wyszukiwarka.value;
        Lista.empty();//czysci liste przy kazdym wszyszukiwaniu
        $.ajax({
            url: "http://czasnasolidarnosc.pl/zBazdyDanych.php",
            type: "POST",
            data: {
                nazwa:nazwaSkladnika
            },
            success: function (response) {
                BazaDanych = JSON.parse(response);
                for (let i = 0; i < BazaDanych.wynik.length; i++) {



                    newElementLi(BazaDanych.wynik[i], Lista, callbackToNewElement);//Tworzy nowy element Li uzywajac funkkcji ogolnej 
                }

               
            }
        });
        //tutaj Ajax, który wywo³a skrypt php, który zwraca JSONA z bazy danych jesli w nazwie produktu wystepuje zmienna $nazwaSkladnika po czym przerobi to na obiekt JS
        
      
        
        
    })
    
}

//pokazuje informacje jest to callback przyjmujacy parametr

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


