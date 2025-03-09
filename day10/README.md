# Day 10: Hoof It

## Part 1

Nalazite se u tvornici lave na lebdećem otoku, gdje srećete soba s kacigom. On vam daje topografsku kartu koja prikazuje visinu terena (od 0 do 9).

Vaš zadatak je pronaći i označiti planinarske staze na temelju oštećenog vodiča. Staze moraju:

Započeti na visini 0 (tzv. trailhead).
Završiti na visini 9.
Kretati se samo gore, dolje, lijevo ili desno (ne dijagonalno).
Visina se mora povećavati za točno 1 po koraku.
Svaki trailhead ima score koji predstavlja broj različitih krajnjih točaka (visina 9) do kojih može doseći putem validne staze. Ukupni zadatak je izračunati zbroj svih score-ova za sve trailhead-ove na karti.

Sob veselo donosi još opreme, a vi krećete u analizu karte.

### Rješavanje zadatka

1. Čitanje ulaznih podataka iz vanjske .txt datoteke
2. Ulazni string se dijeli na dvodimenzionalni niz brojeva koji označavaju visinu pozicije na toj koordinati.
3. Definirali smo koristeći interface strukturu objekta za lakše baratanje, koja sadrži x i y koordinate, vrijednost polja i djeca (niz objekata), u svrhu stvaranja grafa.
4. Iteriramo kroz sve brojeve u dvodimenzionalnom nizu (mapi) i ako je trenutno polje jednako nuli, iz njega gradimo graf kojim koristeći DFS (Depth - First Search) pronalazimo sve povezane puteve
5. Memoiziramo u mapu već kreirane čvorove kako bi izbjegli ponovno računanje za iste koordinate (pamćenje puta). Koristimo memo u rekurzivnoj DFS funkciji.
6. Ako ključ (x,y u obliku stringa) već postoji, vraćamo ključ. Ako ne postoji, uzimamo trenutne koordinate, stvaramo node s praznom listom djece i dodajemo ga u memo. Ako je vrijednost 9, to je rub staze i vraćamo taj node. U protivnom, iteriramo kroz sve moguće smjerove i tražimo koji ima sljedeću vrijednost (za 1 veću) i nad tim poljem rekurzivno pozivamo DFS. 
7. Kada smo izgradili sve grafove, cilj je pronaći koliko grafova ima list node iznosa 9, koji označava da put vodi do vrha planine. Koristimo funkciju u kojoj memoiziramo koje smo nodeove posjetili. Provjeravamo je li node posjećen, ako je vraćamo se korak u nazad, ako nije, dodajemo ga u memoiziranu listu posjećenih. Ako je trenutni node list (nema djece) i vrijednosti 9, pribrajamo to kao put do vrha planine. Rekurzivno posjećujemo svu djecu trenutnog nodea.
8. Konačno rješenje je broj staza kojim je moguće doći do vrha planine.

Vrijeme izvršavanja: 21.778ms

## Part 2

Reindeer pronalazi novi, djelomično spaljeni papir koji opisuje drugi način mjerenja početnih točaka (trailheadova) - rating.

Rating je broj različitih mogućih planinarskih staza koje započinju na određenom trailheadu.
Primjeri pokazuju kako različite početne točke mogu imati više mogućih staza do 9, što čini njihov rating većim.

Cilj je izračunati zbroj ratinga svih trailheadova na danoj karti.

### Rješavanje zadatka

1. Ovaj zadatak je sličan prošlome, samo je poanta ovog dijela pobrojati ratinge svih trailheadova koji su definirani kao broj mogućih staza na svakom trailheadu
2. Funkcija countDistinctPaths rekurzivno pobrojava sve puteve iz svakog trailheada i koristi memoizaciju kako bi spremila već poznate puteve.