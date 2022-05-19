import * as consoon from '..';

export default {
    CommandsHidden: false,
    Commands: [
        new consoon.Command({
            cmd: "whoami",
            callback: function (con: consoon.ConsoleIOManager) {
                con.Logger.Write("Coming SOON™", "debug")
            },
            help: {
                CommandName: "sessinfo",
                CommandDescription: "Shows information about the loaded session.",
                CommandUsage: "sessinfo"
            }
        }),
        new consoon.Command({
            cmd: "sessinfo",
            callback: function (con: consoon.ConsoleIOManager) {
                con.Logger.Write("Coming SOON™", "debug")
            },
            help: {
                CommandName: "sessinfo",
                CommandDescription: "Shows information about the loaded session.",
                CommandUsage: "sessinfo"
            }
        }),
        new consoon.ArgumentedCommand({
            cmd: "loadsession",
            callback: function (con: consoon.ConsoleIOManager, args: string[]) {
                con.Logger.Write("Coming SOON™", "debug")
            },
            help: {
                CommandName: "loadsession",
                CommandDescription: "Loads a session by name.",
                CommandUsage: "loadsession <session name>"
            }
        }),
        new consoon.ArgumentedCommand({
            cmd: "savesession",
            callback: function (con: consoon.ConsoleIOManager, args: string[]) {
                con.Logger.Write("Coming SOON™", "debug")
            },
            help: {
                CommandName: "savesession",
                CommandDescription: "Saves a session to file with name.",
                CommandUsage: "savesession <session name>"
            }
        }),
    ]
}