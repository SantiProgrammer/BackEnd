## Desafio 16 Gzip y Loggers:

1. Se incorporo gzip a toda la app.
2. Se agrego ruta /info.
3. Se agrego el logger wingstop y se remplazaron todos los console.log.

4. artillery quick --count 50 -n 20 http://localhost:8080/info > result_c.log1.txt

5. resultados en result_c.log.txt y result_sinC.log.txt.

6. node --prof src/server.js

7. node --inspect src/server.js => chrome://inspect

8. 0x src/server.js
