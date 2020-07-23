import { Random, MersenneTwister19937, createEntropy } from 'random-js';

const seed = createEntropy();
const engine = MersenneTwister19937.seedWithArray(seed);

export const random = new Random(engine);
