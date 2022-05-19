import * as consoon from '..';

export default {
    CommandsHidden: false,
    Commands: [
        new consoon.Command({
            cmd: "cls",
            callback: function(con: consoon.ConsoleIOManager) {
                console.clear();
            },
            help: {
                CommandName: "cls",
                CommandDescription: "Clears the screen.",
                CommandUsage: "cls"
            }
        }),
        new consoon.Command({
            cmd: "exit",
            callback: function(con: consoon.ConsoleIOManager) {
                con.Reader.CloseReader();
            },
            help: {
                CommandName: "exit",
                CommandDescription: "Terminates the program (specifically the reader)",
                CommandUsage: "exit"
            }
        }),
        new consoon.Command({
            cmd: "list",
            callback: function(con: consoon.ConsoleIOManager) {
                con.Logger.OutputList(con.CommandManager.GetNamesOfLoadedGroups());
            },
            help: {
                CommandName: "list",
                CommandDescription: "Lists all command groups that are loaded.",
                CommandUsage: "list"
            }
        }),
        new consoon.ArgumentedCommand({
            cmd: "help",
            callback: function(con: consoon.ConsoleIOManager, args: string[]) {
                let Group: consoon.CommandGroup | undefined = con.CommandManager.FindCommandGroupByName(args[0]);
                
                if (!Group) { con.Logger.Write(`No help found for command group: ${args[0]}`, "err"); return; }
                con.Logger.OutputList(Group.GetHelpData()); 
            },
            help: {
                CommandName: "help",
                CommandDescription: "Gets help information to specified command group",
                CommandUsage: "help <command group>"
            }
        }),
    ]
};