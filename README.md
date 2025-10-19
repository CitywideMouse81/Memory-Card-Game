Memory Card Game 🎮

A fun and interactive memory card matching game built with Vue 3, featuring multiple difficulty levels, score tracking, and a leaderboard.

🚀 Live Demo
    Netlify Deploy: https://transcendent-crisp-570b74.netlify.app
    
✨ Features

  Multiple Difficulty Levels

      Easy (6 pairs)

      Medium (8 pairs)

      Hard (12 pairs)

  Game Features

      Real-time score tracking

      Move counter

      Progress bar

      Card flip animations

      Match detection

  Leaderboard System

      Top 10 scores

      Difficulty level tracking

      Move count recording

  User Experience

      Responsive design for all devices

      Beautiful gradient UI

      Smooth animations and transitions

      Intuitive navigation


🛠️ Installation
Prerequisites

    Node.js (version 14 or higher)

    npm or yarn

Setup Instructions

Clone the repository
bash

    git clone https://github.com/yourusername/memory-card-game.git
    cd memory-card-game

Install dependencies
bash

    npm install

Run the development server
bash

    npm run dev
# or
    npm run serve

Build for production
bash

    npm run build

📁 Project Structure
text

    memory-card-game/
      ├── public/
      │   └── index.html
      ├── src/
      │   ├── components/
      │   │   └── Card.vue          # Individual card component
      │   ├── router/
      │   │   └── index.js          # Vue Router configuration
      │   ├── store/
      │   │   └── index.js          # Vuex store for state management
      │   ├── views/
      │   │   ├── Game.vue          # Main game interface
      │   │   ├── Home.vue          # Home page with difficulty selection
      │   │   └── Leaderboard.vue   # Leaderboard display
      │   ├── App.vue               # Root component
      │   └── main.js               # Application entry point
      ├── babel.config.js           # Babel configuration
      ├── package.json              # Project dependencies and scripts
      └── webpack.config.js         # Webpack configuration

🎯 How to Play

    Select Difficulty: Choose from Easy, Medium, or Hard on the home page

    Start Game: Click "Start Game" to begin

    Match Cards: Flip cards to find matching pairs

    Score Points: Earn 10 points for each match, lose 2 points for mismatches

    Complete the Game: Match all pairs to finish and record your score

🏗️ Technical Architecture

    Framework: Vue 3 with Composition API

    State Management: Vuex 4

    Routing: Vue Router 4

    Build Tool: Webpack 5

    Transpilation: Babel

    Styling: CSS3 with Flexbox/Grid

Key Components

    Card.vue: Handles individual card flip animations and click events

    Game.vue: Main game logic and board rendering

    Home.vue: Difficulty selection and game initialization

    Leaderboard.vue: Score display and ranking

State Management

The Vuex store manages:

    Card data and matching logic

    Game progress and scoring

    Difficulty settings

    Leaderboard data

📱 Responsive Design

The game is fully responsive and works on:

    Desktop computers

    Tablets

    Mobile phones

🎮 Game Rules

    Flip two cards at a time to find matches

    Matching pairs stay revealed

    Non-matching pairs flip back after 1 second

    Score is calculated based on matches and moves

    Complete the game by matching all pairs
