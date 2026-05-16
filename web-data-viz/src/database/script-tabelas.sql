CREATE DATABASE crab;

USE crab;

CREATE TABLE cadastro (
	id_cadastro INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cpf CHAR(14) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cnpj CHAR(18) NOT NULL,
    razao_social VARCHAR(45) NOT NULL
);

CREATE TABLE matriz(
	id_matriz INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    cep CHAR(8) NOT NULL,
    codigo_ativacao VARCHAR(100) NOT NULL UNIQUE
    );
    
CREATE TABLE filial(
	id_filial INT AUTO_INCREMENT,
    id_matriz INT,
    razao_social VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    cep CHAR(8) NOT NULL,
    
    CONSTRAINT const_fk_matriz
		FOREIGN KEY (id_matriz) REFERENCES matriz (id_matriz),
	CONSTRAINT const_pk_filial
		PRIMARY KEY (id_filial, id_matriz)
);
    
CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    cpf CHAR(11) NOT NULL,
    email VARCHAR(45),
    senha VARCHAR(45),
    
    id_cargo INT,
    CONSTRAINT const_id_cargo
		FOREIGN KEY (id_cargo) REFERENCES cargo (id_cargo),
    id_filial INT,
    CONSTRAINT const_fk_filial
		FOREIGN KEY (id_filial) REFERENCES filial (id_filial, id_matriz)
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

CREATE TABLE cargo(
id_cargo INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45)
);