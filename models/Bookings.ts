import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  pickup: String,
  destination: String,
  date: Date,
})

export default mongoose.models.Booking ||
  mongoose.model('Booking', BookingSchema)
