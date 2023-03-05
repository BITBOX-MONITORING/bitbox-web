create database boxMonitoramento;
use boxMonitoramento;

create table usuario (
	idUsuario int primary key auto_increment,
    nome varchar(255),
    email varchar(255),
    senha varchar(16),
    cargo varchar(255)
);

create table Computador (
	idComputador int primary key auto_increment,
    qtdeMemoria varchar (255)
);

create table Ram (
	idRam int primary key auto_increment,
	utilizacao varchar (255),
    temperatura varchar (65)
);

create table Rede (
	idRede int primary key auto_increment,
    utilizacao varchar (65),
    status varchar(45)
);

create table Disco (
	idDisco int primary key auto_increment,
    utilizacao varchar(65)
);