window.addEventListener("DOMContentLoaded", start);
var myObj;
function start() {
    pobierzJSON();
}
function pobierzJSON() {


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);


        }
    };
    xmlhttp.open("GET", "http://k.lk.kei.pl/kuba.txt", true);
    xmlhttp.send();





}
