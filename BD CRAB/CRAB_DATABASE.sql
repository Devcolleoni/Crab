CREATE DATABASE crab;

USE crab;

CREATE TABLE empresa(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE,
    cep CHAR(8));
    
CREATE TABLE funcionario(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    cpf CHAR(11) NOT NULL,
    cargo VARCHAR(40));
    
CREATE TABLE sensor(
	id INT PRIMARY KEY AUTO_INCREMENT,
    dtInstalacao DATE,
	status VARCHAR(10),
    CONSTRAINT chStatus
	CHECK (status IN ('ativo','inativo','manutencao'))
    );
    

CREATE TABLE coleta(
	idColeta INT PRIMARY KEY AUTO_INCREMENT,
    dtColeta DATETIME NOT NULL,
    abastecido BOOLEAN NOT NULL
    );

CREATE TABLE localizacao(
IdLocalizacao INT PRIMARY KEY AUTO_INCREMENT,
deposito VARCHAR(10),
bloco VARCHAR(10),
corredor VARCHAR(10),
lado VARCHAR(10),
gondola VARCHAR(10),
nivel VARCHAR(10),
posição VARCHAR(10)
);