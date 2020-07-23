import * as CacheManager from 'cache-manager';
import { logger } from '@services/logger';

const DEFAULT_TTL = 300;

export let cache: CacheManager.Cache;

function initializeCache(): void {
  cache = CacheManager.caching({
    store: 'memory',
    max: 250,
    ttl: DEFAULT_TTL,
  });
}

initializeCache();

export const resetCache = () => {
  // The "reset" method is only available if the underlying store has the "reset" method.
  // This is true for 'memory' stores, but tslint doesn't know the method exists.
  const resettableCache: any = cache;
  if (resettableCache && 'reset' in resettableCache) {
    resettableCache.reset();
  }
};

export interface MethodDecoratorMeta {
  target: any;
  propertyKey: string;
}

export type CacheKeyResolver = (args: any[], meta: MethodDecoratorMeta) => string;

const defaultCacheKeyResolver: CacheKeyResolver = (args: any[], meta: MethodDecoratorMeta): string => {
  // By default, return this format: `{ClassName}:{MethodName}:{Base64EncodedArgs}`
  return [
    (meta.target && meta.target.constructor) ? meta.target.constructor.name || meta.target.name : 'unknown',
    meta.propertyKey,
    Buffer.from(JSON.stringify(args)).toString('base64'),
  ].join(':');
};

// type for optional argument of decorated method
export type CleanCacheEntryCallback = () => boolean;

export function MethodResultCacher(
  ttl: number = DEFAULT_TTL,
  resolver: CacheKeyResolver = defaultCacheKeyResolver
) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]): Promise<any> {
      let shouldCleanLocalCache = false;
      let cacheKey: string;
      if (args.length && (typeof args[args.length - 1] === 'function')) {
        // if last argument of decorated method is a callback function of type CleanCacheEntryCallback,
        // it's excluded from arguments for generating a cacheKey,
        // and if resolved to true, sets to delete local cache entry for that key,
        // then it's passed further to original method to allow clearing multiple layers of methodResult caches
        const argsToGenerateKey = [...args];
        shouldCleanLocalCache = argsToGenerateKey.pop()();
        cacheKey = resolver(argsToGenerateKey, { target, propertyKey });
      } else {
        cacheKey = resolver(args, { target, propertyKey });
      }
      logger.silly('trying method return value from cache', { cacheKey, ttl });

      // tslint:disable-next-line
      const original = originalMethod.bind(this, ...args);

      if (shouldCleanLocalCache) {
        await cache.del(cacheKey);
      }

      const wrappedFunction = async () => {
        logger.silly('local cache miss');
        const value = await original();
        logger.silly('local cache result', typeof value);
        return value;
      };

      // Cache.wrap() tries to lookup a value from cache, and calls the
      // second argument (function) to retrieve the value in case of miss.
      return cache.wrap(cacheKey, wrappedFunction, { ttl });
    };

    return descriptor;
  };
}