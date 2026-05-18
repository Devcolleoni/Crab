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
    senha VARCHAR(45),
    id_cargo INT,
    id_filial INT,
    id_matriz INT,
    
    CONSTRAINT const_fk_cargo
		FOREIGN KEY (id_cargo) REFERENCES cargo (id_cargo),
    CONSTRAINT const_fk_filial
		FOREIGN KEY (id_filial, id_matriz) REFERENCES filial (id_filial, id_matriz)
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
id_filial INT,
CONSTRAINT const_fk_filial_2
	FOREIGN KEY (id_filial) REFERENCES filial (id_filial),
id_sensor INT,
CONSTRAINT const_fk_sensor_2
	FOREIGN KEY (id_sensor) REFERENCES sensor (id_sensor)
);

INSERT INTO cargo (nome) VALUES
('Admin'),
('Dono'),
('Gerente'),
('Funcionario');

INSERT INTO matriz (razao_social, cnpj, cep, codigo_ativacao) VALUES 
('Crab', '12.345.678/0001-95', '01414-905', 'C27D09');

INSERT INTO filial (id_matriz, razao_social, cnpj, cep) VALUES 
(1, 'Crab', '12.345.678/0001-95', '01414-905');

INSERT INTO usuario (nome, cpf, email, senha, id_cargo, id_filial, id_matriz) VALUES 
('CrabAdmin', '426.855.202-09', 'crabadmin@sptech.school', 'CrabAdmin@123', 1, 1, 1);
        

