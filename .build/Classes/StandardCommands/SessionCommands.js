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
  default: () => SessionCommands_default
});
var consoon = __toModule(require(".."));
var SessionCommands_default = {
  CommandsHidden: false,
  Commands: [
    new consoon.Command({
      cmd: "whoami",
      callback: function(con) {
        con.Logger.Write("Coming SOON\u2122", "debug");
      },
      help: {
        CommandName: "sessinfo",
        CommandDescription: "Shows information about the loaded session.",
        CommandUsage: "sessinfo"
      }
    }),
    new consoon.Command({
      cmd: "sessinfo",
      callback: function(con) {
        con.Logger.Write("Coming SOON\u2122", "debug");
      },
      help: {
        CommandName: "sessinfo",
        CommandDescription: "Shows information about the loaded session.",
        CommandUsage: "sessinfo"
      }
    }),
    new consoon.ArgumentedCommand({
      cmd: "loadsession",
      callback: function(con, args) {
        con.Logger.Write("Coming SOON\u2122", "debug");
      },
      help: {
        CommandName: "loadsession",
        CommandDescription: "Loads a session by name.",
        CommandUsage: "loadsession <session name>"
      }
    }),
    new consoon.ArgumentedCommand({
      cmd: "savesession",
      callback: function(con, args) {
        con.Logger.Write("Coming SOON\u2122", "debug");
      },
      help: {
        CommandName: "savesession",
        CommandDescription: "Saves a session to file with name.",
        CommandUsage: "savesession <session name>"
      }
    })
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=SessionCommands.js.map
