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

    show tables;

    CREATE TABLE matriz(
        id_matriz INT PRIMARY KEY AUTO_INCREMENT,
        razao_social VARCHAR(45) NOT NULL,
        cnpj CHAR(18) NOT NULL UNIQUE,
        cep CHAR(9) NULL
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
        id_filial INT NULL,
        id_usuario INT,
        id_cargo INT,
        
        CONSTRAINT const_fk_filial 
            FOREIGN KEY (id_matriz, id_filial) REFERENCES filial (id_matriz, id_filial),
        CONSTRAINT const_fk_usuario
            FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
        CONSTRAINT const_fk_cargo
            FOREIGN KEY (id_cargo) REFERENCES cargo (id_cargo),
        CONSTRAINT pk_funcionario
            PRIMARY KEY (id_usuario_filial, id_matriz, id_usuario)
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


    CREATE TABLE setor(
    id_setor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)
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

    select * from usuario;

    select * from matriz;
    select * from cadastro;
    INSERT INTO cargo (nome) VALUES
    ('Admin'),
    ('Dono'),
    ('Gerente'),
    ('Funcionario');
    
    -- 1. Tabela CADASTRO (Independente)
INSERT INTO cadastro (nome, cpf, email, cnpj, razao_social) VALUES
('Mateus Galeani', '111.222.333-44', 'mateus@crab.com', '12.345.678/0001-99', 'Crab Tech Matriz'),
('João Silva', '555.666.777-88', 'joao@logistica.com', '98.765.432/0001-11', 'Logistica Silva LTDA');

-- 2. Tabela MATRIZ (Independente)

select * from matriz;

DESCRIBE matriz;
INSERT INTO matriz (razao_social, cnpj, cep) VALUES
('Atacadista Central', '12.345.678/0001-99', '01001-000');

-- 3. Tabela FILIAL (Depende de matriz)
INSERT INTO filial (id_matriz, razao_social, cnpj, cep) VALUES
(1, 'Filial Sul', '12.345.678/0002-00', '04002-000'),
(1, 'Filial Norte', '12.345.678/0003-00', '02002-000');

-- (Nota: O INSERT na tabela 'cargo' já estava no seu script, então pulei essa etapa)

-- 4. Tabela USUARIO (Independente)
INSERT INTO usuario (nome, cpf, email, senha) VALUES
('Matheus Barros', '123.123.123-12', 'mbarros@crab.com', 'senha123'),
('Matheus Dos Santos', '321.321.321-32', 'msantos@crab.com', 'senha321'),
('Rafael Biaggi', '999.888.777-66', 'rbiaggi@crab.com', 'senha789'),
('Lucas Coelho', '444.444.444-44', 'lcoelho@crab.com', 'senha000');

-- 5. Tabela FUNCIONARIO (Depende de matriz, filial, usuario, cargo)
-- Relacionando os usuários acima com as filiais e cargos específicos
INSERT INTO funcionario (id_matriz, id_filial, id_usuario, id_cargo) VALUES
(1, 1, 1, 2), -- Matheus Barros como Dono (2) na Filial Sul
(1, 1, 2, 3), -- Matheus Dos Santos como Gerente (3) na Filial Sul
(1, 2, 3, 4); -- Rafael Biaggi como Funcionario (4) na Filial Norte




