import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

import * as com from './CommandClasses';
import * as ses from './SessionClasses';
import * as util from './UtilityClasses';

/*
    Input Output Manager and Interfaces

    Manages the Input and the Output of the Console
*/

export class ConsoleIOManager {    
    // All the managers for all the commands
    CommandManager: com.CommandManager = new com.CommandManager(this);
    SessionManager: ses.SessionManager = new ses.SessionManager(this);
    ConfigManager: util.ConfigurationManager = new util.ConfigurationManager(this);

    // Reader and Logger, declared after the managers to assure they exist.
    FileSystem: ConsoleFileSystem = new ConsoleFileSystem(this);
    Reader: ConsoleReader = new ConsoleReader(this);
    Logger: ConsoleLogger = new ConsoleLogger(this);
}

/*
    Reader and Logger Classes

    Used as default parts of the console, no matter the type
*/

class ConsoleReader {
    private Parent: ConsoleIOManager;
    
    LineReaderInterface: readline.Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    constructor(parent: ConsoleIOManager) {
        this.Parent = parent;
    }

    private InterpretAsCommand(line: string) {
        let CommandData: string[] = line.split(" ");

        let Command: string = CommandData[0];
        let Args: string[] = CommandData.slice(1);
        
        return { Command: Command, Args: Args };
    }
    
    RunConsole(ConsolePrompt: string): void {
        this.LineReaderInterface?.setPrompt(ConsolePrompt + ' ');
        this.LineReaderInterface?.prompt();

        this.LineReaderInterface?.on('line', (line) => {
            this.Parent.CommandManager.FindAndRunCommand(this.InterpretAsCommand(line));
            this.LineReaderInterface?.prompt();
        }).on('close', function() {
            console.log('\nHave a great day!');
            process.exit(0);
        });
    }

    CloseReader() {
        this.LineReaderInterface.close();
    }
}

export class ConsoleLogger {
    private Parent: ConsoleIOManager;

    DefaultColorSet: {
        warn: util.Color;
        err: util.Color;
        info: util.Color;
        debug: util.Color;
        reset: util.Color;
    }
    
    constructor(parent: ConsoleIOManager) {
        this.Parent = parent;

        let ConfigManager = this.Parent.ConfigManager;
        let ConfigData = ConfigManager.GetConfig();

        this.DefaultColorSet = {
            warn: new util.Color(ConfigData.defaultColorSet.warn),
            err: new util.Color(ConfigData.defaultColorSet.err),
            info: new util.Color(ConfigData.defaultColorSet.info),
            debug: new util.Color(ConfigData.defaultColorSet.debug),
            reset: new util.Color(this.Parent.SessionManager.LoadedSession!.SessionColor)
        }
    }

    WriteAsHeader(HeaderMessage: string): void {
        let Color: util.Color = this.DefaultColorSet.reset;
        
        console.clear();
        console.log(`${Color.GetForegroundColorAsASCII()}${HeaderMessage}${this.DefaultColorSet.reset.GetForegroundColorAsASCII()}`);
    }
    
    Write(Message: string, Type?: string): void {
        let Color: util.Color;
        
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

    OutputList(List: any): void {
        console.table(List);
    }
}

export class ConsoleFileSystem {
    private Parent: ConsoleIOManager;
    private CurrentDirectory: string;
    
    constructor(parent: ConsoleIOManager) {
        this.Parent = parent;
        this.CurrentDirectory = __dirname;
    }

    private CheckIfRunningOnRepl(): boolean {
        if (fs.existsSync(path.join(__dirname, "../../.replit")) || fs.existsSync(path.join(__dirname, "../../replit.nix"))) {
            return true;
        }
        return false;
    }
    
    GetCurrentDirectory(): string {
        return this.CurrentDirectory;
    }

    GetCurrDirContent(): string[] {
        let FileList: string[] = [];
        
        try {
            fs.readdirSync(this.CurrentDirectory).forEach(file => {
                FileList.push(file);
            });
        } catch (e) {
            this.Parent.Logger.Write("Error occured: " + e);
            return [];
        }

        return FileList;
    } 
    
    ChangeDirRelative(newRelPath: string): boolean {
        if (fs.existsSync(path.join(this.CurrentDirectory, newRelPath))) {
            this.CurrentDirectory = path.join(this.CurrentDirectory, newRelPath);
            return true;
        }
        return false;
    }

    ChangeDirAbsolute(newPath: string): boolean {
        if (fs.existsSync(newPath)) {
            this.CurrentDirectory = newPath;
            return true;
        }
        return false;
    }
    
    MakeDirectory(dirName: string): boolean {
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

    Delete(relPath: string): boolean {
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

    IsFile(file: string): boolean {
        if (fs.existsSync(path.join(this.CurrentDirectory, file))) {
            let stats = fs.statSync(path.join(this.CurrentDirectory, file));
            return stats.isFile();
        }
        return false;
    }

    IsDir(file: string): boolean {
        if (fs.existsSync(path.join(this.CurrentDirectory, file))) {
            let stats = fs.statSync(path.join(this.CurrentDirectory, file));
            return stats.isDirectory();
        }
        return false;
    }
}