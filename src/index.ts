abstract class _Result<T, E extends Error> {
  get(): T {
    throw new Error("Not implemented")
  }
}


class _Success<T, E extends Error> extends _Result<T, E> {
  readonly isSuccess = true
  readonly isFaulure = false

  constructor(readonly value: T) {
    super()
  }

  get(): T {
    return this.value
  }
}


class _Failure<T, E extends Error> extends _Result<T, E> {
  readonly isSuccess = false
  readonly isFaulure = true

  constructor(readonly error: E) {
    super()
  }

  get(): T {
    throw this.error
  }
}


export namespace Result {
  export interface Success<T, E extends Error> extends _Success<T, E> {}
  export interface Failure<T, E extends Error> extends _Failure<T, E> {}

  export function success<T, E extends Error>(value: T): Result<T, E> {
    return new _Success(value)
  }

  export function failure<E extends Error, T = never>(error: E): Result<T, E> {
    return new _Failure(error)
  }

  export function is<S, F extends Error>(value: unknown | Result<S, F>): value is Result<S, F> {
    return isResult<S, F>(value)

  }
}


export type Result<T, E extends Error = Error> = Result.Success<T, E> | Result.Failure<T, E>


export function isResult<S, F extends Error>(value: unknown | Result<S, F>): value is Result<S, F> {
  return value instanceof _Result
}
