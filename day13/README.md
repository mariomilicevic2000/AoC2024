# Day 13: Claw Contraption

## Part 1

U tropima pronalaziš arkadne aparate s neobičnim claw (hvataljka) mehanizmom. Umjesto klasične kontrole, postoje samo dva gumba:

Gumb A - pomiče hvataljku određeni broj jedinica udesno (X) i naprijed (Y) te košta 3 žetona.
Gumb B - pomiče hvataljku drugačiji broj jedinica u X i Y smjeru te košta 1 žeton.
Svaka igračka u aparatu nalazi se na točno određenoj X, Y poziciji. Cilj je doći do te pozicije trošeći što manje žetona.

Trebaš pronaći:

Koliko igračaka možeš osvojiti?
Koliko je minimalno žetona potrebno za osvajanje svih mogućih igračaka?
Problem se svodi na rješavanje sustava linearnog diofantskog sustava(rješenja sustava su isključivo cijeli brojevi).

Neke igračke nije moguće osvojiti ako nema cijelobrojnih rješenja za x i y. Zadatak je pronaći sve moguće dobitke i ukupnu minimalnu cijenu.

### Rješavanje zadatka

1. Ulazni podaci se učitavaju iz vanjske .txt datoteke.
2. Ulazni niz se parsira na način da se iz seta po tri retka odvajaju podaci: prvi redak je pomak po x i y osi za pritisak A tipke, drugi redak je pomak za B tipku, a treći redak su koordinate nagrade.
3. Iterira se kroz listu za svaku mašinu, računa se rješenje sustava diofantskih jednadžbi. Dataset je tako namješten da svaka jednadžba ima točno jedno rješenje koje se lako dobije analitički linearnom eliminacijom. Ako bi omjer ispao 0, to bi značilo da postoji beskonačno rješenja, i nastavak bi bio implementacija proširenog Euklidovog algoritma, ali analizom ulaznih podataka dokazano je da takvi slučajevi nisu prisutni pa nije bilo potrebe za daljnom implementacijom
4. Rješenja jednadžbe daju broj pritisaka tipki A i B za dovesti kran do nagrade. Rješivi sustavi su oni koji imaju cjelobrojno rješenje budući da pritisak tipke ne može biti djelomičan.
5. Formulom za cijenu dobija se cijena svake mašine, a rješenje zadatka je ukupna cijena svih "rješivih" mašina.

## Part 2

Dok pokušavaš osvojiti prvu nagradu, otkrivaš da su sve nagrade zapravo 10¹³ jedinica više na X i Y osi zbog greške u konverziji jedinica.

Što se mijenja?
Svakoj nagradi treba dodati 10¹³ na obje osi prije izračuna.
To mijenja moguće kombinacije pritisaka gumba A i B.
Neke nagrade koje su prije bile dostupne sada više nisu, dok su druge moguće osvojiti, ali uz znatno veći broj pritisaka.
Zadatak:
S novim koordinatama nagrada, ponovno izračunaj najmanji broj tokena potreban za osvajanje što više nagrada.

### Rješavanje zadatka

1. Ovaj dio zadatka nije konceptualno različit od prvog dijela, i svodi se na modificiranje koda na način da može podržati manipulaciju s brojevima koji su za 10^13 veći. U TypeScriptu za to koristimo bigint tip podataka.