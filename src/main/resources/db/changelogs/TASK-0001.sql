--liquibase formatted sql

--changeset a.k.lysenko:1 logicalFilePath:db/changelogs/TASK-0001.sql

CREATE TABLE users (
    id UUID PRIMARY KEY,
    isu_number INT NOT NULL,
    fio TEXT NOT NULL,
    course INT NOT NULL CHECK ( course > 0 ),
    education_group TEXT NOT NULL CHECK ( length(education_group) > 0 ),
    faculty_name TEXT NOT NULL CHECK ( length(faculty_name) > 0),
    photo_id TEXT,
    contacts JSONB
);


