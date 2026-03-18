import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getCars } from "@/api/cars";

import { createBooking } from "@/api/bookings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Car {
  id: number;
  vehicle_model: string;
  vehicle_number: string;
  seating_capacity: number;
  rent_per_day: string;
}

const DAY_OPTIONS = [1, 2, 3, 5, 7, 10, 14, 21, 30];

export default function AvailableCars() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingCarId, setBookingCarId] = useState<number | null>(null);
  const [days, setDays] = useState<number>(1);
  const [startDate, setStartDate] = useState("");
  const [feedback, setFeedback] = useState<{
    id: number;
    msg: string;
    ok: boolean;
  } | null>(null);

  useEffect(() => {
    getCars()
      .then((res) => {
        setCars(res.data as Car[]);
      })
      .catch(() => {
        // Handle error if needed
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  function handleRentClick(carId: number) {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role === "agency") {
      setFeedback({ id: carId, msg: "Agencies cannot book cars.", ok: false });
      return;
    }
    setBookingCarId(bookingCarId === carId ? null : carId);
    setFeedback(null);
  }

  async function handleBook(e: FormEvent, car: Car) {
    e.preventDefault();
    try {
      await createBooking({ car_id: car.id, start_date: startDate, num_days: days });
      setFeedback({ id: car.id, msg: "Booking confirmed!", ok: true });
      setBookingCarId(null);
    } catch {
      setFeedback({ id: car.id, msg: "Booking failed. Please try again.", ok: false });
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-sm text-muted-foreground">
        Loading cars...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Available Cars</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse and rent from our fleet
        </p>
      </div>

      {cars.length === 0 ? (
        <p className="text-sm text-muted-foreground">No cars available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <Card key={car.id} className="card-hover border-border/50 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {car.vehicle_model}
                  </CardTitle>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {car.vehicle_number}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm p-3 bg-muted/30 rounded-lg border border-border/20">
                  <div>
                    <p className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider">
                      Seats
                    </p>
                    <p className="font-medium">{car.seating_capacity}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider">
                      Per day
                    </p>
                    <p className="font-medium text-primary">₹{parseFloat(car.rent_per_day).toLocaleString()}</p>
                  </div>
                </div>


                {feedback?.id === car.id && (
                  <p
                    className={`text-xs ${feedback.ok ? "text-green-600" : "text-destructive"}`}
                  >
                    {feedback.msg}
                  </p>
                )}

                {user?.role === "customer" && bookingCarId === car.id && (
                  <form onSubmit={(e) => handleBook(e, car)} className="space-y-3 pt-1">
                    <div className="space-y-1">
                      <Label htmlFor={`days-${car.id}`} className="text-xs">
                        Number of days
                      </Label>
                      <select
                        id={`days-${car.id}`}
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        {DAY_OPTIONS.map((d) => (
                          <option key={d} value={d}>
                            {d} {d === 1 ? "day" : "days"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`date-${car.id}`} className="text-xs">
                        Start date
                      </Label>
                      <input
                        id={`date-${car.id}`}
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total: ₹{(parseFloat(car.rent_per_day) * days).toLocaleString()}
                    </div>
                    <Button type="submit" size="sm" className="w-full">
                      Confirm booking
                    </Button>
                  </form>
                )}

                <Button
                  variant={bookingCarId === car.id ? "outline" : "default"}
                  size="sm"
                  className="w-full"
                  onClick={() => handleRentClick(car.id)}
                >
                  {bookingCarId === car.id ? "Cancel" : "Rent Car"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
