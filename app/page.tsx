'use client';

import { useState } from 'react';
import { Sparkles, Wine, RotateCcw, PartyPopper, ChefHat, ScrollText } from 'lucide-react';

// --- CONFIGURACIÓN DE DATOS ---

// 1. Definimos los Perfiles con MÚLTIPLES OPCIONES de tragos
const DRINK_PROFILES = {
  tropical: [
    {
      id: 'tropical_1',
      name: 'Reina de la Pista',
      drinkName: 'Piña Colada',
      description: 'Sos el alma de la fiesta. Dulce, colorida y peligrosa si te toman rápido.',
      ingredients: ['60ml Ron Blanco', '90ml Jugo de Ananá', '30ml Crema de Coco', 'Hielo picado', 'Decoración: Triangulito de ananá'],
      preparation: 'Batir todos los ingredientes con hielo en licuadora o coctelera hasta que quede cremoso. Servir en copa alta.',
      imagePrompt: 'Pina Colada cocktail tropical beach party colorful 4k',
      color: 'from-pink-500 to-orange-400'
    },
    {
      id: 'tropical_2',
      name: 'Reina de la Pista',
      drinkName: 'Daiquiri de Frutilla',
      description: 'Vibrante, dulce y fresca. Sabés cómo ponerle sabor a la vida.',
      ingredients: ['50ml Ron Blanco', '1 taza de frutillas congeladas', 'Jugo de media lima', '2 cdas de azúcar', 'Hielo'],
      preparation: 'Licuar todos los ingredientes hasta obtener una textura frozen (granizada). Servir en copa margarita.',
      imagePrompt: 'Strawberry Daiquiri frozen cocktail red tropical festive 4k',
      color: 'from-pink-600 to-rose-400'
    }
  ],
  intensa: [
    {
      id: 'intensa_1',
      name: 'La Jefa',
      drinkName: 'Negroni',
      description: 'Personalidad fuerte y directa. No necesitás adornos, vas al punto.',
      ingredients: ['30ml Gin London Dry', '30ml Campari', '30ml Vermouth Rosso', 'Hielo en cubos grandes', 'Decoración: Piel de naranja'],
      preparation: 'Colocar hielo en un vaso corto. Verter las tres bebidas y remover suavemente con una cuchara para enfriar.',
      imagePrompt: 'Negroni cocktail dark moody elegant lighting 4k',
      color: 'from-red-600 to-orange-700'
    },
    {
      id: 'intensa_2',
      name: 'La Jefa',
      drinkName: 'Old Fashioned',
      description: 'Clásico, atemporal y con carácter. No seguís modas, vos las creás.',
      ingredients: ['60ml Whisky o Bourbon', '1 terrón de azúcar', '3 gotas de amargo (Angostura)', 'Piel de naranja', 'Hielo roca'],
      preparation: 'En un vaso corto, disolver el azúcar con el amargo y un chorrito de agua/soda. Agregar el hielo y el whisky. Remover despacio.',
      imagePrompt: 'Old Fashioned cocktail whiskey glass dark wood moody 4k',
      color: 'from-amber-700 to-orange-900'
    }
  ],
  sofisticada: [
    {
      id: 'sofisticada_1',
      name: 'La Lady',
      drinkName: 'Espresso Martini',
      description: 'Clase, estilo y energía. No tomás cualquier cosa, tomás lo que te despierta.',
      ingredients: ['45ml Vodka', '30ml Licor de Café', '1 Espresso recién hecho', 'Hielo abundante', 'Decoración: 3 granos de café'],
      preparation: 'Batir muy fuerte en coctelera con mucho hielo (para generar espuma). Colar doble sobre copa martini fría.',
      imagePrompt: 'Espresso Martini cocktail elegant luxury bar 4k',
      color: 'from-slate-700 to-slate-900'
    },
    {
      id: 'sofisticada_2',
      name: 'La Lady',
      drinkName: 'Cosmopolitan',
      description: 'Glamour urbano. Sos la protagonista de tu propia serie y merecés un trago icónico.',
      ingredients: ['45ml Vodka Citron', '15ml Cointreau', '30ml Jugo de arándanos', 'Jugo de lima', 'Piel de limón'],
      preparation: 'Batir enérgicamente en coctelera con hielo. Servir en copa martini helada. Perfumar con la piel de limón.',
      imagePrompt: 'Cosmopolitan cocktail pink martini glass city night luxury 4k',
      color: 'from-fuchsia-700 to-purple-900'
    }
  ],
  zen: [
    {
      id: 'zen_1',
      name: 'La Zen',
      drinkName: 'Gin Tonic Pepino',
      description: 'Frescura y transparencia. Lo tuyo es disfrutar sin dramas ni complicaciones.',
      ingredients: ['60ml Gin', '200ml Agua Tónica Premium', 'Láminas de pepino', 'Pimienta negra', 'Mucho hielo'],
      preparation: 'Llenar un copón con hielo. Agregar el gin y las láminas de pepino. Completar con tónica suavemente.',
      imagePrompt: 'Gin Tonic cucumber fresh bright sunlight garden 4k',
      color: 'from-emerald-400 to-teal-600'
    },
    {
      id: 'zen_2',
      name: 'La Zen',
      drinkName: 'Mojito',
      description: 'Natural y refrescante. Tenés esa capacidad de "menta" para limpiar las malas vibras.',
      ingredients: ['50ml Ron Blanco', 'Media lima en trozos', '2 cdtas azúcar', 'Rama de menta fresca', 'Soda y hielo picado'],
      preparation: 'Machacar suavemente la menta con azúcar y lima en el vaso. Llenar con hielo, agregar ron y completar con soda.',
      imagePrompt: 'Mojito cocktail fresh mint lime sunlight bright 4k',
      color: 'from-lime-400 to-green-600'
    }
  ],
  cozy: [
    {
      id: 'cozy_1',
      name: 'La Cozy',
      drinkName: 'Baileys Frozen',
      description: 'Buscás calidez y dulzura. Tu trago ideal es básicamente un abrazo en un vaso.',
      ingredients: ['60ml Baileys', '2 bochas helado crema', 'Hielo', 'Sirope chocolate', 'Chocolate rallado'],
      preparation: 'Licuar el Baileys con el helado y un poco de hielo hasta punto frozen. Servir en vaso decorado con chocolate.',
      imagePrompt: 'Baileys cocktail creamy chocolate cozy winter aesthetic 4k',
      color: 'from-amber-200 to-orange-200'
    },
    {
      id: 'cozy_2',
      name: 'La Cozy',
      drinkName: 'White Russian',
      description: 'Suave, cremoso y reconfortante. Te tomás la vida con calma y mucho estilo.',
      ingredients: ['50ml Vodka', '25ml Licor de Café', '30ml Crema de leche (nata)', 'Hielo'],
      preparation: 'Vaso corto con hielo. Poner el vodka y licor de café. Verter la crema despacio arriba para que quede el efecto bicolor.',
      imagePrompt: 'White Russian cocktail creamy glass milk cozy lighting 4k',
      color: 'from-stone-300 to-stone-500'
    }
  ]
};

// 2. Mapeamos tus 20 cualidades a los perfiles
const QUALITIES = [
  // Tropical
  { label: 'Alegre', vibe: 'tropical' },
  { label: 'Divertida', vibe: 'tropical' },
  { label: 'Graciosa', vibe: 'tropical' },
  { label: 'Chismocita', vibe: 'tropical' },
  
  // Intensa
  { label: 'Decidida', vibe: 'intensa' },
  { label: 'Exigente', vibe: 'intensa' },
  { label: 'Trabajadora', vibe: 'intensa' },
  { label: 'Alcohólica', vibe: 'intensa' },
  
  // Sofisticada
  { label: 'Responsable', vibe: 'sofisticada' },
  { label: 'Prudente', vibe: 'sofisticada' },
  { label: 'Atenta', vibe: 'sofisticada' },
  { label: 'Cuidadosa', vibe: 'sofisticada' },
  
  // Zen
  { label: 'Tranquila', vibe: 'zen' },
  { label: 'Tímida', vibe: 'zen' },
  { label: 'Empática', vibe: 'zen' },
  { label: 'Honesta', vibe: 'zen' },

  // Cozy
  { label: 'Friolenta', vibe: 'cozy' },
  { label: 'Dormilona', vibe: 'cozy' },
  { label: 'Soñadora', vibe: 'cozy' },
  { label: 'Miedosa', vibe: 'cozy' },
];

// --- COMPONENTE PRINCIPAL ---

export default function DrinkCreator() {
  const [step, setStep] = useState(1); // 1: Nombre, 2: Quiz, 3: Resultado
  const [userName, setUserName] = useState('');
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [customTitle, setCustomTitle] = useState('');

  // Mezclar las cualidades al azar para que no salgan ordenadas por grupo
  const [shuffledQualities] = useState(() => [...QUALITIES].sort(() => Math.random() - 0.5));

  const toggleQuality = (label: string) => {
    if (selectedQualities.includes(label)) {
      setSelectedQualities(prev => prev.filter(q => q !== label));
    } else {
      if (selectedQualities.length < 3) {
        setSelectedQualities(prev => [...prev, label]);
      }
    }
  };

  const calculateResult = () => {
    // 1. Contamos votos para cada perfil
    const votes: Record<string, number> = { tropical: 0, intensa: 0, sofisticada: 0, zen: 0, cozy: 0 };
    
    selectedQualities.forEach(qLabel => {
      const quality = QUALITIES.find(q => q.label === qLabel);
      if (quality) votes[quality.vibe]++;
    });

    // 2. Encontramos la CATEGORÍA ganadora (Ej: 'tropical')
    let winningVibe = 'tropical'; 
    let maxVotes = 0;
    Object.entries(votes).forEach(([vibe, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        winningVibe = vibe;
      }
    });

    // 3. SELECCIÓN ALEATORIA DE TRAGO
    // Obtenemos la lista de tragos de esa categoría
    const possibleDrinks = DRINK_PROFILES[winningVibe as keyof typeof DRINK_PROFILES];
    
    // Elegimos uno al azar de la lista (Índice random)
    const randomDrinkIndex = Math.floor(Math.random() * possibleDrinks.length);
    const selectedProfile = possibleDrinks[randomDrinkIndex];

    // 4. Personalización del Título
    const randomQuality = selectedQualities[Math.floor(Math.random() * selectedQualities.length)];
    const title = `${selectedProfile.drinkName}: Edición ${randomQuality} de ${userName}`;

    setCustomTitle(title);
    setResult(selectedProfile);
    setStep(3);
  };

  const resetApp = () => {
    setUserName('');
    setSelectedQualities([]);
    setResult(null);
    setCustomTitle('');
    setStep(1);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans selection:bg-pink-500 selection:text-white">
      
      {/* PANTALLA 1: BIENVENIDA */}
      {step === 1 && (
        <section className="h-screen flex flex-col items-center justify-center p-6 text-center bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="relative z-10 max-w-md w-full animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="bg-pink-500 p-4 rounded-full shadow-lg shadow-pink-500/50">
                <Wine size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-black mb-2 tracking-tight bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
              DRINK MATCH
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Dime quién sos y te diré qué tomás.
            </p>
            
            <input
              type="text"
              placeholder="¿Cómo te llamás?"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-xl text-center placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-6 transition-all"
            />
            
            <button
              onClick={() => userName.trim() && setStep(2)}
              disabled={!userName.trim()}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              COMENZAR EXPERIENCIA
            </button>
          </div>
        </section>
      )}

      {/* PANTALLA 2: EL QUIZ */}
      {step === 2 && (
        <section className="min-h-screen py-12 px-4 max-w-4xl mx-auto flex flex-col justify-center">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Hola, <span className="text-pink-400">{userName}</span></h2>
            <p className="text-gray-400">Elegí las 3 palabras que mejor te definen:</p>
            <div className="mt-4 inline-block bg-gray-800 px-4 py-1 rounded-full text-sm font-medium">
              Seleccionadas: <span className="text-pink-400">{selectedQualities.length} / 3</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {shuffledQualities.map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleQuality(item.label)}
                disabled={!selectedQualities.includes(item.label) && selectedQualities.length >= 3}
                className={`
                  p-4 rounded-xl font-medium transition-all duration-200 border-2 cursor-pointer
                  ${selectedQualities.includes(item.label) 
                    ? 'bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-900/50 scale-105' 
                    : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white hover:scale-105'}
                  disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={calculateResult}
              disabled={selectedQualities.length !== 3}
              className="flex items-center gap-2 bg-white text-black font-bold py-4 px-12 rounded-full text-lg shadow-xl shadow-white/10 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer transform hover:scale-105"
            >
              <Sparkles size={20} />
              PREPARAR MI TRAGO
            </button>
          </div>
        </section>
      )}

      {/* PANTALLA 3: EL RESULTADO */}
      {step === 3 && result && (
        <section className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br ${result.color}`}>
          <div className="max-w-md w-full bg-black/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-fade-in my-8">
            
            {/* Imagen Generada por IA */}
            <div className="relative h-72 w-full overflow-hidden group">
              <img 
                src={`https://image.pollinations.ai/prompt/${encodeURIComponent(result.imagePrompt)}?nologo=true`} 
                alt={result.drinkName} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                 <h2 className="text-2xl font-black text-white mb-1 leading-tight drop-shadow-lg">
                    {customTitle}
                 </h2>
                 <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                    Vibra: {result.name}
                 </span>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-300 italic mb-6 leading-relaxed text-center border-b border-white/10 pb-6">
                "{result.description}"
              </p>

              {/* Lista de Ingredientes */}
              <div className="mb-6">
                <h4 className="flex items-center gap-2 font-bold text-pink-400 mb-3 text-sm uppercase tracking-wider">
                  <ScrollText size={16} /> Lo que necesitás:
                </h4>
                <ul className="text-sm text-gray-300 space-y-2 pl-2">
                  {result.ingredients.map((ing: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                       <span className="text-pink-500">•</span> {ing}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparación */}
               <div className="bg-white/5 rounded-xl p-4 text-left border border-white/10 mb-8">
                <h4 className="flex items-center gap-2 font-bold text-yellow-400 mb-2 text-sm uppercase">
                  <ChefHat size={16} /> Cómo prepararlo:
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                   {result.preparation}
                </p>
              </div>

              <button 
                onClick={resetApp}
                className="flex items-center justify-center gap-2 w-full border border-white/20 hover:bg-white/10 text-white font-medium py-3 rounded-lg transition-all cursor-pointer"
              >
                <RotateCcw size={18} />
                Probar con otra amiga
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}