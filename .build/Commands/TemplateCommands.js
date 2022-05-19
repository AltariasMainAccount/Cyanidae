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
  default: () => TemplateCommands_default
});
var consoon = __toModule(require("../Classes"));
var TemplateCommands_default = {
  CommandsHidden: false,
  Commands: [
    new consoon.Command({
      cmd: "template",
      callback: function(con) {
        console.log("This is a template command file, use the .ts file to make your own.");
        console.log("The .ts file is in the /Commands/ folder under TemplateCommands.ts");
        console.log("Do note that you have to compile it to .js before it will work with a reload");
      },
      help: {
        CommandName: "template",
        CommandDescription: "This is the template command description.",
        CommandUsage: "template"
      }
    }),
    new consoon.ArgumentedCommand({
      cmd: "argtemplate",
      callback: function(con, args) {
        console.log(`
    This is an argumented command template.
    The difference between it and a regular command is that it can have command arguments.
    This is best used for commands that require some sort of user input.
    The user input currently is: ${args.join(", ")}
    `);
      },
      help: {
        CommandName: "argtemplate",
        CommandDescription: "This is the template argumented command description.",
        CommandUsage: "argtemplate"
      }
    }),
    new consoon.ArgumentedSafeCommand({
      cmd: "templatex",
      callback: function(args) {
        console.log(`
    This is an argumented safe command template.
    The difference between it and a regular command is that it does not have a Logger interface.
    This is best used for commands that involve some sort of javascript parsing.
    The user input currently is: ${args.join(", ")}
    `);
      },
      help: {
        CommandName: "templatex",
        CommandDescription: "This is the template argumented safe command description.",
        CommandUsage: "templatex"
      }
    })
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=TemplateCommands.js.map
