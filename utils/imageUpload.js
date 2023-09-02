// external imports
const multer = require('multer');


function profilePictureUpload(req, res, next) {
    const storage = multer.diskStorage({
        destination:function(request, file, callback) {
            callback(null, 'public/picture');
        },
        filename: function(request, file, callback) {
            const file_name_ext = file.originalname.split(".");
            const file_name = file_name_ext[0];
            const file_extension = file_name_ext[1];
            callback(null, file_name + '_' + Date.now() + '.' + file_extension);
        },
    });

    const upload = multer({storage: storage}).array("image");

    upload(req, res, function(error){
        if (error){
            res.status(400).json({
                error: error.message,
                stack: error.stack
            });
        } else {
            next()
        }
    })
}



module.exports = profilePictureUpload