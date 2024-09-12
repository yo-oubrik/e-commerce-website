class CheckoutError extends Error {
  private _status: number;
  public get status(): number {
    return this._status;
  }
  constructor(message: string, status?: number) {
    super(message);
    this.name = "CheckoutError";
    this._status = status || 500;
  }
}
