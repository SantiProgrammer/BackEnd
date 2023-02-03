## Desafio 15 Servidor con balance de carga y proxy nginx.

1. Ejecuta terminal en la carpeta "Desafio15ServidorConBalanceDeCarga"

Ejecuta => Modo x/cpus cluster:
pm2 start src/server.js --name="Server1 Cluster 8081" --watch -i max -- 8081

Ejecuta => Modo fork:
pm2 start src/server.js --name="Server2 Fork 8082" --watch -- 8082
pm2 start src/server.js --name="Server3 Fork 8083" --watch -- 8083
pm2 start src/server.js --name="Server4 Fork 8084" --watch -- 8084
pm2 start src/server.js --name="Server5 Fork 8085" --watch -- 8085

3. pm2 list (muestra como el estado de los servers).

4. Correr en powershell en la ruta "Desafio15ServidorConBalanceDeCarga/src" /nginx.exe

http://localhost:80/
http://localhost:80/nginx
http://localhost:80/api/randoms

Probar las rutas localhost:8081,[8082,8083,8084 y 8085]

http://localhost:8081
http://localhost:8082
http://localhost:8083
http://localhost:8084
http://localhost:8085

4. pm2 kill all (para cerrar todo)

5. Listo !
