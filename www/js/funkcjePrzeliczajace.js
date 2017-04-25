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
//Funkcje sumujace
function sumujWage(tabToSum) {
    var suma = 0;
    for (var i = 0; i < tabToSum.length; i++) {
        suma += tabToSum[i].ilosc;
    }
    return Round(suma, 1);
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

        suma += tabToSum[i].bialka;


    }
    return Round(suma, 1);

}
function sumujWegle(tabToSum) {
    var suma = 0;
    for (var i = 0; i < tabToSum.length; i++) {

        suma += tabToSum[i].weglowodane;


    }
    return Round(suma, 1);

}
function sumujTluszcze(tabToSum) {
    var suma = 0;
    for (var i = 0; i < tabToSum.length; i++) {

        suma += tabToSum[i].tluszcze;



    }
    return Round(suma, 1);
}


//funkcja zaokraglajaca;
function Round(n, k) {
    var factor = Math.pow(10, k + 1);
    n = Math.round(Math.round(n * factor) / 10);
    return n / (factor / 10);
}