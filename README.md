# Hunt the Wumpus 🎮

> **⚡ Built in 5 minutes with a single AI prompt** — A classic cave exploration game brought to life with vanilla JavaScript, HTML5, and CSS3.

## Overview

**Hunt the Wumpus** is an interactive text-based adventure game where you navigate through a dark cavern, explore mysterious caves, avoid deadly hazards, and hunt down the fearsome Wumpus with your limited arsenal of arrows.

This is a modern web-based recreation of the classic 1970s text adventure game, featuring an intuitive grid-based interface, real-time perception system, and strategic gameplay mechanics.

## 🎮 Game Features

### Gameplay Mechanics
- **8x8 Grid Cavern**: Navigate through a vast underground cave system
- **Limited Resources**: Start with only 5 arrows to defeat the Wumpus
- **Perception System**: Detect nearby hazards through your senses
- **Dynamic Wumpus AI**: The Wumpus may move when you miss a shot
- **Win/Lose Conditions**: Hunt successfully or meet a gruesome end

### Hazards
- **Bottomless Pits** 🕳️: Feel a breeze nearby warning of danger. One step too far and you're done
- **Super Bats** 🦇: Hear flapping sounds before they grab you and drop you in a random location
- **The Wumpus** 👹: Smell a terrible stench nearby. One encounter means game over

### Controls
| Action | Controls |
|--------|----------|
| **Move** | `CTRL` + `↑ ↓ ← →` Arrow Keys |
| **Shoot** | `ALT` + `↑ ↓ ← →` Arrow Keys |
| **Restart** | Click the Restart Game button |

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or dependencies required

### Installation

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **Click** "Let's Start" to begin your adventure

```bash
# Simply open in browser
open index.html
# or
start index.html
```

## 📁 Project Structure

```
PumpusGame/
├── index.html      # Main HTML structure with game UI
├── script.js       # Game logic and mechanics
├── style.css       # Modern dark-themed styling
└── README.md       # This file
```

### File Descriptions

**index.html** - The main entry point containing:
- Start screen with game rules and instructions
- Game board layout (8x8 grid)
- Stats display (arrows remaining, game state)
- Message log for game events
- Control guide for keyboard shortcuts

**script.js** - Core game engine featuring:
- Grid initialization and hazard placement
- Player movement and shooting mechanics
- Perception detection system (breeze, flapping, stench)
- Collision and game-over logic
- Arrow management and Wumpus spawning
- Message logging and game state management

**style.css** - Responsive styling with:
- GitHub-inspired dark theme (accessibility-focused)
- Grid visualization with hover effects
- Dynamic hazard indicators (color-coded)
- Mobile-responsive design
- Smooth animations and transitions

## 🎯 How to Play

### Objective
Find and shoot the Wumpus with your 5 arrows before it finds you.

### Strategy Tips

1. **Use Your Senses**
   - 🌬️ **Breeze** = A pit is nearby (1 square away)
   - 🔊 **Flapping** = Super bats are near
   - 👃 **Stench** = The Wumpus is close

2. **Explore Carefully**
   - Mark danger zones when you sense hazards
   - Map out safe passages as you explore
   - Avoid moving into unexplored dangerous territory

3. **Manage Your Arrows**
   - You have only 5 arrows - use them wisely
   - Missing a shot may cause the Wumpus to move
   - Plan your shots strategically

4. **Avoid Hazards**
   - Don't fall into bottomless pits
   - Evade super bats that relocate you randomly
   - Stay away from the Wumpus until you're ready

### Example Playthrough

```
1. Start in a random location
2. CTRL+↑ to move forward and explore
3. See "You smell a terrible stench nearby" → Wumpus is adjacent!
4. ALT+↑ to shoot upward
5. Success! You've hunted the Wumpus!
```

## 🎨 Game Design

### Visual Elements
- **Explored Cells**: Light background showing visited locations
- **Player Position**: Highlighted with a blue border
- **Current Perceptions**: Colored indicators when near hazards
  - Green for breeze (pits)
  - Purple for flapping (bats)
  - Red for stench (Wumpus)

### Color Scheme
- **Background**: Dark theme (`#0d1117`) - easy on the eyes
- **Accent Colors**: GitHub-inspired blue, green, red, purple
- **Clear Typography**: Outfit font for readability

## 💡 Implementation Details

### Game Constants
```javascript
GRID_SIZE = 8           // 8x8 cavern
NUM_PITS = 3           // Number of pit hazards
NUM_BATS = 3           // Number of bat hazards
MAX_ARROWS = 5         // Starting arrow count
```

### Game States
- `HUNTING` - Active gameplay
- `WIN` - Successfully shot the Wumpus
- `LOSE` - Encountered a hazard or fell in a pit

### Perception System
The game calculates adjacent cells to detect nearby hazards:
- If Wumpus is adjacent → Smell detected
- If Pit is adjacent → Breeze detected
- If Bats are adjacent → Flapping detected

## 🔧 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full Support |
| Firefox | ✅ Full Support |
| Safari | ✅ Full Support |
| Edge | ✅ Full Support |
| IE 11 | ❌ Not Supported |

## 🎓 Learning Value

This project demonstrates:
- **DOM Manipulation**: Dynamic grid generation and updates
- **Event Handling**: Keyboard input processing with modifiers
- **Game Logic**: State management, collision detection, AI behavior
- **CSS Grid/Flexbox**: Modern responsive layout techniques
- **Data Structures**: 2D arrays for spatial representation
- **Game Design**: Balanced difficulty, fair hazard placement, strategic depth

## 🚀 Build Information

- **Build Time**: 5 minutes ⚡
- **Build Method**: Single AI prompt generation
- **Lines of Code**: ~500 total (HTML, CSS, JavaScript combined)
- **External Dependencies**: Google Fonts (Outfit) only

This project showcases rapid prototyping capabilities - from concept to a fully functional, polished game in just 5 minutes using modern web technologies.

## 📝 License

This is a free, open-source recreation of the classic Hunt the Wumpus game. Feel free to modify and distribute.

## 🤝 Contributing

Want to enhance the game? Ideas for improvements:
- Add difficulty levels (more pits/bats, fewer arrows)
- Implement multiplayer mode
- Add sound effects and music
- Create different cavern themes
- Add power-ups or special abilities

## 🎮 Enjoy!

Hunt the Wumpus awaits you in the dark caverns. Can you emerge victorious?

**Good luck, hunter!** 🏹
