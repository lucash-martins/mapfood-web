import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import comerciantesData from "@/data/comerciantes.json";
import type { Comerciante } from "@/types";

const Comerciantes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const comerciantes: Comerciante[] = comerciantesData;

  const filteredComerciantes = useMemo(() => {
    if (!searchTerm) return comerciantes;
    
    const term = searchTerm.toLowerCase();
    return comerciantes.filter(
      (c) =>
        c.nome.toLowerCase().includes(term) ||
        c.categoria.toLowerCase().includes(term) ||
        c.endereco.toLowerCase().includes(term)
    );
  }, [searchTerm, comerciantes]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold">
                Conheça nossos <span className="text-gradient">Comerciantes</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore e conecte-se com empreendedores locais da sua região
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome, categoria ou localização..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Results Count */}
            {searchTerm && (
              <div className="text-center text-muted-foreground">
                {filteredComerciantes.length} resultado(s) encontrado(s)
              </div>
            )}

            {/* Merchants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComerciantes.map((comerciante, index) => (
                <Card 
                  key={comerciante.id}
                  className="card-elevated hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {comerciante.nome}
                      <span className="text-xs font-normal bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {comerciante.categoria}
                      </span>
                    </CardTitle>
                    <CardDescription>{comerciante.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{comerciante.endereco}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{comerciante.telefone}</span>
                    </div>
                    <Link to={`/loja/${comerciante.id}`}>
                      <Button variant="outline" className="w-full mt-4 group">
                        Ver Loja
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Comerciantes;
