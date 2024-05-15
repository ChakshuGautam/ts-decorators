import { test, assert } from "vitest"
import { LogMethod } from "../src/log"

class UserService {
  @LogMethod
  getUser(id: number): Promise<{ id: number; name: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("From the function")
        resolve({ id, name: "John Doe" })
      }, 50)
    })
  }
}

class Logger {
  logs: string[] = []

  log(message: string): void {
    this.logs.push(message)
  }

  getLogs(): string[] {
    return this.logs
  }

  clearLogs(): void {
    this.logs = []
  }
}

const logger = new Logger()
console.log = logger.log.bind(logger)

test("logs in a service", async () => {
  const userService = new UserService()
  const user = await userService.getUser(12)
  assert.equal(user.id, 12)
  assert.equal(logger.getLogs().length, 3)
  console.info(logger.getLogs())
})
