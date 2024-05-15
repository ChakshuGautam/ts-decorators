export const Serialize = (target: any, key: string) => {
  let value = target[key]

  const getter = () => value
  const setter = (newVal: any) => {
    value = JSON.stringify(newVal)
  }

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  })
}
