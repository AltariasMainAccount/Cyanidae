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
  default: () => SystemCommands_default
});
var consoon = __toModule(require(".."));
var SystemCommands_default = {
  CommandsHidden: false,
  Commands: [
    new consoon.Command({
      cmd: "cls",
      callback: function(con) {
        console.clear();
      },
      help: {
        CommandName: "cls",
        CommandDescription: "Clears the screen.",
        CommandUsage: "cls"
      }
    }),
    new consoon.Command({
      cmd: "exit",
      callback: function(con) {
        con.Reader.CloseReader();
      },
      help: {
        CommandName: "exit",
        CommandDescription: "Terminates the program (specifically the reader)",
        CommandUsage: "exit"
      }
    }),
    new consoon.Command({
      cmd: "list",
      callback: function(con) {
        con.Logger.OutputList(con.CommandManager.GetNamesOfLoadedGroups());
      },
      help: {
        CommandName: "list",
        CommandDescription: "Lists all command groups that are loaded.",
        CommandUsage: "list"
      }
    }),
    new consoon.ArgumentedCommand({
      cmd: "help",
      callback: function(con, args) {
        let Group = con.CommandManager.FindCommandGroupByName(args[0]);
        if (!Group) {
          con.Logger.Write(`No help found for command group: ${args[0]}`, "err");
          return;
        }
        con.Logger.OutputList(Group.GetHelpData());
      },
      help: {
        CommandName: "help",
        CommandDescription: "Gets help information to specified command group",
        CommandUsage: "help <command group>"
      }
    })
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=SystemCommands.js.map
