export default class CpfServices {
  private cpfRegex = /^((\d{3}.\d{3}.\d{3}-\d{2})|(\d{11}))$/;
  private digitValidArray = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  private createError() {
    throw {
      type: "unprocessable",
      message: "invalid cpf",
    };
  }

  public async cpfValid(cpf: string) {
    if (!this.cpfRegex.test(cpf)) {
      this.createError();
    }
    const cpfNumber = this.cpfStringToArrayInt(cpf);
    this.cpfValidDigits(cpfNumber);
    return this.formatCpfForDatabase(cpf);
  }

  private cpfStringToArrayInt(cpf: string) {
    if (cpf.length === 14) {
      cpf = cpf.replace(/\./g, "").replace(/\-/g, "");
    }
    return cpf.split("").map((element) => {
      return Number(element);
    });
  }

  private cpfValidDigits(cpf: number[]) {
    const cpfDigits = cpf.splice(9, 2);
    this.validEachDigit(cpf, cpfDigits[0], 0);
    cpf.push(cpfDigits[0]);
    this.validEachDigit(cpf, cpfDigits[1], 1);
  }

  private validEachDigit(cpf: number[], cpfDigit: number, indexDigit: number) {
    const arrayMultiplied = cpf.map((digit, index) => {
      return digit * this.digitValidArray[index + (indexDigit === 0 ? 1 : 0)];
    });
    let sumArrayMultiplied = arrayMultiplied.reduce((sum, element) => {
      return sum + element;
    });
    const rest = sumArrayMultiplied % 11;
    if (rest < 2) {
      if (cpfDigit !== 0) {
        this.createError();
      }
    } else if (11 - rest !== cpfDigit) {
      this.createError();
    }
  }
  private formatCpfForDatabase(cpf: string) {
    if (cpf.length === 14) return cpf;
    else
      return [
        cpf.slice(0, 3),
        ".",
        cpf.slice(3, 6),
        ".",
        cpf.slice(6, 9),
        "-",
        cpf.slice(9, 11),
      ].join("");
  }
}
