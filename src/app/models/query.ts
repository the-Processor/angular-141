export class Query{

  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public emailId: string,
    public question: string,
    public response?: string
  ){}
}
