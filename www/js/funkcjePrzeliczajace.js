function mechanizmPrzeliczajacy(obiektDoPrzeliczenia, iloscGram) {

 var   noweKalorie =Round((obiektDoPrzeliczenia.kalorie * iloscGram) / 100,1);
 var   noweBialka = Round((obiektDoPrzeliczenia.bialko * iloscGram) / 100,1);
 var   noweWegle = Round((obiektDoPrzeliczenia.weglowodany * iloscGram) / 100,1);
 var  noweTluszcze = Round((obiektDoPrzeliczenia.tluszcz * iloscGram) / 100,1);

    return {
        nazwa: obiektDoPrzeliczenia.nazwa,
        kalorie: noweKalorie,
        bialko: noweBialka,
        weglowodany: noweWegle,
        tluszcz: noweTluszcze,
        ilosc: iloscGram

    }
}
//Funkcje sumujace
function sumujWage(tabToSum) {
    var suma = 0;
    for (var i = 0; i < tabToSum.length; i++) {
        suma += tabToSum[i].ilosc;
    }
    return Round(suma, 1);
}
function sumujProcenty(tabToSum) {

    var suma = 0;
    for (var i = 0; i < tabToSum.length; i++) {
        suma += tabToSum[i].dziennaDawka;
    }
    return Round(suma, 0);


}


function sumujKalorie(tabToSum) {
    var suma = 0;
    for (var i = 0; i < tabToSum.length; i++) {

        suma += tabToSum[i].kalorie;


    }
    return Round(suma, 1);

}
function sumujBialka(tabToSum) {
    var suma = 0;
    for (var i = 0; i < tabToSum.length; i++) {

        suma += tabToSum[i].bialko;


    }
    return Round(suma, 1);

}
function sumujWegle(tabToSum) {
    var suma = 0;
    for (var i = 0; i < tabToSum.length; i++) {

        suma += tabToSum[i].weglowodany;


    }
    return Round(suma, 1);

}
function sumujTluszcze(tabToSum) {
    var suma = 0;
    for (var i = 0; i < tabToSum.length; i++) {

        suma += tabToSum[i].tluszcz;



    }
    return Round(suma, 1);
}


//funkcja zaokraglajaca;
function Round(n, k) {
    var factor = Math.pow(10, k + 1);
    n = Math.round(Math.round(n * factor) / 10);
    return n / (factor / 10);
}