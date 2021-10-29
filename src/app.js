/**
 * The starting point of the application.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @version 1.1.0
 */

import { summary } from './statistics.js'

try {
  let result = summary([4, 8, 2, 4, 5])
  console.log(result)

  result = summary([4, 2, 6, 1, 3, 7, 5, 3, 7])
  console.log(result)

  result = summary([5, 1, 1, 1, 3, -2, 2, 5, 7, 4, 5, 16])
  console.log(result)
} catch (e) {
  console.error(e.message)
}
