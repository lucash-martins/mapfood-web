import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import produtosData from "@/data/produtos.json";
import type { Produto } from "@/types";

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const produtos: Produto[] = produtosData;

  const filteredProdutos = useMemo(() => {
    if (!searchTerm) return produtos;
    
    const term = searchTerm.toLowerCase();
    return produtos.filter(
      (p) =>
        p.nome.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term) ||
        p.loja.toLowerCase().includes(term)
    );
  }, [searchTerm, produtos]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold">
                Explore <span className="text-gradient">Produtos</span> Locais
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubra produtos e serviços oferecidos por microempreendedores da sua região
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Buscar produtos ou serviços..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Results Count */}
            {searchTerm && (
              <div className="text-center text-muted-foreground">
                {filteredProdutos.length} produto(s) encontrado(s)
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProdutos.map((produto, index) => (
                <Card 
                  key={produto.id}
                  className="card-elevated hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">Imagem do Produto</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{produto.categoria}</Badge>
                        </div>
                        <h3 className="font-semibold text-xl">{produto.nome}</h3>
                        <p className="text-sm text-muted-foreground">{produto.descricao}</p>
                        <Link to={`/loja/${produto.lojaId}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <Store className="h-4 w-4" />
                          {produto.loja}
                        </Link>
                        <p className="text-2xl font-bold text-primary">{formatPrice(produto.preco)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Ver Detalhes</Button>
                        <Button variant="outline" className="flex-1">Contatar</Button>
                      </div>
                    </div>
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

export default Produtos;
