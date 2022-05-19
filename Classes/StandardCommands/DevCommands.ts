import * as consoon from '..';

export default {
    CommandsHidden: true,
    Commands: [
        new consoon.ArgumentedCommand({
            cmd: "debug",
            callback: function (con: consoon.ConsoleIOManager, args: string[]) {
                try {
                    Function(`${args.join(" ")}`)();   
                } catch (e) {
                    con.Logger.Write("Error caught: " + e, "err");
                }
            },
            help: {
                CommandName: "debug",
                CommandDescription: "[DEVELOPER] Allows you to run javascript code.",
                CommandUsage: "debug <javascript code>"
            }
        }),
        new consoon.ArgumentedSafeCommand({
            cmd: "scope_debug",
            callback: function (args: string[]) {
                if (!(args.shift() == "force")) {
                    console.log("[ IMPORTANT ] -> Do NOT use this command if you do not know what you are doing. Use 'debug'!");
                    console.log("[ IMPORTANT ] -> If you know what you are doing, add 'force' after scope_debug to run anyways."); 
                    return;
                }
                
                try {
                    eval(`${args.join(" ")}`);   
                } catch (e) {
                    console.log("Error caught: ", e);
                }
            },
            help: {
                CommandName: "scope_debug",
                CommandDescription: "[DEVELOPER] [UNSAFE] Allows you to run javascript code using eval().",
                CommandUsage: "scope_debug <javascript code>"
            }
        })
    ]
};