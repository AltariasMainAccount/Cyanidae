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
  default: () => ProdCommands_default
});
var consoon = __toModule(require("../Classes"));
var ProdCommands_default = {
  CommandsHidden: false,
  Commands: [
    new consoon.Command({
      cmd: "changelog",
      callback: function(con) {
        con.Write(`
Consoon Production Commands Example

-> Consoon has reached first Alpha build. (Alpha 1)
    
    ->> Features include being able to write commands, run commands
        and having different command types to work with.
    
    ->> Sessions are also roughly implemented already, however they
        are still lacking proper functionality within the module.

        ->>> They are gonna be used for setting the color scheme or
             setting permission levels within the module.

        ->>> Some command types will use these sessions to generate
             a unique user experience for everyone using consoon.

    ->> The console environment has its own logging and reading.
        This was needed to assure that most of the functionality
        of the project could be changed on the fly.

    ->> Global commands like "list", "help <command group>" and
        "exit" were also implemented to assure that it works as
        expected.

    ->> Developer commands have also been given, to assure that
        developers can make use of every information that they
        want to recieve. 

Thank you for using the Consoon module.
    `, "debug");
      },
      help: {
        CommandName: "changelog",
        CommandDescription: "Shows the current changelog",
        CommandUsage: "changelog"
      }
    })
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=ProdCommands.js.map
