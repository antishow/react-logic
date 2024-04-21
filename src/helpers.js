/**
 * Returns the 'group index' for the given row and column names from
 * a set of puzzle options. Starts at 0 in the upper left and then 
 * counts up going left to right. Note that the unrendered cell 
 * groups in the bottom right area still "count", so there may be 
 * gaps. Pretty much only used by quantifyInputKey below.
 */
export const getCellGroupIndex = ({ rowName, columnName, options }) => {
  const rowIndex = options.findIndex(O => O.name === rowName);
  const columnIndex = options.findIndex(O => O.name === columnName) - 1;

  if (rowIndex > 0) {
    return ((options.length - 1) * (options.length - rowIndex)) + columnIndex;
  }

  return columnIndex;
}

/**
 * Parse the input key to get the name/value for the row/column
 */
export const parseInputKey = (inputKey) => {
  const split = inputKey.split(',').map(r => r.split('___'));

  const rowName = split[0][0];
  const rowValue = split[0][1];
  const columnName = split[1][0];
  const columnValue = split[1][1];

  return { rowName, rowValue, columnName, columnValue };
}

/**
 * Given an inputKey and a set of options, this will use the row, column, 
 * and group indices from the key to determine where the related cell is.
 */
export const quantifyInputKey = (inputKey, options) => {
  const size = options[0].values.length;
  const { rowName, rowValue, columnName, columnValue } = parseInputKey(inputKey);

  const groupIndex = getCellGroupIndex({ rowName, columnName, options });

  const row = options.find(O => O.name === rowName);
  const rowIndex = row.values.indexOf(rowValue);

  const column = options.find(O => O.name === columnName);
  const columnIndex = column.values.indexOf(columnValue);

  return columnIndex + (size * rowIndex) + (size * size * groupIndex);
};

/**
 * Sort a set of 'inputKey' strings based on quantifyInputKey
 */
export const sortInputKeys = (inputKeys, options) => {
  return inputKeys.sort((A, B) => {
    return quantifyInputKey(A, options) - quantifyInputKey(B, options);
  }).map(k => parseInputKey(k));
}

/*
 * Generates the base data array for normalizePuzzleInput.
 */
export const getEmptyInputForOptions = (options) => {
  if (!options || options.length === 0) {
    return [];
  }

  const emptyRow = options
    .map(O => O.name)
    .reduce((row, name) => {
      return Object.assign({}, row, { [`${name}`]: null })
    }, {});

  return options[0].values.map(val => Object.assign(
    {},
    emptyRow,
    { [`${options[0].name}`]: val }
  ));
}

/**
 * Returns the puzzle input as a sorted array of generic objects
 */
export const normalizePuzzleInput = ({ input, options }) => {
  const base = getEmptyInputForOptions(options);
  const trueKeys = Object.keys(input).filter(K => input[K] === 2);
  const sortedInput = sortInputKeys(trueKeys, options);

  return base.map((row) => {
    sortedInput.forEach(assertion => {
      const { rowName, rowValue, columnName, columnValue } = assertion;

      if (row[rowName] === rowValue) {
        row = { ...row, [`${columnName}`]: columnValue }
      }
    });

    return row;
  });
}

/**
 * Hash a string. NOT secure, but good enough to hide a puzzle solution.
 */
export const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export const getInputHash = ({ input, options }) => {
  const inputRows = normalizePuzzleInput({ input, options });
  const inputStr = JSON.stringify(inputRows);

  return cyrb53(inputStr);
}


