	CREATE DATABASE IF NOT EXISTS crab;
    
    USE crab;

    CREATE TABLE IF NOT EXISTS cadastro (
        id_cadastro INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45) NOT NULL,
        cpf CHAR(14) NOT NULL,
        email VARCHAR(100) NOT NULL,
        cnpj CHAR(18) NOT NULL,
        razao_social VARCHAR(45) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS matriz(
        id_matriz INT PRIMARY KEY AUTO_INCREMENT,
        razao_social VARCHAR(45) NOT NULL,
        cnpj CHAR(18) NOT NULL UNIQUE,
        cep CHAR(9) NULL
        );
        
    CREATE TABLE IF NOT EXISTS filial(
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

    CREATE TABLE IF NOT EXISTS cargo(
    id_cargo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
    );
        
    CREATE TABLE IF NOT EXISTS usuario(
        id_usuario INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(40) NOT NULL,
        cpf CHAR(14) NOT NULL,
        email VARCHAR(45),
        senha VARCHAR(45)
        );
        
    CREATE TABLE IF NOT EXISTS funcionario(
        id_funcionario INT AUTO_INCREMENT,
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
            PRIMARY KEY (id_funcionario, id_matriz, id_usuario)
    );
    
    CREATE TABLE IF NOT EXISTS setor(
    id_setor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)
    );


    CREATE TABLE IF NOT EXISTS vao(
    id_vao INT PRIMARY KEY AUTO_INCREMENT,
    numero INT,
    id_filial INT,
    id_matriz INT,
    id_setor INT,

    CONSTRAINT const_fk_setor
        FOREIGN KEY (id_setor) REFERENCES setor (id_setor),
    CONSTRAINT const_fk_filial_2
        FOREIGN KEY (id_matriz, id_filial) REFERENCES filial (id_matriz, id_filial)
    );
    
	CREATE TABLE IF NOT EXISTS sensor(
	id_sensor INT PRIMARY KEY AUTO_INCREMENT,
	dt_instalacao DATE,
	statuss VARCHAR(10),
	id_vao INT,
        
	CONSTRAINT const_fk_vao
		FOREIGN KEY (id_vao) REFERENCES vao (id_vao),
	CONSTRAINT ch_statuss
		CHECK (statuss IN ('Ativo','Inativo','Manutenção'))
	);
        
	CREATE TABLE IF NOT EXISTS coleta(
        id_coleta INT AUTO_INCREMENT,
        id_sensor INT,
        dt_coleta DATETIME DEFAULT CURRENT_TIMESTAMP,
        abastecido BOOLEAN,
        
        CONSTRAINT id_sensor_const
            FOREIGN KEY (id_sensor) REFERENCES sensor (id_sensor),
        PRIMARY KEY (id_coleta, id_sensor)
    );
    
INSERT INTO cargo (nome) VALUES
('Admin'),
('Dono'),
('Gerente'),
('Funcionario');

-- ====================================================================
-- 1. TABELAS INDEPENDENTES (Cadastro, Matriz, Setor, Usuario)
-- ====================================================================

INSERT INTO cadastro (nome, cpf, email, cnpj, razao_social) VALUES
('Mateus Galeani', '111.222.333-44', 'mateus@crabtech.com', '12.345.678/0001-99', 'Crab Tech Soluções'),
('João Silva', '555.666.777-88', 'joao@atacadista.com', '98.765.432/0001-11', 'Silva Atacadista LTDA');

INSERT INTO matriz (razao_social, cnpj, cep) VALUES
('Silva Atacadista Central', '98.765.432/0001-11', '01001-000');

INSERT INTO setor (nome) VALUES
('Carga Seca'),    -- ID 1
('Refrigerados'),  -- ID 2
('Expedição');     -- ID 3

INSERT INTO usuario (nome, cpf, email, senha) VALUES
('Matheus Barros', '123.123.123-12', 'mbarros@atacadista.com', 'senha123'),
('Matheus Dos Santos', '321.321.321-32', 'msantos@atacadista.com', 'senha321'),
('Rafael Biaggi', '999.888.777-66', 'rbiaggi@atacadista.com', 'senha789'),
('Lucas Coelho', '444.444.444-44', 'lcoelho@atacadista.com', 'senha000');


-- ====================================================================
-- 2. TABELAS DE HIERARQUIA CORPORATIVA (Filial, Funcionario)
-- ====================================================================

-- Inserindo as 2 Filiais (dependentes da matriz ID 1)
INSERT INTO filial (id_matriz, razao_social, cnpj, cep) VALUES
(1, 'Silva Atacadista - Filial Sul', '98.765.432/0002-22', '04002-000'),
(1, 'Silva Atacadista - Filial Norte', '98.765.432/0003-33', '02002-000');

-- O cargo já foi inserido no seu script (Admin=1, Dono=2, Gerente=3, Funcionario=4)
-- Associando os usuários às filiais
INSERT INTO funcionario (id_matriz, id_filial, id_usuario, id_cargo) VALUES
(1, 1, 1, 2), -- Matheus Barros (Dono) na Filial Sul
(1, 1, 2, 3), -- Matheus Dos Santos (Gerente) na Filial Sul
(1, 2, 3, 4), -- Rafael Biaggi (Funcionário) na Filial Norte
(1, 2, 4, 1); -- Lucas Coelho (Admin) na Filial Norte


-- ====================================================================
-- 3. MAPEAMENTO FÍSICO DO ARMAZÉM (Tabela Vao)
-- ====================================================================
-- Criando 50 posições físicas primeiro. A coluna 'numero' recebe a numeração do vão.

INSERT INTO vao (numero, id_matriz, id_filial, id_setor) VALUES
-- FILIAL 1 (Sul) - Vãos 1 ao 25
(1, 1, 1, 1), (2, 1, 1, 1), (3, 1, 1, 1), (4, 1, 1, 1), (5, 1, 1, 1), (6, 1, 1, 1), (7, 1, 1, 1), (8, 1, 1, 1), (9, 1, 1, 1), (10, 1, 1, 1), -- Setor 1
(11, 1, 1, 2), (12, 1, 1, 2), (13, 1, 1, 2), (14, 1, 1, 2), (15, 1, 1, 2), (16, 1, 1, 2), (17, 1, 1, 2), (18, 1, 1, 2), (19, 1, 1, 2), (20, 1, 1, 2), -- Setor 2
(21, 1, 1, 3), (22, 1, 1, 3), (23, 1, 1, 3), (24, 1, 1, 3), (25, 1, 1, 3), -- Setor 3

-- FILIAL 2 (Norte) - Vãos 26 ao 50
(26, 1, 2, 1), (27, 1, 2, 1), (28, 1, 2, 1), (29, 1, 2, 1), (30, 1, 2, 1), (31, 1, 2, 1), (32, 1, 2, 1), (33, 1, 2, 1), (34, 1, 2, 1), (35, 1, 2, 1), -- Setor 1
(36, 1, 2, 2), (37, 1, 2, 2), (38, 1, 2, 2), (39, 1, 2, 2), (40, 1, 2, 2), (41, 1, 2, 2), (42, 1, 2, 2), (43, 1, 2, 2), (44, 1, 2, 2), (45, 1, 2, 2), -- Setor 2
(46, 1, 2, 3), (47, 1, 2, 3), (48, 1, 2, 3), (49, 1, 2, 3), (50, 1, 2, 3); -- Setor 3


-- ====================================================================
-- 4. HARDWARE E LEITURAS (Tabela Sensor e Coleta)
-- ====================================================================
-- Agora os Sensores são atrelados aos Vãos já existentes (id_vao)

INSERT INTO sensor (dt_instalacao, statuss, id_vao) VALUES
-- Sensores da Filial Sul (Vãos 1 ao 25)
('2026-06-01', 'Ativo', 1), ('2026-06-01', 'Ativo', 2), ('2026-06-01', 'Ativo', 3), ('2026-06-01', 'Ativo', 4), ('2026-06-01', 'Ativo', 5),
('2026-06-01', 'Ativo', 6), ('2026-06-01', 'Ativo', 7), ('2026-06-01', 'Ativo', 8), ('2026-06-01', 'Ativo', 9), ('2026-06-01', 'Ativo', 10),
('2026-06-01', 'Ativo', 11), ('2026-06-01', 'Ativo', 12), ('2026-06-01', 'Ativo', 13), ('2026-06-01', 'Ativo', 14), ('2026-06-01', 'Ativo', 15),
('2026-06-01', 'Ativo', 16), ('2026-06-01', 'Ativo', 17), ('2026-06-01', 'Ativo', 18), ('2026-06-01', 'Ativo', 19), ('2026-06-01', 'Ativo', 20),
('2026-06-01', 'Ativo', 21), ('2026-06-01', 'Ativo', 22), ('2026-06-01', 'Manutenção', 23), ('2026-06-01', 'Ativo', 24), ('2026-06-01', 'Ativo', 25),

-- Sensores da Filial Norte (Vãos 26 ao 50)
('2026-06-02', 'Ativo', 26), ('2026-06-02', 'Ativo', 27), ('2026-06-02', 'Ativo', 28), ('2026-06-02', 'Ativo', 29), ('2026-06-02', 'Ativo', 30),
('2026-06-02', 'Ativo', 31), ('2026-06-02', 'Ativo', 32), ('2026-06-02', 'Ativo', 33), ('2026-06-02', 'Ativo', 34), ('2026-06-02', 'Ativo', 35),
('2026-06-02', 'Ativo', 36), ('2026-06-02', 'Ativo', 37), ('2026-06-02', 'Inativo', 38), ('2026-06-02', 'Ativo', 39), ('2026-06-02', 'Ativo', 40),
('2026-06-02', 'Ativo', 41), ('2026-06-02', 'Ativo', 42), ('2026-06-02', 'Ativo', 43), ('2026-06-02', 'Ativo', 44), ('2026-06-02', 'Ativo', 45),
('2026-06-02', 'Ativo', 46), ('2026-06-02', 'Manutenção', 47), ('2026-06-02', 'Ativo', 48), ('2026-06-02', 'Ativo', 49), ('2026-06-02', 'Inativo', 50);

-- Inserindo as Leituras (Coletas)
INSERT INTO coleta (id_sensor, abastecido) VALUES
-- Leituras da Filial Sul
(1, 1), (2, 1), (3, 0), (4, 1), (5, 0), (6, 1), (7, 0), (8, 1), (9, 1), (10, 0),
(11, 1), (12, 1), (13, 1), (14, 1), (15, 0), (16, 1), (17, 1), (18, 0), (19, 1), (20, 1),
(21, 0), (22, 1), (23, 0), (24, 0), (25, 1),
-- Leituras da Filial Norte
(26, 1), (27, 0), (28, 1), (29, 1), (30, 0), (31, 1), (32, 1), (33, 0), (34, 1), (35, 1),
(36, 1), (37, 1), (38, 1), (39, 0), (40, 1), (41, 1), (42, 1), (43, 1), (44, 0), (45, 1),
(46, 0), (47, 0), (48, 1), (49, 0), (50, 0);

CREATE VIEW vw_tx_abastecimento AS
SELECT 
    f.razao_social AS Filial,
    COUNT(v.id_vao) AS Qtd_vao,
    IFNULL(SUM(c.abastecido), 0) AS Qtd_vao_abastecido
FROM filial f
LEFT JOIN vao v ON f.id_filial = v.id_filial AND f.id_matriz = v.id_matriz
LEFT JOIN sensor s ON v.id_vao = s.id_vao
LEFT JOIN coleta c ON s.id_sensor = c.id_sensor
GROUP BY f.razao_social;
SELECT * FROM vw_tx_abastecimento;

SELECT * FROM vw_tx_abastecimento;

INSERT INTO coleta (id_sensor, dt_coleta, abastecido) VALUES
-- DIA 1 (Manhã) - Vão Livre
(1, '2026-06-10 08:00:00', 0),
(1, '2026-06-10 09:00:00', 0),
(1, '2026-06-10 10:00:00', 0),
(1, '2026-06-10 11:00:00', 0),

-- DIA 1 (Tarde) - Carga chega e ocupa o vão
(1, '2026-06-10 12:00:00', 1),
(1, '2026-06-10 13:00:00', 1),
(1, '2026-06-10 14:00:00', 1),
(1, '2026-06-10 15:00:00', 1),
(1, '2026-06-10 16:00:00', 1),
(1, '2026-06-10 17:00:00', 1),
(1, '2026-06-10 18:00:00', 1),

-- DIA 1 (Noite) - Vão é esvaziado para expedição
(1, '2026-06-10 19:00:00', 0),
(1, '2026-06-10 20:00:00', 0),
(1, '2026-06-10 21:00:00', 0),
(1, '2026-06-10 22:00:00', 0),

-- DIA 1 para DIA 2 (Madrugada) - Vão recebe carga de pernoite
(1, '2026-06-10 23:00:00', 1),
(1, '2026-06-11 00:00:00', 1),
(1, '2026-06-11 01:00:00', 1),
(1, '2026-06-11 02:00:00', 1),
(1, '2026-06-11 03:00:00', 1),
(1, '2026-06-11 04:00:00', 1),
(1, '2026-06-11 05:00:00', 1),
(1, '2026-06-11 06:00:00', 1),
(1, '2026-06-11 07:00:00', 1),

-- DIA 2 (Manhã e Tarde) - Carga expedida, vão fica livre o resto do turno
(1, '2026-06-11 08:00:00', 0),
(1, '2026-06-11 09:00:00', 0),
(1, '2026-06-11 10:00:00', 0),
(1, '2026-06-11 11:00:00', 0),
(1, '2026-06-11 12:00:00', 0),
(1, '2026-06-11 13:00:00', 0);
