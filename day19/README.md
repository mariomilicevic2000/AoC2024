# Day 19: Linen Layout

Primjer ulaznih podataka:

r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb

## Part 1

U ovom zadatku, cilj je pomoći osoblju u onsenu da organizira ručnike s određenim uzorcima pruga. Svaki ručnik ima pruge u nekoliko boja, poput bijele (w), plave (u), crne (b), crvene (r) i zelene (g). Svi ručnici imaju unaprijed određene uzorke pruga, a postoji i popis dizajna koje onsen želi prikazati.

Tvoj zadatak je odabrati odgovarajuće ručnike iz ponuđenih uzoraka kako bi prikazao željeni dizajn, pri čemu se može koristiti neograničen broj ručnika za svaki uzorak. Na primjer, ako je željeni dizajn "rgrgr", možeš koristiti nekoliko ručnika s uzorkom "rg" i "r" kako bi formirao taj dizajn.

Za svaki dizajn, potrebno je provjeriti može li se sastaviti koristeći dostupne uzorke ručnika. U primjeru su neki dizajni mogući, dok drugi nisu. Na kraju, potrebno je izračunati koliko dizajna može biti sastavljeno korištenjem dostupnih uzoraka.

Zadatak je izračunati broj dizajna koji je moguće sastaviti sa dostupnim ručnicima.

### Rješavanje zadatka

1. Učitavamo ulazne podatke iz vanjske .txt datoteke
2. Dijelimo ulazni niz na retke. Prvi red sadrži uzorke ručnika koji su na raspolaganju, njih spremamo u niz stringova. Nakon toga je prazna linija koju ignoriramo, a svaki sljedeći redak je jedan od traženih dizajna koji se pokušavaju realizirati nizanjem dostupnih ručnika, njih spremamo u listu stringova.
3. Pronalazimo i pobrojavamo koju su dizajni mogući dostupnim ručnicima, koristimo rekurzivnu funkciju. Ako je trenutni string prazan, znači da smo za njega "otkinuli" sve boje i da je uspješno realiziran ručnicima. Ako u memoizacijskoj mapi već imamo (sub)string, ne računamo to ponovno nego koristimo memoizirano rješenje. Inače za trenutni string iteriramo kroz sve dostupne ručnike, provjeravamo počinje li dizajn s trenutnim ručnikom, i ako je, rekurzivno pozivamo funkciju za substring bez trenutnog ručnika. Ako je uspješno, memoiziramo taj string kao moguć, ako ne memoiziramo ga kao nemoguć.
4. Rješenje zadatka je broj dizajna koje je moguće realizirati dostupnim ručnicima.

Vrijeme izvršavanja: 41.389ms

## Part 2

U drugom dijelu zadatka, umjesto da tražiš samo moguće dizajne, trebaš izračunati sve moguće načine na koje se svaki dizajn može sastaviti koristeći dostupne uzorke ručnika.

Na primjer, dizajn "brwrr" može biti sastavljen na dva različita načina: jedan s ručnicima "b", "r", "wr" i "r", a drugi s ručnicima "br", "wr" i "r". Isti pristup trebaš primijeniti na svaki dizajn, računajući sve moguće kombinacije ručnika koje mogu činiti određeni dizajn.

Za svaki dizajn potrebno je izračunati koliko različitih načina postoji za njegovu izradu. Na kraju, trebaš zbrojiti sve moguće načine za sve dizajne u zadatku. U primjeru, ukupni broj mogućnosti za sve dizajne je 16.

Cilj zadatka je dodati sve različite načine na koje možeš sastaviti svaki dizajn i dobiti ukupan broj tih mogućnosti.

### Rješavanje zadatka

TBD