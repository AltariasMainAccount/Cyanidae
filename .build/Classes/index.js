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
  ArgumentedCommand: () => import_CommandClasses.ArgumentedCommand,
  ArgumentedSafeCommand: () => import_CommandClasses.ArgumentedSafeCommand,
  Command: () => import_CommandClasses.Command,
  CommandGroup: () => import_CommandClasses.CommandGroup,
  CommandManager: () => import_CommandClasses.CommandManager,
  Console: () => Console,
  ConsoleIOManager: () => import_ConsoleClasses.ConsoleIOManager,
  ConsoleLogger: () => import_ConsoleClasses.ConsoleLogger
});
var import_ConsoleClasses = __toModule(require("./ConsoleClasses"));
var import_CommandClasses = __toModule(require("./CommandClasses"));
class Console {
  ConsolePromptString;
  ConsoleHeaderString;
  IOManager;
  constructor(ConsoleStartParameters) {
    this.IOManager = new import_ConsoleClasses.ConsoleIOManager();
    this.ConsoleHeaderString = ConsoleStartParameters.HeaderString;
    this.IOManager.SessionManager.GetSessionFromJSON(ConsoleStartParameters.SessionName);
    this.ConsolePromptString = ConsoleStartParameters.SessionName + " >";
  }
  Initialize() {
    this.IOManager.Logger.WriteAsHeader(this.ConsoleHeaderString + "\n");
    this.IOManager.Reader.RunConsole(this.ConsolePromptString);
  }
  InitializeWithCustom(absPath) {
    this.IOManager.CommandManager.LoadExtraCommandGroups(absPath);
    this.IOManager.Logger.WriteAsHeader(this.ConsoleHeaderString + "\n");
    this.IOManager.Reader.RunConsole(this.ConsolePromptString);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArgumentedCommand,
  ArgumentedSafeCommand,
  Command,
  CommandGroup,
  CommandManager,
  Console,
  ConsoleIOManager,
  ConsoleLogger
});
//# sourceMappingURL=index.js.map
