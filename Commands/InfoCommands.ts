import * as consoon from '../Classes';

export default {
    CommandsHidden: false,
    Commands: [
        new consoon.Command({
            cmd: "joke",
            callback: function (con: consoon.ConsoleLogger) {
                console.log("You know the rules, and so do I.");
            },
            help: {
                CommandName: "joke",
                CommandDescription: "You know the rules, and so do I.",
                CommandUsage: "joke"
            }
        }),
    ]
}