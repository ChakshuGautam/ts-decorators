import { Required, enforceRequiredParameters } from "../src/isRequited"
import { describe, it, expect } from "vitest"

class UserService {
  greet(@Required name: string, @Required age: number, title?: string) {
    return `Hello, ${title ? title + " " : ""}${name}, age ${age}`
  }
}

it("UserService.greet should throw an error if required parameters are missing", () => {
  const user = new UserService()

  // Test missing first parameter
  expect(() => {
    enforceRequiredParameters(user, "greet", [undefined, 30])
  }).toThrow("Missing required parameter at index 0")

  // Test missing second parameter
  expect(() => {
    enforceRequiredParameters(user, "greet", ["John"])
  }).toThrow("Missing required parameter at index 1")
})

it("UserService.greet should not throw an error when all required parameters are provided", () => {
  let user = new UserService()
  expect(() =>
    enforceRequiredParameters(user, "greet", ["John", 30]),
  ).not.toThrow()
  expect(enforceRequiredParameters(user, "greet", ["John", 30])).toBe(
    "Hello, John, age 30",
  )
})
