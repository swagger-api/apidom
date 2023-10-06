enum LoggingLevel {
  CRITICAL = 50,
  ERROR = 40,
  WARNING = 30,
  INFO = 20,
  DEBUG = 10,
  NOTSET = 0,
}

const levelToName = {
  [String(LoggingLevel.CRITICAL)]: 'CRITICAL',
  [String(LoggingLevel.ERROR)]: 'ERROR',
  [String(LoggingLevel.WARNING)]: 'WARNING',
  [String(LoggingLevel.INFO)]: 'INFO',
  [String(LoggingLevel.DEBUG)]: 'DEBUG',
  [String(LoggingLevel.NOTSET)]: 'NOTSET',
};

const nameToLevel: { [p: string]: number } = {
  CRITICAL: LoggingLevel.CRITICAL,
  ERROR: LoggingLevel.ERROR,
  WARNING: LoggingLevel.WARNING,
  INFO: LoggingLevel.INFO,
  DEBUG: LoggingLevel.DEBUG,
  NOTSET: LoggingLevel.NOTSET,
};

export const getLevelNamesMapping = () => nameToLevel;

export const getLevelName = (level: number) => {
  if (level in levelToName) {
    return levelToName[level];
  }
  return `Level ${level}`;
};

export const addLevelName = (level: number, levelName: string) => {
  levelToName[level] = levelName;
  nameToLevel[levelName] = level;
};

export default LoggingLevel;
