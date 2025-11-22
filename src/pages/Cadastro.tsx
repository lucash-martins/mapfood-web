import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Store, User, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cadastro = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Em breve entraremos em contato para ativar seu perfil.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold">
                Cadastre seu <span className="text-gradient">Negócio</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Preencha os dados abaixo e comece a divulgar seus produtos
              </p>
            </div>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  Informações do Negócio
                </CardTitle>
                <CardDescription>
                  Forneça as informações básicas sobre seu empreendimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome-negocio">
                      <User className="inline h-4 w-4 mr-2" />
                      Nome do Negócio
                    </Label>
                    <Input id="nome-negocio" placeholder="Ex: Padaria do João" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proprietario">Nome do Proprietário</Label>
                    <Input id="proprietario" placeholder="Seu nome completo" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="inline h-4 w-4 mr-2" />
                        E-mail
                      </Label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">
                        <Phone className="inline h-4 w-4 mr-2" />
                        Telefone
                      </Label>
                      <Input id="telefone" type="tel" placeholder="(11) 98765-4321" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endereco">
                      <MapPin className="inline h-4 w-4 mr-2" />
                      Endereço Completo
                    </Label>
                    <Input id="endereco" placeholder="Rua, número, bairro, cidade" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição do Negócio</Label>
                    <Textarea 
                      id="descricao" 
                      placeholder="Conte um pouco sobre seu negócio, produtos e serviços..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria</Label>
                    <Input id="categoria" placeholder="Ex: Alimentação, Vestuário, Serviços..." required />
                  </div>

                  <Button type="submit" className="w-full btn-glow" size="lg">
                    Cadastrar Negócio
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cadastro;
