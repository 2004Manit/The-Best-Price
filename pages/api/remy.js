// pages/api/remy.js

export default async function handler(req, res) {
  const { item } = req.query;
  const normalizedItem = item?.toLowerCase();

  const suggestions = {
    pizza: "Craving pizza? Domino’s thin-crust or Oven Story's cheese burst are top picks today!",
    burger: "Burgers calling? Try McDonald's McSpicy or Burger King's Whopper – both are trending.",
    biryani: "Royal cravings? Paradise Biryani and Behrouz have great deals on biryani right now.",
    dosa: "Light and crispy? Sagar Ratna and Dosa Plaza are delivering fast and fresh dosas!",
    noodles: "Feeling noodly? Hakka noodles from Chinese Wok or Momos Wala are crowd favorites.",
    sandwich: "Quick bite? Subway’s Paneer Tikka and Ovenstory’s Grilled Veggie sandwich are awesome.",
  };
  const popularDishes = [
    "rajma chawal",
    "butter chicken",
    "paneer tikka",
    "chole bhature",
    "biryani",
    "masala dosa",
    "idli sambar",
    "tandoori chicken",
    "veg pulao",
  ];
  

  // Simulate a delay for more realistic AI feel
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const response =
    suggestions[normalizedItem] ||
    `Hmm... I couldn't find any smart deals for "${item}" right now, but checking your favorite app might help! 🍽️`;

  res.status(200).json({ suggestion: response });
}

