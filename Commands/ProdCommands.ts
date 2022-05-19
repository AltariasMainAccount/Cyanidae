import * as consoon from '../Classes';

export default {
    CommandsHidden: false,
    Commands: [
        new consoon.Command({
            cmd: "changelog",
            callback: function (con: consoon.ConsoleLogger) {
                con.Write(`
Cyanidae Production Commands Example

-> Cyanidae has reached first Alpha build. (Alpha 1)
    
    ->> Features include being able to write commands, run commands
        and having different command types to work with.
    
    ->> Sessions are also roughly implemented already, however they
        are still lacking proper functionality within the module.

        ->>> They are gonna be used for setting the color scheme or
             setting permission levels within the module.

        ->>> Some command types will use these sessions to generate
             a unique user experience for everyone using consoon.

    ->> The console environment has its own logging and reading.
        This was needed to assure that most of the functionality
        of the project could be changed on the fly.

    ->> Global commands like "list", "help <command group>" and
        "exit" were also implemented to assure that it works as
        expected.

    ->> Developer commands have also been given, to assure that
        developers can make use of every information that they
        want to recieve. 

Thank you for using Cyanidae.
    `, "debug")
            },
            help: {
                CommandName: "changelog",
                CommandDescription: "Shows the current changelog",
                CommandUsage: "changelog"
            }
        }),
    ]
}