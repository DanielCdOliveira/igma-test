export default class SchemaVerifier {
  constructor(private req = req, private res = res, private next = next) {}

  public verify(schema: any) {
    const { error } = schema.validate(this.req.body, { abortEarly: false });
    if (error) {
      throw {
        type: "unprocessable",
        message: error.details.map(
          (detail: { message: string }) => detail.message
        ),
      };
    }
    this.next();
  }
}
