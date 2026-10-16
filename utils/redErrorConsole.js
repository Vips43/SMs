import util from 'util';

// Backup the original console.error function
export const originalConsoleError = console.error;

// Override it globally
console.error = function (...args) {
  // ANSI Escape Codes: \x1b[31m turns text RED, \x1b[0m RESETS back to normal white
  const RED = '\x1b[31m';
  const RESET = '\x1b[0m';

  // Format arguments cleanly (handles objects, stack traces, and strings)
  const formattedMessage = args.map(arg => {
    if (arg instanceof Error) {
      // If it's an error object, preserve its full stack trace but color it red
      return arg.stack;
    } else if (typeof arg === 'object') {
      // Inspect objects nicely instead of printing '[object Object]'
      return util.inspect(arg, { colors: true, depth: null });
    }
    return arg;
  }).join(' ');

  // Print the final message wrapped in the red color codes
  originalConsoleError(`${RED}${formattedMessage}${RESET}`);
};
