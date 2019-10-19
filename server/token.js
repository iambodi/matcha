module.exports = {
    generate: function() {
        const crypto = require('crypto');
        var currentDate = Date.now() + Math.random() * 100000000;
        var token = crypto.createHash('sha256');
        
        token.update(currentDate.toString(), 'utf-8')
        token = token.digest('hex');
        return token;
    },
}