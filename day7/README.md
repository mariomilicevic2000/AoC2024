# Day 7: Bridge Repair

Tekst zadatka dostupan je ovdje: https://adventofcode.com/2024/day/7

Primjer formata ulaznih podataka:

196487536: 7 3 6 4 393 4 1 93 3 7 9 7

52253144412: 99 5 9 86 816 52 9 2

52182: 5 2 473 1 99 388 2 1

83680255: 703 1 5 2 390 2 4 352 8

## Part 1

Inženjeri rade na popravci mosta u džungli, a vi im morate pomoći da odredite koji matematički izrazi mogu biti točni. Svaki redak predstavlja jedan izraz u kojem se traži da se pomoću brojeva i dva operatora (+ i *) postigne određena ciljna vrijednost. Na temelju tih izraza potrebno je utvrditi koji od njih mogu biti točni tako da se postave odgovarajući operatori. Na kraju, treba izračunati zbroj ciljnih vrijednosti koje mogu biti točne prema zadanim pravilima.

### Rješavanje zadatka

1. Podaci se učitavaju iz vanjske .txt datoteke
2. Ulazni string se parsira na način da se dijeli u redove, gdje je svaki red jedna "jednadžba" kojoj treba provjeriti je li moguće dobiti prvi broj kao kombinaciju ostalih brojeva kroz operacije zbrajanja i množenja
3. Regularnim izrazom za svaki red zasebno izvlačimo u dvije capture grupe lijevi rezultatni broj i njegove faktore i spremamo u varijable, a .filter() dio filtrira ako postoje retci koji nisu u formatu kakav očekujemo (s obzirom da je ulazni tekst uvijek u točnom formatu, nije nužan dio)
4. Iteriramo kroz sve retke (jednadžbe) i za svaku provjeravamo je li moguće dobiti traženi broj. Koristimo Set, i gradimo strukturu sličnu stablu u kojem pokušavamo za svaku kombinaciju sljedećem operandu primjeniti zbrajanje ili oduzimanje. Na kraju dobijemo listu svih mogućih kombinacija, i ako se u njemu nalazi naš traženi rezultat, dodaje se ukupnom zbroju koji je rješenje zadatka.

Vrijeme izvođenja: 51.22ms

## Part 2

U drugom dijelu zadatka, inženjeri otkrivaju da je ukupni rezultat kalibracije pogrešan zbog skrivene treće vrste operatora. Novi operator, konkatenacija (||), spaja brojeve s lijeva na desno, pretvarajući ih u jedan broj. Na primjer, operator 15 || 6 daje rezultat 156, a ne 21, kao što bi to bio slučaj s operatorima + ili *.

Osim prethodna tri operatora (+ i *), sada trebamo evaluirati sve moguće kombinacije operatora (+, *, ||) u svakom izrazu. Cilj je odrediti koje jednadžbe mogu biti istinite korištenjem tih operatora, te na temelju toga izračunati novi ukupni rezultat kalibracije.

### Rješavanje zadatka

1. Drugi dio zadatka je u principu skoro isti kao prvi, uz malu razliku da je uveden novi operator || koji je efektivno konkatenacija, dakle u funkciju koja generira sve moguće kombinacije dodajemo mogućnost da ako je operator ||, trenutni operand konkateniramo na trenutni rezultat.
