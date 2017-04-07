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
function sumujKalorie() {
    var suma = 0;
    for (var i = 0; i < posilek.length; i++) {

        suma += posilek[i].kalorie;


    }
    return Round(suma, 2);

}
function sumujBialka() {
    var suma = 0;
    for (var i = 0; i < posilek.length; i++) {

        suma += posilek[i].bialka;


    }
    return Round(suma, 2);

}
function sumujWegle() {
    var suma = 0;
    for (var i = 0; i < posilek.length; i++) {

        suma += posilek[i].weglowodane;


    }
    return Round(suma, 2);

}
function sumujTluszcze() {
    var suma = 0;
    for (var i = 0; i < posilek.length; i++) {

        suma += posilek[i].tluszcze;



    }
    return Round(suma, 2);
}


//funkcja zaokraglajaca;
function Round(n, k) {
    var factor = Math.pow(10, k + 1);
    n = Math.round(Math.round(n * factor) / 10);
    return n / (factor / 10);
}