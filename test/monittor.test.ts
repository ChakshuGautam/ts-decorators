import { Monitor } from "../src/monitor"
import { describe, it, expect, vi } from "vitest"

class Inventory {
  @Monitor
  itemCount!: number
}

describe("Inventory Class with Log Decorator", () => {
  it("should log on getting itemCount", () => {
    const inventory = new Inventory()
    const consoleSpy = vi.spyOn(console, "log")
    const value = inventory.itemCount // Trigger getter
    expect(consoleSpy).toHaveBeenCalledWith("Get: itemCount => undefined")
    consoleSpy.mockRestore() // Clean up the spy
  })

  it("should log on setting itemCount", () => {
    const inventory = new Inventory()
    const consoleSpy = vi.spyOn(console, "log")
    inventory.itemCount = 10 // Trigger setter
    expect(consoleSpy).toHaveBeenCalledWith("Set: itemCount => 10")
    consoleSpy.mockRestore() // Clean up the spy
  })
})
