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
 * Throws exceptions if the passed argument is not an array, if it does not contain any elements or if not all elements are numbers.
 *
 * @param {number[]} numbers - The value to be validated.
 */
function validation (numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError('The passed argument is not an array.')
  }

  if (numbers.length === 0) {
    throw new Error('The passed array contains no elements.')
  }

  if (numbers.some(x => typeof x !== 'number' || isNaN(x))) {
    throw new TypeError('The passed array may only contain valid numbers.')
  }
}

/**
 * Returns the average value for all numbers in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The average value.
 */
export function average (numbers) {
  validation(numbers)

  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length
}

/**
 * Returns the highest value in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The highest value.
 */
export function maximum (numbers) {
  validation(numbers)

  return Math.max(...numbers)
}

/**
 * Returns the median value of the numbers in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The median value.
 */
export function median (numbers) {
  validation(numbers)

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
export function minimum (numbers) {
  validation(numbers)

  return Math.min(...numbers)
}

/**
 * Returns the mode value(s) of the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number[]} The mode value(s).
 */
export function mode (numbers) {
  validation(numbers)

  const frequencyTable = {}

  // Adds the numbers of numbers as keys to frequencyTable and gives them a value corresponding to how many times they occur in the array.
  for (const number of numbers) {
    if (frequencyTable[number]) {
      frequencyTable[number] += 1
    } else {
      frequencyTable[number] = 1
    }
  }

  const maxFrequency = Math.max(...Object.values(frequencyTable))
  const modeValues = []

  // Adds all keys in frequencyTable that are equal to maxFrequency to modeValues.
  for (const key of Object.keys(frequencyTable)) {
    if (frequencyTable[key] === maxFrequency) {
      modeValues.push(key)
    }
  }

  // Converts the elements from strings to numbers.
  const modeValuesAsNumbers = modeValues.map(Number)

  // Sorts the numbers in ascending order.
  const sortedModeValues = modeValuesAsNumbers.sort((a, b) => a - b)

  return sortedModeValues
}

/**
 * Returns the range value of the numbers in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The range value.
 */
export function range (numbers) {
  validation(numbers)

  return Math.max(...numbers) - Math.min(...numbers)
}

/**
 * Returns the standard deviation value for the numbers in the passed array.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @returns {number} The standard deviation value.
 */
export function standardDeviation (numbers) {
  validation(numbers)

  const averageValue = numbers.reduce((sum, value) => sum + value, 0) / numbers.length

  const squaredDifference = numbers.map(value => {
    return (value - averageValue) ** 2
  })

  return Math.sqrt(squaredDifference.reduce((sum, value) => sum + value, 0) / squaredDifference.length)
}

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
  validation(numbers)

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
