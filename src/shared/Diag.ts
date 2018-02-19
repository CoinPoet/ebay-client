export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4
}

export default class Diag {
  private _prefix: string
  public static Level: LogLevel = LogLevel.INFO

  constructor (prefix) {
    this._prefix = prefix
  }

  log (...args) {
    console.log(`${this._prefix}:`, ...args)
  }

  debug (...args) {
    if (Diag.Level >= LogLevel.DEBUG)
      console.warn(`${this._prefix}:`, ...args)
  }

  info (...args) {
    if (Diag.Level >= LogLevel.INFO)
      console.warn(`${this._prefix}:`, ...args)
  }

  warn (...args) {
    if (Diag.Level >= LogLevel.WARN)
      console.warn(`${this._prefix}:`, ...args)
  }

  error (...args) {
    if (Diag.Level >= LogLevel.ERROR)
      console.error(`${this._prefix}:`, ...args)
  }

  assert (test, ...args) {
    if (Diag.Level >= LogLevel.ERROR)
      console.assert(test, ...args)
  }
}
