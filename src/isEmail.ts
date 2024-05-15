export const IsEmail = (target: any, propertyKey: string) => {
  let value: string = target[propertyKey]

  const getter = () => value
  const setter = (newVal: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(newVal.toLowerCase())) {
      throw new Error(`Invalid email address: ${newVal}`)
    }
    value = newVal
  }

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  })
}
