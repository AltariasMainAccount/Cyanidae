import * as fs from 'fs';
import * as path from 'path';
import { ConsoleIOManager } from './ConsoleClasses';

interface SessionData {
    SessionName: string;
    SessionColor: number[];
}

export class SessionManager {
    private Parent: ConsoleIOManager;
    LoadedSession: SessionData | undefined;

    constructor(parent: ConsoleIOManager, name?: string) {
        this.Parent = parent;
        if (!name) {
            this.LoadedSession = {
                SessionName: "Default",
                SessionColor: [255, 255, 255]
            }
            return;
        }
        this.LoadedSession = this.GetSessionFromJSON(name)
    }

    GetSessionFromJSON(SessionName: string) {
        let ConfigMgr = this.Parent.ConfigManager;
        let Config = ConfigMgr.GetConfig();

        if (Config["paths"].sessionPath) {
            let Session = fs.readFileSync(path.join(__dirname, Config["paths"].sessionPath + "/" + SessionName + ".json"));
            let SessionData = JSON.parse(Session.toString());

            return {
                SessionName: SessionData.SessionName,
                SessionColor: SessionData.SessionColor
            }
        }
    }

    SaveSessionToJSON(SessionName: string) {
        // TODO: Implement Session Saving
    }
}