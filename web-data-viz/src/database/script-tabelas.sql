
CREATE DATABASE IF NOT EXISTS crab;
USE crab;



CREATE TABLE cadastro (
    id_cadastro INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cpf CHAR(14) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cnpj CHAR(18) NOT NULL,
    razao_social VARCHAR(45) NOT NULL
);

CREATE TABLE matriz (
    id_matriz INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(45) NOT NULL,
    cnpj CHAR(18) NOT NULL UNIQUE,
    cep CHAR(9) NULL
);

CREATE TABLE cargo (
    id_cargo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    cpf CHAR(14) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL
);


CREATE TABLE setor (
    id_setor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    vao_inicial INT NOT NULL,
    vao_final INT NOT NULL
);


CREATE TABLE filial (
    id_filial INT AUTO_INCREMENT,
    id_matriz INT NOT NULL,
    razao_social VARCHAR(45) NOT NULL,
    cnpj CHAR(18) NOT NULL UNIQUE,
    cep CHAR(9) NOT NULL,
    CONSTRAINT const_fk_matriz FOREIGN KEY (id_matriz) REFERENCES matriz (id_matriz),
    CONSTRAINT const_pk_filial PRIMARY KEY (id_filial, id_matriz)
);

CREATE TABLE funcionario (
    id_usuario_filial INT AUTO_INCREMENT,
    id_matriz INT NOT NULL,
    id_filial INT NOT NULL,
    id_usuario INT NOT NULL,
    id_cargo INT NOT NULL,
    CONSTRAINT const_fk_filial FOREIGN KEY (id_matriz, id_filial) REFERENCES filial (id_matriz, id_filial),
    CONSTRAINT const_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    CONSTRAINT const_fk_cargo FOREIGN KEY (id_cargo) REFERENCES cargo (id_cargo),
    CONSTRAINT pk_funcionario PRIMARY KEY (id_usuario_filial, id_matriz, id_usuario)
);

CREATE TABLE vao (
    id_vao INT PRIMARY KEY AUTO_INCREMENT,
    numero INT NOT NULL,
    id_filial INT NOT NULL,
    id_matriz INT NOT NULL,
    id_setor INT NOT NULL,
    CONSTRAINT const_fk_setor FOREIGN KEY (id_setor) REFERENCES setor (id_setor),
    CONSTRAINT const_fk_filial_2 FOREIGN KEY (id_matriz, id_filial) REFERENCES filial (id_matriz, id_filial)
);

CREATE TABLE sensor (
    id_sensor INT PRIMARY KEY AUTO_INCREMENT,
    dt_instalacao DATE NOT NULL,
    statuss VARCHAR(10) NOT NULL,
    id_vao INT NOT NULL,
    CONSTRAINT const_fk_vao FOREIGN KEY (id_vao) REFERENCES vao (id_vao),
    CONSTRAINT ch_statuss CHECK (statuss IN ('Ativo','Inativo','Manutenção'))
);

CREATE TABLE coleta (
    id_coleta INT AUTO_INCREMENT,
    id_sensor INT NOT NULL,
    dt_coleta DATETIME DEFAULT CURRENT_TIMESTAMP,
    abastecido BOOLEAN NOT NULL,
    CONSTRAINT id_sensor_const FOREIGN KEY (id_sensor) REFERENCES sensor (id_sensor),
    PRIMARY KEY (id_coleta, id_sensor)
);





INSERT INTO matriz (razao_social, cnpj, cep) VALUES
('Silva Atacadista Central', '98.765.432/0001-11', '01001-000');


INSERT INTO filial (id_matriz, razao_social, cnpj, cep) VALUES
(1, 'Silva Atacadista - Filial Sul', '98.765.432/0002-22', '04002-000'),
(1, 'Silva Atacadista - Filial Norte', '98.765.432/0003-33', '02002-000');


INSERT INTO setor (nome, vao_inicial, vao_final) VALUES
('Carga Seca', 1, 10),    -- ID 1
('Refrigerados', 11, 20), -- ID 2
('Expedição', 21, 25);    -- ID 3





