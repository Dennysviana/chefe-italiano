"use client";

import { useState } from "react";
import { ChefHat, Sparkles, Cookie, UtensilsCrossed, Search, Clock, Users, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tipos
interface Recipe {
  id: number;
  name: string;
  description: string;
  time: string;
  servings: number;
  difficulty: "Fácil" | "Médio" | "Difícil";
  rating: number;
  image: string;
  ingredients: string[];
  instructions: string[];
}

// Receitas Salgadas
const savoryRecipes: Recipe[] = [
  {
    id: 1,
    name: "Spaghetti alla Carbonara",
    description: "Clássico romano com ovos, queijo pecorino e guanciale",
    time: "25 min",
    servings: 4,
    difficulty: "Médio",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop&auto=format",
    ingredients: ["400g spaghetti", "200g guanciale", "4 ovos", "100g pecorino romano", "Pimenta preta"],
    instructions: ["Cozinhe o spaghetti al dente", "Frite o guanciale até ficar crocante", "Misture ovos com pecorino", "Combine tudo fora do fogo", "Finalize com pimenta preta"]
  },
  {
    id: 2,
    name: "Risotto alla Milanese",
    description: "Risoto cremoso com açafrão e parmesão",
    time: "35 min",
    servings: 4,
    difficulty: "Médio",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e36e?w=800&h=600&fit=crop&auto=format",
    ingredients: ["320g arroz arborio", "1L caldo de carne", "Açafrão", "100g parmesão", "Manteiga", "Vinho branco"],
    instructions: ["Toste o arroz na manteiga", "Adicione vinho branco", "Acrescente caldo aos poucos", "Adicione açafrão", "Finalize com parmesão e manteiga"]
  },
  {
    id: 3,
    name: "Pizza Margherita",
    description: "A pizza napolitana original com molho de tomate, mozzarella e manjericão",
    time: "90 min",
    servings: 2,
    difficulty: "Médio",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop&auto=format",
    ingredients: ["500g farinha", "Fermento", "Molho de tomate", "Mozzarella di bufala", "Manjericão fresco", "Azeite"],
    instructions: ["Prepare a massa e deixe descansar", "Abra a massa em círculo", "Espalhe o molho de tomate", "Adicione mozzarella", "Asse em forno bem quente", "Finalize com manjericão"]
  },
  {
    id: 4,
    name: "Lasagna alla Bolognese",
    description: "Lasanha tradicional com molho bolonhesa e bechamel",
    time: "120 min",
    servings: 8,
    difficulty: "Difícil",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop&auto=format",
    ingredients: ["Massa de lasanha", "500g carne moída", "Molho de tomate", "Bechamel", "Parmesão", "Cebola e alho"],
    instructions: ["Prepare o ragù bolonhesa", "Faça o molho bechamel", "Monte camadas alternadas", "Cubra com parmesão", "Asse por 40 minutos"]
  },
  {
    id: 5,
    name: "Osso Buco alla Milanese",
    description: "Jarrete de vitela cozido lentamente com vegetais",
    time: "150 min",
    servings: 4,
    difficulty: "Difícil",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format",
    ingredients: ["4 jarretes de vitela", "Cebola, cenoura, aipo", "Vinho branco", "Caldo de carne", "Gremolata"],
    instructions: ["Doure os jarretes", "Refogue os vegetais", "Adicione vinho e caldo", "Cozinhe lentamente por 2h", "Finalize com gremolata"]
  },
  {
    id: 6,
    name: "Penne all'Arrabbiata",
    description: "Massa picante com molho de tomate e pimenta",
    time: "20 min",
    servings: 4,
    difficulty: "Fácil",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop&auto=format",
    ingredients: ["400g penne", "Tomates pelados", "Pimenta calabresa", "Alho", "Azeite", "Salsinha"],
    instructions: ["Refogue alho e pimenta no azeite", "Adicione tomates", "Cozinhe por 15 minutos", "Misture com a massa", "Finalize com salsinha"]
  },
  {
    id: 7,
    name: "Saltimbocca alla Romana",
    description: "Escalopes de vitela com presunto e sálvia",
    time: "30 min",
    servings: 4,
    difficulty: "Médio",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&auto=format",
    ingredients: ["8 escalopes de vitela", "8 fatias presunto cru", "Sálvia fresca", "Vinho branco", "Manteiga"],
    instructions: ["Cubra escalopes com presunto e sálvia", "Prenda com palito", "Doure na manteiga", "Adicione vinho branco", "Cozinhe até reduzir"]
  },
  {
    id: 8,
    name: "Gnocchi al Pesto",
    description: "Nhoque de batata com molho pesto genovês",
    time: "60 min",
    servings: 4,
    difficulty: "Médio",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=800&h=600&fit=crop&auto=format",
    ingredients: ["1kg batatas", "300g farinha", "Manjericão", "Pinhões", "Parmesão", "Alho", "Azeite"],
    instructions: ["Cozinhe e amasse as batatas", "Misture com farinha", "Forme os gnocchi", "Prepare o pesto", "Cozinhe e misture"]
  },
  {
    id: 9,
    name: "Bruschetta al Pomodoro",
    description: "Pão italiano tostado com tomate fresco",
    time: "15 min",
    servings: 6,
    difficulty: "Fácil",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&h=600&fit=crop&auto=format",
    ingredients: ["Pão italiano", "Tomates maduros", "Manjericão", "Alho", "Azeite extra virgem", "Sal"],
    instructions: ["Toste o pão", "Esfregue alho", "Pique tomates com manjericão", "Tempere com sal e azeite", "Coloque sobre o pão"]
  },
  {
    id: 10,
    name: "Fettuccine Alfredo",
    description: "Massa cremosa com manteiga e parmesão",
    time: "20 min",
    servings: 4,
    difficulty: "Fácil",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&h=600&fit=crop&auto=format",
    ingredients: ["400g fettuccine", "200g manteiga", "200g parmesão", "Creme de leite", "Noz-moscada"],
    instructions: ["Cozinhe o fettuccine", "Derreta manteiga", "Adicione creme e parmesão", "Misture com a massa", "Finalize com noz-moscada"]
  },
  {
    id: 11,
    name: "Caprese Salad",
    description: "Salada fresca com mozzarella, tomate e manjericão",
    time: "10 min",
    servings: 4,
    difficulty: "Fácil",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&h=600&fit=crop&auto=format",
    ingredients: ["Mozzarella di bufala", "Tomates maduros", "Manjericão fresco", "Azeite extra virgem", "Sal marinho"],
    instructions: ["Fatie mozzarella e tomates", "Alterne em camadas", "Adicione manjericão", "Regue com azeite", "Tempere com sal"]
  },
  {
    id: 12,
    name: "Parmigiana di Melanzane",
    description: "Berinjela gratinada com molho de tomate e queijo",
    time: "90 min",
    servings: 6,
    difficulty: "Médio",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop&auto=format",
    ingredients: ["3 berinjelas", "Molho de tomate", "Mozzarella", "Parmesão", "Manjericão", "Azeite"],
    instructions: ["Frite as berinjelas", "Monte camadas com molho", "Adicione queijos", "Repita as camadas", "Asse até gratinar"]
  }
];

// Receitas Doces
const sweetRecipes: Recipe[] = [
  {
    id: 13,
    name: "Tiramisù",
    description: "Sobremesa clássica com café, mascarpone e cacau",
    time: "30 min + 4h geladeira",
    servings: 8,
    difficulty: "Fácil",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop&auto=format",
    ingredients: ["500g mascarpone", "6 ovos", "Biscoitos savoiardi", "Café expresso", "Cacau em pó", "Açúcar"],
    instructions: ["Bata gemas com açúcar", "Adicione mascarpone", "Bata claras em neve", "Molhe biscoitos no café", "Monte camadas", "Polvilhe cacau"]
  },
  {
    id: 14,
    name: "Panna Cotta",
    description: "Creme italiano delicado com calda de frutas vermelhas",
    time: "20 min + 4h geladeira",
    servings: 6,
    difficulty: "Fácil",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop&auto=format",
    ingredients: ["500ml creme de leite", "100g açúcar", "Gelatina", "Baunilha", "Frutas vermelhas"],
    instructions: ["Aqueça creme com açúcar", "Adicione gelatina hidratada", "Adicione baunilha", "Despeje em formas", "Leve à geladeira", "Sirva com calda"]
  },
  {
    id: 15,
    name: "Cannoli Siciliani",
    description: "Casquinhas crocantes recheadas com ricota doce",
    time: "60 min",
    servings: 12,
    difficulty: "Difícil",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1534432586043-a1e85a0c5429?w=800&h=600&fit=crop&auto=format",
    ingredients: ["Massa para cannoli", "500g ricota", "Açúcar de confeiteiro", "Chocolate", "Pistache", "Frutas cristalizadas"],
    instructions: ["Prepare e frite as casquinhas", "Escorra a ricota", "Misture com açúcar", "Adicione chocolate picado", "Recheie as casquinhas", "Decore as pontas"]
  },
  {
    id: 16,
    name: "Gelato alla Vaniglia",
    description: "Sorvete italiano cremoso de baunilha",
    time: "40 min + congelamento",
    servings: 6,
    difficulty: "Médio",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop&auto=format",
    ingredients: ["500ml leite", "200ml creme", "6 gemas", "150g açúcar", "2 favas de baunilha"],
    instructions: ["Aqueça leite com baunilha", "Bata gemas com açúcar", "Faça creme inglês", "Adicione creme de leite", "Leve à sorveteira", "Congele"]
  },
  {
    id: 17,
    name: "Sfogliatelle",
    description: "Folhado napolitano recheado com ricota e frutas cristalizadas",
    time: "120 min",
    servings: 12,
    difficulty: "Difícil",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&h=600&fit=crop&auto=format",
    ingredients: ["Massa folhada", "Ricota", "Sêmola", "Açúcar", "Frutas cristalizadas", "Canela"],
    instructions: ["Prepare o recheio", "Abra a massa bem fina", "Corte em círculos", "Recheie e modele", "Asse até dourar"]
  },
  {
    id: 18,
    name: "Zabaione",
    description: "Creme aerado de gemas, açúcar e vinho Marsala",
    time: "20 min",
    servings: 4,
    difficulty: "Médio",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop&auto=format",
    ingredients: ["6 gemas", "100g açúcar", "100ml Marsala", "Frutas frescas"],
    instructions: ["Bata gemas com açúcar", "Adicione Marsala", "Cozinhe em banho-maria", "Bata até triplicar volume", "Sirva morno ou frio"]
  },
  {
    id: 19,
    name: "Biscotti di Prato",
    description: "Biscoitos crocantes toscanos com amêndoas",
    time: "60 min",
    servings: 30,
    difficulty: "Fácil",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop&auto=format",
    ingredients: ["300g farinha", "200g açúcar", "3 ovos", "200g amêndoas", "Fermento", "Baunilha"],
    instructions: ["Misture ingredientes secos", "Adicione ovos", "Incorpore amêndoas", "Forme rolos", "Asse e corte", "Asse novamente"]
  },
  {
    id: 20,
    name: "Affogato",
    description: "Gelato de baunilha afogado em café expresso quente",
    time: "5 min",
    servings: 1,
    difficulty: "Fácil",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=800&h=600&fit=crop&auto=format",
    ingredients: ["2 bolas gelato de baunilha", "1 dose café expresso", "Amaretto (opcional)"],
    instructions: ["Coloque gelato na taça", "Prepare café expresso", "Despeje sobre o gelato", "Sirva imediatamente"]
  },
  {
    id: 21,
    name: "Torta della Nonna",
    description: "Torta de creme com pinhões e açúcar de confeiteiro",
    time: "90 min",
    servings: 10,
    difficulty: "Médio",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop&auto=format",
    ingredients: ["Massa podre", "Creme pasteleiro", "Pinhões", "Açúcar de confeiteiro", "Limão"],
    instructions: ["Prepare o creme", "Forre forma com massa", "Adicione o creme", "Cubra com massa", "Polvilhe pinhões", "Asse e polvilhe açúcar"]
  },
  {
    id: 22,
    name: "Panettone",
    description: "Pão doce milanês com frutas cristalizadas",
    time: "8 horas",
    servings: 12,
    difficulty: "Difícil",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&h=600&fit=crop&auto=format",
    ingredients: ["500g farinha", "Fermento natural", "Ovos", "Manteiga", "Frutas cristalizadas", "Uvas passas"],
    instructions: ["Prepare o fermento", "Faça primeira massa", "Deixe crescer", "Adicione frutas", "Modele e deixe crescer", "Asse lentamente"]
  },
  {
    id: 23,
    name: "Amaretti",
    description: "Biscoitos macios de amêndoas",
    time: "40 min",
    servings: 24,
    difficulty: "Fácil",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop&auto=format",
    ingredients: ["250g amêndoas moídas", "250g açúcar", "2 claras", "Essência de amêndoa", "Açúcar de confeiteiro"],
    instructions: ["Misture amêndoas e açúcar", "Adicione claras", "Forme bolinhas", "Polvilhe açúcar", "Asse até rachar"]
  },
  {
    id: 24,
    name: "Semifreddo",
    description: "Sobremesa gelada cremosa estilo italiano",
    time: "30 min + congelamento",
    servings: 8,
    difficulty: "Médio",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=600&fit=crop&auto=format",
    ingredients: ["4 ovos", "150g açúcar", "500ml creme", "Baunilha", "Frutas ou chocolate"],
    instructions: ["Bata gemas com açúcar", "Bata creme em pico", "Bata claras em neve", "Misture delicadamente", "Congele em forma", "Desenforme e sirva"]
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filterRecipes = (recipes: Recipe[]) => {
    return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
      onClick={() => setSelectedRecipe(recipe)}
    >
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format`;
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-sm">{recipe.rating}</span>
        </div>
        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-lg">
          {recipe.difficulty}
        </Badge>
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {recipe.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {recipe.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} porções</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RecipeModal = ({ recipe }: { recipe: Recipe }) => (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={() => setSelectedRecipe(null)}
    >
      <div 
        className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-72 overflow-hidden rounded-t-3xl bg-gray-200 dark:bg-gray-800">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format`;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <button
            onClick={() => setSelectedRecipe(null)}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-4xl font-bold text-white mb-3">{recipe.name}</h2>
            <div className="flex items-center gap-4 text-white/90">
              <Badge className="bg-white/20 backdrop-blur-md text-white border-0">
                {recipe.difficulty}
              </Badge>
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{recipe.rating}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-5 h-5" />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-5 h-5" />
                <span>{recipe.servings} porções</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {recipe.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Sparkles className="w-6 h-6 text-red-500" />
                Ingredientes
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <ChefHat className="w-6 h-6 text-red-500" />
                Modo de Preparo
              </h3>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4 text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <span className="pt-1">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6 animate-in fade-in slide-in-from-top duration-700">
              <ChefHat className="w-12 h-12 sm:w-16 sm:h-16" />
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                Chefe Italiano
              </h1>
            </div>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 animate-in fade-in slide-in-from-top duration-700 delay-100">
              Descubra os sabores autênticos da Itália com receitas tradicionais e modernas
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base animate-in fade-in slide-in-from-top duration-700 delay-200">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <UtensilsCrossed className="w-5 h-5" />
                <span>{savoryRecipes.length} Receitas Salgadas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <Cookie className="w-5 h-5" />
                <span>{sweetRecipes.length} Receitas Doces</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar receitas por nome ou ingrediente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 shadow-lg transition-all duration-300"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="salgadas" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-14 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-1">
            <TabsTrigger 
              value="salgadas" 
              className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300"
            >
              <UtensilsCrossed className="w-5 h-5 mr-2" />
              Salgadas
            </TabsTrigger>
            <TabsTrigger 
              value="doces"
              className="rounded-xl text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300"
            >
              <Cookie className="w-5 h-5 mr-2" />
              Doces
            </TabsTrigger>
          </TabsList>

          <TabsContent value="salgadas" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterRecipes(savoryRecipes).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            {filterRecipes(savoryRecipes).length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  Nenhuma receita encontrada. Tente outro termo de busca.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="doces" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterRecipes(sweetRecipes).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            {filterRecipes(sweetRecipes).length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  Nenhuma receita encontrada. Tente outro termo de busca.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} />}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white mt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Chefe Italiano</h3>
          </div>
          <p className="text-white/80 mb-2">
            Receitas autênticas da Itália para você preparar em casa
          </p>
          <p className="text-sm text-white/60">
            Buon appetito! 🇮🇹
          </p>
        </div>
      </footer>
    </div>
  );
}
