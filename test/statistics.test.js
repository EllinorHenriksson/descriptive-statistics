/**
 * Tests for the statistics module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @version 1.1.0
 */

import * as statistics from '../src/statistics.js'

// ------------------------------------------------------------------------------
//  Helpers
// ------------------------------------------------------------------------------

const ERROR_MESSAGE_NOT_AN_ARRAY = 'The passed argument is not an array.'
const ERROR_MESSAGE_NO_ELEMENTS = 'The passed array contains no elements.'
const ERROR_MESSAGE_ONLY_VALID_NUMBERS = 'The passed array may only contain valid numbers.'

/**
 * Tests the argument (exceptions and side effects).
 *
 * @param {Function} func - The function to test.
 */
const testArgument = (func) => {
  describe('exceptions', () => {
    it(`Passing anything but an array should throw TypeError with the custom message '${ERROR_MESSAGE_NOT_AN_ARRAY}'`, () =>
      testArgumentNotAnArray(func))

    it(`Passing an empty array should throw Error with the custom message '${ERROR_MESSAGE_NO_ELEMENTS}'`, () =>
      testArgumentNotAnEmptyArray(func))

    it(`Passing an array containing a value that is not of the type number should throw TypeError with the custom message '${ERROR_MESSAGE_ONLY_VALID_NUMBERS}'`, () =>
      testArgumentArrayNotJustNumbers(func))

    it(`Passing an array containing the value Number.NaN should throw TypeError with the custom message '${ERROR_MESSAGE_ONLY_VALID_NUMBERS}'`, () =>
      testArgumentArrayWithNaN(func))
  })

  describe('side effects', () => {
    it('Passing [4, 2, 6, 1, 3, 7, 5, 3] should return a value and not modify the argument', () =>
      testNotModifyArgument(func))
  })
}

/**
 * Tests if the specified function handles an argument
 * that is not an array correctly.
 *
 * @param {Function} func - The function to test.
 */
const testArgumentNotAnArray = (func) => {
  expect(() => {
    func(1)
    func('not an array')
    func(false)
    func(undefined)
    func({})
    func(null)
  }).toThrow(new TypeError(ERROR_MESSAGE_NOT_AN_ARRAY))
}

/**
 * Tests if the specified function handles an argument
 * that is an empty array correctly.
 *
 * @param {Function} func - The function to test.
 */
const testArgumentNotAnEmptyArray = (func) => {
  expect(() => func([])).toThrow(new Error(ERROR_MESSAGE_NO_ELEMENTS))
}

/**
 * Tests if the specified function handles an argument
 * that is an array containing a value that is not of type number correctly.
 *
 * @param {Function} func - The function to test.
 */
const testArgumentArrayNotJustNumbers = (func) => {
  expect(() => func([1, 2, 3, '4'])).toThrow(
    new Error(ERROR_MESSAGE_ONLY_VALID_NUMBERS)
  )
}
/**
 * Tests if the specified function handles an argument
 * that is an array containing the value Number.NaN.
 *
 * @param {Function} func - The function to test.
 */
const testArgumentArrayWithNaN = (func) => {
  expect(() => func([1, 2, 3, Number.NaN])).toThrow(
    new Error(ERROR_MESSAGE_ONLY_VALID_NUMBERS)
  )
}

/**
 * Tests if the specified function returns a value
 * without changing the argument.
 *
 * @param {Function} func - The function to test.
 */
const testNotModifyArgument = (func) => {
  const arg = [4, 2, 6, 1, 3, 7, 5, 3]
  const res = func(arg)
  switch (func.name) {
    case 'mode':
      expect(Array.isArray(res)).toBe(true)
      break

    case 'summary':
      expect(typeof res).toBe('object')
      break

    default:
      expect(typeof res).toBe('number')
      expect(res).not.toBeNaN()
      break
  }
  expect(arg).toEqual([4, 2, 6, 1, 3, 7, 5, 3])
}

// ------------------------------------------------------------------------------
//  average
// ------------------------------------------------------------------------------
describe('average', () => {
  describe('argument', () => testArgument(statistics.average))

  describe('return value', () => {
    it('passing [-2, 5, 1, 1, 5, 5, 2, -2, 2, -2] should return 1.5', () => {
      expect(statistics.average([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2])).toBe(1.5)
    })

    it('passing [-42, -84, -2, -3] should return -32.75', () => {
      const argument = [-42, -84, -2, -3]

      const returnValue = -32.75

      expect(statistics.average(argument)).toBe(returnValue)
    })
  })
})

// ------------------------------------------------------------------------------
//  maximum
// ------------------------------------------------------------------------------
describe('maximum', () => {
  describe('argument', () => testArgument(statistics.maximum))

  describe('return value', () => {
    it('passing [-2, 5, 1, 1, 5, 5, 2, -2, 2, -2] should return 5', () => {
      expect(statistics.maximum([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2])).toBe(5)
    })

    it('passing [-42, -84, -2, -3] should return -2', () => {
      expect(statistics.maximum([-42, -84, -2, -3])).toBe(-2)
    })
  })
})

// ------------------------------------------------------------------------------
//  median
// ------------------------------------------------------------------------------
describe('median', () => {
  describe('argument', () => testArgument(statistics.median))

  describe('return value', () => {
    it('passing [4, 2, 6, 1, 3, 7, 5, 3] should return 3.5', () => {
      expect(statistics.median([4, 2, 6, 1, 3, 7, 5, 3])).toBe(3.5)
    })

    it('passing [4, 2, 6, -1, 3, 5, 3] should return 3', () => {
      expect(statistics.median([4, 2, 6, -1, 3, 5, 3])).toBe(3)
    })
  })
})

// ------------------------------------------------------------------------------
//  minimum
// ------------------------------------------------------------------------------
describe('minimum', () => {
  describe('argument', () => testArgument(statistics.minimum))

  describe('return value', () => {
    it('passing [2, 5, 1, 1, 5, 5, 2, 2, 2, 2] should return 1', () => {
      expect(statistics.minimum([2, 5, 1, 1, 5, 5, 2, 2, 2, 2])).toBe(1)
    })

    it('passing [-42, -84, -2, -3] should return -84', () => {
      expect(statistics.minimum([-42, -84, -2, -3])).toBe(-84)
    })
  })
})

// ------------------------------------------------------------------------------
//  mode
// ------------------------------------------------------------------------------
describe('mode', () => {
  describe('argument', () => testArgument(statistics.mode))

  describe('return value', () => {
    it('passing [-2, 5, 1, 1, 5, 5, 2, -2, 2, -2] should return [-2, 5]', () => {
      expect(statistics.mode([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2])).toEqual([
        -2,
        5
      ])
    })

    it('passing [5, 1, 1, 5, 5, 1] should return [1, 5]', () => {
      expect(statistics.mode([5, 1, 1, 5, 5, 1])).toEqual([1, 5])
    })

    it('passing [5, 1, 5, 1, 5] should return [5]', () => {
      expect(statistics.mode([5, 1, 5, 1, 5])).toEqual([5])
    })

    it('passing [5.3, 5.3, 1.9, 1.9, 5.3] should return [5.3]', () => {
      expect(statistics.mode([5.3, 5.3, 1.9, 1.9, 5.3])).toEqual([5.3])
    })

    it('passing [3, 5, 2, -5, 9, 2, -5, 5, 10, 4, 1, 0, -1, 9, 0] should return [-5, 0, 2, 5, 9]', () => {
      expect(
        statistics.mode([3, 5, 2, -5, 9, 2, -5, 5, 10, 4, 1, 0, -1, 9, 0])
      ).toEqual([-5, 0, 2, 5, 9])
    })

    it('passing [42] should return [42]', () => {
      expect(statistics.mode([42])).toEqual([42])
    })
  })
})

// ------------------------------------------------------------------------------
//  range
// ------------------------------------------------------------------------------
describe('range', () => {
  describe('argument', () => testArgument(statistics.range))

  describe('return value', () => {
    it('passing [2, 5, 1, 1, 5, 5, 2, 2, -2, 2] should return 7', () => {
      expect(statistics.range([2, 5, 1, 1, 5, 5, 2, 2, -2, 2])).toBe(7)
    })

    it('passing [-42, -84, -2, -3] should return 82', () => {
      expect(statistics.range([-42, -84, -2, -3])).toBe(82)
    })
  })
})

// ------------------------------------------------------------------------------
//  standardDeviation
// ------------------------------------------------------------------------------
describe('standardDeviation', () => {
  describe('argument', () => testArgument(statistics.standardDeviation))

  describe('return value', () => {
    it('passing [1, 4, 3, 15, 72, 41, 30, 27, 72, 8, 42, 36, 33, 46, 44] should return a value close to 21.93', () => {
      expect(
        statistics.standardDeviation([
          1,
          4,
          3,
          15,
          72,
          41,
          30,
          27,
          72,
          8,
          42,
          36,
          33,
          46,
          44
        ])
      ).toBeCloseTo(21.93)
    })

    it('passing [30, 31, 33, 34, 35, 34, 28, 34, 33, 34, 36, 35, 32, 31, 32] should return a value close to 2.07', () => {
      expect(
        statistics.standardDeviation([
          30,
          31,
          33,
          34,
          35,
          34,
          28,
          34,
          33,
          34,
          36,
          35,
          32,
          31,
          32
        ])
      ).toBeCloseTo(2.07)
    })
  })
})

// ------------------------------------------------------------------------------
//  summary
// ------------------------------------------------------------------------------
describe('summary', () => {
  describe('argument', () => testArgument(statistics.summary))

  describe('return value', () => {
    it('passing [42] should return {average: 42, maximum: 42, median: 42, minimum: 42, mode: [42], range: 0, standardDeviation: 0}', () => {
      expect(statistics.summary([42])).toEqual({
        average: 42,
        maximum: 42,
        median: 42,
        minimum: 42,
        mode: [42],
        range: 0,
        standardDeviation: 0
      })
    })

    it('passing [4, 2, 6, 1, 3, 7, 5, 3] should return {average: 3.875, max: 7, median: 3.5, min: 1, mode: [3], range: 6, standardDeviation: 1.8998}', () => {
      // Get the summary and round standard deviation to 4 decimals.
      const summary = statistics.summary([4, 2, 6, 1, 3, 7, 5, 3])
      summary.standardDeviation =
         Math.round(summary.standardDeviation * 10000 + Number.EPSILON) / 10000

      expect(summary).toEqual({
        average: 3.875,
        maximum: 7,
        median: 3.5,
        minimum: 1,
        mode: [3],
        range: 6,
        standardDeviation: 1.8998
      })
    })
  })
})
