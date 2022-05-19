import { ConsoleIOManager, ConsoleLogger } from "./ConsoleClasses";
import * as fs from 'fs';
import * as path from 'path';

interface CommandData {
    cmd: string,
    callback: Function,
    help: {
        CommandName: string,
        CommandDescription: string,
        CommandUsage: string,
    },
}

export class CommandManager {
    private Parent: ConsoleIOManager;
    LoadedCommandGroups: CommandGroup[] = [];
    
    constructor(parent: ConsoleIOManager) {
        this.Parent = parent;
        this.LoadCommandGroups();
    }

    GetNamesOfLoadedGroups(): string[] {
        let NamesArray: string[] = [];        
        for (const element of this.LoadedCommandGroups) {
            if (!element.GroupHidden) NamesArray.push(element.GroupName);
        }
        return NamesArray;
    }
    
    FindCommandGroupByName(name: string): CommandGroup | undefined {
        for (const element of this.LoadedCommandGroups) {
            if (element.GroupName == name) return element;
        }
        return undefined;
    }

    LoadCommandGroups(): void {
        // Load inbuilt commands
        let InbuiltPath: string = path.join(__dirname, "./StandardCommands");
        
        fs.readdirSync(InbuiltPath).forEach((file) => {            
            if (file.endsWith(".js.map") || file.startsWith("index") || file.startsWith("CommandHandler")) return;
            
            let CG = new CommandGroup(file.split("Commands.js")[0].toLowerCase());            
            let RawCommandArray = require(path.join(InbuiltPath, file));
            
            CG.SetHiddenBit(RawCommandArray.default["CommandsHidden"]);
            let CommandArray = RawCommandArray.default["Commands"];
                
            CG.AddCommandsToGroup(CommandArray);
            this.LoadedCommandGroups.push(CG);
        });
    }

    LoadExtraCommandGroups(absPath: string): void {
        // Load commands from external source
        fs.readdirSync(absPath).forEach((file) => {
            if (file.endsWith(".js.map") || file.startsWith("index") || file.startsWith("CommandHandler")) return;
            
            let CG = new CommandGroup(file.split("Commands.js")[0].toLowerCase());            
            let RawCommandArray = require(path.join(__dirname, "../Commands/", file));
            
            CG.SetHiddenBit(RawCommandArray.default["CommandsHidden"]);
            let CommandArray = RawCommandArray.default["Commands"];
                
            CG.AddCommandsToGroup(CommandArray);
            this.LoadedCommandGroups.push(CG);
        });
    }

    FindCommandInAllGroups(Command: string): Command | undefined {
        for (let CommandGroup of this.LoadedCommandGroups) {
            let CommandObject = CommandGroup.FindCommand(Command);
            if (CommandObject) return CommandObject;
        }
        return undefined;
    }

    FindAndRunCommand(CommandData: { Command: string, Args: string[] }): void {
        let Command = this.FindCommandInAllGroups(CommandData.Command);
        if (!Command) {
            this.Parent.Logger.Write(`Unknown command: ${CommandData.Command}`, "err"); return;
        }
        Command.RunCommand(this.Parent, CommandData.Args); return;
    }

    GetCommandGroups(): CommandGroup[] {
        return this.LoadedCommandGroups;
    }
}

export class CommandGroup {
    GroupName: string;
    GroupHidden: boolean = false;
    GroupCommands: Command[];

    constructor(name: string) {
        this.GroupName = name;
        this.GroupCommands = [];
    }

    AddCommandsToGroup(commands: Command[]): void {
        for (let command of commands) {
            this.GroupCommands.push(command);
        }
    }

    FindCommand(CommandName: string): Command | undefined {
        for (let command of this.GroupCommands) {
            if (command.Command == CommandName) return command;
        }
        return undefined;
    }

    SetHiddenBit(bit: boolean): void {
        this.GroupHidden = bit;
    }
    
    GetHelpData() {
        let CommandGroupHelp = [];
        for (let command of this.GroupCommands) { CommandGroupHelp.push(command.CommandHelp); }
        return CommandGroupHelp;
    }
}

export class Command {
    Command: string;
    CommandCallback: Function;
    CommandHelp: {
        CommandName: string;
        CommandDescription: string;
        CommandUsage: string;    
    };

    constructor(CommandData: CommandData) {
        this.Command = CommandData.cmd;
        this.CommandCallback = CommandData.callback;
        this.CommandHelp = CommandData.help;
    }

    GetName(): string {
        return this.Command;
    }

    RunCommand(con: ConsoleIOManager, args?: string[]): void {
        this.CommandCallback(con);
    }
}

export class ArgumentedCommand extends Command {
    constructor(CommandData: CommandData) {
        super(CommandData);
    }

    RunCommand(con: ConsoleIOManager, args: string[]): void {
        this.CommandCallback(con, args);
    }
}

export class ArgumentedSafeCommand extends Command {
    constructor(CommandData: CommandData) {
        super(CommandData);
    }

    RunCommand(con: ConsoleIOManager, args: string[]): void {
        this.CommandCallback(args);
    }
}