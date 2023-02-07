## Desafio 16 Gzip y Loggers:

1. Se incorporo gzip a toda la app.
2. Se agrego ruta /info.
3. Se agrego el logger wingstop y se remplazaron todos los console.log.

4. artillery quick --count 50 -n 20 http://localhost:8080/info > result_c.log.txt
5. resultados en result_c.log.txt y result_sinC.log.txt.

5.5 curl -X GET "http://localhost:8080/newUser?username=marian&password=qwerty123"

5.5 node --prof server.js

6. 0x server.js
