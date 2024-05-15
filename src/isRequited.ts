import "reflect-metadata"

export const Required = (target: any, propertyName: string, index: number) => {
  const metadataKey = `__validate_${propertyName}_parameters`
  // Retrieve existing metadata or initialize an empty array
  const existingParams =
    Reflect.getMetadata(metadataKey, target, propertyName) || []
  // console.log(`Adding required parameter at index ${index} for ${propertyName}`)

  existingParams.push({ index })
  Reflect.defineMetadata(metadataKey, existingParams, target, propertyName)
}

export const enforceRequiredParameters = (
  instance: any,
  methodName: string,
  args: any[],
) => {
  const metadataKey = `__validate_${methodName}_parameters`
  const requiredParams =
    Reflect.getMetadata(
      metadataKey,
      instance.constructor.prototype,
      methodName,
    ) || []

  requiredParams.forEach((param) => {
    if (args[param.index] === undefined) {
      throw new Error(`Missing required parameter at index ${param.index}`)
    }
  })

  return instance[methodName](...args)
}
