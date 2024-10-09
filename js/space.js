document.getElementById('btnBuscar').addEventListener('click', async () => {
    const query = document.getElementById('inputBuscar').value;
    const url = `https://images-api.nasa.gov/search?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();

    // Limpiar el contenedor antes de agregar nuevas tarjetas
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';

    // Usar Rest para desestructurar elementos
    const { items } = data.collection; // Aquí se está usando desestructuración simple para obtener items.

    items.forEach(({ data: [imageData], links }) => { // Aquí se usa Rest
        // Desestructuramos imageData usando Rest
        const { title, description, date_created } = imageData; // Desestructuramos las propiedades de imageData
        const imageUrl = links?.[0]?.href || 'https://via.placeholder.com/150';

        // Crear la tarjeta
        const card = document.createElement('div');
        card.className = 'col-12 col-sm-6 col-md-4'; // Clases de Bootstrap para columnas

        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${imageUrl}" class="card-img-top" alt="${title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text" style="max-height: 100px; overflow-y: auto;">${description || 'No hay descripción disponible.'}</p>
                    <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
                    <a href="${imageUrl}" target="_blank" class="btn btn-primary">Ver imagen</a>
                </div>
            </div>
        `;

        // Agregar la tarjeta al contenedor
        contenedor.appendChild(card);
    });
});
