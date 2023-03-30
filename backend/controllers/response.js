const fs = require('fs')
module.exports = {
    error(res, err) {
        fs.createWriteStream('error.log', { flags: 'a' }).write((Date().toLocaleString() + ': \n' + ((typeof err == 'object')?err.stack:err)) + '\n\n')
        res.status(500).json({ success: false, error: `Unknown error occured` }).end();
    },

    success(res, message = null, data = null) {
        data ? res.status(200).json({ success: true, message, data }).end() : res.status(200).json({ success: true, message }).end()
    },

    failure(res, error = null, data = null) {
        data ? res.status(500).json({ success: false, error, data }).end() : res.status(500).json({ success: false, error }).end()
    }
}