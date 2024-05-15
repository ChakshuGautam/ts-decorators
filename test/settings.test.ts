import { describe, it, expect } from "vitest"
import { Serialize } from "../src/serialize"

class Settings {
  @Serialize
  preferences: any
}

describe("Settings Class with Serialize Decorator", () => {
  it("should store object preferences as JSON strings", () => {
    const settings = new Settings()
    const prefs = { theme: "dark", layout: "grid" }
    settings.preferences = prefs
    expect(settings.preferences).toBe(JSON.stringify(prefs))
  })

  it("should handle arrays as preferences", () => {
    const settings = new Settings()
    const prefs = [1, 2, 3]
    settings.preferences = prefs
    expect(settings.preferences).toBe(JSON.stringify(prefs))
  })

  it("should handle nested objects as preferences", () => {
    const settings = new Settings()
    const prefs = {
      user: { name: "John", age: 30 },
      permissions: ["admin", "editor"],
    }
    settings.preferences = prefs
    expect(settings.preferences).toBe(JSON.stringify(prefs))
  })
})
