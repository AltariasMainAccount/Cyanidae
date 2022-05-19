import * as consoon from '..';

export default {
    CommandsHidden: false,
    Commands: [
        new consoon.Command({
            cmd: "whereami",
            callback: function (con: consoon.ConsoleIOManager) {
                con.Logger.Write(con.FileSystem.GetCurrentDirectory(), "debug");
            },
            help: {
                CommandName: "whereami",
                CommandDescription: "Gets the path of the current folder.",
                CommandUsage: "whereami"
            }
        }),
        new consoon.Command({
            cmd: "ls",
            callback: function (con: consoon.ConsoleIOManager) {
                let OriginFiles: string[] = [
                    ".replit",
                    "replit.nix",
                    "package.json",
                    "package-lock.json",
                    "tsconfig.json"
                ];
                
                let FileList: string[] = con.FileSystem.GetCurrDirContent();
                let SortedFileList: string[] = [];
                
                for (let x in FileList) {
                    if (con.FileSystem.IsDir(FileList[x])) {
                        SortedFileList.unshift(FileList[x]);
                        continue;
                    }
                    if (con.FileSystem.IsFile(FileList[x])) {
                        SortedFileList.push(FileList[x]);
                        continue;
                    }
                }

                con.Logger.Write("." + " [Current Directory]", "debug");
                con.Logger.Write(".." + " [Parent Directory]", "debug");
                for (let y in SortedFileList) {
                    if (con.FileSystem.IsDir(SortedFileList[y])) {
                        con.Logger.Write(SortedFileList[y] + " [Directory]", "debug");
                        continue;
                    }
                    if (con.FileSystem.IsFile(SortedFileList[y])) {
                        if (OriginFiles.includes(SortedFileList[y])) {
                            con.Logger.Write(SortedFileList[y] + " [Origin File]", "err");
                            continue;
                        }
                        con.Logger.Write(SortedFileList[y] + " [File]", "default");
                        continue;
                    }
                    con.Logger.Write(SortedFileList[y], "err");
                }
            },
            help: {
                CommandName: "ls",
                CommandDescription: "Lists the contents of the folder.",
                CommandUsage: "ls"
            }
        }),
        new consoon.ArgumentedCommand({
            cmd: "mkdir",
            callback: function (con: consoon.ConsoleIOManager, args: string[]) {
                con.FileSystem.MakeDirectory(args[0]);
            },
            help: {
                CommandName: "mkdir",
                CommandDescription: "Creates a new folder with specified name at CurrDir.",
                CommandUsage: "mkdir <dirname>"
            }
        }),
        new consoon.ArgumentedCommand({
            cmd: "rm",
            callback: function (con: consoon.ConsoleIOManager, args: string[]) {
                con.FileSystem.Delete(args[0]);
            },
            help: {
                CommandName: "rm",
                CommandDescription: "Removes whatever is at the relative path.",
                CommandUsage: "rm <relative path>"
            } 
        }),
        new consoon.ArgumentedCommand({
            cmd: "cd",
            callback: function (con: consoon.ConsoleIOManager, args: string[]) {
                con.FileSystem.ChangeDirRelative(args[0])
            },
            help: {
                CommandName: "cd",
                CommandDescription: "Moves current directory by relative path.",
                CommandUsage: "cd <relative path>"
            }
        }),
        new consoon.ArgumentedCommand({
            cmd: "cda",
            callback: function (con: consoon.ConsoleIOManager, args: string[]) {
                con.FileSystem.ChangeDirAbsolute(args[0]);
            },
            help: {
                CommandName: "cda",
                CommandDescription: "Moves current directory by absolute path.",
                CommandUsage: "cda <absolute path>"
            }
        }),
    ]
};