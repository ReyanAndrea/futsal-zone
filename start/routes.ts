import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import LapangansController from '#controllers/lapangans_controller'
import AdminController from '#controllers/admin_controller'

// =====================
// PUBLIC ROUTES
// =====================
router.get('/', [LapangansController, 'index'])
router.get('/lapangan/:id', [LapangansController, 'show'])
router.get('/booking/success', [LapangansController, 'bookingSuccess'])
router.get('/booking/my', [LapangansController, 'myBookings'])
router.get('/booking/:id', [LapangansController, 'bookingForm'])
router.post('/booking/:id', [LapangansController, 'bookingStore'])

// =====================
// AUTH ROUTES
// =====================
router.get('/admin/login', [AdminController, 'loginForm'])
router.post('/admin/login', [AdminController, 'login'])
router.post('/admin/logout', [AdminController, 'logout'])

// =====================
// ADMIN ROUTES (protected)
// =====================
router.group(() => {
  router.get('/admin/dashboard', [AdminController, 'dashboard'])
  router.get('/admin/lapangan', [AdminController, 'lapanganIndex'])
  router.get('/admin/lapangan/create', [AdminController, 'lapanganCreate'])
  router.post('/admin/lapangan', [AdminController, 'lapanganStore'])
  router.get('/admin/lapangan/:id/edit', [AdminController, 'lapanganEdit'])
  router.post('/admin/lapangan/:id', [AdminController, 'lapanganUpdate'])
  router.post('/admin/lapangan/:id/delete', [AdminController, 'lapanganDelete'])
  router.get('/admin/bookings', [AdminController, 'bookingsIndex'])
  router.post('/admin/bookings/:id/status', [AdminController, 'bookingUpdateStatus'])
}).use(middleware.auth())