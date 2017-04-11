window.addEventListener("DOMContentLoaded", start0);

function start0() {
   
    
    var Login = document.getElementById("Login");
    var Haslo = document.getElementById("Haslo");
    var Logowanie = document.getElementById("Zaloguj");
    Logowanie.addEventListener("click", function () {
        var login = Login.value;
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
               var wynikA = JSON.parse(ajax.responseText);

                sprawdz(wynikA);
            }
        }
        ajax.open("POST", "http://czasnasolidarnosc.pl/Json.txt", true); // true for asynchronous 
        ajax.send(null);


    });
    function sprawdz(wynikA) {
        var login = Login.value;
        var haslo = Haslo.value;
        var poprawnosc = false;
        for (let i = 0; i < wynikA.tab.length; i++) {

            if (login === wynikA.tab[i].Nick && haslo === wynikA.tab[i].Haslo) {
                poprawnosc = true;

            }

        }
        if (poprawnosc == true) {
            navigator.notification.alert("Witaj "+ login, function () { window.location.href = "#ListaProduktow"; }, "Zalogowano!", "ok");
            
        } else {
            console.log("nie dalo rady");
            navigator.notification.alert("Nie poprawne dane", function () { Haslo.value = ""; Login.value = "" }, "Blad!", "ok");
         
        }
     

}


}