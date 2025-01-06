interface WordPair {
  english: string;
  chinese: string;
}

export function parseBatchWords(text: string): WordPair[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [english, chinese] = line.split(',').map((part) => part.trim());
      if (!english || !chinese) {
        throw new Error(`Invalid format in line: ${line}`);
      }
      return { english, chinese };
    });
}