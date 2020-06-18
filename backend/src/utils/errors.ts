// Thrown when there is incorrectly entered data in a Google sheet
class DataIntegrityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataIntegrityError";
  }
}

export { DataIntegrityError };
