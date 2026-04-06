CREATE DATABASE crab;

USE crab;

CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE,
    cep CHAR(8)
    );
    
CREATE TABLE funcionario(
	idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    cpf CHAR(11) NOT NULL,
    email VARCHAR(45),
    senha VARCHAR(45),
    fkEmpresa INT,
    CONSTRAINT fkEmpresaConst
		FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
    );
    
CREATE TABLE sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    dtInstalacao DATE,
	status VARCHAR(10),
    CONSTRAINT chStatus
	CHECK (status IN ('ativo','inativo','manutencao'))
    );
    

CREATE TABLE coleta(
	idColeta INT PRIMARY KEY AUTO_INCREMENT,
    dtColeta DATETIME NOT NULL,
    abastecido BOOLEAN NOT NULL,
    fkSensor INT,
    CONSTRAINT fkSensorConst
		FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
    );

CREATE TABLE enderecamento(
idEnderecamento INT PRIMARY KEY AUTO_INCREMENT,
codigo VARCHAR(30),
fkEmpresa INT,
CONSTRAINT fkEmpresaConst2
	FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
fkSensor INT,
CONSTRAINT fkSensorConst2
	FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
);
