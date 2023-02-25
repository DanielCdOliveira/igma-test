export default class ErrorHandler {
  constructor(private req = req, private res = res, private next = next) {}

  public returnError(error: any) {
    console.log(error);

    if (error.type === "unauthorized")
      return this.res.status(401).send(error.message);
    if (error.type === "not_found")
      return this.res.status(404).send(error.message);
    if (error.type === "conflict")
      return this.res.status(409).send(error.message);
    if (error.type === "unprocessable")
      return this.res.status(422).send(error.message);
    this.res.status(500).send(error);
    this.next();
  }
}
