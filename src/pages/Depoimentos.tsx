import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Quote } from "lucide-react";

const Depoimentos = () => {
  const depoimentos = [
    {
      nome: "João Silva",
      negocio: "Padaria do João",
      avatar: "JS",
      rating: 5,
      texto: "A MapFood transformou meu negócio! Em apenas 3 meses, consegui aumentar minhas vendas em 50%. Muitos clientes novos me encontraram através da plataforma. Recomendo de olhos fechados!",
    },
    {
      nome: "Maria Santos",
      negocio: "Boutique da Maria",
      avatar: "MS",
      rating: 5,
      texto: "Quando mudei minha loja de endereço, fiquei com medo de perder minhas clientes fiéis. Graças à MapFood, todas continuaram comprando comigo! A plataforma salvou meu negócio.",
    },
    {
      nome: "Carlos Oliveira",
      negocio: "Oficina do Carlos",
      avatar: "CO",
      rating: 5,
      texto: "Como microempreendedor, sempre foi difícil competir com as grandes empresas. A MapFood me deu a visibilidade que eu precisava. Hoje recebo pedidos todos os dias!",
    },
    {
      nome: "Ana Paula Lima",
      negocio: "Salão da Ana",
      avatar: "AL",
      rating: 5,
      texto: "Cadastrei meu salão há 6 meses e não me arrependo. A facilidade de uso da plataforma e o suporte da equipe são excelentes. Minha agenda está sempre cheia agora!",
    },
    {
      nome: "Pedro Henrique Costa",
      negocio: "Mercadinho São José",
      avatar: "PC",
      rating: 4,
      texto: "Muito bom poder divulgar nossos produtos frescos para toda a vizinhança. Os clientes adoram poder ver o que temos disponível antes de vir até a loja. Aumentou muito nosso movimento!",
    },
    {
      nome: "Juliana Ferreira",
      negocio: "Pet Shop Amigo Fiel",
      avatar: "JF",
      rating: 5,
      texto: "Plataforma perfeita para pequenos negócios! Consegui me conectar com muitos tutores de pets da região. As avaliações dos clientes também me ajudaram a melhorar meus serviços.",
    },
    {
      nome: "Roberto Alves",
      negocio: "Pizzaria do Beto",
      avatar: "RA",
      rating: 5,
      texto: "Fantástico! Divulgo minhas promoções na plataforma e sempre tenho resultado. É grátis e funciona melhor que outros apps pagos que já testei. Muito satisfeito!",
    },
    {
      nome: "Fernanda Souza",
      negocio: "Doceria da Fê",
      avatar: "FS",
      rating: 5,
      texto: "Como confeiteira autônoma, a MapFood me ajudou a profissionalizar meu negócio. Agora tenho um perfil organizado onde mostro todos meus produtos. Minhas encomendas triplicaram!",
    },
    {
      nome: "Ricardo Martins",
      negocio: "Barbearia do Rick",
      avatar: "RM",
      rating: 4,
      texto: "Excelente iniciativa para fortalecer o comércio local. Meus clientes conseguem ver meus horários disponíveis e entrar em contato facilmente. Recomendo para todos os colegas!",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            <div className="text-center space-y-4 animate-fade-in max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient">Depoimentos</span> Reais
              </h1>
              <p className="text-lg text-muted-foreground">
                Veja o que nossos parceiros comerciantes têm a dizer sobre a MapFood
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="card-elevated">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Avaliação Média</p>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-sm text-muted-foreground">Comerciantes Satisfeitos</p>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">95%</div>
                  <p className="text-sm text-muted-foreground">Recomendam a Plataforma</p>
                </CardContent>
              </Card>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {depoimentos.map((depoimento, index) => (
                <Card 
                  key={index}
                  className="card-elevated hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 space-y-4">
                    <Quote className="h-8 w-8 text-primary/30" />
                    <p className="text-muted-foreground">{depoimento.texto}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < depoimento.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {depoimento.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{depoimento.nome}</div>
                        <div className="text-sm text-muted-foreground">{depoimento.negocio}</div>
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

export default Depoimentos;
