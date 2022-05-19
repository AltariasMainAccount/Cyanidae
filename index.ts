import * as consoon from './Classes'

import * as path from 'path';

// Declare some commands

let console_1 = new consoon.Console({
    SessionName: "DEFAULT",
    HeaderString: "Consoon Default Console"
});

console_1.InitializeWithCustom(path.join(__dirname, "./Commands"));