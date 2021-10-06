/**
 * Module for obtaining statistical analysis about a set of data.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
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
 * Returns the average value for all numbers in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The average value.
 */
function average (numbers) {
  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length
}

/**
 * Returns the highest value in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The highest value.
 */
function maximum (numbers) {
  return Math.max(...numbers)
}

/**
 * Returns the median value of the numbers in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The median value.
 */
function median (numbers) {
  const copyNumbers = Array.from(numbers)
  copyNumbers.sort((a, b) => a - b)
  let medianValue

  if (copyNumbers.length % 2 !== 0) {
    const i = Math.trunc(copyNumbers.length / 2)
    medianValue = copyNumbers[i]
  } else {
    const i = copyNumbers.length / 2 - 1
    const ii = copyNumbers.length / 2
    medianValue = (copyNumbers[i] + copyNumbers[ii]) / 2
  }

  return medianValue
}

/**
 * Returns the lowest value in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The lowest value.
 */
function minimum (numbers) {
  return Math.min(...numbers)
}

/**
 * Returns the mode value(s) of the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number[]} The mode value(s).
 */
function mode (numbers) {
  const frequencyTable = {}

  // Adds the numbers of numbers as keys to frequencyTable and gives them a value corresponding to how many times they occur in the array
  for (const number of numbers) {
    if (frequencyTable[number]) {
      frequencyTable[number] += 1
    } else {
      frequencyTable[number] = 1
    }
  }

  const maxFrequency = Math.max(...Object.values(frequencyTable))
  const modeValues = []

  // Adds all keys in frequencyTable that are equal to maxFrequency to modeValues
  for (const key of Object.keys(frequencyTable)) {
    if (frequencyTable[key] === maxFrequency) {
      modeValues.push(key)
    }
  }

  return modeValues
}

/**
 * Returns the range value of the numbers in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The range value.
 */
function range (numbers) {
  return Math.max(...numbers) - Math.min(...numbers)
}

/**
 * Returns the standard deviation value for the numbers in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The standard deviation value.
 */
function standardDeviation (numbers) {
  const averageValue = numbers.reduce((sum, value) => sum + value, 0) / numbers.length

  const squaredDifference = numbers.map(value => {
    return (value - averageValue) ** 2
  })

  return Math.sqrt(squaredDifference.reduce((sum, value) => sum + value, 0) / squaredDifference.length)
}

/*
const array = [4, 8, 2, 4, 5]
const result = standardDeviation(array)
console.log(`The original array is: ${array}`)
console.log(`The return value is: ${result}`)
*/

/**
 * Returns several descriptive statistics (average, maximum, median, minimum,
 * mode, range and standard deviation) from a set of numbers.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {StatisticalSummary} An object whose properties correspond to the descriptive statistics from the data set.
 */
export function summary (numbers) {
  // TODO: Write your code here.

  const StatisticalSummary = {}

  StatisticalSummary.average = average(numbers)
  StatisticalSummary.maximum = maximum(numbers)
  StatisticalSummary.median = median(numbers)
  StatisticalSummary.minimum = minimum(numbers)
  StatisticalSummary.mode = mode(numbers)
  StatisticalSummary.range = range(numbers)
  StatisticalSummary.standardDeviation = standardDeviation(numbers)

  return StatisticalSummary
}

/*
console.log(summary([4, 8, 2, 4, 5]))
*/