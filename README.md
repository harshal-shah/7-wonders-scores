# 🏛️ 7 Wonders Score Calculator

A beautiful, responsive static webpage to track and calculate scores for the board game 7 Wonders.

## 🚀 Try it Now
**Live Demo**: https://bit.ly/7wondersscores

## Features

### 🎮 Player Management
- **Dynamic Player Addition/Removal**: Add or remove players on the fly (1-7 players supported)
- **Customizable Player Names**: Click on any player header to rename them
- **Real-time Player Count Display**: Shows current number of players

### 📊 Score Tracking
- **Complete Category Coverage**: Track scores for all 7 Wonders scoring categories:
  - Wonder board points
  - Treasure tokens
  - Military conflicts
  - Blue cards (civic structures)
  - Yellow cards (commercial structures)
  - Green cards (scientific structures)
  - Purple cards (guilds)
- **Auto-calculating Totals**: Automatically calculates and updates total scores as you enter values
- **Winner Highlighting**: Automatically highlights the winning player(s) with a golden animation

### 📱 WhatsApp Sharing
- **Share Scores as Image**: Capture the entire scorecard as a high-quality image
- **Mobile-Optimized Sharing**: Uses native share sheet on mobile devices for seamless WhatsApp sharing
- **Desktop Support**: Automatically downloads the image on desktop for manual sharing
- **Beautiful Captures**: Generates a clean, professional-looking image with all scores and player names

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with gradient background
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Intuitive Controls**: Easy-to-use number inputs with focus highlighting
- **Visual Feedback**: Hover effects and smooth animations for better user experience
- **Table Organization**: Well-structured table with clear category headers and color-coded sections

### ⚡ Technical Features
- **Lightweight Dependencies**: Uses html2canvas for image capture via CDN
- **Client-side Only**: Runs entirely in the browser, no server needed
- **Real-time Updates**: Instant score calculations and winner determination
- **Input Validation**: Handles invalid inputs gracefully
- **Cross-browser Compatible**: Works in all modern web browsers
- **Web Share API Integration**: Native sharing experience on mobile devices
- **Comprehensive Test Suite**: Jest tests ensure reliability and prevent regressions

## Usage

1. Open `7wonders-score-calculator.html` in any web browser
2. Add or remove players using the control buttons
3. Rename players by clicking on their header names
4. Enter scores for each category as you play
5. Watch the totals update automatically and see the winner highlighted!
6. Click "📱 Share on WhatsApp" to capture and share your scores:
   - **On mobile**: Select WhatsApp from the native share sheet
   - **On desktop**: The image will be downloaded automatically for manual upload

Perfect for game nights, tournaments, or casual play tracking.

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 7-wonders-scores
```

2. Install dependencies:
```bash
npm install
```

### Running Tests

The project includes a comprehensive Jest test suite to ensure all functionality works correctly.

**Run all tests:**
```bash
npm test
```

**Run tests with coverage report:**
```bash
npm run test:coverage
```

**Run tests in watch mode (for development):**
```bash
npm run test:watch
```

### Test Coverage

The test suite covers:
- ✅ Initial page load and setup (3 players)
- ✅ Adding players (up to 7 maximum)
- ✅ Removing players (minimum 1)
- ✅ Score calculation across all categories
- ✅ Real-time total updates
- ✅ Winner highlighting (including ties)
- ✅ Player name customization
- ✅ WhatsApp share functionality
- ✅ Mobile and desktop sharing flows
- ✅ Error handling for share failures
- ✅ Integration tests for complex workflows

## Project Structure

```
7-wonders-scores/
├── 7wonders-score-calculator.html    # Main application file
├── 7wonders-score-calculator.test.js # Jest test suite
├── package.json                      # Node.js dependencies
├── jest.config.js                    # Jest configuration
├── jest.setup.js                     # Test environment setup
├── .gitignore                        # Git ignore rules
├── README.md                         # This file
└── LICENSE                           # License file
```

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with modern features (gradients, animations, flexbox)
- **Vanilla JavaScript**: Core functionality and interactivity
- **html2canvas**: Screen capture library for image generation
- **Web Share API**: Native sharing on mobile devices
- **Jest**: Testing framework
- **jsdom**: DOM implementation for Node.js testing

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: WhatsApp sharing via Web Share API works best on mobile devices. Desktop users will get a download option instead.
