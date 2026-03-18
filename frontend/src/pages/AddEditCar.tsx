import { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCar, getCars, updateCar } from "@/api/cars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Car {
  id: number;
  vehicle_model: string;
  vehicle_number: string;
  seating_capacity: number;
  rent_per_day: string;
}

export default function AddEditCar() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getCars().then((res) => {
      const car = res.data.find((c: Car) => c.id === Number(id));
      if (car) {
        setVehicleModel(car.vehicle_model);
        setVehicleNumber(car.vehicle_number);
        setSeatingCapacity(String(car.seating_capacity));
        setRentPerDay(car.rent_per_day);
      }
    });
  }, [id, isEdit]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const payload = {
      vehicle_model: vehicleModel,
      vehicle_number: vehicleNumber,
      seating_capacity: Number(seatingCapacity),
      rent_per_day: Number(rentPerDay),
    };
    try {
      if (isEdit) {
        await updateCar(Number(id), payload);
      } else {
        await addCar(payload);
      }
      navigate("/cars");
    } catch {
      setError("Failed to save car. Vehicle number may already exist.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "Edit car" : "Add new car"}</CardTitle>
          <CardDescription>
            {isEdit ? "Update vehicle details" : "Add a vehicle to your fleet"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="space-y-1">
              <Label htmlFor="model">Vehicle model</Label>
              <Input
                id="model"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="e.g. Toyota Innova"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="number">Vehicle number</Label>
              <Input
                id="number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. MH12AB1234"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="seats">Seating capacity</Label>
                <Input
                  id="seats"
                  type="number"
                  min={1}
                  max={50}
                  value={seatingCapacity}
                  onChange={(e) => setSeatingCapacity(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="rent">Rent per day (₹)</Label>
                <Input
                  id="rent"
                  type="number"
                  min={1}
                  step="0.01"
                  value={rentPerDay}
                  onChange={(e) => setRentPerDay(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Save changes" : "Add car"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
