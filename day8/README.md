# Day 8: Resonant Collinearity

Tekst zadatka dostupan je ovdje: https://adventofcode.com/2024/day/8

Primjer formata ulaznih podataka:

............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............


## Part 1

Na krovu tajne instalacije Uskršnjeg zeca, nalazite mnogo antena koje emitiraju signal koji povećava vjerojatnost kupnje čokolade kao božićnog poklona. Antene su podešene na specifične frekvencije označene malim ili velikim slovima i brojevima. Signal djeluje na određene antinode koji nastaju kada su dvije antene iste frekvencije savršeno u liniji, pri čemu je jedna antena dvostruko udaljenija od druge. Za svaku par antena iste frekvencije nastaju dva antinoda. Različite frekvencije ne stvaraju antinodove, ali antinodovi mogu biti prisutni i na lokacijama antena. Cilj je izračunati broj jedinstvenih lokacija koje sadrže antinodove unutar mape.

### Rješavanje zadatka

1. Ulazne podatke učitavamo iz vanjske .txt datoteke i dijelimo ih u retke
2. Antene spremamo u mapu, gdje je ključ tip antene (character) a vrijednosti su niz objekata koji sadrže x i y koordinate (lokacije)
3. Iteriramo kroz sve retke i charactere mape antena. Ako tip antene već postoji, dodajemo lokaciju u listu lokacija, inače dodajemo novu antenu i njenu trenutnu lokaciju
4. Antinodove pronalazimo tako da iteriramo kroz sve antene, i za svaku antenu iteriramo kroz svaku lokaciju antene: pronalazimo antinodove kao dvostruku udaljenost od jedne antene do druge u oba smjera, provjeravamo jesu li antinodovi u granicama mape, i ako jesu spremamo ih u mapu svih antinodova
5. Rješenje zadatka je broj svih antinodova.

Vrijeme izvršavanja: 2.673ms

## Part 2

Dok radite na izračunu, jedan od Povjesničara primijeti da niste uzeli u obzir učinke rezonantnih harmonika. Nakon ažuriranja modela, otkrivate da se antinoda pojavljuje na bilo kojoj točki mreže koja je točno poravnata s barem dvije antene iste frekvencije, bez obzira na udaljenost.

To znači da se neke nove antinode sada mogu pojaviti na poziciji svake antene, osim ako je ta antena jedina s tom frekvencijom. Na primjer, tri antene frekvencije T sada generiraju više antinoda, uključujući one na vlastitim lokacijama.

Vaš zadatak je ponovo izračunati učinak signala prema ovom ažuriranom modelu. Koliko jedinstvenih lokacija unutar mreže sadrži antinodu?

### Rješavanje zadatka

1. Zadatak je vrlo sličan prošlome, s bitnom razlikom da se antinodovi pojavljuju u svakoj ravnini između dvije antene istog tipa, i ponavlja se na svakoj udaljenosti između dvije antene do kraja mape.
2. U principu, glavna razlika je da sada imamo pomoćnu varijablu kojom skaliramo pomak po x i y za traženje novih antinodova, i vodimo računa o tome jesu li trenutno traženi antinodovi van granica, i ako jesu prekidamo trenutnu iteraciju loopa jer nema smisla tražiti daljnje antinodove koji bi svakako bili van granice.

Vrijeme izvršavanja: 3.026ms