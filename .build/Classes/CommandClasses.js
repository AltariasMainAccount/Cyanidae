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
  ArgumentedCommand: () => ArgumentedCommand,
  ArgumentedSafeCommand: () => ArgumentedSafeCommand,
  Command: () => Command,
  CommandGroup: () => CommandGroup,
  CommandManager: () => CommandManager
});
var fs = __toModule(require("fs"));
var path = __toModule(require("path"));
class CommandManager {
  Parent;
  LoadedCommandGroups = [];
  constructor(parent) {
    this.Parent = parent;
    this.LoadCommandGroups();
  }
  GetNamesOfLoadedGroups() {
    let NamesArray = [];
    for (const element of this.LoadedCommandGroups) {
      if (!element.GroupHidden)
        NamesArray.push(element.GroupName);
    }
    return NamesArray;
  }
  FindCommandGroupByName(name) {
    for (const element of this.LoadedCommandGroups) {
      if (element.GroupName == name)
        return element;
    }
    return void 0;
  }
  LoadCommandGroups() {
    let InbuiltPath = path.join(__dirname, "./StandardCommands");
    fs.readdirSync(InbuiltPath).forEach((file) => {
      if (file.endsWith(".js.map") || file.startsWith("index") || file.startsWith("CommandHandler"))
        return;
      let CG = new CommandGroup(file.split("Commands.js")[0].toLowerCase());
      let RawCommandArray = require(path.join(InbuiltPath, file));
      CG.SetHiddenBit(RawCommandArray.default["CommandsHidden"]);
      let CommandArray = RawCommandArray.default["Commands"];
      CG.AddCommandsToGroup(CommandArray);
      this.LoadedCommandGroups.push(CG);
    });
  }
  LoadExtraCommandGroups(absPath) {
    fs.readdirSync(absPath).forEach((file) => {
      if (file.endsWith(".js.map") || file.startsWith("index") || file.startsWith("CommandHandler"))
        return;
      let CG = new CommandGroup(file.split("Commands.js")[0].toLowerCase());
      let RawCommandArray = require(path.join(__dirname, "../Commands/", file));
      CG.SetHiddenBit(RawCommandArray.default["CommandsHidden"]);
      let CommandArray = RawCommandArray.default["Commands"];
      CG.AddCommandsToGroup(CommandArray);
      this.LoadedCommandGroups.push(CG);
    });
  }
  FindCommandInAllGroups(Command2) {
    for (let CommandGroup2 of this.LoadedCommandGroups) {
      let CommandObject = CommandGroup2.FindCommand(Command2);
      if (CommandObject)
        return CommandObject;
    }
    return void 0;
  }
  FindAndRunCommand(CommandData) {
    let Command2 = this.FindCommandInAllGroups(CommandData.Command);
    if (!Command2) {
      this.Parent.Logger.Write(`Unknown command: ${CommandData.Command}`, "err");
      return;
    }
    Command2.RunCommand(this.Parent, CommandData.Args);
    return;
  }
  GetCommandGroups() {
    return this.LoadedCommandGroups;
  }
}
class CommandGroup {
  GroupName;
  GroupHidden = false;
  GroupCommands;
  constructor(name) {
    this.GroupName = name;
    this.GroupCommands = [];
  }
  AddCommandsToGroup(commands) {
    for (let command of commands) {
      this.GroupCommands.push(command);
    }
  }
  FindCommand(CommandName) {
    for (let command of this.GroupCommands) {
      if (command.Command == CommandName)
        return command;
    }
    return void 0;
  }
  SetHiddenBit(bit) {
    this.GroupHidden = bit;
  }
  GetHelpData() {
    let CommandGroupHelp = [];
    for (let command of this.GroupCommands) {
      CommandGroupHelp.push(command.CommandHelp);
    }
    return CommandGroupHelp;
  }
}
class Command {
  Command;
  CommandCallback;
  CommandHelp;
  constructor(CommandData) {
    this.Command = CommandData.cmd;
    this.CommandCallback = CommandData.callback;
    this.CommandHelp = CommandData.help;
  }
  GetName() {
    return this.Command;
  }
  RunCommand(con, args) {
    this.CommandCallback(con);
  }
}
class ArgumentedCommand extends Command {
  constructor(CommandData) {
    super(CommandData);
  }
  RunCommand(con, args) {
    this.CommandCallback(con, args);
  }
}
class ArgumentedSafeCommand extends Command {
  constructor(CommandData) {
    super(CommandData);
  }
  RunCommand(con, args) {
    this.CommandCallback(args);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArgumentedCommand,
  ArgumentedSafeCommand,
  Command,
  CommandGroup,
  CommandManager
});
//# sourceMappingURL=CommandClasses.js.map
