document.getElementById('file').addEventListener('change', (event) => {
    const fileInput = event.target;
    const fileNameDisplay = document.getElementById('fileName');
    const convertBtn = document.getElementById('convertBtn');

    // Muestra el nombre del archivo subido
    if (fileInput.files[0]) {
        fileNameDisplay.textContent = `Archivo: ${fileInput.files[0].name}`;
        fileNameDisplay.style.color = '#ffffff';
        convertBtn.hidden = false; // Hace visible el botón de "Convertir"
    } else {
        fileNameDisplay.textContent = 'No se ha seleccionado ningún archivo';
        convertBtn.hidden = true; // Oculta el botón de "Convertir"
    }
});

document.getElementById('uploadForm').addEventListener('submit', (event) => {
    const statusMessage = document.getElementById('status');
    statusMessage.textContent = 'Procesando la conversión...';
    statusMessage.style.color = '#00bcd4';
});
