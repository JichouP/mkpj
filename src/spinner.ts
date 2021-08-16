import clc from 'cli-color';
import { Spinner, dots } from 'cli-spinners';

export class SpinnerHandler {
  private spinner: Spinner;

  private text: string;

  private spin: number;

  private intervalHandler: NodeJS.Timeout | null;

  constructor(spinner?: Spinner) {
    this.spinner = spinner || dots;
    this.text = '';
    this.spin = 0;
    this.intervalHandler = null;
  }

  start(): void {
    if (this.intervalHandler !== null) {
      return;
    }
    this.intervalHandler = setInterval(
      this.updateSpinner.bind(this),
      this.spinner.interval
    );
  }

  stop(): void {
    if (this.intervalHandler === null) {
      return;
    }
    clearInterval(this.intervalHandler);
  }

  done(): void {
    if (this.intervalHandler !== null) {
      clearInterval(this.intervalHandler);
    }
    process.stdout.write(clc.erase.line + clc.move.left(9999));
    process.stdout.write(
      `${clc.green('✔ ') + this.text}\n${clc.green(
        '✔ Initialization completed'
      )}\n`
    );
  }

  setText(text: string): void {
    if (this.intervalHandler !== null) {
      process.stdout.write(clc.erase.line + clc.move.left(9999));
      process.stdout.write(`${this.text ? clc.green('✔ ') + this.text : ''}\n`);
    }
    this.text = text;
  }

  write(): void {
    process.stdout.write(clc.erase.line + clc.move.left(9999));
    process.stdout.write(
      `${this.spinner.frames[this.spin % this.spinner.frames.length]} ${
        this.text
      }`
    );
  }

  updateSpinner(): void {
    this.write();
    // eslint-disable-next-line no-plusplus
    this.spin++;
  }
}
