import { LazyInit } from "../src/lazyInit"
import { test, expect } from "vitest"

class Foo {
  @LazyInit get value() {
    return "bar"
  }

  @LazyInit
  get fail(): string {
    throw new Error("never be initialized!")
  }

  @LazyInit get ref() {
    return this
  }
}

test("initializing once", () => {
  let foo = new Foo()

  expect(foo.value).toEqual("bar")
  expect(foo.value).toBe(foo.value)
})

test("could be set @LazyInit fields", () => {
  //you must to set object to any
  //because typescript will infer it by static ways
  let foo: any = new Foo()
  foo.value = "foo"

  expect(foo.value).toEqual("foo")
})

test("can't annotated with fields", () => {
  console.log("Here")
  const lazyOnProperty = () => {
    class Bar {
      @LazyInit bar: string = "bar"
    }
  }

  expect(lazyOnProperty).toThrowError(
    /@LazyInit can't be set as a property `bar` on Bar class/,
  )
})

test("get initializer via prototype", () => {
  expect(typeof Foo.prototype.value).toBe("function")
})

test("ref this correctly", () => {
  let foo = new Foo()
  let ref: any = Foo.prototype.ref

  expect(this).not.toBe(foo)
  expect(foo.ref).toBe(foo)
  expect(ref.call(this)).toBe(this)
})

test("discard the initializer if set fields with other value", () => {
  let foo: any = new Foo()
  foo.fail = "failed"

  expect(foo.fail).toBe("failed")
})

test("inherit @LazyInit field correctly", () => {
  class Bar extends Foo {}

  const assertInitializerTo = (it) => {
    let initializer: any = Bar.prototype.ref
    let initializer2: any = Foo.prototype.ref
    expect(typeof initializer).toBe("function")
    expect(initializer.call(it)).toBe(it)
    expect(initializer2.call(it)).toBe(it)
  }

  assertInitializerTo(this)
  let bar = new Bar()
  assertInitializerTo({})
  expect(bar.value).toBe("bar")
  expect(bar.value).toBe(bar.value)
  expect(bar.ref).toBe(bar)
  assertInitializerTo(this)
})

test("throws errors if @LazyInit a property with setter", () => {
  const lazyPropertyWithinSetter = () => {
    class Bar {
      @LazyInit
      get bar() {
        return "bar"
      }
      set bar(value) {}
    }
  }

  expect(lazyPropertyWithinSetter).toThrow(
    /@LazyInit can't be annotated with get bar\(\) existing a setter on Bar class/,
  )
})
