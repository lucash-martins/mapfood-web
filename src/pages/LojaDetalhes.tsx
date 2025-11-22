import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import comerciantesData from "@/data/comerciantes.json";
import produtosData from "@/data/produtos.json";
import type { Comerciante, Produto } from "@/types";

const LojaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const comerciantes: Comerciante[] = comerciantesData;
  const todosProdutos: Produto[] = produtosData;

  const loja = useMemo(() => {
    return comerciantes.find((c) => c.id === Number(id));
  }, [id, comerciantes]);

  const produtos = useMemo(() => {
    return todosProdutos.filter((p) => p.lojaId === Number(id));
  }, [id, todosProdutos]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (!loja) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Loja não encontrada</h1>
            <p className="text-muted-foreground">A loja que você procura não existe.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-8 animate-fade-in">
            {/* Store Header */}
            <Card className="card-elevated">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <div>
                      <h1 className="text-4xl font-bold mb-2">{loja.nome}</h1>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary">{loja.categoria}</Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(loja.avaliacao) 
                                  ? 'fill-primary text-primary' 
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">({loja.avaliacao.toFixed(1)})</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-lg">
                        {loja.descricao}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-foreground">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{loja.endereco}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>{loja.telefone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground">
                        <Mail className="h-5 w-5 text-primary" />
                        <span>{loja.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>{loja.horario}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button className="btn-glow">
                        <Phone className="mr-2 h-4 w-4" />
                        Entrar em Contato
                      </Button>
                      <Button variant="outline">
                        <MapPin className="mr-2 h-4 w-4" />
                        Ver no Mapa
                      </Button>
                    </div>
                  </div>

                  <div className="w-full md:w-80 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Imagem da Loja</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Section */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">
                Nossos <span className="text-gradient">Produtos</span>
              </h2>
              
              {produtos.length === 0 ? (
                <Card className="card-elevated">
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground text-lg">
                      Esta loja ainda não cadastrou produtos.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {produtos.map((produto, index) => (
                    <Card 
                      key={produto.id}
                      className="card-elevated hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="w-full h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">Imagem do Produto</span>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg">{produto.nome}</h3>
                              <Badge variant="outline">{produto.categoria}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{produto.descricao}</p>
                            <p className="text-2xl font-bold text-primary">{formatPrice(produto.preco)}</p>
                          </div>
                          <Button variant="outline" className="w-full">
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LojaDetalhes;
