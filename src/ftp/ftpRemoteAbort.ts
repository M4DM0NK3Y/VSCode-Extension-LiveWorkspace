import * as ftpClient from 'ftp';
import { VSCODE_OUTPUT } from '../constants';
import { FtpSettingsJSON } from '../interfaces';

export function ftpRemoteAbort (settings: FtpSettingsJSON) {
    let remote = new ftpClient();
    
    return new Promise ((res, rej)=>{
        
        remote.connect(settings);
        remote.on('error',function(error) {
            VSCODE_OUTPUT.appendLine(`Oops, ${error}`);
            throw(error);
        });
        remote.on('ready', function(){
            VSCODE_OUTPUT.appendLine('FTP: connected!');
            remote.abort(function (err) {
                if (err){
                    VSCODE_OUTPUT.appendLine(`\tError Abort => ${err}`);
                    throw(err);
                }
                else {
                    VSCODE_OUTPUT.appendLine(`\tAborted All Transfers!`);
                }
            });
        });

    });
}