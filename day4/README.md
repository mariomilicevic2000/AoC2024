# Day 4: Ceres Search

Tekst zadatka dostupan je ovdje: https://adventofcode.com/2024/day/4

Primjer formata ulaznih podataka:

MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX

## Part 1

Na Ceresu, tijekom potrage za glavnim povjesničarom, mali vilenjak traži pomoć u pronalaženju riječi "XMAS" u mreži slova. Mreža može sadržavati riječi raspoređene horizontalno, vertikalno, dijagonalno, unazad ili preklapajuće. Cilj je pronaći sve pojave riječi "XMAS" u mreži slova.

Mreža je zadana kao niz redova i svaka riječ "XMAS" može biti raspoređena na više različitih načina. Potrebno je analizirati sve mogućnosti i izračunati koliko puta se riječ "XMAS" pojavljuje.

### Rješavanje zadatka

1. Učitavanje podataka iz vanjske .txt datoteke
2. Dijelimo ulazni string na redove, i u svakom redu mapiramo string na charactere(string s jednim znakom) radi lakšeg iteriranja
3. Budući da se radi o pravokutnoj osmosmjerci, unaprijed spremamo dimenzije da bi se smanjilo vrijeme izvođenja i ponovno računanje dimenzija
4. Osmosmjerka ima osam različitih smjerova kako se može pronaći tražena riječ, pa unaprijed složimo listu pomaka po x i y za svaki smjer ("jedinični vektori")
5. Iteriramo svaki red i u svakom redu svaki stupac, nužan uvjet je naći znak X budući da je tražena riječ "XMAS"
6. Ako je trenutni znak X, iteriramo kroz sve moguće smjerove, i ako su idući znakovi u tom smjeru "MAS" pribrajamo totalu tu riječ

Vrijeme izvršavanja: 8.75ms

## Part 2

TBD
