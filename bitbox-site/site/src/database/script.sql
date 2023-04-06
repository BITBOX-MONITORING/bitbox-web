CREATE DATABASE boxMonitoramento;
USE boxMonitoramento;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    email VARCHAR(100),
    senha VARCHAR(100),
    cargo VARCHAR(50)
)