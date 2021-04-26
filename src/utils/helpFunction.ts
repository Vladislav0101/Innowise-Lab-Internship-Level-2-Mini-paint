export function stringToDBFormat(str: string): string {
  return str
    .split("")
    .map((item: string) => {
      switch (item) {
        case ".":
          return "-p-";
        case "#":
          return "-h-";
        case "$":
          return "-d-";
        case "[":
          return "-bl-";
        case "]":
          return "-br-";
        default:
          return item;
      }
    })
    .join("");
}
export function stringFromDBFormat(str: string): string {
  return str
    .split("")
    .map((item: string) => {
      switch (item) {
        case "-p-":
          return ".";
        case "-h-":
          return "#";
        case "-d-":
          return "$";
        case "-bl-":
          return "[";
        case "-br-":
          return "]";
        default:
          return item;
      }
    })
    .join("");
}
