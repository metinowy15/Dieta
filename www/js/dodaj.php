<?
$text = $_POST['text'];


// otwarcie pliku do zapisu

$fp = fopen("kuba.txt", "w");


// zapisanie danych

fputs($fp, $text);


// zamkni�cie pliku

fclose($fp);
?>
