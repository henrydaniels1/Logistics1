"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Truck, Clock, CheckCircle, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/footer";

// Define types
interface TrackingHistory
{
  date: string;
  time: string;
  location: string;
  status: string;
}

interface TrackingData
{
  status: string;
  estimatedDelivery?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  origin: string;
  destination: string;
  currentLocation?: string;
  signedBy?: string;
  history: TrackingHistory[];
}

// Mock tracking data
const mockTrackingData: Record<string, TrackingData> = {
  TRK123456789: {
    status: "In Transit",
    estimatedDelivery: "March 20, 2025",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    currentLocation: "Denver, CO",
    history: [
      { date: "March 15, 2025", time: "09:30 AM", location: "New York, NY", status: "Package picked up" },
      { date: "March 16, 2025", time: "02:15 PM", location: "Chicago, IL", status: "In transit" },
      { date: "March 17, 2025", time: "10:45 AM", location: "Denver, CO", status: "In transit" },
    ],
  },
  TRK987654321: {
    status: "Delivered",
    deliveryDate: "March 15, 2025",
    deliveryTime: "2:30 PM",
    origin: "Seattle, WA",
    destination: "Miami, FL",
    signedBy: "John Smith",
    history: [
      { date: "March 12, 2025", time: "11:20 AM", location: "Seattle, WA", status: "Package picked up" },
      { date: "March 13, 2025", time: "03:45 PM", location: "Minneapolis, MN", status: "In transit" },
      { date: "March 14, 2025", time: "09:10 AM", location: "Chicago, IL", status: "In transit" },
      { date: "March 15, 2025", time: "08:30 AM", location: "Atlanta, GA", status: "Out for delivery" },
      { date: "March 15, 2025", time: "02:30 PM", location: "Miami, FL", status: "Delivered" },
    ],
  },
};

export default function TrackPage ()
{
  const [ trackingNumber, setTrackingNumber ] = useState<string>( "" );
  const [ trackingResult, setTrackingResult ] = useState<TrackingData | null>( null );
  const [ isLoading, setIsLoading ] = useState<boolean>( false );
  const [ error, setError ] = useState<string>( "" );

  const handleTrack = () =>
  {
    setIsLoading( true );
    setError( "" );

    // Simulate API call
    setTimeout( () =>
    {
      if ( trackingNumber in mockTrackingData )
      {
        setTrackingResult( mockTrackingData[ trackingNumber ] );
      } else if ( trackingNumber.trim() !== "" )
      {
        setError( "Tracking number not found. Please check and try again." );
      } else
      {
        setError( "Please enter a tracking number." );
      }
      setIsLoading( false );
    }, 1500 );
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Tracking Input */ }
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter tracking number (e.g., TRK123456789)"
                value={ trackingNumber }
                onChange={ ( e ) => setTrackingNumber( e.target.value ) }
                className="w-full"
              />
              <Button onClick={ handleTrack } disabled={ isLoading } className="gap-2">
                { isLoading ? <>Searching<span className="animate-pulse">...</span></> : <>Track Package <Search className="h-4 w-4" /></> }
              </Button>
            </div>

            { error && (
              <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className="mt-4 text-red-500 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                { error }
              </motion.div>
            ) }
          </CardContent>
        </Card>
      </div>

      {/* Tracking Result */ }
      { trackingResult && (
        <motion.div initial={ { opacity: 0, y: 20 } } animate={ { opacity: 1, y: 0 } } transition={ { duration: 0.5 } } className="max-w-4xl mx-auto mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Tracking Details</CardTitle>
                  <CardDescription>Tracking Number: { trackingNumber }</CardDescription>
                </div>
                <div className={ `px-4 py-2 rounded-full flex items-center gap-2 ${ trackingResult.status === "Delivered" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                  }` }>
                  { trackingResult.status === "Delivered" ? <CheckCircle className="h-5 w-5" /> : <Truck className="h-5 w-5" /> }
                  { trackingResult.status }
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Tracking History */ }
              <Tabs defaultValue="history">
                <TabsList className="mb-6">
                  <TabsTrigger value="history">Tracking History</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-[22px] w-[2px] bg-muted-foreground/20" />
                    <ul className="space-y-6">
                      { trackingResult.history.map( ( event: TrackingHistory, index: number ) => (
                        <motion.li
                          key={ index }
                          initial={ { opacity: 0, x: -10 } }
                          animate={ { opacity: 1, x: 0 } }
                          transition={ { delay: index * 0.1, duration: 0.5 } }
                          className="flex gap-4"
                        >
                          <div className="relative z-10 w-[12px] h-[12px] rounded-full bg-primary mt-1.5" />
                          <div>
                            <p className="font-medium">{ event.status }</p>
                            <p className="text-muted-foreground">{ event.location }</p>
                            <p className="text-sm text-muted-foreground">{ event.date } at { event.time }</p>
                          </div>
                        </motion.li>
                      ) ) }
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      ) }

      <Footer />
    </div>
  );
}
