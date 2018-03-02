var express = require('express'),
  router = express.Router(),
  productCtrl = require('../controllers/YasserController');

  const authentication = require('../controllers/authentication')(router);
  app = express();
	memberCtrl = require('../controllers/MemberController');


//-------------------------------Product Routes-----------------------------------
router.get('/yasser/getProducts', productCtrl.getProducts);
router.get('/yasser/getProduct/:productId', productCtrl.getProduct);
router.get(
  '/yasser/getProductsBelowPrice/:price',
  productCtrl.getProductsBelowPrice
);
router.post('/yasser/createProduct', productCtrl.createProduct);
router.patch('/yasser/updateProduct/:productId', productCtrl.updateProduct);
router.delete('/yasser/deleteProduct/:productId', productCtrl.deleteProduct);


app.use('/authentication' , authentication);

//-------------------------------Member Routes-----------------------------------
router.get('/member/getMembers', memberCtrl.getMembers);
router.post('/member/createMember', memberCtrl.createMember);
router.patch('/member/updateMember/:memberId', memberCtrl.updateMember);
router.delete('/member/deleteMember/:memberId', memberCtrl.deleteMember);

//------------------------------User Routes-----------------------------------


module.exports = router;
