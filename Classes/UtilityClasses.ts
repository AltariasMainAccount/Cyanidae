import * as fs from 'fs';
import * as path from 'path';
import { ConsoleIOManager } from './ConsoleClasses';

export class Color {
    red: number;
    green: number;
    blue: number;

    constructor(colors: number[]) {
        this.red = colors[0];
        this.green = colors[1];
        this.blue = colors[2];
    }

    SetColorByRGB (r: number, g: number, b: number): void {
        this.red = r;
        this.green = g;
        this.blue = b;
    }

    SetColorByHSV (hue: number, sat: number, val: number): void {
        this.red = Math.round(hue * 255);
        this.green = Math.round(sat * 255);
        this.blue = Math.round(val * 255);
    }

    SetColorByHex (hex: string): void {
        let HexData = hex.replace(/^(?:0*(x|#|h))/gmi, '').match(/.{2}/g);

        if (HexData) {
            this.red = parseInt(HexData[0], 16);
            this.green = parseInt(HexData[1], 16);
            this.blue = parseInt(HexData[2], 16);   
        }
    }

    GetColorAsArray (): number[] {
        return [
            this.red,
            this.green,
            this.blue
        ];
    }
    
    GetForegroundColorAsASCII (): string {
        return `\u001b[38;2;${this.red};${this.green};${this.blue}m`;
    }

    GetBackgroundColorAsASCII (): string {
        return `\u001b[48;2;${this.red};${this.green};${this.blue}m`;
    }
}

interface ConfigData {
    paths: {
        sessionPath: string;
    }
    defaultColorSet: {
        warn: number[];
        err: number[];
        info: number[];
        debug: number[];
    }
}

export class ConfigurationManager {
    private Parent: ConsoleIOManager;
    
    ConfigLocation: string | undefined;
    LoadedConfig: ConfigData | undefined;
    
    private DefaultConfig: ConfigData = {
        paths: {
            sessionPath: __dirname + "../../Sessions",
        },
        defaultColorSet: {
            warn: [255, 255, 0],
            err: [255, 0, 0],
            info: [60, 60, 60],
            debug: [0, 255, 255]
        }
    }

    constructor(parent: ConsoleIOManager) {
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

    GetConfig(): ConfigData {
        return this.LoadedConfig!;
    }
}