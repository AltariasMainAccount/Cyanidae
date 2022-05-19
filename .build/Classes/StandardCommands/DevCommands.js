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
  default: () => DevCommands_default
});
var consoon = __toModule(require(".."));
var DevCommands_default = {
  CommandsHidden: true,
  Commands: [
    new consoon.ArgumentedCommand({
      cmd: "debug",
      callback: function(con, args2) {
        try {
          Function(`${args2.join(" ")}`)();
        } catch (e) {
          con.Logger.Write("Error caught: " + e, "err");
        }
      },
      help: {
        CommandName: "debug",
        CommandDescription: "[DEVELOPER] Allows you to run javascript code.",
        CommandUsage: "debug <javascript code>"
      }
    }),
    new consoon.ArgumentedSafeCommand({
      cmd: "scope_debug",
      callback: function(args) {
        if (!(args.shift() == "force")) {
          console.log("[ IMPORTANT ] -> Do NOT use this command if you do not know what you are doing. Use 'debug'!");
          console.log("[ IMPORTANT ] -> If you know what you are doing, add 'force' after scope_debug to run anyways.");
          return;
        }
        try {
          eval(`${args.join(" ")}`);
        } catch (e) {
          console.log("Error caught: ", e);
        }
      },
      help: {
        CommandName: "scope_debug",
        CommandDescription: "[DEVELOPER] [UNSAFE] Allows you to run javascript code using eval().",
        CommandUsage: "scope_debug <javascript code>"
      }
    })
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=DevCommands.js.map
