import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/cars");
  }

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/cars" className="text-sm font-semibold tracking-tight">
          CarRental
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            to="/cars"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Cars
          </Link>

          {user?.role === "agency" && (
            <>
              <Link
                to="/agency/cars/add"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Add Car
              </Link>
              <Link
                to="/agency/bookings"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Bookings
              </Link>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden sm:flex">
                {user.role}
              </Badge>
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
