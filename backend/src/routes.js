const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.create);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.create);

routes.post('/spots/:spot_id/bookings', BookingController.create);

routes.get('/dashboard', DashboardController.show);

routes.post('/bookings/:booking_id/approvals', ApprovalController.create);
routes.post('/bookings/:booking_id/rejections', RejectionController.create);

module.exports = routes;
