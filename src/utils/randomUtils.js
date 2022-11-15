/**
 * @example
 * getRandomIndex(contacts.length)
 *
 * @param {*} elementCount
 * @returns number betwen 0 and elementCount
 */

const getRandomIndex = (elementCount) => {
  const min = 0;
  const max = Math.floor(elementCount);

  return Math.floor(Math.random() * (max - min) + min);
};

export default getRandomIndex;
