

## Prerekvizity

**VS Code + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)**
**Node.js** verzia `>=22.12.0`
Chuť do života

## Otváram projekt prvý krát
uistím sa, že mám aj Node.js aj npm manager
```
node -v
npm -v
```

naklonujem repo lokálne ako vždy, napr.:

```
git clone https://github.com/Daro49/Custom_Bar.git
```

a následne doinštalujem všetky potrebné knižnice **npm run install** a môžem spustiť aplikáciu za pomoci **npm run dev**.

```
cd Custom_Bar
npm run install
npm run dev
```

- keď už raz zapnem **npm run install**, nemusím už pri robení projektu tento príkaz spustiť samozrejme.

## Popis zloženia projektu

### src
where the magic happens

- **assets**
  všetky obrázky a čo ja viem čo 3rd party budeme používať
  

- **components**
  Tu si môžme nadefinovať všetky veľa krát používané komponenty v UI a používať ich na viacerých miestach, tak isto ako fungujú komponenty vo Figme (tlačitka, headere)


- **router**
  nemalo by byť treba až tak zasahovať, ale je tam zapísaná štruktúra jednotlivých stránok, ako majú byť medzi sebou poprepájané. Disclaimer, na všetky stránky okrem Mainu je použitý **lazy-loading**, ktorý načíta stránku až keď bude potrebná


- **stores**
  mal by sa používať na vytváranie .js súborov s funkciami a premennými, ktoré sú zachované po prepnutí stránok. T.j. prejdeš z Profilu do hociktorého iného pohľadu a stále si ten istý user


- **views**
  Samotné stránky


- **App.vue**
  Vstupný UI aplikácie


- **main.js**
  Vstupný script

### package.json
Knižnice potrebné pre projekt. Budú stiahnuté s **npm run install**

### Pridané knižnice
- **Router a Pinia**
  Router pre navigáciu medzi stránkami. Pinia korešponduje so **stores** priečinkom, knižnica pre zachovávanie stavu medzi stránkami.


- **Prettier**
  Formátuje všetky súbory na prednastavnú .editorconfig štýl, t.j. šírka tabu, formátovanie zátvoriek...
  ```
  npm run format
  ```
  *prečítaním tohto textu prehlasujem, že vždy pred commitom spustím tento príkaz, lebo Daro vie kde bývam a nemám zamknutú schránku*


- **ESLint**
  Niečo ako ta chujovina v IPP, ktora kontrolovala kvalitu PHP kódu. Basically statická analýza Javascript kódu, či je všetko A'Okay
  ```
  npm run lint
  ```

## Inšpirácia

Pri vytváraní priečinku Vue vytvorilo aj example aplikáciu, ktorú som nechal na branchy menom **official-example**, keby náhodou nie je niečo jasné + nejaké užitočné linky s Vue.js a rýchly tutoriál, ktorý sa mi veľmo lúbil

- [Rýchly introduction k Vue.js](https://vuejs.org/tutorial)
- [Docs k Vue.js](https://vuejs.org/guide)