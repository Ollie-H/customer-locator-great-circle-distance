type LogMethod = (message: string) => void; 

class Logger {
  logMethod: LogMethod;

  constructor(logMethod: LogMethod) {
    this.logMethod = logMethod;
  }

  log(message: string) {
    this.logMethod(message);
  }
}

export default Logger;