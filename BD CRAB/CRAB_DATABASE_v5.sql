CREATE DATABASE crab;

USE crab;

CREATE TABLE empresa(
	id_empresa INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    cep CHAR(8) NOT NULL,
    codigo_ativacao VARCHAR(100) NOT NULL UNIQUE
    );

CREATE TABLE cadastro (
	id_cadastro INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cpf CHAR(11) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    razao_social VARCHAR(45) NOT NULL,
    cep CHAR(8) NOT NULL
);
    
CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    cpf CHAR(11) NOT NULL,
    email VARCHAR(45),
    senha VARCHAR(45),
    tipo VARCHAR(45),
	CONSTRAINT CHECK (tipo IN ('root', 'adm-user', 'default-user')),
    id_empresa INT,
    CONSTRAINT const_id_empresa
		FOREIGN KEY (id_empresa) REFERENCES empresa (id_empresa)
    );
    
CREATE TABLE sensor(
	id_sensor INT PRIMARY KEY AUTO_INCREMENT,
    dt_instalacao DATE,
	statuss VARCHAR(10),
    CONSTRAINT ch_statuss
		CHECK (statuss IN ('Ativo','Inativo','Manutenção'))
    );
    

CREATE TABLE coleta(
	id_coleta INT AUTO_INCREMENT,
    id_sensor INT,
    dt_coleta DATETIME DEFAULT CURRENT_TIMESTAMP,
    abastecido BOOLEAN,
    CONSTRAINT id_sensor_const
		FOREIGN KEY (id_sensor) REFERENCES sensor (id_sensor),
	PRIMARY KEY (id_coleta, id_sensor)
    );

CREATE TABLE enderecamento(
id_enderecamento INT PRIMARY KEY AUTO_INCREMENT,
codigo VARCHAR(30),
id_empresa INT,
CONSTRAINT const_id_empresa_2
	FOREIGN KEY (id_empresa) REFERENCES empresa (id_empresa),
id_sensor INT,
CONSTRAINT const_id_sensor_2
	FOREIGN KEY (id_sensor) REFERENCES sensor (id_sensor)
);