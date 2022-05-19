import * as cyanidae from './Classes'

import * as path from 'path';

// Declare some commands

let console_1 = new cyanidae.Console({
    SessionName: "DEFAULT",
    HeaderString: "Cyanidae Default Console"
});

console_1.InitializeWithCustom(path.join(__dirname, "./Commands"));