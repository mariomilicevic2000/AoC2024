# Day 1: Historian Hysteria

Tekst zadatka dostupan je ovdje: https://adventofcode.com/2024/day/1

Primjer formata ulaznih podataka:

68878   98732

24519   87903

73275   70114

87985   89419

## Part 1

Glavni povjesničar Sjevernog pola je nestao, a skupina starijih povjesničara pokušava ga pronaći istražujući povijesno značajne lokacije. Kako bi pronašli tragove, koriste popise lokacija iz ureda glavnog povjesničara.

Međutim, postoje dvije različite liste lokacija koje se ne podudaraju. Povjesničari trebaju pronaći način da ih usporede i utvrde koliko se razlikuju. Rješenje ovog problema ključno je za nastavak potrage i spas Božića.

### Rješenje zadatka

1. Učitavanje i parsiranje ulaznih podataka iz vanjske .txt datoteke (podaci su formatirani u dva stupca, odvajamo ih koristeći regex koji prepoznaje whitespace između stupaca)
2. Odvojene stupce spremamo u dva niza, koje sortiramo da bi ih mogli istovremeno uspoređivati
3. Iteriramo kroz oba niza istovremeno, sumirajući međusobne razlike članova s istim indeksom u varijablu, čime dobijamo sumu svih razlika članova dva niza

Vrijeme izvršavanja: 3.749ms

## Part 2

Nakon što su analize pokazale da se dvije liste ID-ova lokacija zapravo vrlo razlikuju, pojavila se sumnja da neki brojevi iz lijeve liste mogu biti prisutni i u desnoj listi. Povjesničari se ne slažu koja je skupina napravila greške u čitanju rukopisa, ali primjećuju da bi broj koji se ponavlja mogao biti ključ za daljnje rješenje.

U ovom zadatku potrebno je izračunati sličnostni rezultat između obje liste. To se postiže tako da se za svaki broj u lijevoj listi provjeri koliko puta se taj broj pojavljuje u desnoj listi, a zatim se rezultat pomnoži s brojem ponavljanja i zbroji za sve brojeve.

### Rješenje zadatka

1. Učitavanje i parsiranje ulaznih podataka iz vanjske .txt datoteke (podaci su formatirani u dva stupca, odvajamo ih koristeći regex koji prepoznaje whitespace između stupaca)
2. Odvojene stupce spremamo u dva niza, koje ovaj put ne sortiramo jer brojimo koliko se puta određeni broj pojavljuje, što ne zahtijeva sortiranu listu i štedi vrijeme jer se izbjegnu dvije O(n*log(n)) operacije.
3. Za desni stupac stvaramo mapu u kojoj, iterirajući kroz niz, brojimo koliko puta se određeni broj pojavljuje
4. Faktor sličnosti izračunavamo kao umnožak broja u lijevom stupcu (nizu) i broja ponavljanja tog broja u desnom stupcu, a konačni rezultat je suma svih faktora sličnosti. Iterirajući kroz lijevi niz, za trenutni broj pronalazimo u mapi broj ponavljanja u desnom nizu.

Vrijeme izvršavanja: 3.698ms
