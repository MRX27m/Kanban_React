@echo off
chcp 65001 >nul
echo Зупинка всiх сервiсiв...

taskkill /FI "WINDOWTITLE eq shell*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq auth-mfe*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq workspace-mfe*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq api-gateway*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq auth-service*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq boards-service*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq columns-service*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq tasks-service*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq RabbitMQ*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Redis*" /F >nul 2>&1

taskkill /IM node.exe /F >nul 2>&1
taskkill /IM epmd.exe /F >nul 2>&1
taskkill /IM beam.smp.exe /F >nul 2>&1
taskkill /IM redis-server.exe /F >nul 2>&1

echo Готово!
pause
