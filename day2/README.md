# Day 2: Red-Nosed Reports

Tekst zadatka dostupan je ovdje: https://adventofcode.com/2024/day/2

Primjer formata ulaznih podataka:
51 54 57 60 61 64 67 64

54 56 57 58 60 60

41 44 45 46 48 50 54

62 64 67 69 72 79

## Part 1

Inženjeri u nuklearnoj fuzijsko/rascjepnoj postaji Crvenog soba traže pomoć u analizi neobičnih podataka. Ti podaci sadrže izvještaje, svaki s popisom brojeva pod nazivom "nivoi".

Kako bi izvještaj bio siguran, potrebno je da zadovoljava dva uvjeta:

Nivoi moraju biti samo u porastu ili samo u opadanju.
Razlika između svaka dva uzastopna broja mora biti barem 1, a najviše 3.
Na temelju tih pravila, potrebno je analizirati izvještaje i odrediti koliko njih je sigurno.

### Rješavanje zadatka

1. Učitavanje i parsiranje ulaznih podataka iz vanjske .txt datoteke (podaci u formatu linija, svaka linija sadržava brojeve odvojene razmacima). Pretvaramo ulazni niz u zasebne linije.
2. Iteriramo kroz svaki redak (svaki redak je jedan izvještaj). Mapiramo svaki broj u niz koristeći regex koji prepoznaje razmake. Na deklarativni način, pomoću funkcije .every() umjesto for petlje, provjeravamo ispunjava li svaki uzastopni član uvjet da je niz strogo rastući ili padajući. Ako nije ni jedno ni drugo, prelazimo na sljedeći izvještaj preskačući aktualni redak jer ne ispunjava minimalni uvjet za "siguran" izvještaj.
3. Iteriramo kroz svaki član niza (razina u izvještaju) i provjeravamo je li izvještaj siguran na način da uspoređujemo je li međusobna razlika svaka dva uzastopna člana između 1 i 3. Ako ijedan od uzastopnih članova ne ispunjava uvjet, izvještaj nije siguran, u protivnom, izvještaj se pribrojava listi sigurnih.

Vrijeme izvršavanja: 4.692ms

## Part 2

Inženjeri su bili iznenađeni malim brojem sigurnih izvještaja sve dok nisu shvatili da su zaboravili spomenuti Problem Dampener – modul koji omogućuje sigurnosnim sustavima reaktora da zanemare jednu pogrešnu vrijednost u izvještaju.

Nova pravila ostaju ista kao i prije, ali sada se izvještaj smatra sigurnim ako uklanjanje jedne razine čini izvještaj valjanim. To znači da će određeni izvještaji, koji su prethodno bili nesigurni, sada moći biti klasificirani kao sigurni zahvaljujući ovom popravku.

Na temelju ovih novih pravila, potrebno je ponovno analizirati podatke i odrediti koliko izvještaja sada ispunjava sigurnosne kriterije.

### Rješavanje problema

1. Ovaj zadatak većinski se bazira na prethodnome, uz određene dodatke.
2. Nakon provjere je li siguran, ako nije prošao provjeru, izvještaj se ponovno iterira, ali ovaj put, prije provjere se uklanja jedna razina, pa se cijeli izvještaj ponovno šalje funkciji za provjeru. Ovo se realizira deklarativno, tako da se niz koristeći .slice() odvaja do indeksa, i konkatenacijom se na njega dodaje dio niza nakon indeksa, čime se zapravo isključuje član na indeksu.

Vrijeme izvršavanja: 8.786ms