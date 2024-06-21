# create db
create database if not exists declarant;

# create user   
create user if not exists 'declarant'@'%' identified by 'Declarant2024!';
grant all privileges on declarant.* to 'declarant'@'%';

use declarant;

# create table options
create table if not exists options(
	id int auto_increment not null,
    name varchar(512) not null unique,
    value varchar(2048) not null,
    primary key (id)
);

# create table news
create table if not exists news(
	id int auto_increment not null,
    activity bool not null default(true),
    sort int not null default(1000),
    title varchar(512) not null,
    description varchar(2048),
    source varchar(512),
    link varchar(512),
    date date,
    primary key (id)
);

# create table partners
create table if not exists partners(
	id int auto_increment not null,
    activity bool not null default(true),
    sort int not null default(1000),
    logo varchar(512),
    name varchar(512) not null,
    description varchar(512),
    link varchar(512),
    primary key (id)
);

# create table appointment
create table if not exists appointment(
	id int auto_increment not null,
    activity bool not null default(true),
    theme varchar(1024),
    name varchar(512) not null,
    job varchar(512),
    phone varchar(512) not null,
    mail varchar(512),
    comment varchar(512),
    date date default(now()),
    primary key (id)
);

# create table pages
create table if not exists pages(
	id varchar(512) not null,
    name varchar(512) not null,
    primary key (id)
);

# create table optionsPage
create table if not exists optionsPage(
	id int auto_increment not null,
    activity bool not null default(true),
    sort int not null default(1000),
    name varchar(512) not null,
    value varchar(2048) not null,
    page varchar(512) not null,
    primary key (id),
    foreign key (page) references pages(id)
    on update cascade
    on delete cascade
);

# create table programs
create table if not exists programs(
	id int auto_increment not null,
    activity bool not null default(true),
    sort int not null default(1000),
    name varchar(512) not null,
    description varchar(2048) not null,
    source varchar(512),
    link varchar(512),
    primary key (id)
);

# create table admin
create table if not exists admin(
	id int auto_increment not null,
    login varchar(512) not null unique,
    password varchar(512) not null,
    primary key (id)
);

delimiter //
create trigger checkSingleAdmin
before insert on admin
for each row
begin
    declare row_count int;

    select count(*) into row_count from admin;
    
    if row_count >= 1  then
        signal sqlstate '45000' set message_text = 'превышен лимит строк в таблице';
    end if;
end; //

delimiter ;
