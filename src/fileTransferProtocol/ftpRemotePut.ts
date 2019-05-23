import * as ftpClient from 'ftp';
import { VSCODE_OUTPUT } from '../constants';
import { SettingsJSON } from '../interfaces';

export function ftpRemotePut (src: string, dest: string, settings: SettingsJSON) {
    let remote = new ftpClient();
    
    return new Promise ((resolve)=>{
        
        remote.connect(settings);
        remote.on('error',function(error) {
            VSCODE_OUTPUT.appendLine('FTP:');
            VSCODE_OUTPUT.appendLine(`Oops, ${error}`);
            throw(error);
        });
        remote.on('ready', function () {
            remote.put(src, dest, function (err) {
                if (err){
                    VSCODE_OUTPUT.appendLine(`\tError Put => ${err}`);
                    throw(err);
                }
                else {
                    VSCODE_OUTPUT.appendLine(`\tPut Remote => (${src} -> ${dest})`);
                }
                remote.end();
                resolve(1);
            });
        });

    });
}