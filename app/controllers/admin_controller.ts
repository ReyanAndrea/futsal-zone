import type { HttpContext } from '@adonisjs/core/http'
import Lapangan from '#models/lapangan'
import Booking from '#models/booking'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AdminController {
  // AUTH
  async loginForm({ view }: HttpContext) {
    return view.render('admin/login')
  }

async login({ request, auth, response, session }: HttpContext) {
  const { email, password } = request.only(['email', 'password'])
  try {
    const user = await User.findByOrFail('email', email)
    console.log('User found:', user.email)
    console.log('Password input:', password)
    console.log('Password hash:', user.password)
    const passwordValid = await hash.verify(user.password, password)
    console.log('Password valid:', passwordValid)
    if (!passwordValid) {
      session.flash('error', 'Password salah!')
      return response.redirect('/admin/login')
    }
    await auth.use('web').login(user)
    return response.redirect('/admin/dashboard')
  } catch (err:any) {
    console.log('Error:', err.message)
    session.flash('error', err.message)
    return response.redirect('/admin/login')
  }
}

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/admin/login')
  }

  // =====================
  // DASHBOARD
  // =====================
  async dashboard({ view }: HttpContext) {
    const totalLapangan = await Lapangan.query().count('* as total').first()
    const totalBooking = await Booking.query().count('* as total').first()
    const pendingBooking = await Booking.query().where('status', 'pending').count('* as total').first()
    return view.render('admin/dashboard', { totalLapangan, totalBooking, pendingBooking })
  }

  // =====================
  // CRUD LAPANGAN
  // =====================
  async lapanganIndex({ view }: HttpContext) {
    const lapangan = await Lapangan.all()
    return view.render('admin/lapangan/index', { lapangan })
  }

  async lapanganCreate({ view }: HttpContext) {
    return view.render('admin/lapangan/create')
  }

 async lapanganStore({ request, response, session }: HttpContext) {
  const foto = request.file('foto', {
    size: '2mb',
    extnames: ['jpg', 'jpeg', 'png', 'webp'],
  })

  const data = request.only(['nama', 'deskripsi', 'harga_per_jam', 'status'])
  
  let fotoName: string | null = null
  if (foto && foto.isValid) {
    fotoName = `${Date.now()}.${foto.extname}`
    await foto.move('public/uploads', { name: fotoName })
  }

  await Lapangan.create({
    nama: data.nama,
    deskripsi: data.deskripsi,
    hargaPerJam: parseInt(data.harga_per_jam),
    status: data.status,
    foto: fotoName,
  })

  session.flash('success', 'Lapangan berhasil ditambahkan!')
  return response.redirect('/admin/lapangan')
}

  async lapanganEdit({ params, view }: HttpContext) {
    const lapangan = await Lapangan.findOrFail(params.id)
    return view.render('admin/lapangan/edit', { lapangan })
  }

  async lapanganUpdate({ params, request, response, session }: HttpContext) {
  const lapangan = await Lapangan.findOrFail(params.id)
  const foto = request.file('foto', {
    size: '2mb',
    extnames: ['jpg', 'jpeg', 'png', 'webp'],
  })

  const data = request.only(['nama', 'deskripsi', 'harga_per_jam', 'status'])

  let fotoName = lapangan.foto
  if (foto && foto.isValid) {
    fotoName = `${Date.now()}.${foto.extname}`
    await foto.move('public/uploads', { name: fotoName })
  }

  lapangan.merge({
    nama: data.nama,
    deskripsi: data.deskripsi,
    hargaPerJam: parseInt(data.harga_per_jam),
    status: data.status,
    foto: fotoName,
  })
  await lapangan.save()
  session.flash('success', 'Lapangan berhasil diupdate!')
  return response.redirect('/admin/lapangan')
}

  async lapanganDelete({ params, response, session }: HttpContext) {
    const lapangan = await Lapangan.findOrFail(params.id)
    await lapangan.delete()
    session.flash('success', 'Lapangan berhasil dihapus!')
    return response.redirect('/admin/lapangan')
  }

  // =====================
  // MANAJEMEN BOOKING
  // =====================
  async bookingsIndex({ view }: HttpContext) {
    const bookings = await Booking.query().preload('lapangan')
    return view.render('admin/bookings/index', { bookings })
  }

  async bookingUpdateStatus({ params, request, response }: HttpContext) {
    const booking = await Booking.findOrFail(params.id)
    const { status } = request.only(['status'])
    booking.status = status
    await booking.save()
    return response.redirect('/admin/bookings')
  }
}