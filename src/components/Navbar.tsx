import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Store, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
      const email = sessionStorage.getItem("userEmail") || "";
      setUserName(email.split("@")[0]);
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { to: "/home", label: "Início" },
    { to: "/como-funciona", label: "Como Funciona" },
    { to: "/contato", label: "Contato" },
    { to: "/comerciantes", label: "Comerciantes" },
    { to: "/produtos", label: "Produtos" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/home" className="flex items-center gap-2 text-xl font-bold">
            <Store className="h-6 w-6 text-primary" />
            <span className="text-gradient">MapFood</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="relative group">
              {/* Botão do ícone */}
              <button className="p-2 rounded-full hover:bg-gray-200 transition">
                <User size={22} />
              </button>

              {/* Menu dropdown */}
              <div
                className="
                  absolute right-0 mt-2 w-40
                  bg-white border rounded-lg shadow-md
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-200
                "
              >
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-2 border-b text-sm font-medium text-gray-700">
                      Olá, {userName}
                    </div>
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Meu Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Sair
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      to="/cadastro"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Cadastre-se
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <p className="text-sm font-medium text-gray-700 mb-2">Olá, {userName}</p>
                <Link to="/perfil" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full mb-2">
                    Meu Perfil
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                >
                  <LogOut size={16} className="mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full mb-2">
                    Login
                  </Button>
                </Link>
                <Link to="/cadastro" onClick={() => setIsOpen(false)}>
                  <Button variant="default" className="w-full">
                    Cadastre-se
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
