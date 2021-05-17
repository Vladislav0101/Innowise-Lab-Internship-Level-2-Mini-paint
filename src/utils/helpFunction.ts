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

export function filterByDate(obj: object, min: any, max: any) {
  const filterObject: any = {};

  const minDate = min ? new Date(min).getTime() : 0;
  const maxDate = max ? new Date(max).getTime() : new Date().getTime();

  Object.entries(obj).forEach((item) => {
    const key = +item[0];
    const value = item[1];

    if (minDate < key && key < maxDate) {
      filterObject[key] = value;
    }
  });
  return filterObject;
}
