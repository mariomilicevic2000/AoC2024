# Day 5: Print Queue

Tekst zadatka dostupan je ovdje: https://adventofcode.com/2024/day/5

Primjer formata ulaznih podataka:

66|44

14|81

14|63

95|17

95|47

95|81

## Part 1

U tiskari Sjevernog pola potrebno je ispisati nove sigurnosne priručnike, ali stranice moraju biti ispisane određenim redoslijedom. Pravila ispisa definiraju da ako su obje stranice X i Y u ažuriranju, X mora biti ispisan prije Y.

Ulazni podaci sadrže dvije sekcije:

Pravila ispisa u formatu X|Y, koja određuju redoslijed stranica.
Popise stranica za svako ažuriranje, koje treba provjeriti prema pravilima.
Cilj je identificirati ažuriranja koja već poštuju zadana pravila. Za svako ispravno ažuriranje određuje se srednja stranica u redoslijedu ispisa, a njihov zbroj daje konačni rezultat.

### Rješavanje zadatka

1. Učitavamo ulazne podatke iz vanjske .txt datoteke i dijelimo ih na retke
2. Parsiramo ulazne redove na način da je prva sekcija do prazne linije red pravila koja se primjenjuju na način da se stranica prije znaka "|" ispisuje prije stranice iza znaka "|". Zbog toga, spremamo pravila na način da za svaku stranicu instanciramo Mapu gdje je ključ broj stranice prije, a vrijednosti su niz brojeva stranica koji dolaze iza. Iteriramo kroz redove, tako da do prazne linije spremamo po ovom pravilu. Odvajamo lijevi i desni broj oko "|". Ako postoji u mapi ključ, spremamo broj iza u niz. Ako ga nema, dodajemo ključ i broj iza. Nakon što naletimo na prazni red, dalje se radi o drugom dijelu i spremamo ažuriranja u dvodimenzionalni niz, gdje je svaki red niz brojeva u pojedinom ažuriranju.
3. Iteriramo kroz listu ažuriranja: za svako ažuriranje provjeravamo je li ispravno i primjenjivo na način da: provjeravamo za svaki broj u ažuriranju jesu li svi brojevi koji dolaze nakon njega u skladu s pravilima iz mape. Ako pronađemo bilo kakvo kršenje pravila (stranica koja dolazi prije neke druge, iako bi trebala biti iza nje), ažuriranje smatramo neispravnim. U suprotnom, ažuriranje je valjano i možemo ga uzeti u obzir.
4. Za svako ispravno ažuriranje, pronalazimo indeks srednje stranice u nizu i uzimamo njenu vrijednost i dodajemo je ukupnom zbroju srednjih stranica točnih ažuriranja, što je rješenje zadatka.

Vrijeme izvođenja: 5.945ms

## Part 2

Drugi dio zadatka zahtijeva da pronađemo sva ažuriranja koja nisu u ispravnom redoslijedu i da ih posložimo prema pravilima.

Nakon što identificiramo neispravna ažuriranja, trebamo ih sortirati tako da poštuju zadana pravila, tj. svaka stranica mora doći nakon svih stranica koje prema pravilima dolaze prije nje.

Kada ispravimo redoslijed neispravnih ažuriranja, ponovno uzimamo srednju stranicu iz svakog od njih i zbrajamo ih kako bismo dobili konačan rezultat.

Program na kraju ispisuje ukupan zbroj srednjih stranica nakon što su neispravna ažuriranja dovedena u ispravan redoslijed.

### Rješavanje zadatka

TBD