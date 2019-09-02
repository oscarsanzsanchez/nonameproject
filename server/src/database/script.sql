use nonameproject;
CREATE TABLE IF NOT EXISTS people (
	id int not null auto_increment,
    name varchar(100) not null,
    surname varchar(100),
    fee double not null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS services (
	id int not null auto_increment,
    name varchar(100) not null,
    price double not null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS peopleServices (
	id int not null auto_increment,
    personId int not null,
    serviceId int not null,
    PRIMARY KEY (id),
    FOREIGN KEY (personId) REFERENCES people(id),
    FOREIGN KEY (serviceId) REFERENCES services(id)
);

CREATE TABLE IF NOT EXISTS payments(
	id int not null auto_increment,
    personId int not null,
    observation varchar(255) not null,
    createdAt datetime default current_timestamp,
    updatedAt datetime,
	PRIMARY KEY (id),
    FOREIGN KEY (personId) REFERENCES people(id)
);