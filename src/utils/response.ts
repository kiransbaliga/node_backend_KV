class ApiResponse {
  public data: object;
  public message: string;
  public error: object;
  public meta: object;
  constructor(data: object, message: string, error: Error, meta: object) {
    this.data = data;
    this.message = message;
    this.error = error;
    this.meta = meta;
  }
}

export default ApiResponse;
