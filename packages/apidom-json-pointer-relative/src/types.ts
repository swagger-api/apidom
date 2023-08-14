export type RelativeJsonPointer = {
  readonly nonNegativeIntegerPrefix: number;
  readonly indexManipulation?: number;
  readonly jsonPointerTokens?: string[];
  readonly hashCharacter?: boolean;
};
