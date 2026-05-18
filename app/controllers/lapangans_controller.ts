import type { HttpContext } from '@adonisjs/core/http'
import Lapangan from '#models/lapangan'
import Booking from '#models/booking'

export default class LapanganController {
  // Landing page - tampil semua lapangan aktif
 async index({ view }: HttpContext) {
  const lapangan = await Lapangan.query().where('status', 'aktif')
  return view.render('pages/home', { lapangan })
}

  // Detail lapangan
  async show({ params, view, request }: HttpContext) {
  const lapangan = await Lapangan.findOrFail(params.id)
  const tanggal = request.input('tanggal', new Date().toISOString().split('T')[0])
  
  const bookings = await Booking.query()
    .where('lapangan_id', lapangan.id)
    .where('tanggal', tanggal)
    .whereIn('status', ['pending', 'confirmed'])
  
  return view.render('pages/detail', { lapangan, bookings, tanggal })
}

  // Form booking
  async bookingForm({ params, view, request }: HttpContext) {
  const lapangan = await Lapangan.findOrFail(params.id)
  const tanggal = request.input('tanggal', new Date().toISOString().split('T')[0])
  return view.render('pages/booking', { lapangan, tanggal })
}

  // Simpan booking
  async bookingStore({ params, request, response, session }: HttpContext) {
  const lapangan = await Lapangan.findOrFail(params.id)
  const data = request.only(['nama_pemesan', 'no_telepon', 'tanggal', 'jam_mulai', 'jam_selesai'])

  const jamMulai = parseInt(data.jam_mulai.split(':')[0])
  const jamSelesai = parseInt(data.jam_selesai.split(':')[0])
  const durasi = jamSelesai - jamMulai
  const totalHarga = durasi * lapangan.hargaPerJam

  const booking = await Booking.create({
    namaPemesan: data.nama_pemesan,
    noTelepon: data.no_telepon,
    lapanganId: lapangan.id,
    tanggal: data.tanggal,
    jamMulai: data.jam_mulai,
    jamSelesai: data.jam_selesai,
    totalHarga: totalHarga,
    status: 'pending',
  })

  // Simpan booking ID ke session
  const myBookings: number[] = session.get('my_bookings', [])
  myBookings.push(booking.id)
  session.put('my_bookings', myBookings)

  session.flash('success', 'Booking berhasil! Kami akan segera mengkonfirmasi pesanan Anda.')
  return response.redirect('/booking/success')
}


  async bookingSuccess({ view }: HttpContext) {
  return view.render('pages/booking_success')
}

async myBookings({ view, session }: HttpContext) {
  const bookingIds: number[] = session.get('my_bookings', [])
  const bookings = bookingIds.length > 0
    ? await Booking.query().whereIn('id', bookingIds).preload('lapangan').orderBy('created_at', 'desc')
    : []
  return view.render('pages/my_bookings', { bookings })
}
}

