

function mechanizmPrzeliczajacy(obiektDoPrzeliczenia, iloscGram) {

    noweKalorie = (obiektDoPrzeliczenia.kalorie * iloscGram) / 100;
    noweBialka = (obiektDoPrzeliczenia.bialka * iloscGram) / 100;
    noweWegle = (obiektDoPrzeliczenia.weglowodane * iloscGram) / 100;
    noweTluszcze = (obiektDoPrzeliczenia.tluszcze * iloscGram) / 100;

    return {
        nazwa: obiektDoPrzeliczenia.nazwa,
        kategoria: obiektDoPrzeliczenia.kategoria,
        kalorie: noweKalorie,
        bialka: noweBialka,
        weglowodane: noweWegle,
        tluszcze: noweTluszcze,
        ilosc: iloscGram

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
