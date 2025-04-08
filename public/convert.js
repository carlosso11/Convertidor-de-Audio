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
    event.preventDefault(); // Prevenir que se recargue la página

    const statusMessage = document.getElementById('status');
    const fileInput = document.getElementById('file');
    const convertBtn = document.getElementById('convertBtn');
    const formData = new FormData(event.target);

    // Deshabilitar la selección de archivo y el botón "Convertir"
    statusMessage.textContent = 'Procesando la conversión...';
    statusMessage.style.color = '#00bcd4';
    fileInput.disabled = true;
    convertBtn.disabled = true;
    const message = document.getElementById("message")
    if(message){
        message.remove()
    }
    // Ocultar el botón de descarga mientras se realiza la conversión
    const downloadBtn = document.getElementById('d-btn');
    if (downloadBtn) {
        downloadBtn.hidden = true; // Ocultar el botón de descarga si existe
    }

    // Realizar la solicitud de conversión
    fetch('/convert', {
        method: 'POST',
        body: formData
    })
    .then(async (response) => {
        if (!response.ok) {
            throw new Error('Error en el proceso de conversión');
        }

        const blob = await response.blob(); // Archivo convertido
        const url = window.URL.createObjectURL(blob);
        const originalFileName = document.getElementById('file').files[0].name; // Obtener el nombre original
        const newFileName = originalFileName.replace(/\.[^/.]+$/, '.mp3'); // Cambiar extensión a .mp3

        // Actualizar el estado y mostrar el botón de descarga
        statusMessage.textContent = 'Conversión completada';
        statusMessage.style.color = '#4caf50';
        const fileConvertedMessage = document.createElement('p');
        fileConvertedMessage.id = "message";
        fileConvertedMessage.textContent = `Archivo convertido: ${newFileName}`;
        fileConvertedMessage.className = 'file-converted';
        document.getElementById('uploadForm').appendChild(fileConvertedMessage); // Mostrar el nombre del archivo convertido

        const existingBtn = document.getElementById("d-btn");
        if (existingBtn) {
            existingBtn.remove(); // Eliminar botón de descarga previo si existe
        }

        const newDownloadBtn = document.createElement('button');
        newDownloadBtn.textContent = 'Descargar';
        newDownloadBtn.id = 'd-btn';
        newDownloadBtn.className = 'download-btn';
        newDownloadBtn.type = "button"
        newDownloadBtn.hidden = false; // Mostrar el botón de descarga
        document.getElementById('uploadForm').appendChild(newDownloadBtn); // Añadir el botón de descarga

        // Manejo de la descarga
        newDownloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = url;
            link.download = newFileName;
            link.click();
        });

        // Restaurar el estado del campo de archivo y el botón "Convertir"
        fileInput.disabled = false;
        convertBtn.disabled = false;
    })
    .catch((error) => {
        statusMessage.textContent = 'Error durante la conversión';
        statusMessage.style.color = '#f44336';
        fileInput.disabled = false; // Restaurar el campo de archivo si hay error
        convertBtn.disabled = false; // Restaurar el botón si hay error
        console.error(error);
    });
});
