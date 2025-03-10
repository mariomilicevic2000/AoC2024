# Day 15: Warehouse Woes

Primjer ulaznih podataka:

##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^

## Part 1

Lanternfishi su zabrinuti jer je robot koji upravlja njihovim skladištem izmakao kontroli i nasumično pomiče kutije. Robot se kreće prema unaprijed zadanim uputama (^, v, <, >), ali njegovi pokreti mogu biti ograničeni zidovima ili drugim kutijama.

Zadatak je simulirati kretanje robota i kutija unutar skladišta, uz poštivanje pravila sudara i pomicanja. Nakon što robot završi sve pokrete, treba izračunati ukupnu GPS sumu svih kutija, gdje se GPS koordinata svake kutije računa kao: 100*udaljenost od vrha + udaljenost od lijevog ruba, i konačni raspored skladišta

### Rješavanje zadatka

1. Učitavamo ulazne podatke iz vanjske .txt datoteke
2. Parsiramo ulazni niz: dijelimo ga na retke. Ako red sadržava #, znači da je taj red dio mape skladišta jer svaki red mape sadržava zid. Pratimo indekse do kraja mape i onda te redove učitavamo u niz redova koji predstavljaju mapu. Ostali redovi nakon praznoga reda su onda instrukcije za micanje robota, koje učitavamo u niz charactera koji predstavljaju red naredbi.
3. Unaprijed definiramo Record kojim trenutnu naredbu mijenjamo tupleom koji za svaku naredbu opisuje pomak po x i y osi.
4. Iteriramo kroz cijelu mapu kako bi pronašli poziciju robota
5. Iteriramo kroz sve pokrete koje robot sekvencijalno odrađuje: za svaki pokret prvo gledamo koliko ako robot ima ispred sebe u tom smjeru kutiju i koliko ih ima: te kutije će se, ako imaju prostora ispred sebe, sve pomaknuti za jedno mjesto. Pronalazimo koliko kutija ima. Ako je sljedeće mjesto nakon kutija prazno, iteriramo po kutijama unazad i pomičemo svaku za jedno mjesto "naprijed", i na kraju pomičemo robota također. Ako se "ispred" nalazi zid, ni robot ni potencijalne kutije se ne pomiču nego iteracija nastavlja na sljedeću instrukciju.
6. Iteriramo kroz cijelu mapu skladišta i za svaku kutiju računamo njen GPS score. Rezultat zadatka je zbrojeni GPS score svih kutija.

## Part 2

U ovoj verziji zadatka, mapa skladišta je proširena tako da je širina svakog elementa u mapama udvostručena. Robot i njegovi pokreti ostaju isti, ali se mapa mijenja prema sljedećim pravilima:

Ako je ćelija # (zid), nova mapa će sadržavati ##.
Ako je ćelija O (kutija), nova mapa će sadržavati [].
Ako je ćelija . (prazno polje), nova mapa će sadržavati ...
Ako je ćelija @ (robot), nova mapa će sadržavati @..
Kao rezultat toga, nova mapa će biti dvostruko šira, dok robot i dalje ima istu veličinu i brzinu. Također, kutije su sada dvostruko šire, što omogućava robotu da istovremeno pomiče dvije kutije.

Nakon što se robot pomiče prema zadanim uputama, potrebno je izračunati sumu GPS koordinata kutija ([]). GPS koordinata kutije izračunavaju se na isti način, ali se sada udaljenost mjeri od najbližeg ruba kutije.

### Rješavanje zadatka

TBD