![github-submission-banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)

# 🚀 Project Title

> Compare food prices instantly across apps and get AI-powered recommendations from Cookie

---

## 📌 Problem Statement

Select the problem statement number and title from the official list given in Participant Manual.

**Example:**  
**Problem Statement 1 – Weave AI magic with Groq**

---

## 🎯 Objective

Ok so people can use it for comparing prices of the same dish from different platforms like Swiggy, Zomato, and EatSure.
Also it can help in choosing what to eat, especially when you are unsure or looking for something new, healthy, or fun.
And more importantly it prevents wasting time switching between apps or websites for the best deals or ideas.


### Your Approach:  
- firstly we focused on the problems that we ourselves were facing , a lot of them struck our minds but not as much as this food comparision one. So we went on building something like a skyscanner web application for food.
- Now as we found that swiggy and zomato were'nt serving any public APIs very early , we thought of creating a mock API in our backend that stores data for more than 100 food items.
- Now this only was'nt enough , so we added a personalised AI chatbot , that helps you with any issue or suggestion just like any other AI model, now this was challenging.

---

## 🛠️ Tech Stack

### Core Technologies Used:
- Frontend: React + Next.js ; Tailwind CSS ; Framer Motion ; TypeScript
- Backend: Mock API and Utilities
- Database: we created a mock data APi , so didnt use any real database
- APIs: Groq API
- Hosting: Vercel

### Sponsor Technologies Used (if any):
- [✅] **Groq:** 
okay so majorly, there are 3 sections in my prototype where I have integrated Groq API:

1. the personalized AI chatbot, that interacts with the user just like any other ai model, like ChatGPT or Gemini.
2. now the 2nd sections is the dropdown section that is directly integrated with the Groq API, so whenever a user is midway typing something in the input box it automatically recommends some food items on the basis of intersection of Groq API and the Mock API (it is the backend database that we are maintaining).
3. last section is the ask cookie section, it basically provides a fun and unique recipe that can be prepared using the food item that is entered. Basically, we are giving customized prompt to our Groq API for this.
---

## ✨ Key Features

Highlight the most important features of your project:

1. Smart Dish Input with Autocomplete
   
Users start typing a dish name.
Autocomplete suggestions (via Groq + local validation) appear in a dropdown.
Clicking a suggestion sets the dish and triggers price comparison + Cookie’s recommendation.

2. Cross-Platform Price Comparison.
   
Prices are fetched (from mock data or future live scraping).
Displays cheapest price per platform (Swiggy, Zomato, EatSure).
Prices auto-update every 30 seconds to simulate real-world fluctuations.

3. Cookie – The AI Food Buddy
   
Friendly AI chatbot powered by Groq LLM.
Generates fun, healthy, and casual dish ideas or twists based on user input.
Sends exact user input as prompt for better response accuracy.
Positioned as a floating chat widget for interactive feel.

4. Local Data Integration with Real-Time Simulation

Restaurants show updated prices based on the platform’s cheapest price.

![Screenshot 2025-04-18 224832](https://github.com/user-attachments/assets/51dfd57c-68ac-46d5-8cf1-8620bf6bdacc)
![Screenshot 2025-04-18 225314](https://github.com/user-attachments/assets/9143c152-e967-4175-981e-c66e57332a67)
![Screenshot 2025-04-18 225442](https://github.com/user-attachments/assets/e376d3d8-7107-4dd3-b5fd-691ada59eae7)
![Screenshot 2025-04-18 225518](https://github.com/user-attachments/assets/eaa02ee9-c9ce-403d-bed9-41614a6a374b)


---

## 📽️ Demo & Deliverables

- **Demo Video Link:** https://vimeo.com/1076818578/50dfe74fb0?ts=0&share=copy

---
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```  
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🧬 Future Scope

List of few improvements that we are planning for future:

-  Live scraping or API integration from Swiggy/Zomato. 
- Location-based filtering for restaurant availability.
- User profiles and favorites.

---

