window.addEventListener("DOMContentLoaded", start);
var obiektZ;
let zero;
function start() {
  
    zero = document.getElementById("zero");
   
    $(document).on("pageshow", "#Posilki", function () {
     
       
        
        if (sessionStorage.getItem("kalkObj") === null) {
            
            navigator.notification.alert("Nie dodales zadnych produktow, przejdz do kalkulatora albo listy produktow", function () { }, "Pusto!", "ok");
            return;
        }
        console.log("start z 3");
         obiektZ = JSON.parse(sessionStorage.getItem("kalkObj"));
         for (let z = 0; z <obiektZ.tablica.length; z++) {
             console.log("sdaa");
           zero.innerHTML += " <br/> " + obiektZ.tablica[z].nazwa + " " + obiektZ.tablica[z].ilosc + " " + obiektZ.tablica[z].kalorie;
        }
    })
    
}