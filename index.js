/*!
 *  <https://github.com/sqhtiamo/webpack-sftp-client.git>
 *
 * Copyright (c) 2016-2017, Cloughzhang(Zhang Yuhang).
 * Licensed under the MIT License.
 */

'use strict';

var client = require('scp2');

function WebpackSftpClient(options) {
    this.options = options;
    var self = this;

    var remotePath = self.options.remotePath;
    var path = self.options.path;
    var username = self.options.username;
    var host = self.options.host;
    var password = self.options.password;
    var port = self.options.port || '22';

        console.log(username + ':' + password + '@' + host + ':' + port + ':' + remotePath);
}

WebpackSftpClient.prototype.apply = function(compiler) {

    var self = this;

    compiler.plugin('after-emit', function(compilation) {

        var remotePath = self.options.remotePath;
        var path = self.options.path;
        var username = self.options.username;
        var host = self.options.host;
        var password = self.options.password;
        var port = self.options.port || '22';

        client.scp(self.options.path,
            username + ':' + password + '@' + host + ':' + port + ':' + remotePath,
            function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Transfer with SFTP Completd!')
                }
        });

    });
};

new WebpackSftpClient({
    port: '55',
    host: 'exmaple.com',
    username: 'root',
    password: 'password',
    path: './build/',
    remotePath: '/data/website/demo/'
});


module.exports = WebpackSftpClient;
