drop database if exists moviesdb;
CREATE DATABASE moviesdb;

use moviesdb;

create table movies (
id binary(16) primary key default (UUID_TO_BIN(UUID())),
title varchar(255) not null,
year int not null,
director varchar(255) not null,
duration int not null,
poster text,
rate decimal(2, 1) unsigned not null
);

create table genres (
id int auto_increment primary key,
name varchar(255) not null unique
);

create table movie_genres (
movie_id binary(16) references movies(id),
genre_id int references genre(id),
primary key (movie_id, genre_id)
);

insert into genres (name) values
('Drama'),
('Action'),
('Adventure'),
('Romance'),
('Fantasy'),
('Biography'),
('Crime'),
('Thriller'),
('Sci-Fi'),
('Animation');

INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 9.3),
(UUID_TO_BIN(UUID()), 'The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0),
(UUID_TO_BIN(UUID()), 'Inception', 2010, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8);

insert into movie_genres (movie_id, genre_id) values
((select id from movies where title = 'The Shawshank Redemption'), (select id from genres where name = 'Drama')),
((select id from movies where title = 'The Dark Knight'), (select id from genres where name = 'Action')),
((select id from movies where title = 'The Dark Knight'), (select id from genres where name = 'Crime')),
((select id from movies where title = 'The Dark Knight'), (select id from genres where name = 'Drama')),
((select id from movies where title = 'Inception'), (select id from genres where name = 'Action')),
((select id from movies where title = 'Inception'), (select id from genres where name = 'Adventure')),
((select id from movies where title = 'Inception'), (select id from genres where name = 'Sci-Fi'))
;

select title, year, director, duration, poster, rate, bin_to_uuid(id) id from movies;