# Day 14: Restroom Redoubt 


Primjer ulaznih podataka:

p=0,4 v=3,-3

p=6,3 v=-1,-3

p=10,3 v=-1,2

p=2,0 v=2,-1

p=0,0 v=1,3

## Part 1

Tvoj tim stiže do Easter Bunny Headquarters, ali prostor ispred kupaonice je prepun robota koji se kreću pravocrtnim putanjama. Svaki robot ima početnu poziciju i brzinu kojom se pomiče na ploči veličine 101×103 pločice. Kada robot dođe do ruba, teleportira se na suprotnu stranu (wrap-around mehanizam).

Zadatak je predvidjeti gdje će roboti biti nakon točno 100 sekundi te izbrojati ih u četiri kvadranta prostora. Na temelju broja robota u svakom kvadrantu računa se safety factor, koji se dobiva množenjem tih vrijednosti.

### Rješavanje zadatka

1. Učitavamo podatke iz vanjske .txt datoteke
2. Parsiramo ulazni niz na način: dijelimo ulazni niz na retke, iteriramo kroz sve retke. Koristeći regex prepoznajemo brojeve u svakom retku, i mapiramo ih u objekt, koji se sastoji od dva objekta, gdje je jedan početna pozicija robota (x,y) a drugi brzina robota po sekundi po x i y. Na kraju parsiranja imamo niz objekata gdje svaki predstavlja jednog robota.
3. Simuliramo kretanje robota kroz 100 sekundi: iteriramo za svaku sekundu svakog robota, računamo kombinacijom trenutne pozicije i brzine novu poziciju, i ako robot izlazi iz granica mape "teleportira" se na drugoj strani.
4. Iteriramo kroz sve robote i testiramo u kojem se kvadrantu nalaze. Ako se nalaze na središnjoj liniji po visini ili širini njih ne ubrajamo u nijedan kvadrant. Ugnježđenim nizom uvjeta (dijeljenje visine i širine po pola, gledamo na kojoj je strani) nalazimo u kojem se kvadrantu svaki robot nalazi.
5. Rješenje zadatka je umnožak svih ocjena kvadranta

## Part 2

Nakon pauze za toalet, netko primjećuje da su ovi roboti slični onima korištenima na Sjevernom polu. Ako su identični, trebali bi imati skriveni Uskrsni detalj: u rijetkim trenucima, većina robota bi se trebala poredati u oblik božićnog drvca.

Zadatak je pronaći najmanji broj sekundi koji mora proći da bi se roboti posložili u prepoznatljivi uzorak.

### Rješavanje zadatka

TBD