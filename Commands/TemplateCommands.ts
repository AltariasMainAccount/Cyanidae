import * as consoon from '../Classes';

export default {
    CommandsHidden: false,
    Commands: [ 
        new consoon.Command({
            cmd: "template",
            callback: function (con: consoon.ConsoleLogger) {
                console.log("This is a template command file, use the .ts file to make your own.");
                console.log("The .ts file is in the /Commands/ folder under TemplateCommands.ts");
                console.log("Do note that you have to compile it to .js before it will work with a reload");
            },
            help: {
                CommandName: "template",
                CommandDescription: "This is the template command description.",
                CommandUsage: "template"
            }
        }),
        new consoon.ArgumentedCommand({
            cmd: "argtemplate",
            callback: function (con: consoon.ConsoleLogger, args: string[]) {
                console.log(`
    This is an argumented command template.
    The difference between it and a regular command is that it can have command arguments.
    This is best used for commands that require some sort of user input.
    The user input currently is: ${args.join(", ")}
    `);
            },
            help: {
                CommandName: "argtemplate",
                CommandDescription: "This is the template argumented command description.",
                CommandUsage: "argtemplate"
            }
        }),
        new consoon.ArgumentedSafeCommand({
            cmd: "templatex",
            callback: function (args: string[]) {
                console.log(`
    This is an argumented safe command template.
    The difference between it and a regular command is that it does not have a Logger interface.
    This is best used for commands that involve some sort of javascript parsing.
    The user input currently is: ${args.join(", ")}
    `);
            },
            help: {
                CommandName: "templatex",
                CommandDescription: "This is the template argumented safe command description.",
                CommandUsage: "templatex"
            }
        }),
    ]
}
