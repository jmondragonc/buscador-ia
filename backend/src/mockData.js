// Datos de prueba para desarrollo/testing
const mockProducts = [
  { name: "Cable USB-C 1m Premium", category: "Electrónica", price: 15.99, score: 0.95 },
  { name: "Cable USB-C 2m Alta Velocidad", category: "Electrónica", price: 22.99, score: 0.92 },
  { name: "Adaptador USB-C a USB-A", category: "Electrónica", price: 8.99, score: 0.85 },
  { name: "Cemento Portland Gris 50kg", category: "Construcción", price: 12.50, score: 0.98 },
  { name: "Cemento Portland Blanco 25kg", category: "Construcción", price: 18.00, score: 0.94 },
  { name: "Fierro Corrugado 8mm x 6m", category: "Construcción", price: 24.50, score: 0.96 },
  { name: "Fierro Corrugado 12mm x 6m", category: "Construcción", price: 45.00, score: 0.93 },
  { name: "Audífonos Bluetooth Sony WH-1000XM4", category: "Electrónica", price: 299.99, score: 0.97 },
  { name: "Audífonos Bluetooth JBL Tune 510BT", category: "Electrónica", price: 49.99, score: 0.90 },
  { name: "Audífonos Inalámbricos AirPods Pro", category: "Electrónica", price: 249.99, score: 0.95 },
  { name: "Pintura Blanca Látex Interior 4L", category: "Construcción", price: 32.00, score: 0.92 },
  { name: "Pintura Blanca Esmalte Exterior 1L", category: "Construcción", price: 18.50, score: 0.88 },
  { name: "Laptop HP 15.6\" Intel i5 8GB", category: "Electrónica", price: 649.99, score: 0.91 },
  { name: "Laptop Dell Inspiron 14\" i7 16GB", category: "Electrónica", price: 899.99, score: 0.94 },
  { name: "Laptop Lenovo ThinkPad 15.6\"", category: "Electrónica", price: 1099.99, score: 0.89 },
  { name: "Mouse Inalámbrico Logitech M720", category: "Electrónica", price: 39.99, score: 0.86 },
  { name: "Teclado Mecánico RGB Corsair K70", category: "Electrónica", price: 159.99, score: 0.88 },
  { name: "Monitor LG 27\" 4K UHD", category: "Electrónica", price: 399.99, score: 0.90 },
  { name: "Disco Duro Externo 2TB Seagate", category: "Electrónica", price: 79.99, score: 0.87 },
  { name: "SSD Samsung 1TB NVMe", category: "Electrónica", price: 129.99, score: 0.93 }
];

function searchMockData(query, k = 10) {
  // Si no hay query, devolver todos los productos
  if (!query || query.trim().length === 0) {
    return mockProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }

  const searchTerms = query.toLowerCase().trim().split(' ');

  // Calcular score para todos los productos (sin filtrar)
  const results = mockProducts.map(product => {
    const productText = `${product.name} ${product.category}`.toLowerCase();
    let matchScore = 0;
    let matchCount = 0;

    searchTerms.forEach(term => {
      if (productText.includes(term)) {
        matchCount++;
        // Boost score si el término está en el nombre
        if (product.name.toLowerCase().includes(term)) {
          matchScore += 0.3;
        } else {
          matchScore += 0.1;
        }
      }
    });

    // Calcular score final
    const termMatchRatio = matchCount / searchTerms.length;
    const finalScore = (product.score * 0.5) + (termMatchRatio * 0.3) + (matchScore * 0.2);

    return {
      ...product,
      score: finalScore,
      matched: matchCount > 0
    };
  })
  // NO filtrar, mostrar todos los productos ordenados por score
  .sort((a, b) => b.score - a.score)
  .slice(0, k)
  .map(({ matched, ...rest }) => rest);

  return results;
}

module.exports = { searchMockData, mockProducts };
