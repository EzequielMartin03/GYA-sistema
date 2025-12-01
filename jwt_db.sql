CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE alumno (
    id_alumno SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE condicion_medica (
    id_condicion_medica SERIAL PRIMARY KEY,
    alergias VARCHAR(100),
    operaciones VARCHAR(100),
    sangrado_de_nariz BOOLEAN,
    baja_presion BOOLEAN,
    alta_presion BOOLEAN,
    PAF_Asma BOOLEAN,
    deficit_de_atencion BOOLEAN,
    diabetes BOOLEAN,
    celiaquia BOOLEAN,
    Otros VARCHAR(100)
);

CREATE TABLE alumno_condicion_medica (
    id_alumno_condicion SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_condicion_medica INT NOT NULL,
    FOREIGN KEY (id_alumno) REFERENCES alumno(id_alumno),
    FOREIGN KEY (id_condicion_medica) REFERENCES condicion_medica(id_condicion_medica)
);

CREATE TABLE curso (
    id_curso SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nivel VARCHAR(50),
    ano_lectivo INT NOT NULL
);

CREATE TABLE alumno_curso (
    id_alumno_curso SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_curso INT NOT NULL,
    fecha_alta DATE NOT NULL,
    FOREIGN KEY (id_alumno) REFERENCES alumno(id_alumno),
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
);

CREATE TABLE profesor (
    id_profesor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    mail VARCHAR(100),
    telefono VARCHAR(30)
);

CREATE TABLE profesor_curso (
    id_profesor_curso SERIAL PRIMARY KEY,
    id_curso INT NOT NULL,
    id_profesor INT NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
    FOREIGN KEY (id_profesor) REFERENCES profesor(id_profesor)
);

CREATE TABLE dia (
    id_dia SERIAL PRIMARY KEY,
    nombre_dia VARCHAR(20) NOT NULL
);

CREATE TABLE curso_horario (
    id_material INT NOT NULL,
    id_curso INT NOT NULL,
    id_dia INT NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    PRIMARY KEY (id_material, id_curso, id_dia),
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
    FOREIGN KEY (id_dia) REFERENCES dia(id_dia)
);

CREATE TABLE material (
    id_material SERIAL PRIMARY KEY,
    id_curso INT NOT NULL,
    fecha_subida DATE NOT NULL,
    link TEXT NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
);
