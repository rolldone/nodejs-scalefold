const BaseRoute = require('./BaseRoute');
const AuthController = require('@controller/v1/xhr/admin/AuthController.js');

const AuthControllerMember = require('@controller/v1/xhr/member/AuthController.js');
const SetDefaultDriver = require('../../app/middleware/SetDefaultDriver');
const ApiAuthMiddleware = require('../../app/middleware/ApiAuthMiddleware');
const UserController = require('../../app/controllers/v1/xhr/admin/UserController');
const UserControllerMember = require('../../app/controllers/v1/xhr/member/UserController');
const AppController = require('../../app/controllers/v1/xhr/member/AppController');
const BussineParameter = require('../../app/controllers/v1/xhr/admin/BussineParameter');
const JobController = require('../../app/controllers/v1/xhr/member/JobController');
const ScheduleController = require('../../app/controllers/v1/xhr/member/ScheduleController');
const QueueRecordController = require('../../app/controllers/v1/xhr/member/QueueRecordController');
const ProductController = require('../../app/controllers/v1/xhr/admin/ProductController');
const CheckDeviceIdMiddleware = require('../../app/middleware/CheckDeviceIdMiddleware');
const OrderController = require('../../app/controllers/v1/xhr/member/OrderController');

module.exports = BaseRoute.extend({
  baseRoute : '/api/v1',
  onready : function(){
    let self = this;
    self.get('/display-routes','api.display.route',[],self.displayRoute.bind(self));
    self.post('/auth/login','api.admin.auth.login',[],(AuthController.create()).apiLogin);
    self.post('/auth/register','api.admin.auth.register',[],(AuthController.create()).register);
    self.get('/auth/logout','api.admin.auth.logout',[],(AuthController.create()).logout);
    /* Admin */
    self.use('/admin',[(SetDefaultDriver.create()).setValue('api'),(ApiAuthMiddleware.create()).setValue('api')],function(){
      /* Admin User */
      self.get('/user/profile','api.admin.user.profile',[],(UserController.create()).profile);
      self.get('/user/:id/view','api.admin.user.view',[],(UserController.create()).getUser);
      self.post('/user/add','api.admin.user.add',[],(UserController.create()).addUser);
      self.post('/user/update','api.admin.user.update',[],(UserController.create()).updateUser);
      self.post('/user/delete','api.admin.user.delete',[],(UserController.create()).deleteUser);
      /* Bus Parameter */
      self.get('/bus-param/static-categories','api.admin.bus_param.static_categories',[],(BussineParameter.create()).getStaticCategories);
      self.get('/bus-param/bus-params','api.admin.bus_param.bus_params',[],(BussineParameter.create()).getBusParams);
      self.get('/bus-param/:id/view','api.admin.bus_param.bus_param',[],(BussineParameter.create()).getBusParam);
      self.post('/bus-param/add','api.admin.bus_param.add',[],(BussineParameter.create()).addBusParam);
      self.post('/bus-param/update','api.admin.bus_param.update',[],(BussineParameter.create()).updateBusParam);
      self.post('/bus-param/delete','api.admin.bus_param.delete',[],(BussineParameter.create()).deleteBusParam);
      /* Product & Product Item */
      self.get('/product/products','api.admin.product.products',[],(ProductController.create()).getProducts);
      self.get('/product/:id/view','api.admin.product.product',[],(ProductController.create()).getProduct);
      self.post('/product/add','api.admin.product.add',[],(ProductController.create()).addProduct);
      self.post('/product/update','api.admin.product.update',[],(ProductController.create()).updateProduct);
      self.post('/product/delete','api.admin.product.delete',[],(ProductController.create()).deleteProduct);
      self.get('/product/item/app-categories','api.admin.product.item.app_categories',[],(ProductController.create()).getAppCategories);
      self.get('/product/item/items','api.admin.product.item.items',[],(ProductController.create()).getProductItems);
      self.get('/product/item/:id/view','api.admin.product.item.item',[],(ProductController.create()).getProductItem);
      self.post('/product/item/add','api.admin.product.item.add',[],(ProductController.create()).addProductItem);
      self.post('/product/item/update','api.admin.product.item.update',[],(ProductController.create()).updateProductItem);
      self.post('/product/item/delete','api.admin.product.item.delete',[],(ProductController.create()).deleteProductItem);
    });
    /* Client */
    self.use('/member',[],function(){
      self.post('/auth/login','api.member.auth.login',[],(AuthControllerMember.create()).apiLogin);
      self.post('/auth/register','api.member.auth.register',[],(AuthControllerMember.create()).register);
      self.get('/auth/logout','api.member.auth.logout',[],(AuthControllerMember.create()).logout);
      self.get('/auth/register-device-id','api.member.auth.register_device_id',[],(AuthControllerMember.create()).registerDeviceID);
    })

    /* Client cart */
    self.use('/member',[(CheckDeviceIdMiddleware.create()).action],function(){
      self.get('/cart/carts','api.member.cart.carts',[],(OrderController.create()).getCarts);
      self.get('/cart/:id/view','api.member.cart.cart',[],(OrderController.create()).getCart);
      self.get('/cart/add','api.member.cart.add',[],(OrderController.create()).addCart);
      self.get('/cart/delete','api.member.cart.delete',[],(OrderController.create()).deleteCart);
    })

    self.use('/member',[(CheckDeviceIdMiddleware.create()).action,(SetDefaultDriver.create()).setValue('member_api'),(ApiAuthMiddleware.create()).setValue('member_api')],function(){
      /* Member User */
      self.get('/user/profile','api.member.user.profile',[],(UserControllerMember.create()).profile);
      /* Apps */
      self.get('/app/app-categories','api.member.app.app_categories',[],(AppController.create()).getAppCategories);
      self.get('/app/apps','api.member.app.apps',[],(AppController.create()).getApps);
      self.get('/app/:id/view','api.member.app.app',[],(AppController.create()).getApp);
      self.post('/app/add','api.member.app.add',[],(AppController.create()).addApp);
      self.post('/app/update','api.member.app.update',[],(AppController.create()).updateApp);
      /* Jobs */
      self.get('/job/jobs','api.member.job.jobs',[],(JobController.create()).getJobs);
      self.get('/job/:id/view','api.member.job.job',[],(JobController.create()).getJob);
      self.post('/job/add','api.member.job.add',[],(JobController.create()).addJob);
      self.post('/job/update','api.member.job.update',[],(JobController.create()).updateJob);
      self.post('/job/delete','api.member.job.delete',[],(JobController.create()).deleteJob);
      /* Schedule */
      self.get('/schedule/schedules','api.member.schedule.schedules',[],(ScheduleController.create()).getSchedules);
      self.get('/schedule/:id/view','api.member.schedule.schedule',[],(ScheduleController.create()).getSchedule);
      self.post('/schedule/add','api.member.schedule.add',[],(ScheduleController.create()).addSchedule);
      self.post('/schedule/update','api.member.schedule.update',[],(ScheduleController.create()).updateSchedule);
      self.post('/schedule/delete','api.member.schedule.delete',[],(ScheduleController.create()).deleteSchedule);
      /* QueueRecords */
      self.get('/queue-record/queue-records','api.member.queue_record.queue_records',[],(QueueRecordController.create()).getQueueRecords);
      self.get('/queue-record/:id/view','api.member.queue_record.queue_record',[],(QueueRecordController.create()).getQueueRecord);
      /* Order */
      self.get('/order/orders','api.member.order.orders',[],(OrderController.create()).getOrders);
      self.get('/order/:id/view','api.member.order.order',[],(OrderController.create()).getOrder);
      self.post('/order/add','api.member.order.add',[],(OrderController.create()).addOrder);
      self.post('/order/submit','api.member.order.submit',[],(OrderController.create()).submitOrder);
      self.post('/order/cancel','api.member.order.cancel',[],(OrderController.create()).cancelOrder);
    })
  }
})