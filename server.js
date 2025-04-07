const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Verifica que la carpeta "uploads" existe o la crea
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configuración de Multer para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Conserva el nombre original y la extensión
    }
});

const upload = multer({ storage });

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la conversión de archivos M4A a MP3
app.post('/convert', upload.single('file'), (req, res) => {
    const inputFile = req.file.path; // Ruta del archivo subido
    const outputFile = `uploads/${req.file.originalname.split('.')[0]}.mp3`; // Ruta del archivo convertido

    // Validación: Solo aceptar archivos M4A
    if (!req.file.originalname.endsWith('.m4a')) {
        res.status(400).send('Error: Solo se aceptan archivos M4A.');
        return;
    }

    // Conversión con FFmpeg
    ffmpeg(inputFile)
        .toFormat('mp3') // Especifica que el archivo de salida será MP3
        .on('start', (commandLine) => {
            console.log(`Comando ejecutado: ${commandLine}`);
        })
        .on('end', () => {
            console.log('Conversión completada');
            
            // Verifica si el archivo convertido existe antes de enviarlo
            if (!fs.existsSync(outputFile)) {
                res.status(500).send('Error: El archivo convertido no se pudo encontrar.');
                return;
            }

            res.download(outputFile, 'converted.mp3', (err) => {
                if (err) {
                    console.error('Error al descargar el archivo:', err.message);
                    res.status(500).send('Error al descargar el archivo convertido.');
                }
            });
        })
        .on('error', (error) => {
            console.error('Error en FFmpeg:', error.message);
            res.status(500).send(`Error en FFmpeg: ${error.message}`);
        })
        .save(outputFile); // Guarda el archivo convertido en la carpeta uploads
});

// Inicia el servidor en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
