export const Cache = (keyPrefix: string) => {
  const cache = new Map()
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${keyPrefix}-${JSON.stringify(args)}`
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey)
      }
      const result = await originalMethod.apply(this, args)
      cache.set(cacheKey, result)
      return result
    }
  }
}
