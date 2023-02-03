Dentro de la carpeta NginxNode/public donde esta el server.js ejecutar estos dos comandos:

VERIFICAR CUAL VA EN TU COMPU

pm2 start server.js --name="Server 1 8081" -i max -- 8081

pm2 start server.js --name="Server2" --watch -i max -- -- 8082
pm2 start server.js --name="Server2" --watch -i max -- 8082

pm2 start server.js --name="Server1" --watch -- -- 8081
pm2 start server.js --name="Server1" --watch -- 8081

Dentro de la carpeta base de todo el proyecto donde esta nginx.exe ejecutar este comando:
nginx usando cmd
./nginx.exe usando powershell

Si hay un error con la carpeta temp o logs aca esta la solucion
https://stackoverflow.com/questions/35563834/nginx-fails-to-create-directories-on-windows-10-with-error-nginx-createfile
