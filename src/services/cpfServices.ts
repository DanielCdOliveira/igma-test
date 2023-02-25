export default class CpfServices {
  private cpfRegex = /^((\d{3}.\d{3}.\d{3}-\d{2})|(\d{11}))$/;
  private digitValidArray = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  private createError() {
    throw {
      type: "unprocessable",
      message: "inavalid cpf",
    };
  }

  public async cpfValidInsertDb(cpf: string) {
    console.log(cpf);
    console.log(this.cpfRegex.test(cpf));

    if (!this.cpfRegex.test(cpf)) {
      this.createError();
    }
    const cpfNumber = this.cpfStringToArrayInt(cpf);
    this.cpfValidDigits(cpfNumber);
  }

  public cpfStringToArrayInt(cpf: string) {
    if (cpf.length === 14) {
      cpf = cpf.replace(/\./g, "").replace(/\-/g, "");
    }
    return cpf.split("").map((element) => {
      return Number(element);
    });
  }

  public cpfValidDigits(cpf: number[]) {
    const cpfDigits = cpf.splice(9, 2);
    const arrayMultiplied = cpf.map((cpfDigit, index) => {
      return cpfDigit * this.digitValidArray[index + 1];
    });
    let sumArrayMultiplied = arrayMultiplied.reduce((sum, element) => {
      return sum + element;
    });
    const rest = sumArrayMultiplied % 11;
    console.log(rest);
    console.log(11 - rest);
    console.log(cpfDigits[0]);

    console.log(11 - rest !== cpfDigits[0]);
    if (rest < 2) {
      if (cpfDigits[0] !== 0) {
        this.createError();
      }
    } else if (11 - rest !== cpfDigits[0]) {
      this.createError();
    }
    cpf.push(cpfDigits[0]);
    const arrayFirstDigitMultiplied = cpf.map((cpfDigit, index) => {
      return cpfDigit * this.digitValidArray[index];
    });
    const sumArrayFirstDigitMultiplied = arrayFirstDigitMultiplied.reduce(
      (sum, element) => {
        return sum + element;
      }
    );
    console.log(sumArrayFirstDigitMultiplied);
    const restSecondDigit = sumArrayFirstDigitMultiplied % 11;
    if (restSecondDigit < 2) {
      if (cpfDigits[1] !== 0) {
        this.createError();
      }
    } else if (11 - restSecondDigit !== cpfDigits[1]) {
      this.createError();
    }
  }
  public formatCpfForDatabase() {}
}
