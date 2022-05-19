var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => FSCommands_default
});
var consoon = __toModule(require(".."));
var FSCommands_default = {
  CommandsHidden: false,
  Commands: [
    new consoon.Command({
      cmd: "whereami",
      callback: function(con) {
        con.Logger.Write(con.FileSystem.GetCurrentDirectory(), "debug");
      },
      help: {
        CommandName: "whereami",
        CommandDescription: "Gets the path of the current folder.",
        CommandUsage: "whereami"
      }
    }),
    new consoon.Command({
      cmd: "ls",
      callback: function(con) {
        let OriginFiles = [
          ".replit",
          "replit.nix",
          "package.json",
          "package-lock.json",
          "tsconfig.json"
        ];
        let FileList = con.FileSystem.GetCurrDirContent();
        let SortedFileList = [];
        for (let x in FileList) {
          if (con.FileSystem.IsDir(FileList[x])) {
            SortedFileList.unshift(FileList[x]);
            continue;
          }
          if (con.FileSystem.IsFile(FileList[x])) {
            SortedFileList.push(FileList[x]);
            continue;
          }
        }
        con.Logger.Write(". [Current Directory]", "debug");
        con.Logger.Write(".. [Parent Directory]", "debug");
        for (let y in SortedFileList) {
          if (con.FileSystem.IsDir(SortedFileList[y])) {
            con.Logger.Write(SortedFileList[y] + " [Directory]", "debug");
            continue;
          }
          if (con.FileSystem.IsFile(SortedFileList[y])) {
            if (OriginFiles.includes(SortedFileList[y])) {
              con.Logger.Write(SortedFileList[y] + " [Origin File]", "err");
              continue;
            }
            con.Logger.Write(SortedFileList[y] + " [File]", "default");
            continue;
          }
          con.Logger.Write(SortedFileList[y], "err");
        }
      },
      help: {
        CommandName: "ls",
        CommandDescription: "Lists the contents of the folder.",
        CommandUsage: "ls"
      }
    }),
    new consoon.ArgumentedCommand({
      cmd: "mkdir",
      callback: function(con, args) {
        con.FileSystem.MakeDirectory(args[0]);
      },
      help: {
        CommandName: "mkdir",
        CommandDescription: "Creates a new folder with specified name at CurrDir.",
        CommandUsage: "mkdir <dirname>"
      }
    }),
    new consoon.ArgumentedCommand({
      cmd: "rm",
      callback: function(con, args) {
        con.FileSystem.Delete(args[0]);
      },
      help: {
        CommandName: "rm",
        CommandDescription: "Removes whatever is at the relative path.",
        CommandUsage: "rm <relative path>"
      }
    }),
    new consoon.ArgumentedCommand({
      cmd: "cd",
      callback: function(con, args) {
        con.FileSystem.ChangeDirRelative(args[0]);
      },
      help: {
        CommandName: "cd",
        CommandDescription: "Moves current directory by relative path.",
        CommandUsage: "cd <relative path>"
      }
    }),
    new consoon.ArgumentedCommand({
      cmd: "cda",
      callback: function(con, args) {
        con.FileSystem.ChangeDirAbsolute(args[0]);
      },
      help: {
        CommandName: "cda",
        CommandDescription: "Moves current directory by absolute path.",
        CommandUsage: "cda <absolute path>"
      }
    })
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=FSCommands.js.map
