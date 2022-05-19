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
  default: () => CyanidaeCommands_default
});
var consoon = __toModule(require(".."));
var CyanidaeCommands_default = {
  CommandsHidden: true,
  Commands: [
    new consoon.ArgumentedCommand({
      cmd: "consoon_debugger",
      callback: function(con, args) {
        if (!(args.shift() == "the_sacred_texts!!!")) {
          console.log("[ IMPORTANT ] -> No. Do not use this. You are the liability here.");
          return;
        }
        try {
          eval(`${args.join(" ")}`);
        } catch (e) {
          con.Logger.Write("Error caught: " + e, "err");
        }
      },
      help: {
        CommandName: "consoon_debugger",
        CommandDescription: "[CYANIDAE] [VERY UNSAFE] Allows you to run Javascript code using eval() with access to the ConsoleIOManager.",
        CommandUsage: "consoon_debugger <use_keyword> <javascript code>"
      }
    })
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=CyanidaeCommands.js.map
