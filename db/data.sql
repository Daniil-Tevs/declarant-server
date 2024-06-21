use declarant;

# add pages
insert ignore into pages (id, name)  
values ('main','Главная'),('electronic-declaration','Электронное декларирование'),('programs','Программы'),
('partners','Партнёры'),('about-company','О компании'),('contacts','Контакты');

# add pages params for main
insert ignore into optionspage (sort, name, value, page)  
values (1, 'title', 'Declarant', 'main'),(2, 'subtitle', 'гарант результата', 'main'),(3, 'topAdvantege-1-logo', 'https::/ya.com', 'main'),(4, 'topAdvantege-1-text', 'Специализированные программные решения для железнодорожной логистики', 'main');