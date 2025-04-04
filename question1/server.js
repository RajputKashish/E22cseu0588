const express = require('express');
const cors = require('cors');

const app = express();
const port = 9876;

app.use(cors());
app.use(express.json());

// Configuration
const WINDOW_SIZE = 10;

// Store for different number types
const numberStore = {
    p: [], // prime
    f: [], // fibonacci
    e: [], // even
    r: []  // random
};

// Helper function to calculate average
const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
};

// Generate sample numbers for each type
function generateNumbers(type) {
    let newNumbers = [];
    
    switch(type) {
        case 'p': // Prime numbers
            newNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
            break;
        case 'f': // Fibonacci numbers
            newNumbers = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
            break;
        case 'e': // Even numbers
            newNumbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
            break;
        case 'r': // Random numbers
            newNumbers = Array.from({length: 10}, () => Math.floor(Math.random() * 100));
            break;
    }
    
    return newNumbers;
}

// Main endpoint handler
app.get('/numbers/:numberid', (req, res) => {
    const { numberid } = req.params;
    const type = numberid.toLowerCase();
    
    console.log(`\nReceived request for type: ${type}`);
    
    if (!['p', 'f', 'e', 'r'].includes(type)) {
        console.error('Invalid number type:', type);
        return res.status(400).json({ error: 'Invalid number type' });
    }

    let prevState = [...numberStore[type]];
    console.log('Previous state:', prevState);
    
    // Generate new numbers
    const newNumbers = generateNumbers(type);
    console.log('New numbers generated:', newNumbers);
    
    // Update store with new unique numbers
    const uniqueNumbers = newNumbers.filter(n => !numberStore[type].includes(n));
    console.log('Unique new numbers:', uniqueNumbers);
    
    numberStore[type] = [...numberStore[type], ...uniqueNumbers];
    
    // Maintain window size
    while (numberStore[type].length > WINDOW_SIZE) {
        numberStore[type].shift();
    }
    
    console.log('Updated store for type', type, ':', numberStore[type]);

    const response = {
        windowPrevState: prevState,
        windowCurrState: numberStore[type],
        numbers: numberStore[type],
        avg: calculateAverage(numberStore[type])
    };

    console.log('Sending response:', response);
    res.json(response);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 