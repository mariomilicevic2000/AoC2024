#

Primjer ulaznih podataka: 

8165752
14569926
3767076
15353339
2278086
9212326
11684913

## Part 1

U zadatku "Monkey Market", morate pomoći The Historiansima da vrate svoj uređaj koji je ukrao majmun. Kako bi to postigli, moraju kupiti dovoljno banana na tržištu, gdje se cijene banana temelje na pseudorandom brojevima koje generiraju kupci.

Svaki kupac koristi početni tajni broj koji se mijenja kroz nekoliko matematičkih koraka. Svaka promjena uključuje množenje, dijeljenje, bitwise XOR operacije i na kraju "prunanje" broja pomoću modulo operacije. Ovaj proces omogućava kupcima da generiraju sljedeći tajni broj.

Kupci generiraju do 2000 novih tajnih brojeva svakog dana. Ako poznajete početni tajni broj svakog kupca, možete predvidjeti cijene koje će generirati. Na temelju početnog broja svakog kupca, potrebno je simulirati generaciju 2000 novih tajnih brojeva za svakog kupca i izračunati ukupnu sumu 2000. tajnog broja generiranog od svakog kupca.

Za primjer početnih brojeva 1, 10, 100 i 2024, 2000. tajni brojevi iznose 8685429, 4700978, 15273692 i 8667524, a ukupna suma tih brojeva je 37327623.

### Rješavanje zadatka

1. Učitavamo ulazne podatke iz vanjske .txt datoteke
2. Budući da će rezultantni brojevi biti veliki i neće moći biti prikazani običnim number tipom podatka, u zadatku koristimo bigint. Dijelimo ulazni niz na redove, gdje je svaki red početna tajna jednog kupca, spremamo u niz biginta.
3. Iteriramo kroz niz svih kupaca, za svakog kupca koristimo tajnu za generiranje sljedeće i tako 2000 puta. Tajnu koja je 2000. u nizu koristimo da bi dodali ukupnom zbroju koji je rješenje zadatka. Tajna se generira eksponenciranjem, množenjem i dijeljenjem po zadanim pravilima kroz 3 koraka.

Vrijeme izvođenja: 653.034ms

## Part 2

U zadatku "Monkey Market" (Dio 2), cijene koje kupci nude nisu tajni brojevi, već poslednje znamenke tih brojeva. Kupci generiraju cijene kroz pseudorandom brojeve, a vi trebate predvidjeti kada će promjena cijena pratiti određeni niz.

Majmun koji pregovara o cijeni nije u mogućnosti direktno pregovarati, već gleda promjene cijena. Majmun će tražiti specifičan niz od četiri uzastopne promjene cijena, te odmah prodati kad prepozna taj niz. Vaš zadatak je odabrati niz od četiri promjene cijena koji će generirati najviše banana u ukupnom broju prodaja, kroz sve kupce.

Na temelju početnih brojeva svakog kupca, morate simulirati promjene cijena i pronaći niz promjena koji će uzrokovati najviše prodaja za sve kupce. Primjerice, za početne brojeve 1, 2, 3 i 2024, niz promjena -2, 1, -1, 3 donosi ukupno 23 banane (7+7+9).

Cilj je pronaći najbolji niz promjena koji će rezultirati najvećim brojem banana kroz sve kupce.

### Rješavanje zadatka

1. Učitavamo ulazni niz iz vanjske .txt datoteke
2. Sada za svakog kupca generiramo 2000 tajni, ali spremamo samo zadnju znamenku tajne koja je prava cijena banane i uz nju spremamo promjenu od znamenke prošle tajne. Time dobijamo dvodimenzionalni niz koji za svakog kupca sadrži 2000 različitih cijena i njihovih međusobnih relativnih promjena.
3. Kako moramo pronaći koja sekvenca od 4 promjene daje najveći broj banana na kraju, moramo generirati sve moguće sekvence četveročlanog niza brojeva gdje su valjane promjene između -9 i 9, dakle 19^4 kombinacija, ali filtriramo one koje neće završiti profitom (kada je zadnji broj manji od prvog).
4. Iteriramo kroz sve moguće sekvence i za svaku sekvencu pratimo koliko ukupno banana proizvede. Iteriramo kroz sve liste kupčevih cijena za svakog kupca, i ukoliko pronađemo trenutnu sekvencu u nizu, računamo koliki je profit banana, i spremamo u total, i nastavljamo na idućeg kupca. Ako je sekvenca proizvela više banana nego prošla, spremamo je kao najbolju.
5. Rješenje zadatka je sekvenca promjena koja proizvodi najveći broj banana

Vrijeme izvršavanja: nepoznato(implementacija sadržava mnogo ugnježđenih petlji te se vjerojatno može poboljšati korištenjem hash mape i pametnijih odabira)
