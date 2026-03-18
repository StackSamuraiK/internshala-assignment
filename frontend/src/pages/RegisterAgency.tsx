import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAgency } from "@/api/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterAgency() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerAgency(name, email, password);
      navigate("/login");
    } catch {
      setError("Registration failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-transparent transition-all duration-500">
      <Card className="w-full max-w-md shadow-2xl border-border/40 glass animate-in fade-in slide-in-in-from-bottom-4 duration-700">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Agency Registration</CardTitle>
          <CardDescription>
            Register your rental agency to start listing cars
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 animate-in fade-in zoom-in duration-300">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Agency Name</Label>
              <Input
                id="name"
                placeholder="Royal Rentals"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-background/50 focus:bg-background transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@agency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 focus:bg-background transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50 focus:bg-background transition-all"
              />
            </div>
            <Button type="submit" className="w-full h-10" disabled={loading}>
              {loading ? "Registering agency..." : "Register Agency"}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
            <div className="h-px w-full bg-border/50" />
            <Link
              to="/register/customer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Not an agency? Register as a customer
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
