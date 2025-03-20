import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB()

  if (req.method === 'POST') {
    try {
      const booking = new Booking(req.body)
      await booking.save()
      res.status(201).json({ success: true, data: booking })
    } catch (error) {
      res.status(400).json({ success: false, error })
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
}
