# Day 6: Guard Gallivant

## Part 1

Stražar iz 1518. godine patrolira laboratorijem prema strogim pravilima kretanja: ako ispred sebe naiđe na prepreku (#), okreće se udesno za 90 stupnjeva, a ako nema prepreke, nastavlja se kretati ravno. Ulazni podaci sadrže kartu laboratorija koja prikazuje prepreke i početni položaj stražara zajedno s njegovim početnim smjerom. Cilj je predvidjeti putanju stražara i odrediti koliko različitih pozicija obiđe prije nego što napusti mapirano područje.

### Rješavanje zadatka

1. Učitavamo ulazne podatke iz vanjske .txt datoteke, i onda ih dijelimo na redove u niz stringova i konačno na dvodimenzionalni niz znakova.
2. Budući da se radi o mapi koja ima konstantnu visinu i širinu, dohvaćamo njene dimenzije i koristimo ih preko varijable.
3. Dohvaćamo početnu poziciju stražara tako da iteriramo kroz dvodimenzionalni niz mape i kada pronađemo jedan od simbola koji označavaju trenutnu orijentaciju stražara, pronašli smo njegovu poziciju.
4. Posjećena mjesta radi optimizacije i činjenice da je rješenje zadatka broj mjesta koja smo posjetili a ne broj pomaka, spremamo posjećena mjesta u Set.
5. Glavnu petlju vrtimo sve dok pozicija stražara ne izađe iz granica mape: mijenjamo poziciju (pomičemo) stražara u ovisnosti o njegovoj trenutnoj orijentaciji. U ovisnosti o trenutnoj orijentaciji, iz key-value niza dohvaćamo o kojem se x-y pomaku radi.
6. Provjeravamo je li taj pomak izvan granica mape, ako je, mijenjamo vrijednost booleana preko kojeg ćemo zaustaviti izvođenje petlje u glavnom dijelu programa
7. Ako polje na koje se pokušavamo pomaknuti nije zid, upisujemo mjesto u mapi sa X kao posjećeno i upisujemo poziciju stražara na novo mjesto, ako je polje zid (#), mijenjamo vrijednost booleana da u glavnoj petlji promijenimo orijentaciju stražara udesno.
8. Ako je boolean koji označava izlaz iz mape istinit, zaustavljamo petlju. Ako je potez moguć, dodajemo ga u set posjećenih. Ako nije, ažuriramo orijentaciju udesno.
9. Rješenje zadatka je broj jedinstvenih mjesta koje je stražar posjetio prije nego je izašao iz mape.

Vrijeme izvršavanja: 19.905ms

## Part 2

Povjesničari shvaćaju da je stražareva patrolna ruta prevelika da bi mogli sigurno pretražiti laboratorij. Stoga predlažu postavljanje jedne nove prepreke kako bi stražar zapeo u beskonačnoj petlji, omogućujući im sigurno istraživanje.

Prepreka ne smije biti postavljena na početnoj poziciji stražara, ali postoji više mogućih mjesta gdje bi mogla uzrokovati beskonačno kretanje. Primjeri pokazuju šest različitih pozicija gdje bi nova prepreka mogla učinkovito blokirati stražara.

Cilj je pronaći broj mogućih lokacija za postavljanje prepreke kako bi stražar ostao zarobljen u petlji.

### Rješavanje zadatka

1. Ključ zadatka je shvatiti da se stražar nalazi u beskonačnoj petlji ako se nakon postavljanja nove zapreke nađe na mjestu koje je već posjetio s istom orijentacijom

TBD