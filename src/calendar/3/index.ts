import CalendarDay from '../calendarDay';

export default class Day3 extends CalendarDay {
  public solveA(): number {
    // Calculate bit sums (add values of each column where 0 -> -1)
    const bitSums = Array(this.lines[0].length).fill(0);
    this.lines.forEach((line) => {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '0') {
          bitSums[i]--;
        } else {
          bitSums[i]++;
        }
      }
    });

    // Stitch together gamma- and epsilon strings
    let gammaStr = '';
    let epsilonStr = '';
    bitSums.forEach((value) => {
      if (value < 0) {
        gammaStr += '0';
        epsilonStr += '1';
      } else {
        gammaStr += '1';
        epsilonStr += '0';
      }
    });

    // Create decimal values
    const gamma = parseInt(gammaStr, 2);
    const epsilon = parseInt(epsilonStr, 2);

    return gamma * epsilon;
  }

  public solveB(): number {
    // Get oxygen generator rating
    let column = 0;
    let oxygenGenRatings = JSON.parse(JSON.stringify(this.lines));
    while (oxygenGenRatings.length > 1) {
      const bitCounts = this.getBitCount(oxygenGenRatings.map((l: string) => l[column]));
      const mostCommonBit = bitCounts['0'] > bitCounts['1'] ? '0' : '1';

      oxygenGenRatings = oxygenGenRatings.filter((line: string) => {
        return line[column] === mostCommonBit;
      });
      column++;
    }

    // Get CO2 scrubber rating
    column = 0;
    let scrubberRatings = JSON.parse(JSON.stringify(this.lines));
    while (scrubberRatings.length > 1) {
      const bitCounts = this.getBitCount(scrubberRatings.map((l: string) => l[column]));
      const leastCommonBit = bitCounts['1'] < bitCounts['0'] ? '1' : '0';

      scrubberRatings = scrubberRatings.filter((line: string) => {
        return line[column] === leastCommonBit;
      });
      column++;
    }

    const oxygenGenRating = parseInt(oxygenGenRatings[0], 2);
    const scrubberRating = parseInt(scrubberRatings[0], 2);
    return oxygenGenRating * scrubberRating;
  }

  getBitCount(values: string[]) {
    const count: any = {
      0: 0,
      1: 0
    };

    values.forEach((item: string) => {
      count[item]++;
    });

    return count;
  }
}
