
//objekt na podstawie którego bedzie liczone % zaspokojenie kcalów przez dany posilek
confObj = {

waga:"",
wiek:"",
wzrost:"",
plec:"",
aktywnosc: "",
nick:"",

getCPM:function(){
var ppm=0;
if(this.plec=="M"){
	ppm=66.47 + (13.75 * this.waga) + (5 * this.wzrost) - (6.75 * this.wiek);

}else{

ppm=665.09 + (9.56 * this.waga) + (1.85 * this.wzrost) - (4.67 * this.wiek);
}
return Round(ppm*this.aktywnosc,0);

},
setYourInfo: function (nick,sex) {
    this.nick = nick;
    this.plec = sex;
},
getKcalInPercent:function(kalorie){

    var CPM = this.getCPM();
    return Round(100 * kalorie / CPM,0);

},
setYourParam:function(waga,wiek,wzrost,aktywnosc){
this.waga=waga;
this.wiek=wiek;
this.wzrost=wzrost;
this.aktywnosc=aktywnosc;

},
getObjectToJSON: function () {
    return{
        Wiek: this.wiek,
        Wzrost: this.wzrost,
        Waga: this.waga,   
        Plec: this.plec,
        Aktywnosc:this.aktywnosc
    }



},
    getNick:function(){
        return this.nick;
}


}



function deleteOnSession(objectToDelete,nameOnSession,callback) {
    var forSession;
    var objectOnSession = JSON.parse(sessionStorage.getItem(nameOnSession));


    for (let i = 0; i < objectOnSession.tablica.length; i++) {

        if (objectOnSession.tablica[i].nazwa === objectToDelete.nazwa) {


            objectOnSession.tablica.splice(i, 1);
            dlaSesji = JSON.stringify(objectOnSession);
            sessionStorage.setItem(nameOnSession, dlaSesji);

            if (typeof callback !== 'function') {
                callback = false;
            }
            if (callback) {

                callback();
            }

        }

    }

}



//funkcja dodaje nowy element Li do podanego w zmiennej *parentElement* elementu DOM ,tworzy go na podstawie zmiennej *object*
//dodaje zdarzenie click dla utworzonego elementu do ktorego przyczepia funkcje *callback*
function newElementLi(object, parentElement, callback) {
    var tmpObj;
    var nowy = document.createElement("li");

    nowy.classList.add('lista', 'ui-li-static', 'ui-body-inherit');

    nowy.innerHTML = object.nazwa;

    nowy.addEventListener("click", callback(object));
    parentElement.appendChild(nowy);//dodaje element do listy

}

//Czyszczenie elemntow DOM z ich dzieci:D
Node.prototype.empty = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
}


//Zwraca obiekt zrobiony z jsona ktory znajduje sie pod *url*





//Funkcja dodaje obiekt *itemToAdd* do tablicy zapisanej w sessionStorage pod nazwa *nameOnSession*
//zwraca true jesli operacja sie powiedzie
//zwraca false kiedy obiekt juz jest w tej tablicy
//zwraca 1 kiedy obiekt nie jest rozpoznany
function addToSession(itemToAdd, nameOnSession) {

    if (itemToAdd == undefined) { return 1; }
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
