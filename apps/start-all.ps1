# Kanban launcher - works WITHOUT admin (RabbitMQ runs directly, not as a service)
$base = $PSScriptRoot
$back = Join-Path $base "backend"
$front = Join-Path $base "frontend"
$env:ERLANG_HOME = "C:\Erlang27"
$env:PATH = "C:\Erlang27\bin;" + $env:PATH
$env:RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS = $null

function Launch($file) {
    Start-Process powershell -ArgumentList @("-NoExit", "-ExecutionPolicy", "Bypass", "-File", $file)
}

function Test-Port($port) {
    return [bool](Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue)
}

Write-Host "=================================================="
Write-Host " Kanban - Microservices + Micro-Frontends"
Write-Host "=================================================="

Write-Host "Stopping old app processes..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# 1. Redis (skip if already running)
if (Test-Port 6379) {
    Write-Host "[1/9] Redis already running - skip"
} else {
    Write-Host "[1/9] Redis..."
    Start-Process "C:\Redis\redis-server.exe" -ArgumentList @("--port", "6379")
    Start-Sleep -Seconds 2
}

# 2. RabbitMQ (skip if already running)
if (Test-Port 5672) {
    Write-Host "[2/9] RabbitMQ already running - skip"
} else {
    Write-Host "[2/9] RabbitMQ..."
    $rmqBat = Join-Path $env:TEMP "start-rmq.bat"
    "@echo off`r`nset ERLANG_HOME=C:\Erlang27`r`nset PATH=C:\Erlang27\bin;%PATH%`r`ncall ""C:\Program Files\RabbitMQ Server\rabbitmq_server-3.13.7\sbin\rabbitmq-server.bat""" | Set-Content $rmqBat -Encoding ASCII
    Start-Process cmd -ArgumentList @("/k", $rmqBat)
    Write-Host "    Waiting 15 sec for RabbitMQ..."
    Start-Sleep -Seconds 15
}

Write-Host "[3/9] auth-service..."
Launch (Join-Path $back "auth-service\run.ps1")
Start-Sleep -Seconds 3

Write-Host "[4/9] boards-service..."
Launch (Join-Path $back "boards-service\run.ps1")
Start-Sleep -Seconds 3

Write-Host "[5/9] columns-service..."
Launch (Join-Path $back "columns-service\run.ps1")
Start-Sleep -Seconds 3

Write-Host "[6/9] tasks-service..."
Launch (Join-Path $back "tasks-service\run.ps1")
Start-Sleep -Seconds 5

Write-Host "[7/9] API Gateway..."
Launch (Join-Path $back "api-gateway\run.ps1")
Start-Sleep -Seconds 4

Write-Host "[8/9] Building MFE remotes..."
Launch (Join-Path $front "auth-mfe\run.ps1")
Launch (Join-Path $front "workspace-mfe\run.ps1")
Write-Host "    Waiting 30 sec for MFE builds..."
Start-Sleep -Seconds 30

Write-Host "[9/9] Shell..."
Launch (Join-Path $front "shell\run.ps1")
Start-Sleep -Seconds 8

Start-Process "http://localhost:3001"
Write-Host ""
Write-Host "Done! -> http://localhost:3001"