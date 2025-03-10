# Day 17: Chronospatial Computer

Primjer ulaznih podataka:

Register A: 729

Register B: 0

Register C: 0

Program: 0,1,5,4,3,0

## Part 1

 zadatku "Day 17: Chronospatial Computer", Historičari aktiviraju neobičan uređaj koji se pretvara u 3-bitno računalo. Računalo ima tri registra – A, B, i C, koji mogu pohranjivati bilo koju cijeli broj, a program se sastoji od niza 3-bitnih brojeva, koji predstavljaju upute. Računalo podržava osam različitih uputa, označenih s 3-bitnim brojem (opkodom), od kojih svaka čini specifičnu operaciju. Upute uključuju operacije poput dijeljenja, bitwise XOR, postavljanje vrijednosti u registre, skakanje na specifičnu poziciju u programu, te ispisivanje vrijednosti.

Svaka uputa također uzima operand, koji može biti literalna vrijednost ili kombinirani operand. Kombinirani operandi uključuju specifične registre (A, B, C), dok literalni operandi predstavljaju konkretne brojeve. Pokazivač instrukcija, koji se inicijalno postavlja na 0, pomiče se kroz program prema pravilima, i nakon svake obrade upute, pomiče se za 2 (osim kod skokova, kada se pomiče prema vrijednosti operanda).

Program je dizajniran za čitanje, obradu i izvršavanje tih uputa, a korisnik treba pratiti izlaze s uputa koje proizvode "out" komande. Kada se program završi, korisnik treba spojiti sve izlazne vrijednosti koje su proizvedene u niz, odvojene zarezima, i to je konačan rezultat zadatka.

Glavni cilj je analizirati dani program, inicijalizirati registre sa zadanim vrijednostima, izvršiti sve upute te nakon toga dobiti niz izlaznih vrijednosti, koji daje odgovor na zadatak.

### Rješavanje zadatka

1. Učitavamo ulazne podatke iz vanjske .txt datoteke
2. Parsiramo ulazni niz: regularnim izrazom prepoznajemo brojeve. Registre spremamo kao objekt koji sadrži tri broja: a, b, c. Prva tri prepoznata broja su stanje registara A, B, C, a daljnji brojevi su program koji se izvodi nad registrima i operandima. Program spremamo u niz brojeva.
3. Inicijaliziramo instrukcijski pointer na prvo mjesto (0). Iteriramo kroz program dok ne dođemo do kraja (kada instrukcijski pointer bude na kraju). Trenutno indeksirani broj u nizu je operacija, a broj iza njega operand. Izvršavamo komandu po uputama. U ovisnosti koji je broj operacije od 0 do 7, izvršava se specifična operacija, što rezultira novim stanjima registara, skokovima instrukcijskog pointera i izlazom programa. Mjesta gdje se koristi množenje ili dijeljenje s potencijama broja 2 optimizirano je kao bitshift.
4. Kada instrukcijski pointer dođe do kraja, ispisujemo izlaz programa kao string brojeva povezanih zarezima.

## Part 2

U "Part Two" zadatku, otkrivaš problem u uputama računala: program bi trebao ispisati svoju vlastitu kopiju, ali vrijednost u registru A je oštećena. Potrebno je pronaći novu početnu vrijednost za registar A koja će uzrokovati da upute programa proizvedu točnu kopiju samog programa.

Na primjer:

Početne vrijednosti:

Registar A: 2024
Registar B: 0
Registar C: 0
Program: 0,3,5,4,3,0

Ovaj program ispisuje svoju vlastitu kopiju ako je registar A inicijaliziran s vrijednošću 117440 (početna vrijednost 2024 se zanemaruje).

Cilj je pronaći najmanju pozitivnu početnu vrijednost za registar A koja će uzrokovati da program ispiše vlastitu kopiju.

### Rješavanje zadatka

TBD