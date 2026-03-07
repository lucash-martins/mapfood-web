import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Store } from "lucide-react";
import { useState } from "react";
import { User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Início" },
    { to: "/como-funciona", label: "Como Funciona" },
    { to: "/contato", label: "Contato" },
    { to: "/comerciantes", label: "Comerciantes" },
    { to: "/produtos", label: "Produtos" },
    { to: "/sobre", label: "Sobre" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
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
            
            <Link to="/cadastro" onClick={() => setIsOpen(false)}>
              <Button variant="default" className="w-full">
               Cadastre-se
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
