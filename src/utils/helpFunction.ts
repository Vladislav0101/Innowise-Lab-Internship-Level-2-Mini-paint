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

// export function filterByDate(obj: object, min: any, max: any) {
//   const filterObject: any = {};

//   const minDate = min ? min : 0;
//   const maxDate = max ? max : new Date().getTime();

//   return Object.fromEntries(
//     Object.entries(obj).filter((item) => {
//       const key = +item[0];
//       return minDate < key && key < maxDate;
//     })
//   );
//   return filterObject;
// }
