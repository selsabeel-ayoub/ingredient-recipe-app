# ChefSSS

## Inspiration:
As first-year university students living in residence, we've been thriving off of our campus meal plan. Next year, we're probably going to need to cook for ourselves. We realized that the hardest part of cooking is usually just deciding what to make with whatever ingredients we have. We wanted to create a tool that simplifies the process.

## What it Does:
ChefSSS is an AI-powered culinary assistant designed to make cooking and decisions easier. Users can manage a digital version of their fridge by adding specific ingredients with quantities. With one tap, the app uses generative AI to analyze the available inventory and suggest three recipe options. Users can then view detailed cooking instructions and bookmark recipes to their personal Recipe Book for future use.

## How we Built it:
  - Frontend: Built with React Native and Expo Router.
  - AI Integration: Powered by Gemini 2.0 Flash, using custom prompts to return structured JSON data for recipes, ingredients, and instructions.
  - State Management: Developed custom hooks to handle complex logic for inventory and bookmarks.
  - Storage: Implemented AsyncStorage to ensure that a user’s fridge inventory and saved recipes persist even after the app is closed.
  - UI/UX: Designed with a cohesive Pastel Pink theme and a centralized style system for a calming and modern aesthetic.

## Challenges we ran Into:
  - Model Integration: We initially faced 404 Not Found errors when connecting to the Gemini API, requiring us to debug specific model versions and endpoint configurations.
  - Persistent State: Handling navigation parameters between screens while maintaining a consistent list of ingredients led to bugs where items would "override" each other; we solved this by implementing functional state updates and unique timestamps.
  - Data Parsing: Ensuring the AI always returned valid JSON without markdown formatting.

## Accomplishments that we're Proud of:
  - Reliable Persistence: We successfully implemented a system where the fridge actually "remembers" its contents across sessions.
  - The Loading Experience: We added a dynamic Loading Screen that features cooking-themed animations.
  - Visual Consistency: Successfully transitioned the entire app from basic default styles to a centralized pastel theme.

## What we Learned:
  - Full-Stack Mobile Development: We gained hands-on experience with the entire lifecycle of an app, from API services to local storage persistence.
  - AI Prompting: We learned how to "talk" to LLMs to get exactly the structured data we need for a user interface.
  - TypeScript Mastery: We learned the importance of strict type-checking to catch bugs in ingredient units and recipe objects before they reached the user.

What's next for ChefSSS:
  - Social Sharing: Allowing students to share their recipes with friends.
    Grocery Integration: Automatically creating shopping lists for the "missing" ingredients needed for a specific recipe.

