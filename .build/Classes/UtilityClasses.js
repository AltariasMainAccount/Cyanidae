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
  Color: () => Color,
  ConfigurationManager: () => ConfigurationManager
});
var fs = __toModule(require("fs"));
var path = __toModule(require("path"));
class Color {
  red;
  green;
  blue;
  constructor(colors) {
    this.red = colors[0];
    this.green = colors[1];
    this.blue = colors[2];
  }
  SetColorByRGB(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }
  SetColorByHSV(hue, sat, val) {
    this.red = Math.round(hue * 255);
    this.green = Math.round(sat * 255);
    this.blue = Math.round(val * 255);
  }
  SetColorByHex(hex) {
    let HexData = hex.replace(/^(?:0*(x|#|h))/gmi, "").match(/.{2}/g);
    if (HexData) {
      this.red = parseInt(HexData[0], 16);
      this.green = parseInt(HexData[1], 16);
      this.blue = parseInt(HexData[2], 16);
    }
  }
  GetColorAsArray() {
    return [
      this.red,
      this.green,
      this.blue
    ];
  }
  GetForegroundColorAsASCII() {
    return `[38;2;${this.red};${this.green};${this.blue}m`;
  }
  GetBackgroundColorAsASCII() {
    return `[48;2;${this.red};${this.green};${this.blue}m`;
  }
}
class ConfigurationManager {
  Parent;
  ConfigLocation;
  LoadedConfig;
  DefaultConfig = {
    paths: {
      sessionPath: __dirname + "../../Sessions"
    },
    defaultColorSet: {
      warn: [255, 255, 0],
      err: [255, 0, 0],
      info: [60, 60, 60],
      debug: [0, 255, 255]
    }
  };
  constructor(parent) {
    this.Parent = parent;
    let configPath = path.join(__dirname, "../../consoon.json");
    if (fs.existsSync(configPath)) {
      let Config = fs.readFileSync(configPath);
      let ConfigurationData = JSON.parse(Config.toString());
      this.ConfigLocation = configPath;
      this.LoadedConfig = ConfigurationData;
    } else {
      this.Parent.Logger.Write("Configuration file is missing or obstructed", "err");
      this.LoadedConfig = this.DefaultConfig;
    }
  }
  GetConfig() {
    return this.LoadedConfig;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Color,
  ConfigurationManager
});
//# sourceMappingURL=UtilityClasses.js.map
