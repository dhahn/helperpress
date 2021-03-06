var HOSTS = '/etc/hosts',
    
    fs = require('fs');

/**
 * Get a list of the lines that make up the /etc/hosts file. If the
 * `preserveFormatting` parameter is true, then include comments, blank lines
 * and other non-host entries in the result.
 *
 * @param  {boolean}   preserveFormatting
 * @param  {function(err, lines)} cb
 */
var get = function (preserveFormatting) {
    var lines = [],

        curFile = fs.readFileSync(HOSTS, { encoding: 'utf8' });

    curFile.split("\n").forEach(function (line) {
        var matches = /^\s*?([^#]+?)\s+([^#]+?)$/.exec(line)
        if (matches && matches.length === 3) {
            // Found a hosts entry
            var ip = matches[1]
            var host = matches[2]
            lines.push([ip, host])
        } else {
            // Found a comment, blank line, or something else
            if (preserveFormatting) {
                lines.push(line)
            }
        }
    });

    return lines
};

/**
 * Check if host exists
 *
 * @param  {string}   ip
 * @param  {string}   host
 */
var hostExists = function (host, ip) {
    var lines = get(true);

    // Check if host already exists in file
    var found = false;
    lines.forEach(function (line) {
        if (Array.isArray(line) && line[1] === host){

            // later rules can overwrite earlier ones,
            // so check all of them to see if the latest
            // occurence of the host is set to our IP

            if(line[0] === ip) {
                found = true;
            }else{
                found = false;
            }
        }
    });

    return found;
};

module.exports = {
    hostExists: hostExists
};