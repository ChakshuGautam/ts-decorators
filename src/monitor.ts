export const Monitor = (target: any, key: string) => {
  let val = target[key]

  const getter = () => {
    console.log(`Get: ${key} => ${val}`)
    return val
  }

  const setter = (newValue: any) => {
    console.log(`Set: ${key} => ${newValue}`)
    val = newValue
  }

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  })
}
