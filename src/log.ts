export const LogMethod = (
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor | void => {
  const originalMethod = descriptor.value
  descriptor.value = async function (...args: any[]) {
    // Before the function execution
    const start = performance.now()
    console.log(`Entering ${propertyName}`)

    // Function execution
    const result = await originalMethod.apply(this, args)

    // After the function execution
    const end = performance.now()
    console.log(`Exiting ${propertyName}, took ${end - start}ms`)

    return result
  }
  return descriptor
}
