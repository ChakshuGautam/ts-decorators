import { describe, it, expect } from "vitest"
import { IsEmail } from "../src/isEmail"

class User {
  @IsEmail
  email!: string
}

describe("User Class with IsEmail Decorator", () => {
  it("should throw an error for invalid emails", () => {
    const user = new User()
    expect(() => {
      user.email = "invalid-email"
    }).toThrow("Invalid email address: invalid-email")
  })

  it("should accept a valid email address", () => {
    const user = new User()
    expect(() => {
      user.email = "test@example.com"
    }).not.toThrow()
    expect(user.email).toBe("test@example.com")
  })
})
