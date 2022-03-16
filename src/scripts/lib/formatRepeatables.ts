import zip from 'lodash/zip';
import zipObject from 'lodash/zipObject';
import pick from 'lodash/pick';
import values from 'lodash/values';
import camelCase from 'lodash/camelCase';

/**
 * @example
 * // transforms
 * const formatted = formatRepeatable(['prop_1', 'prop_2', 'prop_3'], {
 *   prop_1: ['string1', 'string2'],
 *   prop_2: undefined,
 *   prop_3: [true, false]
 *   prop_4: ['something', 'something']
 * })
 *
 * // formatted
 * [
 *    {
 *      prop_1: 'string1'
 *      prop_2: undefined,
 *      prop_3: true
 *    },
 *    {
 *      prop_1: 'string2'
 *      prop_2: undefined,
 *      prop_3: false
 *    },
 * ]
 */
export default function formatRepeatable(fields: Array<any>, object: any) {
  const fieldData = pick(object, fields);
  fields = Object.keys(fieldData); // some properties might not have been defined
  const fieldDataWithDefaults = values(fieldData).map((t) => t || []); // make any falsy -> array
  const zipped = zip(...fieldDataWithDefaults);
  return zipped.map((arr) => zipObject(fields.map(camelCase), arr));
}
