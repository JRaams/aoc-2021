import { loadArgs } from './argsLoader';
import CalendarDay from './calendar/calendarDay';

async function main() {
  const args = loadArgs();

  const day = await CalendarDay.loadDay(args.day);
  const result = day.solve(args.part);

  console.info(result);
}
main();
