import * as consoon from '..';

export default {
    CommandsHidden: true,
    Commands: [
        new consoon.ArgumentedCommand({
            cmd: "consoon_debugger",
            callback: function (con: consoon.ConsoleIOManager, args: string[]) {
                if (!(args.shift() == "the_sacred_texts!!!")) {
                    console.log("[ IMPORTANT ] -> No. Do not use this. You are the liability here.");
                    return;
                }
                
                try {
                    eval(`${args.join(" ")}`);
                } catch (e) {
                    con.Logger.Write("Error caught: " + e, "err");
                }
            },
            help: {
                CommandName: "consoon_debugger",
                CommandDescription: "[CYANIDAE] [VERY UNSAFE] Allows you to run Javascript code using eval() with access to the ConsoleIOManager.",
                CommandUsage: "consoon_debugger <use_keyword> <javascript code>"
            }
        })
    ]
};