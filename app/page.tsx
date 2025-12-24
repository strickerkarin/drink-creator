'use client';

import { useState } from 'react';
import { Sparkles, Wine, RotateCcw, PartyPopper } from 'lucide-react';

// --- CONFIGURACIÓN DE DATOS ---

// 1. Definimos los 5 Perfiles (Vibras)
const DRINK_PROFILES = {
  tropical: {
    id: 'tropical',
    name: 'Reina de la Pista',
    drinkName: 'Piña Colada',
    description: 'Sos el alma de la fiesta. Dulce, colorida y peligrosa si te toman rápido.',
    ingredients: 'Ron blanco, crema de coco, jugo de ananá y mucha actitud.',
    imagePrompt: 'Pina Colada cocktail tropical beach party colorful 4k',
    color: 'from-pink-500 to-orange-400'
  },
  intensa: {
    id: 'intensa',
    name: 'La Jefa',
    drinkName: 'Negroni',
    description: 'Personalidad fuerte y directa. No necesitás adornos, vas al punto.',
    ingredients: 'Gin, Campari, Vermouth Rosso y una piel de naranja.',
    imagePrompt: 'Negroni cocktail dark moody elegant lighting 4k',
    color: 'from-red-600 to-orange-700'
  },
  sofisticada: {
    id: 'sofisticada',
    name: 'La Lady',
    drinkName: 'Espresso Martini',
    description: 'Clase, estilo y responsabilidad. No tomás cualquier cosa, tomás lo que te queda bien.',
    ingredients: 'Vodka, licor de café, espresso recién hecho.',
    imagePrompt: 'Espresso Martini cocktail elegant luxury bar 4k',
    color: 'from-slate-700 to-slate-900'
  },
  zen: {
    id: 'zen',
    name: 'La Zen',
    drinkName: 'Gin Tonic Pepino',
    description: 'Frescura y transparencia. Lo tuyo es disfrutar sin dramas ni complicaciones.',
    ingredients: 'Gin London Dry, tónica premium, rodajas de pepino y pimienta.',
    imagePrompt: 'Gin Tonic cucumber fresh bright sunlight garden 4k',
    color: 'from-emerald-400 to-teal-600'
  },
  cozy: {
    id: 'cozy',
    name: 'La Cozy',
    drinkName: 'Baileys Frozen',
    description: 'Buscás calidez y dulzura. Tu trago ideal es básicamente un abrazo en un vaso.',
    ingredients: 'Baileys, helado de crema, hielo y chocolate rallado.',
    imagePrompt: 'Baileys cocktail creamy chocolate cozy winter aesthetic 4k',
    color: 'from-amber-200 to-orange-200'
  }
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

  // Mezclar las cualidades al azar para que no salgan ordenadas por grupo
  // (Esto se ejecuta una sola vez al cargar, o podes usar un useEffect si preferis)
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
    // Contamos votos para cada perfil
    const votes: Record<string, number> = { tropical: 0, intensa: 0, sofisticada: 0, zen: 0, cozy: 0 };
    
    selectedQualities.forEach(qLabel => {
      const quality = QUALITIES.find(q => q.label === qLabel);
      if (quality) votes[quality.vibe]++;
    });

    // Encontramos el ganador
    let winner = 'tropical'; // Default
    let maxVotes = 0;
    
    Object.entries(votes).forEach(([vibe, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        winner = vibe;
      }
    });

    // @ts-ignore
    setResult(DRINK_PROFILES[winner]);
    setStep(3);
  };

  const resetApp = () => {
    setUserName('');
    setSelectedQualities([]);
    setResult(null);
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
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02]"
            >
              COMENCAR EXPERIENCIA
            </button>
          </div>
        </section>
      )}

      {/* PANTALLA 2: EL QUIZ */}
      {step === 2 && (
        <section className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
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
                  p-4 rounded-xl font-medium transition-all duration-200 border-2
                  ${selectedQualities.includes(item.label) 
                    ? 'bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-900/50 scale-105' 
                    : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'}
                  disabled:opacity-30 disabled:cursor-not-allowed
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
              className="flex items-center gap-2 bg-white text-black font-bold py-4 px-12 rounded-full text-lg shadow-xl shadow-white/10 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
          <div className="max-w-md w-full bg-black/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-fade-in">
            
            {/* Imagen Generada por IA */}
            <div className="relative h-80 w-full overflow-hidden group">
              <img 
                src={`https://image.pollinations.ai/prompt/${encodeURIComponent(result.imagePrompt)}?nologo=true`} 
                alt={result.drinkName} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                  Match Personalizado
                </span>
              </div>
            </div>

            <div className="p-8 text-center">
              <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Tu personalidad sabe a...</h3>
              <h2 className="text-4xl font-black text-white mb-1 leading-none">{result.drinkName}</h2>
              <div className="text-pink-500 font-bold mb-6 text-sm flex justify-center gap-1">
                 Perfil: {result.name}
              </div>

              <p className="text-gray-300 italic mb-8 leading-relaxed">
                "{result.description}"
              </p>

              <div className="bg-white/5 rounded-xl p-4 text-left border border-white/10 mb-8">
                <h4 className="flex items-center gap-2 font-bold text-white mb-2 text-sm uppercase">
                  <PartyPopper size={16} className="text-yellow-500"/> Receta Mágica:
                </h4>
                <p className="text-gray-400 text-sm">{result.ingredients}</p>
              </div>

              <button 
                onClick={resetApp}
                className="flex items-center justify-center gap-2 w-full border border-white/20 hover:bg-white/10 text-white font-medium py-3 rounded-lg transition-all"
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