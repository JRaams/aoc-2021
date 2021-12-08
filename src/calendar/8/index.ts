import CalendarDay from '../calendarDay';

export default class Day8 extends CalendarDay {
  public solveA(): number {
    let result = 0;

    this.lines.forEach((line: string) => {
      const digitOutputsStr = line.split(' | ')[1];
      const digitOutputs = digitOutputsStr.split(' ');
      // Filter out digits 1,4,7,8 with length 2,3,4,7
      result += digitOutputs.filter((output) => [2, 3, 4, 7].includes(output.length)).length;
    });

    return result;
  }

  public solveB(): number {
    let result = 0;

    this.lines.forEach((line: string) => {
      const configuration = {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
      };

      // Load signal patterns and digit outputs
      const [signalPatternsStr, digitOutputsStr] = line.split(' | ');
      const signalPatterns = signalPatternsStr.split(' ');
      const digitOutputs = digitOutputsStr.split(' ');

      // Analyze the configuration
      // Get 1,4,7,8
      configuration[1] = signalPatterns.find((p) => p.length === 2)!;
      configuration[4] = signalPatterns.find((p) => p.length === 4)!;
      configuration[7] = signalPatterns.find((p) => p.length === 3)!;
      configuration[8] = signalPatterns.find((p) => p.length === 7)!;

      // Get 0,6,9
      const zeroSixNine = signalPatterns.filter((sp) => sp.length === 6);
      configuration[9] = zeroSixNine.find((pattern: string) =>
        configuration[4].split('').every((l) => pattern.split('').includes(l)),
      )!;
      configuration[0] = zeroSixNine.find(
        (pattern: string) =>
          pattern !== configuration[9] && configuration[1].split('').every((l) => pattern.split('').includes(l)),
      )!;
      configuration[6] = zeroSixNine.find(
        (pattern: string) => pattern !== configuration[9] && pattern !== configuration[0],
      )!;

      // Get 2,3,5
      const twoThreeFive = signalPatterns.filter((sp) => sp.length === 5);
      configuration[3] = twoThreeFive.find((pattern: string) =>
        configuration[1].split('').every((l) => pattern.split('').includes(l)),
      )!;
      configuration[5] = twoThreeFive.find((pattern: string) =>
        pattern.split('').every((l) => configuration[6].split('').includes(l)),
      )!;
      configuration[2] = twoThreeFive.find(
        (pattern: string) => pattern !== configuration[3] && pattern !== configuration[5],
      )!;

      // Decode output value
      let outputValue = '';
      digitOutputs.forEach((digitOutput: string) => {
        const entry = Object.entries(configuration).find(
          (a) => a[1].length === digitOutput.length && digitOutput.split('').every((l) => a[1].split('').includes(l)),
        );
        outputValue += entry![0];
      });

      result += Number(outputValue);
    });

    return result;
  }
}
