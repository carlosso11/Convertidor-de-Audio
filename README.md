Conversor de Audio M4A a MP3
Requisitos previos
Node.js: Asegúrate de tener Node.js instalado en tu sistema.

FFmpeg: Debe estar instalado y configurado como una variable de entorno en el sistema operativo.

Iniciar el servidor
Para arrancar el servidor, ejecuta el siguiente comando en la terminal desde el directorio del proyecto:

node server.js

Esto iniciará la conexión en el host local, accesible desde http://localhost:3000.

Funcionalidades
Actualmente, este conversor permite transformar archivos en formato .M4A a .MP3. El flujo de uso es el siguiente:

Carga el archivo a través de la interfaz web.

Haz clic en el botón "Convertir".

Una vez completada la conversión, se habilitará un botón para descargar el archivo convertido.

Notas adicionales
La aplicación solo soporta el formato .M4A como entrada en esta versión.

Asegúrate de que no haya conflictos con otros servicios en el puerto 3000 antes de iniciar el servidor.
