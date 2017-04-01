window.addEventListener("DOMContentLoaded", start);

let posilek = [];
function start() {
    
    
   
    $(document).on("pageshow", "#Posilki", function () {
     
      var Czeski = document.getElementById("Czeski");
      var ukrytyDiv = Czeski.childNodes[1];
      ukrytyDiv.empty();
        if (sessionStorage.getItem("kalkObj") === null) {
            
            navigator.notification.alert("Nie dodales zadnych produktow, przejdz do kalkulatora albo listy produktow", function () { }, "Pusto!", "ok");
            return;
        }
        
        var obiektZ = JSON.parse(sessionStorage.getItem("kalkObj"));
         for (let i = 0; i <obiektZ.tablica.length; i++) {
             nowyElementOption(obiektZ.tablica[i],ukrytyDiv,i);
           
        }
    })
    
}
function nowyElementOption(obiektProduktu,parentElement,number) {

   
  
    var nowy = document.createElement("p");
    nowy.value = number+1;
    nowy.innerHTML = obiektProduktu.nazwa + ", " + obiektProduktu.ilosc + " gram";
    nowy.classList.add("kreska");
    parentElement.appendChild(nowy);

    nowy.addEventListener("click", function () {

        
        parentElement.removeChild(nowy);
        pokazListe(obiektProduktu);



    })


}
function pokazListe(obiektProduktu) {

    posilek[posilek.length] = obiektProduktu;
    var WierszProduktu = document.getElementById("WierszProduktu");
    WierszProduktu.empty();
    for (var i = 0; i < posilek.length; i++) {

        var nowyWiersz = document.createElement("tr");
        nowyWiersz.innerHTML = "<td>" + posilek[i].nazwa + "</td>" + "<td>" + posilek[i].kalorie + "</td>" + "<td>" + posilek[i].sole + "</td>" + "<td>" + posilek[i].bialka + "</td>";
        WierszProduktu.appendChild(nowyWiersz);
    }
    var razem = document.createElement("tr");
    razem.innerHTML = "<td>Razem:</td><td>" + sumujKalorie() + "</td><td>" + sumujSole() + "</td><td>" + sumujBialka() + "</td>";
    WierszProduktu.appendChild(razem);

}
//Czyszczenie listy
Node.prototype.empty = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
}

function sumujKalorie(){
    var suma=0;
    for(var i=0;i<posilek.length;i++){

        suma+=posilek[i].kalorie;


    }
    return suma;

}
function sumujBialka(){
    var suma=0;
    for(var i=0;i<posilek.length;i++){

        suma=suma+posilek[i].bialka;


    }
    return suma;

}
function sumujSole(){
    var suma=0;
    for(var i=0;i<posilek.length;i++){

        suma+=posilek[i].sole;


    }
    return suma;

}