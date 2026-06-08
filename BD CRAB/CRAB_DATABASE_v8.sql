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

CREATE VIEW vw_tx_abastecimento AS
SELECT 
    f.id_matriz,
    f.id_filial,
    f.razao_social AS Filial,
    COUNT(v.id_vao) AS Qtd_vao,
    IFNULL(SUM(c.abastecido), 0) AS Qtd_vao_abastecido
FROM filial f
LEFT JOIN vao v ON f.id_filial = v.id_filial AND f.id_matriz = v.id_matriz
LEFT JOIN sensor s ON v.id_vao = s.id_vao
LEFT JOIN coleta c ON s.id_sensor = c.id_sensor
GROUP BY 
    f.id_matriz,
    f.id_filial, 
    f.razao_social;

CREATE VIEW vw_ociosidade AS
SELECT 
    (SELECT COUNT(DISTINCT id_sensor) FROM coleta) AS total_sensores,
    dc.id_sensor,
    dc.abastecido,
    dc.hora,
    dc.dia_coleta,
    s.id_vao,
    v.numero AS numero_vao,
    st.id_setor,
    st.nome AS nome_setor
FROM (
    SELECT 
        id_sensor,
        abastecido,
        dt_coleta,
        DATE_FORMAT(dt_coleta, '%H') AS hora,
        DATE_FORMAT(dt_coleta, '%d') AS dia_coleta
    FROM coleta  
) AS dc
JOIN sensor s ON dc.id_sensor = s.id_sensor
JOIN vao v ON s.id_vao = v.id_vao
JOIN setor st ON v.id_setor = st.id_setor
ORDER BY dc.id_sensor ASC, dc.dt_coleta DESC;

INSERT INTO matriz (razao_social, cnpj, cep) VALUES
('Crab', '12.345.678/0001-90', '01001-000'),
('Atacadão', '98.765.432/0001-10', '02002-000'),
('Assaí', '11.222.333/0001-81', '03003-000');

INSERT INTO filial (id_matriz, razao_social, cnpj, cep) VALUES
(2, 'Atacadão - Pirituba', '98.765.432/0002-00', '02910-000'),
(2, 'Atacadão - Lapa',     '98.765.432/0003-00', '05003-000'),
(2, 'Atacadão - Jaraguá', '98.765.432/0004-00', '02998-000'),
(3, 'Assaí - Perdizes',   '11.222.333/0002-00', '05014-000'),
(3, 'Assaí - Piqueri',    '11.222.333/0003-00', '02915-000'),
(3, 'Assaí - Osasco',     '11.222.333/0004-00', '06010-000');

INSERT INTO usuario (nome, cpf, email, senha) VALUES
('Mateus Galeani', '111.222.333-44', 'mateus.galeani@email.com', 'senha123'),
('Matheus Barros', '222.333.444-55', 'matheus.barros@email.com', 'senha123'),
('Matheus Dos Santos', '333.444.555-66', 'matheus.santos@email.com', 'senha123'),
('Matheus Yutaka', '444.555.666-77', 'matheus.yutaka@email.com', 'senha123'),
('Lucas Coelho', '555.666.777-88', 'lucas.coelho@email.com', 'senha123'),
('Rafael Biaggi', '666.777.888-99', 'rafael.biaggi@email.com', 'senha123'),
('Gabriela Borges Galeani', '777.888.999-00', 'gabriela.bg@email.com', 'senha123'),
('Carlos Silva', '888.999.000-11', 'carlos.silva@email.com', 'senha123'),
('Ana Oliveira', '999.000.111-22', 'ana.oliveira@email.com', 'senha123'),
('Marcos Souza', '000.111.222-33', 'marcos.souza@email.com', 'senha123'),
('Juliana Lima', '123.456.789-00', 'juliana.lima@email.com', 'senha123');

INSERT INTO funcionario (id_matriz, id_filial, id_usuario, id_cargo) VALUES
(1, NULL, 1, 1),
(2, NULL, 2, 2),
(3, NULL, 3, 2),
(2, 1, 4, 3),
(2, 2, 4, 3),
(2, 3, 5, 3),
(2, 3, 6, 4),
(3, 4, 7, 3),
(3, 5, 8, 3),
(3, 6, 8, 3),
(3, 5, 9, 4),
(3, 6, 10, 4),
(3, 6, 11, 4);

INSERT INTO setor (nome) VALUES
('Hortifrúti'),
('Açougue e Peixaria'),
('Laticínios e Embutidos'),
('Mercearia (Cestas e Enlatados)'),
('Bebidas e Adega'),
('Padaria e Confeitaria'),
('Higiene e Perfumaria'),
('Limpeza e Bazar'),
('Eletro e Utilidades Domésticas'),
('Pet Shop e Jardinagem');

INSERT INTO vao (numero, id_filial, id_matriz, id_setor)
WITH RECURSIVE sequencia AS (
    SELECT 1 AS numero
    UNION ALL
    SELECT numero + 1 FROM sequencia WHERE numero < 500
)
SELECT 
    numero,
    1 AS id_filial, 
    2 AS id_matriz, 
    CASE 
        WHEN numero <= 100 THEN 1
        WHEN numero <= 200 THEN 2
        WHEN numero <= 300 THEN 3
        WHEN numero <= 400 THEN 4
        ELSE 5 
    END AS id_setor
FROM sequencia;

INSERT INTO vao (numero, id_filial, id_matriz, id_setor)
WITH RECURSIVE sequencia AS (
    SELECT 1 AS numero
    UNION ALL
    SELECT numero + 1 FROM sequencia WHERE numero < 500
)
SELECT 
    numero,
    2 AS id_filial, 
    2 AS id_matriz, 
    CASE 
        WHEN numero <= 100 THEN 3 
        WHEN numero <= 200 THEN 4 
        WHEN numero <= 300 THEN 5 
        WHEN numero <= 400 THEN 6 
        ELSE 7                    
    END AS id_setor
FROM sequencia;

INSERT INTO vao (numero, id_filial, id_matriz, id_setor)
WITH RECURSIVE sequencia AS (
    SELECT 1 AS numero
    UNION ALL
    SELECT numero + 1 FROM sequencia WHERE numero < 500
)
SELECT 
    numero,
    3 AS id_filial, 
    2 AS id_matriz, 
    CASE 
        WHEN numero <= 100 THEN 6 
        WHEN numero <= 200 THEN 7 
        WHEN numero <= 300 THEN 8
        WHEN numero <= 400 THEN 9 
        ELSE 10                   
    END AS id_setor
FROM sequencia;

INSERT INTO vao (numero, id_filial, id_matriz, id_setor)
WITH RECURSIVE sequencia AS (
    SELECT 1 AS numero
    UNION ALL
    SELECT numero + 1 FROM sequencia WHERE numero < 500
)
SELECT 
    numero,
    4 AS id_filial,
    3 AS id_matriz,
    CASE 
        WHEN numero <= 100 THEN 1 
        WHEN numero <= 200 THEN 2 
        WHEN numero <= 300 THEN 8 
        WHEN numero <= 400 THEN 9 
        ELSE 10                  
    END AS id_setor
FROM sequencia;

INSERT INTO vao (numero, id_filial, id_matriz, id_setor)
WITH RECURSIVE sequencia AS (
    SELECT 1 AS numero
    UNION ALL
    SELECT numero + 1 FROM sequencia WHERE numero < 500
)
SELECT 
    numero,
    5 AS id_filial,
    3 AS id_matriz,
    CASE 
        WHEN numero <= 100 THEN 2 
        WHEN numero <= 200 THEN 4
        WHEN numero <= 300 THEN 6 
        WHEN numero <= 400 THEN 8
        ELSE 10                   
    END AS id_setor
FROM sequencia;

INSERT INTO vao (numero, id_filial, id_matriz, id_setor)
WITH RECURSIVE sequencia AS (
    SELECT 1 AS numero
    UNION ALL
    SELECT numero + 1 FROM sequencia WHERE numero < 500
)
SELECT 
    numero,
    6 AS id_filial, 
    3 AS id_matriz, 
    CASE 
        WHEN numero <= 100 THEN 1
        WHEN numero <= 200 THEN 3
        WHEN numero <= 300 THEN 5 
        WHEN numero <= 400 THEN 7
        ELSE 9                    
    END AS id_setor
FROM sequencia;

INSERT INTO sensor (dt_instalacao, statuss, id_vao)
SELECT 
    CURDATE(), 
    'Ativo' AS statuss,
    id_vao
FROM vao;

SELECT * FROM vw_ociosidade;
SELECT * FROM vw_tx_abastecimento;

SELECT * FROM usuario;
SELECT * FROM filial;
SELECT * FROM funcionario;


	            
		