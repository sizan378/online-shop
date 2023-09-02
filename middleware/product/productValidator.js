//  external import
const { body, validationResult } = require('express-validator')
const fs = require('fs');
const path = require('path')

// internal import
const Product = require('../../model/product/productSchema')


const productValidation = [
    body("title")
        .isLength({ min: 1})
        .withMessage("title should not be empty")
        .trim(),

    body("sku")
        .isLength({ min: 1})
        .withMessage("sku should not be empty")
        .custom(async (value) =>{
            try {
                const product = await Product.findOne({ sku: value });
                if (product) {
                    throw new Error("sku code already exists")
                }
            } catch (error) {
                throw new Error({
                    error: error.message,
                    stack: error.stack
                })
            }
        }),

    body("productPrice")
        .isNumeric()
        .withMessage('Only Decimals allowed')
        .trim(),

    body("sellingPrice")
        .isNumeric()
        .withMessage('Only Decimals allowed')
        .trim(),

    body("description")
        .isLength({ min: 1})
        .withMessage("description should not be empty")
        .trim(),
        
    body("stock")
        .isNumeric()
        .withMessage('Only Decimals allowed')
        .trim(),
]


async function productValidationHandler (req, res, next) {
    const error = validationResult(req)
    const mappedError = error.mapped()

    if (Object.keys(error.errors).length === 0) {
        next()
    } else {
        if (req.files.length > 0){
            const filenames = req.files.map(file => file.path)
            filenames.forEach(async filename => {
                try {
                  await fs.unlink(filename, (err) => {
                    if (err) {
                      console.error(`Error deleting file: ${filename}`);
                    } else {
                      console.log(`File deleted: ${filename}`);
                    }
                  });
                } catch (error) {
                  console.error(`Error deleting file: ${filename}`);
                }
              });
        }
        return res.status(500).json({
            message: mappedError
        })
    }
}

module.exports = { productValidation, productValidationHandler }


