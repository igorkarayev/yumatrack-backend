import { plural } from 'pluralize';

const pluralCamelCase = (word: string): string => {
  const splitWord: string[] = word.split(/(?=[A-Z])/); // split camelCase word
  const length: number = splitWord.length;

  if (length === 1) {
    return plural(word);
  }

  splitWord[length - 1] = plural(splitWord[length - 1]);
  return splitWord.join('');
};

const singularSnakeCase = (word: string): string => {
  const splitWord: string[] = word.split('_'); // split snakeCase word
  const length: number = splitWord.length;

  if (length === 1) {
    return plural(word);
  }

  splitWord[length - 1] = plural(splitWord[length - 1]);
  return splitWord.join('_');
};

export {
  pluralCamelCase,
  singularSnakeCase,
};
