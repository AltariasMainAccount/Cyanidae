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
  ConsoleFileSystem: () => ConsoleFileSystem,
  ConsoleIOManager: () => ConsoleIOManager,
  ConsoleLogger: () => ConsoleLogger
});
var readline = __toModule(require("readline"));
var fs = __toModule(require("fs"));
var path = __toModule(require("path"));
var com = __toModule(require("./CommandClasses"));
var ses = __toModule(require("./SessionClasses"));
var util = __toModule(require("./UtilityClasses"));
class ConsoleIOManager {
  CommandManager = new com.CommandManager(this);
  SessionManager = new ses.SessionManager(this);
  ConfigManager = new util.ConfigurationManager(this);
  FileSystem = new ConsoleFileSystem(this);
  Reader = new ConsoleReader(this);
  Logger = new ConsoleLogger(this);
}
class ConsoleReader {
  Parent;
  LineReaderInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  constructor(parent) {
    this.Parent = parent;
  }
  InterpretAsCommand(line) {
    let CommandData = line.split(" ");
    let Command = CommandData[0];
    let Args = CommandData.slice(1);
    return { Command, Args };
  }
  RunConsole(ConsolePrompt) {
    var _a, _b, _c;
    (_a = this.LineReaderInterface) == null ? void 0 : _a.setPrompt(ConsolePrompt + " ");
    (_b = this.LineReaderInterface) == null ? void 0 : _b.prompt();
    (_c = this.LineReaderInterface) == null ? void 0 : _c.on("line", (line) => {
      var _a2;
      this.Parent.CommandManager.FindAndRunCommand(this.InterpretAsCommand(line));
      (_a2 = this.LineReaderInterface) == null ? void 0 : _a2.prompt();
    }).on("close", function() {
      console.log("\nHave a great day!");
      process.exit(0);
    });
  }
  CloseReader() {
    this.LineReaderInterface.close();
  }
}
class ConsoleLogger {
  Parent;
  DefaultColorSet;
  constructor(parent) {
    this.Parent = parent;
    let ConfigManager = this.Parent.ConfigManager;
    let ConfigData = ConfigManager.GetConfig();
    this.DefaultColorSet = {
      warn: new util.Color(ConfigData.defaultColorSet.warn),
      err: new util.Color(ConfigData.defaultColorSet.err),
      info: new util.Color(ConfigData.defaultColorSet.info),
      debug: new util.Color(ConfigData.defaultColorSet.debug),
      reset: new util.Color(this.Parent.SessionManager.LoadedSession.SessionColor)
    };
  }
  WriteAsHeader(HeaderMessage) {
    let Color = this.DefaultColorSet.reset;
    console.clear();
    console.log(`${Color.GetForegroundColorAsASCII()}${HeaderMessage}${this.DefaultColorSet.reset.GetForegroundColorAsASCII()}`);
  }
  Write(Message, Type) {
    let Color;
    switch (Type) {
      case "warn":
        Color = this.DefaultColorSet.warn;
        break;
      case "err":
        Color = this.DefaultColorSet.err;
        break;
      case "info":
        Color = this.DefaultColorSet.info;
        break;
      case "debug":
        Color = this.DefaultColorSet.debug;
        break;
      default:
        Color = this.DefaultColorSet.reset;
        break;
    }
    console.log(`${Color.GetForegroundColorAsASCII()}${Message}${this.DefaultColorSet.reset.GetForegroundColorAsASCII()}`);
  }
  OutputList(List) {
    console.table(List);
  }
}
class ConsoleFileSystem {
  Parent;
  CurrentDirectory;
  constructor(parent) {
    this.Parent = parent;
    this.CurrentDirectory = __dirname;
  }
  CheckIfRunningOnRepl() {
    if (fs.existsSync(path.join(__dirname, "../../.replit")) || fs.existsSync(path.join(__dirname, "../../replit.nix"))) {
      return true;
    }
    return false;
  }
  GetCurrentDirectory() {
    return this.CurrentDirectory;
  }
  GetCurrDirContent() {
    let FileList = [];
    try {
      fs.readdirSync(this.CurrentDirectory).forEach((file) => {
        FileList.push(file);
      });
    } catch (e) {
      this.Parent.Logger.Write("Error occured: " + e);
      return [];
    }
    return FileList;
  }
  ChangeDirRelative(newRelPath) {
    if (fs.existsSync(path.join(this.CurrentDirectory, newRelPath))) {
      this.CurrentDirectory = path.join(this.CurrentDirectory, newRelPath);
      return true;
    }
    return false;
  }
  ChangeDirAbsolute(newPath) {
    if (fs.existsSync(newPath)) {
      this.CurrentDirectory = newPath;
      return true;
    }
    return false;
  }
  MakeDirectory(dirName) {
    if (!this.CheckIfRunningOnRepl()) {
      try {
        fs.mkdirSync(path.join(this.CurrentDirectory, dirName));
        return true;
      } catch (e) {
        return false;
      }
    } else {
      this.Parent.Logger.Write("Cannot complete action: Modifying Origin Repl is an illegal instruction", "err");
      this.Parent.Logger.Write("Illegal Instruction - ERR_REPLITRUN_ATTEMPTED_MKDIR", "err");
      return false;
    }
  }
  Delete(relPath) {
    if (!this.CheckIfRunningOnRepl()) {
      try {
        if (this.IsFile(relPath)) {
          fs.unlinkSync(path.join(this.CurrentDirectory, relPath));
          return true;
        }
        if (this.IsDir(relPath)) {
          fs.rmdirSync(path.join(this.CurrentDirectory, relPath));
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    } else {
      this.Parent.Logger.Write("Cannot complete action: Modifying Origin Repl is an illegal instruction", "err");
      this.Parent.Logger.Write("Illegal Instruction - ERR_REPLITRUN_ATTEMPTED_RM", "err");
      return false;
    }
  }
  IsFile(file) {
    if (fs.existsSync(path.join(this.CurrentDirectory, file))) {
      let stats = fs.statSync(path.join(this.CurrentDirectory, file));
      return stats.isFile();
    }
    return false;
  }
  IsDir(file) {
    if (fs.existsSync(path.join(this.CurrentDirectory, file))) {
      let stats = fs.statSync(path.join(this.CurrentDirectory, file));
      return stats.isDirectory();
    }
    return false;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConsoleFileSystem,
  ConsoleIOManager,
  ConsoleLogger
});
//# sourceMappingURL=ConsoleClasses.js.map
