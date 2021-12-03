import fs from 'fs';
import path from 'path';

export interface Args {
  day: string;
  part: string;
}

export function loadArgs(): Args {
  // Check there are 2 arguments (besides node and executable)
  const args = process.argv;
  if (args.length < 4) {
    console.error('');
    console.error('Usage: node index <day> <part = [a|b]>');
    console.error('Example: node index 1 a');
    console.error('');
    process.exit(1);
  }

  // Check first argument is a real day
  const dayDirPath = path.join(__dirname, `./calendar/${args[2]}`);
  if (!fs.existsSync(dayDirPath)) {
    console.error('');
    console.error(`Day '${args[2]}' was not found on the calendar...`);
    console.error('');
    process.exit(1);
  }

  // Check second arcument is 'a' or 'b'
  if (!['a', 'b'].includes(args[3])) {
    console.error('');
    console.error(`Part '${args[3]}' is invalid. Use 'a' or 'b'.`);
    console.error('');
    process.exit(1);
  }

  return { day: args[2], part: args[3] };
}
