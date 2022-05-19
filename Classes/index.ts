import { ConsoleIOManager, ConsoleLogger } from './ConsoleClasses';
import { Command, ArgumentedCommand, ArgumentedSafeCommand, CommandGroup, CommandManager } from './CommandClasses';

class Console {
    private ConsolePromptString: string;
    private ConsoleHeaderString: string;
    IOManager: ConsoleIOManager;

    constructor(ConsoleStartParameters: { SessionName: string, HeaderString: string }) {
        this.IOManager = new ConsoleIOManager();

        this.ConsoleHeaderString = ConsoleStartParameters.HeaderString;
        
        this.IOManager.SessionManager.GetSessionFromJSON(ConsoleStartParameters.SessionName);

        this.ConsolePromptString = ConsoleStartParameters.SessionName + " >";
   }

    Initialize(): void {
        this.IOManager.Logger.WriteAsHeader(this.ConsoleHeaderString + "\n");
        this.IOManager.Reader.RunConsole(this.ConsolePromptString);
    }

    InitializeWithCustom(absPath: string) {
        this.IOManager.CommandManager.LoadExtraCommandGroups(absPath);
        this.IOManager.Logger.WriteAsHeader(this.ConsoleHeaderString + "\n");
        this.IOManager.Reader.RunConsole(this.ConsolePromptString);
    }
}

export {
    Console,
    ConsoleIOManager,
    ConsoleLogger,
    Command,
    ArgumentedCommand,
    ArgumentedSafeCommand,
    CommandGroup,
    CommandManager
}
