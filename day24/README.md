# Day 24: Crossed Wires

Primjer ulaznih podataka:

x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02

## Part 1

Uređaj koristi logička vrata (AND, OR, XOR) za obradu binarnih vrijednosti preko povezanih žica. Neke žice imaju unaprijed zadane početne vrijednosti, dok druge dobivaju vrijednosti kroz logičke operacije. Svaka operacija koristi jednu ili dvije ulazne žice i generira izlaz na drugoj žici.

Cilj je simulirati rad uređaja i izračunati konačni broj koji se formira spajanjem svih izlaznih žica koje počinju slovom "z", interpretirajući ih kao binarni broj te ga zatim pretvoriti u decimalni oblik.

### Rješavanje zadatka

1. Učitavamo ulazne podatke iz vanjske .txt datoteke
2. Dijelimo ulazni niz na redove, iteriramo linije i dok ne naiđemo na praznu liniju, to su početna stanja žica i dodajemo ih u niz stringova. Nakon prazne linije su linije koje opisuju operacije koje se događaju nad dvije žice da bi dale izlaz na nekoj drugoj žici, što također spremamo u niz stringova.
3. Parsiramo linije stringova žica u korisniji format: regularnim izrazom kroz dvije capture grupe odvajamo ime žice i njeno početno stanje što spremamo u Mapu radi lakše kasnije manipulacije.
4. Parsiramo linije stringova instrukcija u korisniji format: regularnim izrazom odvajamo elemente operacija i spremamo u objekt koji sadrži dva operanda, operaciju, mjesto gdje se sprema i boolean koji govori je li instrukcija već izvedena. Dobijamo niz operacija u obliku objekata.
5. Iteriramo kroz listu operacija dok sve ne budu izvedene: za svaku operaciju, ako oba operanda imaju definirano stanje, u ovisnosti koja operacija se izvodi, bira se između OR, AND i XOR operacije i sprema se na definirano mjesto (žicu). Nakon što se operacija izvela, filtrira se iz liste operacija budući da više nije potrebna.
6. Nakon izvođenja svih operacija, čitaju se stanja svih žica čija imena počinju na slovo z. Regularnim izrazom pronalazimo i sortiramo po ostalim znamenkama imena z-žice i spremamo njihova stanja u niz bitova.
7. Pretvaramo niz binarnih brojeva u decimalni zapis i to je traženo rješenje zadatka.

Vrijeme izvšavanja: 4.502ms

## Part 2

U drugom dijelu zadatka otkriva se da sustav pokušava zbrojiti dva binarna broja. Bitovi na žicama koje počinju s "x" predstavljaju prvi broj, bitovi na žicama koje počinju s "y" predstavljaju drugi broj, a rezultat zbrajanja trebao bi se pojaviti na žicama koje počinju s "z".

Međutim, sustav ne daje točne rezultate jer su izlazne žice četiri para logičkih vrata pogrešno zamijenjene. Zadatak je identificirati ovih osam žica koje su zamijenjene i ispraviti grešku kako bi sustav ispravno izvodio operaciju zbrajanja.

Konačno rješenje zahtijeva sortiranje imena osam zamijenjenih žica i njihovo spajanje u niz odvojen zarezima.

### Rješavanje zadatka

TBD