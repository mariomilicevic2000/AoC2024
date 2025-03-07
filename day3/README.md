# Day 3: Mull It Over

Tekst zadatka dostupan je ovdje: https://adventofcode.com/2024/day/3

Primjer formata ulaznih podataka:

*how())@*mul(666,399)?mul(354,686)<%why()}#mul(449,25)<{@mul(298,550)'why()*select()mul(39,588)-:mul(255,532)when()

## Part 1

Dok Povjesničari pretražuju skladište, trgovac sjevernopolarnog dućana za najam tobogana zamoli vas za pomoć s računalnim problemom. Računalo pokušava pokrenuti program, ali mu je memorija oštećena, a sve upute su izmiješane.

Čini se da je cilj programa jednostavno množenje brojeva putem instrukcija oblika mul(X,Y), gdje su X i Y brojevi od jedne do tri znamenke. Međutim, zbog oštećenja memorije, pojavljuju se mnoge nevažeće sekvence koje treba ignorirati.

Zadatak je pronaći sve valjane instrukcije množenja unutar oštećene memorije, izračunati njihove rezultate i zbrojiti ih.

### Rješavanje zadatka

1. Učitavanje podataka iz vanjske .txt datoteke.
2. Imamo regex koji prepoznaje djelove teksta koji počinju sa mul i brojeve koji su obgrljeni zagradama, a između njih je zarez. Brojevi su podijeljeni u dvije capture grupe radi lakšeg pristupa.
3. Regex skuplja sva podudaranja iz teksta. Iteriramo kroz niz podudaranja, parsiramo iz niza brojeve, koje zatim množimo i zbrajamo s totalom.

Vrijeme izvršavanja je: 2.845ms

## Part 2

Dok analizirate oštećenu memoriju, primjećujete da su neki uvjetni izrazi ostali neoštećeni. Obradom tih uvjeta možete poboljšati točnost rezultata.

Sustav sada uključuje dvije nove instrukcije:

do() omogućava buduće mul instrukcije.
don't() onemogućava buduće mul instrukcije.
Na početku su mul instrukcije omogućene, ali samo najnovija do() ili don't() instrukcija određuje njihovo trenutno stanje.

U primjeru, određene mul instrukcije su isključene zbog prethodne don't() instrukcije, dok se na kraju mul ponovno omogućava pomoću do().

Zadatak je analizirati oštećenu memoriju i izračunati zbroj svih omogućanih množenja.

### Rješavanje zadatka

1. Princip je sličan kao u prvom dijelu. Sada regex, uz naredbu množenja, prepoznaje i do() i don't() naredbe
2. Iterirajući kroz niz podudaranja, vodimo računa je li boolean enabled istinit ili lažan, ovisnosti je li zadnja naredba "dopuštanja" bila do() ili don't(), što regulira hoće li trenutna naredba množenja biti izvršena i dodana ili preskočena.

Vrijeme izvršavanja: 2.667ms
