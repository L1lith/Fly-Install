function protectClass(targetClass = null) {
  if (targetClass === null) throw new Error('Must supply either a target class')
  const wrapPrototype = {
    //get: disablePropertyAccess, // Allow Getting but not setting
    set: disablePropertyAccess,
    construct: (target, args) => {
      const output = new target(...args)
      Object.setPrototypeOf(output, outputClass)
      return output
    },
    //has: disablePropertyAccess,
    deleteProperty: disablePropertyAccess,
    defineProperty: disablePropertyAccess
    // apply: (target, thisArg, args) => {
    //   return new target(...args)
    // }
  }
  const outputClass = new Proxy(targetClass, wrapPrototype)
  return outputClass
}

function disablePropertyAccess() {
  throw new Error('This class does not support property access')
}

export default protectClass
