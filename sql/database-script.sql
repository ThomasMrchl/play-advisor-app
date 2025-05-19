CREATE DATABASE playadvisor;

USE playadvisor;


CREATE TABLE games(
   game_id INT,
   game_name VARCHAR(50),
   game_year INT,
   game_description VARCHAR(500),
   game_minplayers INT,
   game_maxplayers INT,
   game_category VARCHAR(500),
   popularity_score DECIMAL(15,2),
   image_url VARCHAR(255),
   PRIMARY KEY(game_id)
);

CREATE TABLE users(
   user_id INT,
   username VARCHAR(50),
   email VARCHAR(50),
   password VARCHAR(50),
   country VARCHAR(50),
   admin BOOLEAN,
   PRIMARY KEY(user_id)
);

CREATE TABLE reviews(
   review_id INT,
   comment VARCHAR(50),
   stars INT,
   game_id INT NOT NULL,
   user_id INT NOT NULL,
   PRIMARY KEY(review_id),
   FOREIGN KEY(game_id) REFERENCES games(game_id),
   FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE likes(
   review_id INT,
   user_id INT,
   PRIMARY KEY(review_id, user_id),
   FOREIGN KEY(review_id) REFERENCES reviews(review_id),
   FOREIGN KEY(user_id) REFERENCES users(user_id)
);


INSERT INTO games VALUES
(30549, 'Pandemic', 2008, 'In Pandemic, several virulent diseases have broken out simultaneously...', 2, 4, '[''Medical'']', 0, 'https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__micro/img/S4tXI3Yo7BtqmBoKINLLVUFsaJ0=/fit-in/64x64/filters:strip_icc()/pic1534148.jpg'),
(822, 'Carcassonne', 2000, 'Carcassonne is a tile-placement game in which the players draw and place...', 2, 5, '[''City Building'']', 0, 'https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__micro/img/VfLoKzfk3xj26ArmDu55qZ4sysw=/fit-in/64x64/filters:strip_icc()/pic6544250.png'),
(13, 'Catan', 1995, 'In CATAN (formerly The Settlers of Catan), players try to be the dominant force...', 3, 4, '[''Economic'']', 0, 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__micro/img/LA4OvGfQ_TXQ-2mhaIFZp2ITWpc=/fit-in/64x64/filters:strip_icc()/pic2419375.jpg'),
(68448, '7 Wonders', 2010, 'You are the leader of one of the 7 great cities of the Ancient World...', 2, 7, '[''Ancient'']', 0, 'https://cf.geekdo-images.com/RvFVTEpnbb4NM7k0IF8V7A__micro/img/9glsOs7zoTbkVpfDt5SHWJm-kRA=/fit-in/64x64/filters:strip_icc()/pic860217.jpg'),
(36218, 'Dominion', 2008, 'You are a monarch... You want a bigger and better kingdom, with more rivers...', 2, 4, '[''Card Game'']', 0, 'https://cf.geekdo-images.com/j6iQpZ4XkemZP07HNCODBA__micro/img/PVxqHWOLTb3n-4xe62LJadr_M0I=/fit-in/64x64/filters:strip_icc()/pic394356.jpg'),
(178900, 'Codenames', 2015, 'Codenames is an easy party game to solve puzzles. &#10;The game is divided into red and blue, each side has a team leader, the team leader''s goal is to lead their team to the final victory. ', 2, 8, '[''Card Game'', ''Deduction'', ''Party Game'', ''Spies/Secret Agents'', ''Word Game'']', 0, 'https://cf.geekdo-images.com/F_KDEu0GjdClml8N7c8Imw__micro/img/w38Q9MZMQK80Att5GcODbCGufDk=/fit-in/64x64/filters:strip_icc()/pic2582929.jpg'),
(167791, 'Terraforming Mars', 2016, 'In the 2400s, mankind begins to terraform the planet Mars. Giant corporations, sponsored by the World Government on Earth, initiate huge projects to raise the temperature, the oxygen level, ', 1, 5, '[''Economic'', ''Environmental'', ''Industry / Manufacturing'', ''Science Fiction'', ''Space Exploration'', ''Territory Building'']', 0, 'https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__micro/img/LUkXZhd1TO80eCiXMD3-KfnzA6k=/fit-in/64x64/filters:strip_icc()/pic3536616.jpg'),
(173346, '7 Wonders Duel', 2015, 'In many ways 7 Wonders Duel resembles its parent game 7 Wonders as over three ages players acquire cards that provide resources or advance their military or scientific development in order t', 2, 2, '[''Ancient'', ''Card Game'', ''City Building'', ''Civilization'', ''Economic'']', 0, 'https://cf.geekdo-images.com/WzNs1mA_o22ZWTR8fkLP2g__micro/img/xh3isprMbt_FCg9vs3w_ifv-JXY=/fit-in/64x64/filters:strip_icc()/pic3376065.jpg'),
(31260, 'Agricola', 2007, 'Description from BoardgameNews&#10;&#10;In Agricola, you''re a farmer in a wooden shack with your spouse and little else. On a turn, you get to take only two actions, one for you and one for ', 1, 5, '[''Animals'', ''Economic'', ''Farming'']', 0, 'https://cf.geekdo-images.com/dDDo2Hexl80ucK1IlqTk-g__micro/img/SZgGqufNqaW8BCFT29wkYPaRXOE=/fit-in/64x64/filters:strip_icc()/pic831744.jpg'),
(3076, 'Puerto Rico', 2002, 'In Puerto Rico, players assume the roles of colonial governors on the island of Puerto Rico. The aim of the game is to amass victory points by shipping goods to Europe or by constructing bui', 3, 5, '[''City Building'', ''Economic'', ''Farming'']', 0, 'https://cf.geekdo-images.com/QFiIRd2kimaMqTyWsX0aUg__micro/img/ggNIAA1GEadqvcY7Mvwb9_VEybU=/fit-in/64x64/filters:strip_icc()/pic158548.jpg'),
(148228, 'Splendor', 2014, 'Splendor is a game of chip-collecting and card development. Players are merchants of the Renaissance trying to buy gem mines, means of transportation, shops&mdash;all in order to acquire the', 2, 4, '[''Card Game'', ''Economic'', ''Renaissance'']', 0, 'https://cf.geekdo-images.com/rwOMxx4q5yuElIvo-1-OFw__micro/img/VaWkmRffgWdhbynm-GUM4anrlic=/fit-in/64x64/filters:strip_icc()/pic1904079.jpg'),
(169786, 'Scythe', 2016, 'It is a time of unrest in 1920s Europa. The ashes from the first great war still darken the snow. The capitalistic city-state known simply as &ldquo;The Factory&rdquo;, which fueled the war ', 1, 5, '[''Economic'', ''Fighting'', ''Miniatures'', ''Science Fiction'', ''Territory Building'']', 0, 'https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__micro/img/ETplc22GdhlN5u0mppcDxSP8LVk=/fit-in/64x64/filters:strip_icc()/pic3163924.jpg'),
(40692, 'Small World', 2009, 'In Small World, players vie for conquest and control of a world that is simply too small to accommodate them all.&#10;&#10;Designed by Philippe Keyaerts as a fantasy follow-up to his award-w', 2, 5, '[''Fantasy'', ''Fighting'', ''Territory Building'']', 0, 'https://cf.geekdo-images.com/aoPM07XzoceB-RydLh08zA__micro/img/COJIGGzrRYkdzevvZ7TMmy2UV78=/fit-in/64x64/filters:strip_icc()/pic428828.jpg'),
(14996, 'Ticket to Ride: Europe', 2005, 'Ticket to Ride: Europe takes you on a new train adventure across Europe. From Edinburgh to Constantinople and from Lisbon to Moscow, you''ll visit great cities of turn-of-the-century Europe. ', 2, 5, '[''Trains'']', 0, 'https://cf.geekdo-images.com/0K1AOciqlMVUWFPLTJSiww__micro/img/fNo9_FY6sdu7szEouS2v9IVjHfI=/fit-in/64x64/filters:strip_icc()/pic66668.jpg'),
(230802, 'Azul', 2017, 'Introduced by the Moors, azulejos (originally white and blue ceramic tiles) were fully embraced by the Portuguese when their king Manuel I, on a visit to the Alhambra palace in Southern Spai', 2, 4, '[''Abstract Strategy'', ''Puzzle'', ''Renaissance'']', 0, 'https://cf.geekdo-images.com/tz19PfklMdAdjxV9WArraA__micro/img/N7xRslgynWzB3aObMBI9F1yKfQ8=/fit-in/64x64/filters:strip_icc()/pic3718275.jpg'),
(70323, 'King of Tokyo', 2011, 'In King of Tokyo, you play mutant monsters, gigantic robots, and strange aliens&mdash;all of whom are destroying Tokyo and whacking each other in order to become the one and only King of Tok', 2, 6, '[''Dice'', ''Fighting'', ''Movies / TV / Radio theme'', ''Science Fiction'']', 0, 'https://cf.geekdo-images.com/m_RzXpHURC0_xLkvRSR_sw__micro/img/os4ChJCgP0VGLN9WU1Ea6c4z6CE=/fit-in/64x64/filters:strip_icc()/pic3043734.jpg'),
(129622, 'Love Letter', 2012, 'All of the eligible young men (and many of the not-so-young) seek to woo the princess of Tempest. Unfortunately, she has locked herself in the palace, and you must rely on others to take you', 2, 4, '[''Card Game'', ''Deduction'', ''Renaissance'']', 0, 'https://cf.geekdo-images.com/T1ltXwapFUtghS9A7_tf4g__micro/img/Qiu0VH-5VxmCUkISsvN5-dRlrKw=/fit-in/64x64/filters:strip_icc()/pic1401448.jpg'),
(2651, 'Power Grid', 2004, 'Power Grid is the updated release of the Friedemann Friese crayon game Funkenschlag. It removes the crayon aspect from network building in the original edition, while retaining the fluctuati', 2, 6, '[''Economic'', ''Industry / Manufacturing'']', 0, 'https://cf.geekdo-images.com/yd6LuatytHRhcFCxCf-EEg__micro/img/ZUrGKfXAZS4AztFRXq2W9oD6TG4=/fit-in/64x64/filters:strip_icc()/pic4459753.jpg'),
(266192, 'Wingspan', 2019, 'Wingspan is&nbsp;a competitive, medium-weight, card-driven, engine-building board game from Stonemaier Games. It''s designed by Elizabeth Hargrave and features over 170 birds illustrated by B', 1, 5, '[''Animals'', ''Card Game'', ''Educational'']', 0, 'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__micro/img/5ZaRePVhfelfofF7T_OC1e0gUCw=/fit-in/64x64/filters:strip_icc()/pic4458123.jpg'),
(39856, 'Dixit', 2008, '2010 Spiel des Jahres Winner&#10;&#10;One player is the storyteller for the turn and looks at the images on the 6 cards in her hand. From one of these, she makes up a sentence and says it ou', 3, 6, '[''Card Game'', ''Humor'', ''Party Game'']', 0, 'https://cf.geekdo-images.com/uSgzS-SClISqDkYRCdUq6g__micro/img/-Jb5JDZlNfelQUUHGENNZsGUelo=/fit-in/64x64/filters:strip_icc()/pic3483909.jpg'),
(163412, 'Patchwork', 2014, 'In Patchwork, two players compete to build the most aesthetic (and high-scoring) patchwork quilt on a personal 9x9 game board. To start play, lay out all of the patches at random in a circle', 2, 2, '[''Abstract Strategy'', ''Puzzle'']', 0, 'https://cf.geekdo-images.com/wLW7pFn0--20lEizEz5p3A__micro/img/HGRTd0C4poFciUwMZzBt6On1R3Y=/fit-in/64x64/filters:strip_icc()/pic2270442.jpg'),
(84876, 'The Castles of Burgundy', 2011, 'The game is set in the Burgundy region of High Medieval France. Each player takes on the role of an aristocrat, originally controlling a small princedom. While playing they aim to build sett', 2, 4, '[''Dice'', ''Medieval'', ''Territory Building'']', 0, 'https://cf.geekdo-images.com/5CFwjd8zTcGYVUnkXh04hw__micro/img/N1VrEUaW6bmwnqbZfi2nRScwGxM=/fit-in/64x64/filters:strip_icc()/pic1176894.jpg'),
(478, 'Citadels', 2000, 'In Citadels, players take on new roles each round to represent characters they hire in order to help them acquire gold and erect buildings. The game ends at the close of a round in which a p', 2, 8, '[''Bluffing'', ''Card Game'', ''City Building'', ''Deduction'', ''Fantasy'', ''Medieval'']', 0, 'https://cf.geekdo-images.com/42iW4E-vOumFXRQAiSf-GA__micro/img/nUakVroTbUtDZX2uMWTz87rNQ68=/fit-in/64x64/filters:strip_icc()/pic3239104.jpg'),
(28143, 'Race for the Galaxy', 2007, '2018 UPDATE: The second edition of the game is improved for CVD (color blindness) and includes 5 revised cards from the original version and 6 New Worlds promo homeworlds. The promo homeworl', 2, 4, '[''Card Game'', ''Civilization'', ''Economic'', ''Science Fiction'', ''Space Exploration'']', 0, 'https://cf.geekdo-images.com/-DOqixs8uwKUvvWPKI4f9w__micro/img/Fz_qRw_ZHI9TfZXY0b4YZ6zfT7o=/fit-in/64x64/filters:strip_icc()/pic5261714.jpg');

INSERT INTO users VALUES
(1, 'alice', 'alice@example.com', 'password123', 'France', false),
(2, 'bob', 'bob@example.com', 'passw0rd', 'USA', false),
(3, 'charlie', 'charlie@example.com', '123456', 'UK', false),
(4, 'diana', 'diana@example.com', 'mypassword', 'Canada', false),
(5, 'edward', 'edward@example.com', 'edwardpass', 'Germany', true);


INSERT INTO reviews VALUES
(1, 'Cooperative masterpiece!', 5, 30549, 1),
(2, 'Great tile-laying mechanics.', 4, 822, 2),
(3, 'Classic and accessible.', 4, 13, 3),
(4, 'Fast and strategic.', 5, 68448, 4),
(5, 'Simple but very deep.', 5, 36218, 5);


INSERT INTO likes VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 4),
(4, 5),
(5, 1);

-- Views 

-- View 1: List of available games (basic game info)
CREATE VIEW view_available_games AS
SELECT game_name, game_year, game_category
FROM games;

-- View 2: User Review History
CREATE VIEW view_user_review_history AS
SELECT u.username, g.game_name, r.stars, r.comment
FROM users u
JOIN reviews r ON u.user_id = r.user_id
JOIN games g ON r.game_id = g.game_id;

-- View 3: Top Rated Games (average stars >= 4)
CREATE VIEW view_top_rated_games AS
SELECT g.game_id, g.game_name, AVG(r.stars) AS avg_rating
FROM games g
JOIN reviews r ON g.game_id = r.game_id
GROUP BY g.game_id, g.game_name
HAVING AVG(r.stars) >= 4;

-- Index
-- Index 1: For faster search by category
CREATE INDEX idx_games_category ON games(game_category);

-- Index 2: For faster username lookups
CREATE INDEX idx_users_username ON users(username);

-- Index 3: For quick review filtering by star rating
CREATE INDEX idx_reviews_stars ON reviews(stars);


-- Triggers

DELIMITER $$

-- Trigger 1: Update popularity score when a new review is inserted
CREATE TRIGGER trg_update_popularity_on_review
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    UPDATE games
    SET popularity_score = popularity_score + 1
    WHERE game_id = NEW.game_id;
END;
$$

-- Trigger 2: Ensure reviews stars are between 1 and 5
CREATE TRIGGER trg_validate_review_stars
BEFORE INSERT ON reviews
FOR EACH ROW
BEGIN
    IF NEW.stars < 1 THEN
        SET NEW.stars = 1;
    ELSEIF NEW.stars > 5 THEN
        SET NEW.stars = 5;
    END IF;
END;
$$

-- Trigger 3: Auto-delete likes if a review is deleted
CREATE TRIGGER trg_delete_likes_on_review_delete
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
    DELETE FROM likes WHERE review_id = OLD.review_id;
END;
$$

DELIMITER ;



Procedure: 

-- Function 1: Get average star rating for a game
DELIMITER //
CREATE FUNCTION fn_get_average_rating(p_game_id INT)
RETURNS DECIMAL(3,2)
DETERMINISTIC
BEGIN
    DECLARE avg_rating DECIMAL(3,2);
    SELECT AVG(stars) INTO avg_rating
    FROM reviews
    WHERE game_id = p_game_id;
    RETURN avg_rating;
END;
//
DELIMITER ;

-- Procedure 2 : Add a new review on a game
DELIMITER //
CREATE PROCEDURE sp_add_review (
    IN p_comment VARCHAR(50),
    IN p_stars INT,
    IN p_game_id INT,
    IN p_user_id INT
)
BEGIN
    DECLARE game_exists INT;
    DECLARE user_exists INT;

    SELECT COUNT(*) INTO game_exists FROM games WHERE game_id = p_game_id;
    SELECT COUNT(*) INTO user_exists FROM users WHERE user_id = p_user_id;

    IF game_exists = 1 AND user_exists = 1 THEN
        INSERT INTO reviews (comment, stars, game_id, user_id)
        VALUES (p_comment, p_stars, p_game_id, p_user_id);
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid game_id or user_id';
    END IF;
END;
//

DELIMITER ;

-- Function 3 : Returns the number of likes on a review
DELIMITER //
CREATE FUNCTION fn_count_review_likes(p_review_id INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE like_count INT;
    SELECT COUNT(*) INTO like_count FROM likes WHERE review_id = p_review_id;
    RETURN like_count;
END;
//
DELIMITER ;
