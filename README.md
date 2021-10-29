# Examinationsuppgift A2 - Beskrivande statistik

## Introduktion

I denna examinationsuppgift ska du slutföra ett påbörjat projekt som syftar till att presentera beskrivande statistik över stora datamängder.

Beskrivande statistik (eller _deskriptiv statistik_; eng. "_descriptive statistics_") är ett sätt att reducera stora datamängder för att presentera en sammanfattning av datamängden.

## Uppgift

Din uppgift är att slutföra implementationen av modulen `statistics.js` vars exporterade funktioner kan användas för att reducera den datamängd som skickas som argument, i form av en array med värden av typen `number`, till dem.

Det är viktigt att du följer anvisningarna för `src/statistics.js` då modulerna `src/app.js` och `test/statistics.test.js` använder sig av den enligt beroendediagrammet nedan.

![Beroendediagram](https://gitlab.lnu.se/1dv025/templates/assignment-a2-descriptive-statistics/-/raw/main/.readme/dependency-graph.svg)

### src/statistics.js

Modulen ska exportera funktioner som kan bestämma maximum- och minimumvärden, variationsbredd ("_range_"), medelvärde ("_average_"), median, standardavvikelse ("_standard deviation_") samt typvärde ("_mode_", som kan vara en array med värden). Det ska även finnas en funktion som returnera ett objekt innehållande samtliga värden. Objektets egenskapers namn och typ framgår av JSDOC-kommentaren av den egendefinierade typen `StatisticalSummary`, som du finner i modulen.

```js
/**
* Module for obtaining statistical analysis about a set of data.
*
* @module src/statistics.js
* @author Johan Leitet <johan.leitet@lnu.se>
* @author Mats Loock <mats.loock@lnu.se>
* @author // TODO: Write your name here <Write your email address here>
* @version 1.1.0
*/

// ------------------------------------------------------------------------------
//  Type definitions
// ------------------------------------------------------------------------------

/**
 * Represents statistical summary.
 *
 * @typedef {object} StatisticalSummary
 * @property {number} average - The average value.
 * @property {number} maximum - The maximum value.
 * @property {number} median - The median value.
 * @property {number} minimum - The minimum value.
 * @property {number[]} mode - The mode value.
 * @property {number} range - The range value.
 * @property {number} standardDeviation - The standard deviation value.
 */

// ------------------------------------------------------------------------------
//  Public interface
// ------------------------------------------------------------------------------

// TODO: Write your code here.

/**
 * Returns several descriptive statistics (average, maximum, median, minimum,
 * mode, range, and standard deviation) from a set of numbers.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {StatisticalSummary} An object whose properties correspond to the descriptive statistics from the data set.
 */
export function summary (numbers) {
  // TODO: Write your code here.
}
```

Funktionerna `average` (#1), `maximum` (#2), `median` (#3), `minimum` (#4), `mode` (#5), `range` (#6) och `standardDeviation` (#7), ska exporteras varför dessa måste skapas och implementeras. Funktionen `summary` (#8) är påbörjad och exporteras men måste även den implementeras.

Exporterade funktioner i modulen `statistics.js` får inte ha några som helst sidoeffekter, utan ska var så kallade "_pure functions_". (#10)

De exporterade funktionerna ska validera indatat som skickas som argument och kasta undantag om indatat inte uppfyller ställda krav (#9). Ingen av de exporterade funktionerna får fånga några undantag (#14).

- Anropas någon av funktionerna med ett argument som inte är en array ska ett undantag av typen `TypeError` kastas innehållande meddelandet `The passed argument is not an array.`.
- Anropas någon av funktionerna med ett argument som refererar till en tom array, ska ett undantag av typen `Error` kastas innehållande meddelandet `The passed array contains no elements.`.
- Anropas någon av funktionerna med ett argument som refererar till en array vars element innehåller annat än bara värden av typen `number`, ska ett undantag av typen `TypeError` kastas innehållande meddelandet `The passed array may only contain valid numbers.`. __OBS!__ Värdet `Number.NaN` ska inte räknas som ett godkänt värde trots att det är av typen `number`.

Undvik om lämpligt att upprepa kod och bryt därför inte mot principen DRY ("Don't Repeat Yourself"). (#12)

All källkod måste följa kursens kodstandard. (#13)

Dokumentera __alla__ funktioner genom att använda JSDOC-kommentarer. Använd även radkommentarer inuti funktioner i de fall det är befogat. (#11)

## Tips

- Medelvärde, median, typvärde och variationsbredd, [http://www.matteboken.se/lektioner/matte-1/sannolikhet-och-statistik/medelvarde-median-typvarde-och-variationsbredd](http://www.matteboken.se/lektioner/matte-1/sannolikhet-och-statistik/medelvarde-median-typvarde-och-variationsbredd)
- Standardavvikelse, [http://www.matteboken.se/lektioner/matte-2/statistik/standardavvikelse](http://www.matteboken.se/lektioner/matte-2/statistik/standardavvikelse)
- Genom att köra enhetstesterna som kommer med examinationsuppgiften kan du undersöka om koden du skrivit löst uppgiften (i alla fall enligt bifogade enhetstester...).
