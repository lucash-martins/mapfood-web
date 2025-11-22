import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cadastro from "./pages/Cadastro";
import Comerciantes from "./pages/Comerciantes";
import LojaDetalhes from "./pages/LojaDetalhes";
import Produtos from "./pages/Produtos";
import ComoFunciona from "./pages/ComoFunciona";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Beneficios from "./pages/Beneficios";
import Depoimentos from "./pages/Depoimentos";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/comerciantes" element={<Comerciantes />} />
          <Route path="/loja/:id" element={<LojaDetalhes />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/depoimentos" element={<Depoimentos />} />
          <Route path="/faq" element={<FAQ />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
