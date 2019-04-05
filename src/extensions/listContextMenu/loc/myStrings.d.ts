declare interface IListContextMenuCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ListContextMenuCommandSetStrings' {
  const strings: IListContextMenuCommandSetStrings;
  export = strings;
}
