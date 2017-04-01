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

}
//Czyszczenie listy
Node.prototype.empty = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
}