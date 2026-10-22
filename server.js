const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Sample Mock Data
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1200 },
    { id: 2, name: 'Shoes', category: 'Apparel', price: 80 },
    { id: 3, name: 'Coffee Maker', category: 'Electronics', price: 150 },
    { id: 4, name: 'T-Shirt', category: 'Apparel', price: 25 },
    { id: 5, name: 'Headphones', category: 'Electronics', price: 200 }
];

// Base HTML Page wrapper
function renderPage(title, content) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f7f6; color: #333; }
            h1 { color: #0056b3; }
            .version-tag { background: #e0e0e0; padding: 5px 10px; border-radius: 4px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
            th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
            th { background-color: #0056b3; color: white; }
        </style>
    </head>
    <body>
        <h1>${title}</h1>
        ${content}
    </body>
    </html>
    `;
}

// ==========================================
// VERSION 1: Recommendation & Show List
// ==========================================
app.get('/', (req, res) => {
    let displayItems = [...products];

    // ==========================================
    // VERSION 2: Filter - Apply Condition
    // ==========================================
    // Extracts query parameter: /?category=Electronics
    if (req.query.category) {
        displayItems = displayItems.filter(item => 
            item.category.toLowerCase() === req.query.category.toLowerCase()
        );
    }

    // ==========================================
    // VERSION 3: Sort - Order Results
    // ==========================================
    // Extracts query parameter: /?sort=price
    if (req.query.sort === 'price') {
        displayItems.sort((a, b) => a.price - b.price);
    }

    // Generate table rows dynamically
    let tableRows = displayItems.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>$${item.price}</td>
        </tr>
    `).join('');

    let content = `
        <p>Current Active System View: <span class="version-tag">Production Build</span></p>
        
        <h3>Functional Quick Links:</h3>
        <ul>
            <li><a href="/">Reset / View All (v1 feature)</a></li>
            <li><a href="/?category=Electronics">Filter by Electronics (v2 feature)</a></li>
            <li><a href="/?sort=price">Sort by Price ascending (v3 feature)</a></li>
        </ul>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `;

    res.send(renderPage("Inventory Application Management System", content));
});

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
});
