import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mockDishData } from '../data/mockData';
import { dishImageMap } from '../data/dishImageMap';
import { useEffect } from 'react';
import { updateMockPrices } from '../data/priceUpdater';
import type { DishData } from '../data/mockData';
import { ChatButton } from "../components/Chatbot/ChatButton";
import { ChatPopup }from "../components/ChatPopup"; // adjust path if needed
import { AnimatePresence } from "framer-motion";



type Message = {
  role: "user" | "assistant";
  content: string;
};



export const getDishNames = (): string[] => {
  return mockDishData.map((entry) => entry.dish.toLowerCase());
  
};

export default function Home() {
  const [item, setItem] = useState('');
  const [comparison, setComparison] = useState<any>(null);
  const [remySuggestion, setRemySuggestion] = useState('');
  const [loadingRemy, setLoadingRemy] = useState(false);
  const [loadingComparison, setLoadingComparison] = useState(false); // State for loading comparison
  const [lastUpdated, setLastUpdated] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]); // list of autocomplete suggestions
  const [showDropdown, setShowDropdown] = useState(false);      // to control visibility of dropdown
  const [dishData, setDishData] = useState<DishData[]>(mockDishData);
  const router = useRouter();
  const [showChat, setShowChat] = useState(false);
  


  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Cookie. How can I help you today?" },
  ]);


  useEffect(() => {
    const interval = setInterval(() => {
      const updatedData = updateMockPrices();
      setDishData(updatedData);
      console.log('Prices updated');
    }, 30000); // 30 seconds
  
    return () => clearInterval(interval);
  }, []);
  
  
  // const handleSuggestionClick = async (suggestion: string) => {
  //   setItem(suggestion);
  //   setShowDropdown(false);
  //   setTimeout(() => {
  //     handleCompare();
  //     handleRemy();
  //   }, 0);
  // };

  const handleCompare = async () => {
    if (!item.trim()) return;
  
    const cleanedItem = item.trim().toLowerCase(); // normalize input
  
    setLoadingComparison(true);
    setComparison(null); // Reset previous results
    
  
    try {
      // Use updated dishData from state instead of static mockDishData
      const matchedDish = dishData.find(dish => dish.dish.toLowerCase() === cleanedItem);
  
      if (!matchedDish) {
        setComparison({
          swiggy: null,
          zomato: null,
          eatsure: null,
          error: true,
        });
        return;
      }
  
      setComparison({
        swiggy: matchedDish.platforms.Swiggy?.cheapestPrice || 'N/A',
        zomato: matchedDish.platforms.Zomato?.cheapestPrice || 'N/A',
        eatsure: matchedDish.platforms.EatSure?.cheapestPrice || 'N/A',
      });
  
      setLastUpdated(new Date().toLocaleTimeString());
  
    } catch (err) {
      console.error("Error in dynamic comparison:", err);
      setComparison({
        swiggy: null,
        zomato: null,
        eatsure: null,
        error: true,
      });
    } finally {
      setLoadingComparison(false);
    }
  };
  
  
  
  const handleRemy = async () => {
    if (!item.trim()) return;

    setLoadingRemy(true);
    setRemySuggestion('');

    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Give me a fun and healthy dish recommendation or twist for "${item}". Make it sound casual and friendly.`,
        }),
      });

      const data = await res.json();
      setRemySuggestion(data.answer || "Hmm... I'm not sure. Try something else?");
    } catch (error) {
      console.error("Error fetching Groq suggestion:", error);
      setRemySuggestion("⚠️ Remy had trouble thinking. Try again!");
    } finally {
      setLoadingRemy(false);
    }
  };



  const handleCompareWithDish = async (dish: string) => {
    const cleanedItem = dish.trim().toLowerCase(); 
    setLoadingComparison(true);
    setComparison(null);
  
    try {
      const matchedDish = dishData.find(d => d.dish.toLowerCase() === cleanedItem);
  
      if (!matchedDish) {
        setComparison({
          swiggy: null,
          zomato: null,
          eatsure: null,
          error: true,
        });
        return;
      }
  
      setComparison({
        swiggy: matchedDish.platforms.Swiggy?.cheapestPrice || 'N/A',
        zomato: matchedDish.platforms.Zomato?.cheapestPrice || 'N/A',
        eatsure: matchedDish.platforms.EatSure?.cheapestPrice || 'N/A',
      });
  
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error in comparison:", err);
      setComparison({
        swiggy: null,
        zomato: null,
        eatsure: null,
        error: true,
      });
    } finally {
      setLoadingComparison(false);
    }
  };
  
  const handleRemyWithDish = async (dish: string) => {
    setLoadingRemy(true);
    setRemySuggestion('');
  
    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Give me a fun and healthy dish recommendation or twist for "${dish}". Make it sound casual and friendly.`,
        }),
      });
  
      const data = await res.json();
      setRemySuggestion(data.answer || "Hmm... I'm not sure. Try something else?");
    } catch (error) {
      console.error("Error fetching Remy suggestion:", error);
      setRemySuggestion("⚠️ Remy had trouble thinking. Try again!");
    } finally {
      setLoadingRemy(false);
    }
  };
  

  
  



  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-black/40 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 py-20 text-center text-white"
      >
        <TypeAnimation
          sequence={['The Best Price']}
          wrapper="h1"
          speed={20}
          repeat={0}
          className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl text-white mb-4"
        />

        <p className="text-xl md:text-2xl font-medium text-white/90 max-w-2xl mx-auto mb-10 drop-shadow-sm">
          Compare food prices instantly across apps and get AI-powered recommendations from Cookie 🍔📱
        </p>

        <input
        
          value={item}
          onChange={async (e) => {
            const val = e.target.value;
            setItem(val);

            if (val.trim().length >= 2) {
              const res = await fetch('/api/autocomplete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: val }),
              });

              const data = await res.json();
              setSuggestions(data.suggestions || []);
              setShowDropdown(true);
            } else {
              setShowDropdown(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // prevents form submission if inside a form
              handleCompare();
              handleRemy();
            }
          }}

          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          onFocus={() => {
            if (suggestions.length) setShowDropdown(true);
          }}
          placeholder="🍕 Type a food item (e.g. Pizza, Burger...)"
          className="w-full px-5 py-3 text-white bg-white/10 
                     border border-white/30 rounded-2xl 
                     shadow-md backdrop-blur-md text-lg 
                     placeholder:text-white placeholder:opacity-50 
                     focus:outline-none focus:ring-2 focus:ring-orange-400 
                     transition mb-2"
        />

{showDropdown && suggestions.length > 0 && (
  <div className="bg-white/80 backdrop-blur-md text-black rounded-xl shadow-lg mt-2 p-2 text-left max-h-48 overflow-y-auto">
    {suggestions.map((sug, i) => {
      const imageUrl = dishImageMap[sug.toLowerCase()];



  


      return (
        <div
          key={i}
          
          // onClick={() => {
          //   setItem(sug);
          //   setShowDropdown(false);
          // }}
          onClick={async () => {
            setItem(sug);               // Set selected item to input
            setShowDropdown(false);     // Hide dropdown
          
            await Promise.all([
              handleCompareWithDish(sug),
              handleRemyWithDish(sug),
            ]);
          }}
          
         
          
          
          
          className="cursor-pointer px-4 py-2 hover:bg-orange-100 rounded-lg flex items-center gap-3"
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={sug}
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
          )}
          <span>{sug}</span>
        </div>
      );
    })}
  </div>
)}


        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={handleCompare}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 transition transform text-white font-semibold rounded-2xl shadow-md backdrop-blur-sm"
          >
            🔍 Compare Prices
          </button>

          <button
            onClick={handleRemy}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 active:scale-95 transition transform text-white font-semibold rounded-2xl shadow-md backdrop-blur-sm"
          >
            🤖 Ask Cookie
          </button>
        </div>

        {loadingComparison ? (
          <div className="mt-6 text-lg text-gray-700 animate-pulse flex items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
            <span>Comparing prices...</span>
          </div>
        ) : comparison ? (
          comparison.error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-red-100/50 text-red-800 p-6 rounded-2xl shadow-xl text-left mt-6 border border-red-300 hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold mb-2">⚠️ Oops!</h2>
              <p className="text-lg">Sorry, we don’t have any information about “{item.trim()}”.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-xl text-left mt-6 border border-white/20 hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold mb-2 text-purple-500">📊 Price Comparison</h2>
        
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-lg">
                <div className="bg-orange-100 rounded-xl px-4 py-2 shadow-sm text-black">
                  <h3 className="text-2xl font-bold mb-2">🛵 Swiggy</h3>
                  <p className="text-sm text-gray-500">
                    <span className="text-gray-400">Best Price:</span> ₹{comparison.swiggy}
                  </p>
                  <Link href={`/compare/swiggy?dish=${encodeURIComponent(item.trim())}`} passHref>
                    <button className="mt-2 px-4 py-1 text-white bg-orange-500 hover:bg-orange-600 rounded-lg">View Restaurants</button>
                  </Link>
                </div>
        
                <div className="bg-red-100 rounded-xl px-4 py-2 shadow-sm text-black">
                  <h3 className="text-2xl font-bold mb-2">🍽️ Zomato</h3>
                  <p className="text-sm text-gray-500">
                    <span className="text-gray-400">Best Price:</span> ₹{comparison.zomato}
                  </p>
                  <Link href={`/compare/zomato?dish=${encodeURIComponent(item.trim())}`} passHref>
                    <button className="mt-2 px-4 py-1 text-white bg-red-500 hover:bg-red-600 rounded-lg">View Restaurants</button>
                  </Link>
                </div>
        
                <div className="bg-yellow-100 rounded-xl px-4 py-2 shadow-sm text-black">
                  <h3 className="text-2xl font-bold mb-2">🥡 EatSure</h3>
                  <p className="text-sm text-gray-500">
                    <span className="text-gray-400">Best Price:</span> ₹{comparison.eatsure}
                  </p>
                  <Link href={`/compare/eatsure?dish=${encodeURIComponent(item.trim())}`} passHref>
                    <button className="mt-2 px-4 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg">View Restaurants</button>
                  </Link>
                </div>
              </div>
        
              {lastUpdated && (
                <p className="text-sm text-white-600 mt-2">Last updated at {lastUpdated}</p>
              )}
            </motion.div>
          )
        ) : null}
        

        {loadingRemy ? (
          <div className="mt-6 text-lg text-gray-700 animate-pulse flex items-center gap-2">
            🤔 <span>Cookie is thinking...</span>
          </div>
        ) : remySuggestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-xl text-left mt-6 border border-white/20 hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold mb-2 text-blue-500">💡 Cookie's Suggestion</h2>
            <p className="text-lg text-black-800">{remySuggestion || "⚠️ Suggestion not loaded"}</p>
          </motion.div>
        )}
      </motion.div>
      
      <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
  {!showChat && (
    <div className="max-w-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-2xl shadow text-sm text-gray-800 dark:text-white animate-fadeIn">
      Want any food related suggestions from our personalized AI Chatbot <strong>Cookie</strong>?
    </div>
  )}

  <ChatButton onClick={() => setShowChat(true)} />
</div>
<AnimatePresence>
  {showChat && (
    <ChatPopup
    onClose={() => setShowChat(false)}
    messages={messages}
    setMessages={setMessages}
    input={input}
    setInput={setInput}
  />
  )}
</AnimatePresence>
      <footer className="relative z-10 mt-10 text-center text-white text-sm opacity-70">
        Eat Good, <span className="font-semibold text-orange-300">Stay Healthy</span>
      </footer>
    </div>
    
   
  );
 

  
}

