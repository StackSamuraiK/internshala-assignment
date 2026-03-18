import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";


export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold group-hover:scale-110 transition-transform">
            C
          </div>
          <span className="font-bold text-xl tracking-tight">CarRent</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/cars"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse
          </Link>
          {user ? (
            <>
              {user.role === "agency" && (
                <>
                  <Link
                    to="/agency/cars/add"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Add Car
                  </Link>
                  <Link
                    to="/agency/bookings"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Bookings
                  </Link>
                </>
              )}
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">
                    {user.role}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs">
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link to="/register/customer">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
