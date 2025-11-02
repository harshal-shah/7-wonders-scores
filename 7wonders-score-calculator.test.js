/**
 * Test suite for 7 Wonders Score Calculator
 */

const fs = require('fs');
const path = require('path');

// Load the HTML file
const html = fs.readFileSync(
  path.resolve(__dirname, '7wonders-score-calculator.html'),
  'utf8'
);

describe('7 Wonders Score Calculator', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
    // Execute the script tags properly in jsdom
    const scripts = Array.from(document.querySelectorAll('script'));
    scripts.forEach(script => {
      if (script.innerHTML && !script.src) {
        // Execute script content in the global window context
        const scriptContent = script.innerHTML;
        // Use window.eval to execute in global scope
        window.eval(scriptContent);
      }
    });
  });

  afterEach(() => {
    document.documentElement.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('Initial Page Load', () => {
    test('should initialize with 3 players', () => {
      const playerHeaders = document.querySelectorAll('#playerHeader th');
      // 1 for "Category" header + 3 player headers
      expect(playerHeaders.length).toBe(4);
    });

    test('should display correct player count', () => {
      const playerCount = document.getElementById('playerCount').textContent;
      expect(playerCount).toBe('3');
    });

    test('should initialize all categories', () => {
      const categoryRows = document.querySelectorAll('.category-header');
      expect(categoryRows.length).toBe(7); // 7 scoring categories
    });

    test('should have a total row', () => {
      const totalRow = document.getElementById('totalRow');
      expect(totalRow).toBeTruthy();
      expect(totalRow.querySelector('td').textContent).toBe('TOTAL');
    });

    test('should initialize all scores to 0', () => {
      const scoreInputs = document.querySelectorAll('input[type="number"]');
      scoreInputs.forEach(input => {
        expect(input.value).toBe('0');
      });
    });

    test('should have WhatsApp share button', () => {
      const shareBtn = document.getElementById('shareBtn');
      expect(shareBtn).toBeTruthy();
      expect(shareBtn.textContent).toContain('Share on WhatsApp');
    });
  });

  describe('Player Management', () => {
    test('should add a player when Add Player button is clicked', () => {
      const addBtn = document.getElementById('addPlayerBtn');
      addBtn.click();
      
      const playerHeaders = document.querySelectorAll('#playerHeader th');
      expect(playerHeaders.length).toBe(5); // Category + 4 players
      
      const playerCount = document.getElementById('playerCount').textContent;
      expect(playerCount).toBe('4');
    });

    test('should remove a player when Remove Player button is clicked', () => {
      const removeBtn = document.getElementById('removePlayerBtn');
      removeBtn.click();
      
      const playerHeaders = document.querySelectorAll('#playerHeader th');
      expect(playerHeaders.length).toBe(3); // Category + 2 players
      
      const playerCount = document.getElementById('playerCount').textContent;
      expect(playerCount).toBe('2');
    });

    test('should not add more than 7 players', () => {
      const addBtn = document.getElementById('addPlayerBtn');
      
      // Add 4 more players (currently 3, so total will be 7)
      for (let i = 0; i < 4; i++) {
        addBtn.click();
      }
      
      const playerCount = document.getElementById('playerCount').textContent;
      expect(playerCount).toBe('7');
      
      // Try adding one more
      addBtn.click();
      expect(document.getElementById('playerCount').textContent).toBe('7');
    });

    test('should disable add button at max players', () => {
      const addBtn = document.getElementById('addPlayerBtn');
      
      // Add players to reach max
      for (let i = 0; i < 4; i++) {
        addBtn.click();
      }
      
      expect(addBtn.disabled).toBe(true);
    });

    test('should not remove below 1 player', () => {
      const removeBtn = document.getElementById('removePlayerBtn');
      
      // Remove 2 players (from 3 to 1)
      removeBtn.click();
      removeBtn.click();
      
      const playerCount = document.getElementById('playerCount').textContent;
      expect(playerCount).toBe('1');
      
      // Try removing one more
      removeBtn.click();
      expect(document.getElementById('playerCount').textContent).toBe('1');
    });

    test('should disable remove button at min players', () => {
      const removeBtn = document.getElementById('removePlayerBtn');
      
      // Remove down to 1 player
      removeBtn.click();
      removeBtn.click();
      
      expect(removeBtn.disabled).toBe(true);
    });

    test('should update player name input', () => {
      const playerInput = document.querySelector('#playerHeader input[type="text"]');
      playerInput.value = 'Alice';
      playerInput.dispatchEvent(new Event('change'));
      
      expect(playerInput.value).toBe('Alice');
    });
  });

  describe('Score Calculation', () => {
    test('should calculate total score for a single player', () => {
      const scoreInputs = document.querySelectorAll('input[data-player="0"]');
      
      // Set some scores
      scoreInputs[0].value = '10'; // Wonder board
      scoreInputs[1].value = '5';  // Treasure
      scoreInputs[2].value = '8';  // Military
      
      // Trigger calculation
      scoreInputs[0].dispatchEvent(new Event('input'));
      
      const total = document.getElementById('total-0').textContent;
      expect(total).toBe('23');
    });

    test('should calculate totals for all players', () => {
      const player0Inputs = document.querySelectorAll('input[data-player="0"]');
      const player1Inputs = document.querySelectorAll('input[data-player="1"]');
      
      player0Inputs[0].value = '15';
      player1Inputs[0].value = '20';
      
      player0Inputs[0].dispatchEvent(new Event('input'));
      
      expect(document.getElementById('total-0').textContent).toBe('15');
      expect(document.getElementById('total-1').textContent).toBe('20');
    });

    test('should handle negative scores', () => {
      const scoreInput = document.querySelector('input[data-player="0"]');
      scoreInput.value = '-5';
      scoreInput.dispatchEvent(new Event('input'));
      
      const total = document.getElementById('total-0').textContent;
      expect(total).toBe('-5');
    });

    test('should handle empty input as 0', () => {
      const scoreInput = document.querySelector('input[data-player="0"]');
      scoreInput.value = '';
      scoreInput.dispatchEvent(new Event('input'));
      
      const total = document.getElementById('total-0').textContent;
      expect(total).toBe('0');
    });

    test('should update totals in real-time', () => {
      const scoreInput = document.querySelector('input[data-player="0"]');
      
      scoreInput.value = '10';
      scoreInput.dispatchEvent(new Event('input'));
      expect(document.getElementById('total-0').textContent).toBe('10');
      
      scoreInput.value = '25';
      scoreInput.dispatchEvent(new Event('input'));
      expect(document.getElementById('total-0').textContent).toBe('25');
    });
  });

  describe('Winner Highlighting', () => {
    test('should highlight the winner with highest score', () => {
      const player0Inputs = document.querySelectorAll('input[data-player="0"]');
      const player1Inputs = document.querySelectorAll('input[data-player="1"]');
      
      player0Inputs[0].value = '50';
      player1Inputs[0].value = '30';
      
      player0Inputs[0].dispatchEvent(new Event('input'));
      
      const total0 = document.getElementById('total-0');
      const total1 = document.getElementById('total-1');
      
      expect(total0.classList.contains('winner')).toBe(true);
      expect(total1.classList.contains('winner')).toBe(false);
    });

    test('should highlight multiple winners in case of tie', () => {
      const player0Inputs = document.querySelectorAll('input[data-player="0"]');
      const player1Inputs = document.querySelectorAll('input[data-player="1"]');
      
      player0Inputs[0].value = '50';
      player1Inputs[0].value = '50';
      
      player0Inputs[0].dispatchEvent(new Event('input'));
      
      const total0 = document.getElementById('total-0');
      const total1 = document.getElementById('total-1');
      
      expect(total0.classList.contains('winner')).toBe(true);
      expect(total1.classList.contains('winner')).toBe(true);
    });

    test('should not highlight winner when all scores are 0', () => {
      const total0 = document.getElementById('total-0');
      const total1 = document.getElementById('total-1');
      
      expect(total0.classList.contains('winner')).toBe(false);
      expect(total1.classList.contains('winner')).toBe(false);
    });

    test('should update winner highlight when scores change', () => {
      const player0Inputs = document.querySelectorAll('input[data-player="0"]');
      const player1Inputs = document.querySelectorAll('input[data-player="1"]');
      
      // Player 0 wins initially
      player0Inputs[0].value = '50';
      player0Inputs[0].dispatchEvent(new Event('input'));
      
      expect(document.getElementById('total-0').classList.contains('winner')).toBe(true);
      
      // Player 1 wins after update
      player1Inputs[0].value = '60';
      player1Inputs[0].dispatchEvent(new Event('input'));
      
      expect(document.getElementById('total-0').classList.contains('winner')).toBe(false);
      expect(document.getElementById('total-1').classList.contains('winner')).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    test('should recalculate totals after adding a player', () => {
      // Set some initial scores
      const player0Inputs = document.querySelectorAll('input[data-player="0"]');
      player0Inputs[0].value = '20';
      player0Inputs[0].dispatchEvent(new Event('input'));
      
      expect(document.getElementById('total-0').textContent).toBe('20');
      
      // Add a player
      document.getElementById('addPlayerBtn').click();
      
      // Existing totals should remain correct
      expect(document.getElementById('total-0').textContent).toBe('20');
      
      // New player should have 0 total
      expect(document.getElementById('total-3').textContent).toBe('0');
    });

    test('should recalculate totals after removing a player', () => {
      // Set scores for all players
      const player0Inputs = document.querySelectorAll('input[data-player="0"]');
      const player1Inputs = document.querySelectorAll('input[data-player="1"]');
      
      player0Inputs[0].value = '20';
      player1Inputs[0].value = '30';
      player0Inputs[0].dispatchEvent(new Event('input'));
      
      // Remove last player
      document.getElementById('removePlayerBtn').click();
      
      // Remaining totals should be correct
      expect(document.getElementById('total-0').textContent).toBe('20');
      expect(document.getElementById('total-1').textContent).toBe('30');
      
      // Winner should still be highlighted
      expect(document.getElementById('total-1').classList.contains('winner')).toBe(true);
    });

    test('should handle complex score entry across all categories', () => {
      const player0Inputs = document.querySelectorAll('input[data-player="0"]');
      
      const scores = [12, 8, 15, 10, 5, 20, 7]; // Total should be 77
      scores.forEach((score, index) => {
        player0Inputs[index].value = score.toString();
      });
      
      player0Inputs[0].dispatchEvent(new Event('input'));
      
      expect(document.getElementById('total-0').textContent).toBe('77');
    });
  });

  describe('WhatsApp Share Feature', () => {
    test('should have share button in the DOM', () => {
      const shareBtn = document.getElementById('shareBtn');
      expect(shareBtn).toBeTruthy();
      expect(shareBtn.classList.contains('btn-share')).toBe(true);
    });

    test('should call html2canvas when share button is clicked', async () => {
      const shareBtn = document.getElementById('shareBtn');
      
      // Click the share button
      await shareBtn.click();
      
      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(global.html2canvas).toHaveBeenCalled();
    });

    test('should use Web Share API when available', async () => {
      // Mock Web Share API as available
      const mockShare = jest.fn(() => Promise.resolve());
      const mockCanShare = jest.fn(() => true);
      
      Object.defineProperty(global.navigator, 'share', {
        writable: true,
        value: mockShare
      });
      
      Object.defineProperty(global.navigator, 'canShare', {
        writable: true,
        value: mockCanShare
      });
      
      const shareBtn = document.getElementById('shareBtn');
      await shareBtn.click();
      
      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(mockCanShare).toHaveBeenCalled();
    });

    test('should create download link when Web Share API not available', async () => {
      // Mock Web Share API as not available
      Object.defineProperty(global.navigator, 'share', {
        writable: true,
        value: undefined
      });
      
      Object.defineProperty(global.navigator, 'canShare', {
        writable: true,
        value: undefined
      });
      
      // Mock alert
      global.alert = jest.fn();
      
      const shareBtn = document.getElementById('shareBtn');
      await shareBtn.click();
      
      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(global.URL.createObjectURL).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith(
        'Image downloaded! You can now upload it to WhatsApp.'
      );
    });

    test('should handle share errors gracefully', async () => {
      // Mock html2canvas to reject
      global.html2canvas = jest.fn(() => Promise.reject(new Error('Capture failed')));
      global.alert = jest.fn();
      
      const shareBtn = document.getElementById('shareBtn');
      await shareBtn.click();
      
      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(global.alert).toHaveBeenCalledWith(
        'Failed to capture or share the image. Please try again.'
      );
    });

    test('should re-enable button after share completes', async () => {
      const shareBtn = document.getElementById('shareBtn');
      const originalText = shareBtn.textContent;
      
      await shareBtn.click();
      
      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(shareBtn.disabled).toBe(false);
      expect(shareBtn.textContent).toBe(originalText);
    });
  });

  describe('UI Elements', () => {
    test('should have correct title', () => {
      const title = document.querySelector('h1');
      expect(title.textContent).toBe('🏛️ 7 Wonders Score Calculator');
    });

    test('should have subtitle', () => {
      const subtitle = document.querySelector('.subtitle');
      expect(subtitle.textContent).toBe('Track scores across all ages and calculate the winner!');
    });

    test('should have all control buttons', () => {
      const addBtn = document.getElementById('addPlayerBtn');
      const removeBtn = document.getElementById('removePlayerBtn');
      const shareBtn = document.getElementById('shareBtn');
      
      expect(addBtn).toBeTruthy();
      expect(removeBtn).toBeTruthy();
      expect(shareBtn).toBeTruthy();
    });

    test('should display all score categories with emojis', () => {
      const categories = document.querySelectorAll('.category-header');
      const expectedCategories = [
        '🏛️ Wonder board',
        '💰 Treasure',
        '⚔️ Military Conflicts',
        '🔵 Blue cards',
        '🟡 Yellow cards',
        '🟢 Green cards',
        '🟣 Purple cards'
      ];
      
      categories.forEach((category, index) => {
        expect(category.textContent).toBe(expectedCategories[index]);
      });
    });
  });
});

