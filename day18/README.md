# Day 18: RAM Run

## Part 1

U zadatku "Day 18: RAM Run", vi i Povjesničari nalazite se unutar računala na Sjevernom polu. Program upozorava da područje memorije nije sigurno jer algoritam korisnika brzo ispunjava memorijski prostor bajtovima. Svaki bajt dolazi u vašu memoriju jednom svakih nekoliko nanosekundi.

Vaš memorijski prostor je dvodimenzionalna mreža s koordinatama od 0 do 70, a vaš zadatak je doći do izlaza smještenog u donjem desnom kutu mreže (u primjeru sa manjim prostorom, izlaz je na koordinatama 6,6).

Svaka koordinata koja prima bajt postaje "korumpirana" i više nije sigurna za kretanje. Morate planirati putovanje, simulirajući pad bajtova i tražeći siguran put kako biste došli do izlaza, izbjegavajući korumpirane točke.

Nakon što su prve četiri stotine bajtova pale na memoriju, potrebno je izračunati minimalni broj koraka potrebnih za dolazak do izlaza, izbjegavajući korumpirane točke i ne izlazeći izvan granica memorijskog prostora.

### Rješavanje zadatka

1. Ulazni podaci učitavaju se iz vanjske .txt datoteke.
2. Parsiramo ulazni niz na način da ga dijelimo na retke. Svaki redak su dva broja koji se odjeljuju zarezom: x i y koordinate korumpiranog bita koji pada na te koordinate u RAM-u (mapi).
3. Sortiramo niz koordinata prvo po x, pa y koordinati.
4. Inicijaliziramo dvodimenzionalnu mapu zadanih dimenzija. Za svako mjesto koje se nalazi u listi korumpiranih bitova, mijenjamo vrijednost tog polja na istinito, što označava da se tim poljem ne može kretati.
5. Poanta je pronaći kroz zapreke najbliži put od (0, 0) do (70, 70), što realiziramo BFS(Breadth-First Search) algoritmom.
6. Unaprijed radimo niz objekata koji predstavljaju pomake po x i y osi za svaki od četiri moguća smjera kretanja
7. U BFS algoritmu dodajemo prvo red u kojem za svaku točku označavamo njene koordinate i najmanji broj koraka za doći do nje, i mapu prostora u kojoj označavamo već posjećene koordinate. Označavamo početnu koordinatu kao posjećenu.
8. Iteriramo dok god ima članova reda: eliminiramo prvi član reda i obrađujemo ga. Ako su njegove koordinate jednake koordinatama cilja, pronašli smo broj koraka. Iteriramo kroz sve moguće pomake iz trenutne točke i ako se nalazi u granicama mape, dodajemo je na kraj reda.
9. Rješenje zadatka je broj koraka do cilja.

Vrijeme izvršavanja: 15.919ms

## Part 2

U ovom dijelu, cilj je pronaći prvi bajt koji će blokirati put do izlaza iz memorijskog prostora. Na početku, bajtovi padaju u memorijski prostor i oštećuju određene lokacije. Nakon što svaki bajt padne, potrebno je provjeriti je li put od početne točke (gornji lijevi kut) do izlaza (donji desni kut) još uvijek dostupan.

U primjeru, nakon što prvi bajt padne na koordinatama (1,1), put je još uvijek slobodan. Međutim, nakon što drugi bajt padne na koordinatama (6,1), izlaz postaje nedostupan.

Zadatak je simulirati pad bajtova i pronaći koordinate prvog bajta koji blokira izlaz, odnosno sprječava daljnje kretanje od početne točke do cilja.

### Rješavanje zadatka

1. Nadograđujemo prethodni zadatak na način da sada obrađujemo i ostatak ulaznog niza nakon prvih 1024 bita. Budući da smo dobili koliki je put do kraja ako padne 1024 bita, znači da dotad sigurno postoji prolaz i ne moramo provjeravati prvih 1024 reda ulaznog niza.
2. Za daljnje bitove obrađujemo jedan po jedan, i kada dodamo novi bit u mapu, ako BFS vrati -1, znači da put do kraja ne postoji i taj bit koji je dodan u toj iteraciji je uzrok, pa printamo njegove koordinate, koje su rješenje zadatka.

Vrijeme izvršavanja: 641.897ms (postoji prostor za optimizaciju tako da je memoizira prijašnje stanje BFS algoritma prije dodavanja novog bita, te se nastavi samo za dodatni bit)