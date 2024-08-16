const router = require('express').Router();
const productController = require("../controllers/productControllers");
const { authGuard,authGuardAdmin } = require('../middleware/authGuard');

router.post('/create_product', authGuard, productController.createProduct)

// get all products
router.get("/get_products", productController.getProducts)

// single product
router.get("/get_product/:id", productController.getSingleProduct)

// update product
router.put("/update_product/:id",authGuardAdmin, productController.updateProduct)

// delete product
router.delete("/delete_product/:id",authGuardAdmin ,productController.deleteProduct)

// create order
router.post("/create_order", productController.createOrder)

router.get("/get_orders", productController.getOrders)

// pagination route
router.get('/get_pagination', productController.getPagination)

module.exports = router;