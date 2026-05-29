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
    cnpj CHAR(18) NOT NULL UNIQUE,
    cep CHAR(9) NOT NULL,
    codigo_ativacao VARCHAR(10) NOT NULL UNIQUE
    );
    
CREATE TABLE filial(
	id_filial INT AUTO_INCREMENT,
    id_matriz INT,
    
    razao_social VARCHAR(45) NOT NULL,
    cnpj CHAR(18) NOT NULL UNIQUE,
    cep CHAR(9) NOT NULL,
    
    CONSTRAINT const_fk_matriz
		FOREIGN KEY (id_matriz) REFERENCES matriz (id_matriz),
	CONSTRAINT const_pk_filial
		PRIMARY KEY (id_filial, id_matriz)
);

CREATE TABLE cargo(
id_cargo INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45)
);
    
CREATE TABLE usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    cpf CHAR(14) NOT NULL,
    email VARCHAR(45),
    senha VARCHAR(45)
    );
    
CREATE TABLE funcionario(
	id_usuario_filial INT AUTO_INCREMENT,
	id_matriz INT,
    id_filial INT,
    id_usuario INT,
    id_cargo INT,
    
    CONSTRAINT const_fk_filial 
		FOREIGN KEY (id_matriz, id_filial) REFERENCES filial (id_matriz, id_filial),
	CONSTRAINT const_fk_usuario
		FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
	CONSTRAINT const_fk_cargo
		FOREIGN KEY (id_cargo) REFERENCES cargo (id_cargo),
	CONSTRAINT pk_funcionario
		PRIMARY KEY (id_usuario_filial, id_matriz, id_filial, id_usuario)
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

CREATE TABLE vao(
id_vao INT PRIMARY KEY AUTO_INCREMENT,
valor INT,
id_filial INT,
id_matriz INT,
id_sensor INT,
id_setor INT,

CONSTRAINT const_fk_setor
	FOREIGN KEY (id_setor) REFERENCES setor (id_setor),
CONSTRAINT const_fk_filial_2
	FOREIGN KEY (id_matriz, id_filial) REFERENCES filial (id_matriz, id_filial),
CONSTRAINT const_fk_sensor
	FOREIGN KEY (id_sensor) REFERENCES sensor (id_sensor)
);

CREATE TABLE setor(
id_setor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100)
);

INSERT INTO cargo (nome) VALUES
('Admin'),
('Dono'),
('Gerente'),
('Funcionario');






