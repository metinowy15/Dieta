
window.addEventListener("DOMContentLoaded", startUstawienia);// JavaScript source code
function startUstawienia() {
    $(document).on("pageshow", "#Ustawienia", function () { 
        var parametry = confObj.getObjectToJSON();

    var WagaUstawienia = document.getElementById("WagaUstawienia");
    WagaUstawienia.value = parametry.Waga;
    var WiekUstawienia = document.getElementById("WiekUstawienia");
    WiekUstawienia.value = parametry.Wiek;
    var WzrostUstawienia = document.getElementById("WzrostUstawienia");
    WzrostUstawienia.value = parametry.Wzrost;
    var AktywnoscUstawienia = document.getElementById("AktywnoscUstawienia");
    AktywnoscUstawienia.value = parametry.Aktywnosc;
    var ZmianaUstawienia = document.getElementById("ZmianaUstawienia")
    ZmianaUstawienia.addEventListener("click", function () {


        confObj.setYourParam(WagaUstawienia.value, WiekUstawienia.value, WzrostUstawienia.value, AktywnoscUstawienia.value);

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var wynikA = JSON.parse(ajax.responseText);

                zmienConfig(wynikA);
            }
        }
        ajax.open("POST", "http://czasnasolidarnosc.pl/Json.txt", true); // true for asynchronous 
        ajax.send(null);
        


    });
    function zmienConfig(wynikA) {

        for (var i = 0; i < wynikA.tab.length; i++) {

            if (wynikA.tab[i].Nick == confObj.getNick()) {

                wynikA.tab[i].Parametry = confObj.getObjectToJSON();

                $.ajax({
                    type: "POST",
                    url: "http://czasnasolidarnosc.pl/dodaj.php",
                    data: {
                        text: JSON.stringify(wynikA)
                    },
                    success: function (result) { }
                })



            }


        }




    }

    });
}