window.addEventListener("DOMContentLoaded", start0);

function start0() {
   
    
    var Login = document.getElementById("Login");
    var Haslo = document.getElementById("Haslo");
    var Rejestracja = document.getElementById("Zatwierdz");
        Rejestracja.addEventListener("click",nowyUzytkownik)
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
                confObj.setYourParam(wynikA.tab[i].Parametry.Waga, wynikA.tab[i].Parametry.Wiek, wynikA.tab[i].Parametry.Wzrost, wynikA.tab[i].Parametry.Aktywnosc);
               confObj.setYourInfo(wynikA.tab[i].Nick,wynikA.tab[i].Parametry.Plec);
            }

        }
        if (poprawnosc == true) {
            navigator.notification.alert("Witaj "+ login, function () { window.location.href = "#ListaProduktow"; }, "Zalogowano!", "ok");
            
        } else {
            console.log("nie dalo rady");
            navigator.notification.alert("Nie poprawne dane", function () { Haslo.value = ""; Login.value = "" }, "Blad!", "ok");
         
        }
     

    }
    function nowyUzytkownik() {
        var NowyLogin = document.getElementById("NowyLogin");
        var NoweHaslo = document.getElementById("NoweHaslo");
        var NowyWiek = document.getElementById("NowyWiek");
        var NowyWzrost = document.getElementById("NowyWzrost");
        var NowaWaga = document.getElementById("NowaWaga");
        var NowaPlec = document.getElementById("NowaPlec");
        var NowaAktywnosc = document.getElementById("NowaAktywnosc");
        if (NowyLogin.value.trim() == "") {

            navigator.notification.alert("Musisz podac login", function () { }, "Blad!", "ok");
            return;
        }
        if (NoweHaslo.value.trim() == "") {

            navigator.notification.alert("Musisz podac haslo", function () { }, "Blad!", "ok");
            return;
        }

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var wynikA = JSON.parse(ajax.responseText);
                if (nickJuzJest(wynikA)) {

                    navigator.notification.alert("Taki uzytkownik juz jest", function () {}, "Blad!", "ok");
                    return;
                } else {

                    var uzytkownik = {
                        Nick: NowyLogin.value,
                        Haslo: NoweHaslo.value,
                        Parametry: {
                            Wiek: NowyWiek.value,
                            Wzrost: NowyWzrost.value,
                            Waga: NowaWaga.value,
                            Plec: NowaPlec.value,
                            Aktywnosc: NowaAktywnosc.value
                        }
                    }

                    wynikA.tab[wynikA.tab.length] = uzytkownik;
                    $.ajax({
                        type: "POST",
                        url: "http://czasnasolidarnosc.pl/dodaj.php",
                        data: {
                            text: JSON.stringify(wynikA)
                        },
                        success: function (result) { navigator.notification.alert("Witaj " + NowyLogin.value + " zaloguj sie aby kozystac z aplikacji", function () { window.location.href = "#Logowanie";}, "Blad!", "ok"); }
                    });

                   

                }

            }
        }
        ajax.open("POST", "http://czasnasolidarnosc.pl/Json.txt", true); // true for asynchronous 
        ajax.send(null);

     






        function nickJuzJest(wynikA) {
            for (var i = 0; i < wynikA.tab.length; i++) {

                if (wynikA.tab[i].Nick === NowyLogin.value) {

                    return true;
                }

        }


        }

    }



}
