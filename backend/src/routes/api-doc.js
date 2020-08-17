const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger/openapi');

var options = {
    swaggerOptions: {
        validatorUrl: null,
        customSiteTitle: 'Aracar group documentation'
    },
    customCssUrl: '/swagger.css'
};

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

module.exports = router;
