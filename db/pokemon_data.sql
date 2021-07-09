-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2021 at 08:05 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pokemondb`
--

-- --------------------------------------------------------

--
-- Table structure for table `pokemon_data`
--

CREATE TABLE `pokemon_data` (
  `entry_id` int(4) UNSIGNED NOT NULL,
  `pokemonid` int(4) UNSIGNED DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type1` varchar(50) DEFAULT NULL,
  `type2` varchar(50) DEFAULT NULL,
  `totalstat` int(10) UNSIGNED DEFAULT NULL,
  `hp` int(10) UNSIGNED DEFAULT NULL,
  `attack` int(10) UNSIGNED DEFAULT NULL,
  `defense` int(10) UNSIGNED DEFAULT NULL,
  `specialattack` int(10) UNSIGNED DEFAULT NULL,
  `specialdefense` int(10) UNSIGNED DEFAULT NULL,
  `speed` int(10) UNSIGNED DEFAULT NULL,
  `generation` int(2) UNSIGNED DEFAULT NULL,
  `legendarystatus` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pokemon_data`
--

INSERT INTO `pokemon_data` (`entry_id`, `pokemonid`, `name`, `type1`, `type2`, `totalstat`, `hp`, `attack`, `defense`, `specialattack`, `specialdefense`, `speed`, `generation`, `legendarystatus`) VALUES
(1, 1, 'Bulbasaur', 'Grass', 'Poison', 318, 45, 49, 49, 65, 65, 45, 1, 0),
(2, 2, 'Ivysaur', 'Grass', 'Poison', 405, 60, 62, 63, 80, 80, 60, 1, 0),
(3, 3, 'Venusaur', 'Grass', 'Poison', 525, 80, 82, 83, 100, 100, 80, 1, 0),
(4, 3, 'VenusaurMega Venusaur', 'Grass', 'Poison', 625, 80, 100, 123, 122, 120, 80, 1, 0),
(5, 4, 'Charmander', 'Fire', NULL, 309, 39, 52, 43, 60, 50, 65, 1, 0),
(6, 5, 'Charmeleon', 'Fire', NULL, 405, 58, 64, 58, 80, 65, 80, 1, 0),
(7, 6, 'Charizard', 'Fire', 'Flying', 534, 78, 84, 78, 109, 85, 100, 1, 0),
(8, 6, 'CharizardMega Charizard X', 'Fire', 'Dragon', 634, 78, 130, 111, 130, 85, 100, 1, 0),
(9, 6, 'CharizardMega Charizard Y', 'Fire', 'Flying', 634, 78, 104, 78, 159, 115, 100, 1, 0),
(10, 7, 'Squirtle', 'Water', NULL, 314, 44, 48, 65, 50, 64, 43, 1, 0),
(11, 8, 'Wartortle', 'Water', NULL, 405, 59, 63, 80, 65, 80, 58, 1, 0),
(12, 9, 'Blastoise', 'Water', NULL, 530, 79, 83, 100, 85, 105, 78, 1, 0),
(13, 9, 'BlastoiseMega Blastoise', 'Water', NULL, 630, 79, 103, 120, 135, 115, 78, 1, 0),
(14, 10, 'Caterpie', 'Bug', NULL, 195, 45, 30, 35, 20, 20, 45, 1, 0),
(15, 11, 'Metapod', 'Bug', NULL, 205, 50, 20, 55, 25, 25, 30, 1, 0),
(16, 12, 'Butterfree', 'Bug', 'Flying', 395, 60, 45, 50, 90, 80, 70, 1, 0),
(17, 13, 'Weedle', 'Bug', 'Poison', 195, 40, 35, 30, 20, 20, 50, 1, 0),
(18, 14, 'Kakuna', 'Bug', 'Poison', 205, 45, 25, 50, 25, 25, 35, 1, 0),
(19, 15, 'Beedrill', 'Bug', 'Poison', 395, 65, 90, 40, 45, 80, 75, 1, 0),
(20, 15, 'BeedrillMega Beedrill', 'Bug', 'Poison', 495, 65, 150, 40, 15, 80, 145, 1, 0),
(21, 16, 'Pidgey', 'Normal', 'Flying', 251, 40, 45, 40, 35, 35, 56, 1, 0),
(22, 17, 'Pidgeotto', 'Normal', 'Flying', 349, 63, 60, 55, 50, 50, 71, 1, 0),
(23, 18, 'Pidgeot', 'Normal', 'Flying', 479, 83, 80, 75, 70, 70, 101, 1, 0),
(24, 18, 'PidgeotMega Pidgeot', 'Normal', 'Flying', 579, 83, 80, 80, 135, 80, 121, 1, 0),
(25, 19, 'Rattata', 'Normal', NULL, 253, 30, 56, 35, 25, 35, 72, 1, 0),
(26, 20, 'Raticate', 'Normal', NULL, 413, 55, 81, 60, 50, 70, 97, 1, 0),
(27, 21, 'Spearow', 'Normal', 'Flying', 262, 40, 60, 30, 31, 31, 70, 1, 0),
(28, 22, 'Fearow', 'Normal', 'Flying', 442, 65, 90, 65, 61, 61, 100, 1, 0),
(29, 23, 'Ekans', 'Poison', NULL, 288, 35, 60, 44, 40, 54, 55, 1, 0),
(30, 24, 'Arbok', 'Poison', NULL, 438, 60, 85, 69, 65, 79, 80, 1, 0),
(31, 25, 'Pikachu', 'Electric', NULL, 320, 35, 55, 40, 50, 50, 90, 1, 0),
(32, 26, 'Raichu', 'Electric', NULL, 485, 60, 90, 55, 90, 80, 110, 1, 0),
(33, 27, 'Sandshrew', 'Ground', NULL, 300, 50, 75, 85, 20, 30, 40, 1, 0),
(34, 28, 'Sandslash', 'Ground', NULL, 450, 75, 100, 110, 45, 55, 65, 1, 0),
(35, 29, 'Nidoranâ™€', 'Poison', NULL, 275, 55, 47, 52, 40, 40, 41, 1, 0),
(36, 30, 'Nidorina', 'Poison', NULL, 365, 70, 62, 67, 55, 55, 56, 1, 0),
(37, 31, 'Nidoqueen', 'Poison', 'Ground', 505, 90, 92, 87, 75, 85, 76, 1, 0),
(38, 32, 'Nidoranâ™‚', 'Poison', NULL, 273, 46, 57, 40, 40, 40, 50, 1, 0),
(39, 33, 'Nidorino', 'Poison', NULL, 365, 61, 72, 57, 55, 55, 65, 1, 0),
(40, 34, 'Nidoking', 'Poison', 'Ground', 505, 81, 102, 77, 85, 75, 85, 1, 0),
(41, 35, 'Clefairy', 'Fairy', NULL, 323, 70, 45, 48, 60, 65, 35, 1, 0),
(42, 36, 'Clefable', 'Fairy', NULL, 483, 95, 70, 73, 95, 90, 60, 1, 0),
(43, 37, 'Vulpix', 'Fire', NULL, 299, 38, 41, 40, 50, 65, 65, 1, 0),
(44, 38, 'Ninetales', 'Fire', NULL, 505, 73, 76, 75, 81, 100, 100, 1, 0),
(45, 39, 'Jigglypuff', 'Normal', 'Fairy', 270, 115, 45, 20, 45, 25, 20, 1, 0),
(46, 40, 'Wigglytuff', 'Normal', 'Fairy', 435, 140, 70, 45, 85, 50, 45, 1, 0),
(47, 41, 'Zubat', 'Poison', 'Flying', 245, 40, 45, 35, 30, 40, 55, 1, 0),
(48, 42, 'Golbat', 'Poison', 'Flying', 455, 75, 80, 70, 65, 75, 90, 1, 0),
(49, 43, 'Oddish', 'Grass', 'Poison', 320, 45, 50, 55, 75, 65, 30, 1, 0),
(50, 44, 'Gloom', 'Grass', 'Poison', 395, 60, 65, 70, 85, 75, 40, 1, 0),
(51, 45, 'Vileplume', 'Grass', 'Poison', 490, 75, 80, 85, 110, 90, 50, 1, 0),
(52, 46, 'Paras', 'Bug', 'Grass', 285, 35, 70, 55, 45, 55, 25, 1, 0),
(53, 47, 'Parasect', 'Bug', 'Grass', 405, 60, 95, 80, 60, 80, 30, 1, 0),
(54, 48, 'Venonat', 'Bug', 'Poison', 305, 60, 55, 50, 40, 55, 45, 1, 0),
(55, 49, 'Venomoth', 'Bug', 'Poison', 450, 70, 65, 60, 90, 75, 90, 1, 0),
(56, 50, 'Diglett', 'Ground', NULL, 265, 10, 55, 25, 35, 45, 95, 1, 0),
(57, 51, 'Dugtrio', 'Ground', NULL, 405, 35, 80, 50, 50, 70, 120, 1, 0),
(58, 52, 'Meowth', 'Normal', NULL, 290, 40, 45, 35, 40, 40, 90, 1, 0),
(59, 53, 'Persian', 'Normal', NULL, 440, 65, 70, 60, 65, 65, 115, 1, 0),
(60, 54, 'Psyduck', 'Water', NULL, 320, 50, 52, 48, 65, 50, 55, 1, 0),
(61, 55, 'Golduck', 'Water', NULL, 500, 80, 82, 78, 95, 80, 85, 1, 0),
(62, 56, 'Mankey', 'Fighting', NULL, 305, 40, 80, 35, 35, 45, 70, 1, 0),
(63, 57, 'Primeape', 'Fighting', NULL, 455, 65, 105, 60, 60, 70, 95, 1, 0),
(64, 58, 'Growlithe', 'Fire', NULL, 350, 55, 70, 45, 70, 50, 60, 1, 0),
(65, 59, 'Arcanine', 'Fire', NULL, 555, 90, 110, 80, 100, 80, 95, 1, 0),
(66, 60, 'Poliwag', 'Water', NULL, 300, 40, 50, 40, 40, 40, 90, 1, 0),
(67, 61, 'Poliwhirl', 'Water', NULL, 385, 65, 65, 65, 50, 50, 90, 1, 0),
(68, 62, 'Poliwrath', 'Water', 'Fighting', 510, 90, 95, 95, 70, 90, 70, 1, 0),
(69, 63, 'Abra', 'Psychic', NULL, 310, 25, 20, 15, 105, 55, 90, 1, 0),
(70, 64, 'Kadabra', 'Psychic', NULL, 400, 40, 35, 30, 120, 70, 105, 1, 0),
(71, 65, 'Alakazam', 'Psychic', NULL, 500, 55, 50, 45, 135, 95, 120, 1, 0),
(72, 65, 'AlakazamMega Alakazam', 'Psychic', NULL, 590, 55, 50, 65, 175, 95, 150, 1, 0),
(73, 66, 'Machop', 'Fighting', NULL, 305, 70, 80, 50, 35, 35, 35, 1, 0),
(74, 67, 'Machoke', 'Fighting', NULL, 405, 80, 100, 70, 50, 60, 45, 1, 0),
(75, 68, 'Machamp', 'Fighting', NULL, 505, 90, 130, 80, 65, 85, 55, 1, 0),
(76, 69, 'Bellsprout', 'Grass', 'Poison', 300, 50, 75, 35, 70, 30, 40, 1, 0),
(77, 70, 'Weepinbell', 'Grass', 'Poison', 390, 65, 90, 50, 85, 45, 55, 1, 0),
(78, 71, 'Victreebel', 'Grass', 'Poison', 490, 80, 105, 65, 100, 70, 70, 1, 0),
(79, 72, 'Tentacool', 'Water', 'Poison', 335, 40, 40, 35, 50, 100, 70, 1, 0),
(80, 73, 'Tentacruel', 'Water', 'Poison', 515, 80, 70, 65, 80, 120, 100, 1, 0),
(81, 74, 'Geodude', 'Rock', 'Ground', 300, 40, 80, 100, 30, 30, 20, 1, 0),
(82, 75, 'Graveler', 'Rock', 'Ground', 390, 55, 95, 115, 45, 45, 35, 1, 0),
(83, 76, 'Golem', 'Rock', 'Ground', 495, 80, 120, 130, 55, 65, 45, 1, 0),
(84, 77, 'Ponyta', 'Fire', NULL, 410, 50, 85, 55, 65, 65, 90, 1, 0),
(85, 78, 'Rapidash', 'Fire', NULL, 500, 65, 100, 70, 80, 80, 105, 1, 0),
(86, 79, 'Slowpoke', 'Water', 'Psychic', 315, 90, 65, 65, 40, 40, 15, 1, 0),
(87, 80, 'Slowbro', 'Water', 'Psychic', 490, 95, 75, 110, 100, 80, 30, 1, 0),
(88, 80, 'SlowbroMega Slowbro', 'Water', 'Psychic', 590, 95, 75, 180, 130, 80, 30, 1, 0),
(89, 81, 'Magnemite', 'Electric', 'Steel', 325, 25, 35, 70, 95, 55, 45, 1, 0),
(90, 82, 'Magneton', 'Electric', 'Steel', 465, 50, 60, 95, 120, 70, 70, 1, 0),
(91, 83, 'Farfetch\'d', 'Normal', 'Flying', 352, 52, 65, 55, 58, 62, 60, 1, 0),
(92, 84, 'Doduo', 'Normal', 'Flying', 310, 35, 85, 45, 35, 35, 75, 1, 0),
(93, 85, 'Dodrio', 'Normal', 'Flying', 460, 60, 110, 70, 60, 60, 100, 1, 0),
(94, 86, 'Seel', 'Water', NULL, 325, 65, 45, 55, 45, 70, 45, 1, 0),
(95, 87, 'Dewgong', 'Water', 'Ice', 475, 90, 70, 80, 70, 95, 70, 1, 0),
(96, 88, 'Grimer', 'Poison', NULL, 325, 80, 80, 50, 40, 50, 25, 1, 0),
(97, 89, 'Muk', 'Poison', NULL, 500, 105, 105, 75, 65, 100, 50, 1, 0),
(98, 90, 'Shellder', 'Water', NULL, 305, 30, 65, 100, 45, 25, 40, 1, 0),
(99, 91, 'Cloyster', 'Water', 'Ice', 525, 50, 95, 180, 85, 45, 70, 1, 0),
(100, 92, 'Gastly', 'Ghost', 'Poison', 310, 30, 35, 30, 100, 35, 80, 1, 0),
(101, 93, 'Haunter', 'Ghost', 'Poison', 405, 45, 50, 45, 115, 55, 95, 1, 0),
(102, 94, 'Gengar', 'Ghost', 'Poison', 500, 60, 65, 60, 130, 75, 110, 1, 0),
(103, 94, 'GengarMega Gengar', 'Ghost', 'Poison', 600, 60, 65, 80, 170, 95, 130, 1, 0),
(104, 95, 'Onix', 'Rock', 'Ground', 385, 35, 45, 160, 30, 45, 70, 1, 0),
(105, 96, 'Drowzee', 'Psychic', NULL, 328, 60, 48, 45, 43, 90, 42, 1, 0),
(106, 97, 'Hypno', 'Psychic', NULL, 483, 85, 73, 70, 73, 115, 67, 1, 0),
(107, 98, 'Krabby', 'Water', NULL, 325, 30, 105, 90, 25, 25, 50, 1, 0),
(108, 99, 'Kingler', 'Water', NULL, 475, 55, 130, 115, 50, 50, 75, 1, 0),
(109, 100, 'Voltorb', 'Electric', NULL, 330, 40, 30, 50, 55, 55, 100, 1, 0),
(110, 101, 'Electrode', 'Electric', NULL, 480, 60, 50, 70, 80, 80, 140, 1, 0),
(111, 102, 'Exeggcute', 'Grass', 'Psychic', 325, 60, 40, 80, 60, 45, 40, 1, 0),
(112, 103, 'Exeggutor', 'Grass', 'Psychic', 520, 95, 95, 85, 125, 65, 55, 1, 0),
(113, 104, 'Cubone', 'Ground', NULL, 320, 50, 50, 95, 40, 50, 35, 1, 0),
(114, 105, 'Marowak', 'Ground', NULL, 425, 60, 80, 110, 50, 80, 45, 1, 0),
(115, 106, 'Hitmonlee', 'Fighting', NULL, 455, 50, 120, 53, 35, 110, 87, 1, 0),
(116, 107, 'Hitmonchan', 'Fighting', NULL, 455, 50, 105, 79, 35, 110, 76, 1, 0),
(117, 108, 'Lickitung', 'Normal', NULL, 385, 90, 55, 75, 60, 75, 30, 1, 0),
(118, 109, 'Koffing', 'Poison', NULL, 340, 40, 65, 95, 60, 45, 35, 1, 0),
(119, 110, 'Weezing', 'Poison', NULL, 490, 65, 90, 120, 85, 70, 60, 1, 0),
(120, 111, 'Rhyhorn', 'Ground', 'Rock', 345, 80, 85, 95, 30, 30, 25, 1, 0),
(121, 112, 'Rhydon', 'Ground', 'Rock', 485, 105, 130, 120, 45, 45, 40, 1, 0),
(122, 113, 'Chansey', 'Normal', NULL, 450, 250, 5, 5, 35, 105, 50, 1, 0),
(123, 114, 'Tangela', 'Grass', NULL, 435, 65, 55, 115, 100, 40, 60, 1, 0),
(124, 115, 'Kangaskhan', 'Normal', NULL, 490, 105, 95, 80, 40, 80, 90, 1, 0),
(125, 115, 'KangaskhanMega Kangaskhan', 'Normal', NULL, 590, 105, 125, 100, 60, 100, 100, 1, 0),
(126, 116, 'Horsea', 'Water', NULL, 295, 30, 40, 70, 70, 25, 60, 1, 0),
(127, 117, 'Seadra', 'Water', NULL, 440, 55, 65, 95, 95, 45, 85, 1, 0),
(128, 118, 'Goldeen', 'Water', NULL, 320, 45, 67, 60, 35, 50, 63, 1, 0),
(129, 119, 'Seaking', 'Water', NULL, 450, 80, 92, 65, 65, 80, 68, 1, 0),
(130, 120, 'Staryu', 'Water', NULL, 340, 30, 45, 55, 70, 55, 85, 1, 0),
(131, 121, 'Starmie', 'Water', 'Psychic', 520, 60, 75, 85, 100, 85, 115, 1, 0),
(132, 122, 'Mr. Mime', 'Psychic', 'Fairy', 460, 40, 45, 65, 100, 120, 90, 1, 0),
(133, 123, 'Scyther', 'Bug', 'Flying', 500, 70, 110, 80, 55, 80, 105, 1, 0),
(134, 124, 'Jynx', 'Ice', 'Psychic', 455, 65, 50, 35, 115, 95, 95, 1, 0),
(135, 125, 'Electabuzz', 'Electric', NULL, 490, 65, 83, 57, 95, 85, 105, 1, 0),
(136, 126, 'Magmar', 'Fire', NULL, 495, 65, 95, 57, 100, 85, 93, 1, 0),
(137, 127, 'Pinsir', 'Bug', NULL, 500, 65, 125, 100, 55, 70, 85, 1, 0),
(138, 127, 'PinsirMega Pinsir', 'Bug', 'Flying', 600, 65, 155, 120, 65, 90, 105, 1, 0),
(139, 128, 'Tauros', 'Normal', NULL, 490, 75, 100, 95, 40, 70, 110, 1, 0),
(140, 129, 'Magikarp', 'Water', NULL, 200, 20, 10, 55, 15, 20, 80, 1, 0),
(141, 130, 'Gyarados', 'Water', 'Flying', 540, 95, 125, 79, 60, 100, 81, 1, 0),
(142, 130, 'GyaradosMega Gyarados', 'Water', 'Dark', 640, 95, 155, 109, 70, 130, 81, 1, 0),
(143, 131, 'Lapras', 'Water', 'Ice', 535, 130, 85, 80, 85, 95, 60, 1, 0),
(144, 132, 'Ditto', 'Normal', NULL, 288, 48, 48, 48, 48, 48, 48, 1, 0),
(145, 133, 'Eevee', 'Normal', NULL, 325, 55, 55, 50, 45, 65, 55, 1, 0),
(146, 134, 'Vaporeon', 'Water', NULL, 525, 130, 65, 60, 110, 95, 65, 1, 0),
(147, 135, 'Jolteon', 'Electric', NULL, 525, 65, 65, 60, 110, 95, 130, 1, 0),
(148, 136, 'Flareon', 'Fire', NULL, 525, 65, 130, 60, 95, 110, 65, 1, 0),
(149, 137, 'Porygon', 'Normal', NULL, 395, 65, 60, 70, 85, 75, 40, 1, 0),
(150, 138, 'Omanyte', 'Rock', 'Water', 355, 35, 40, 100, 90, 55, 35, 1, 0),
(151, 139, 'Omastar', 'Rock', 'Water', 495, 70, 60, 125, 115, 70, 55, 1, 0),
(152, 140, 'Kabuto', 'Rock', 'Water', 355, 30, 80, 90, 55, 45, 55, 1, 0),
(153, 141, 'Kabutops', 'Rock', 'Water', 495, 60, 115, 105, 65, 70, 80, 1, 0),
(154, 142, 'Aerodactyl', 'Rock', 'Flying', 515, 80, 105, 65, 60, 75, 130, 1, 0),
(155, 142, 'AerodactylMega Aerodactyl', 'Rock', 'Flying', 615, 80, 135, 85, 70, 95, 150, 1, 0),
(156, 143, 'Snorlax', 'Normal', NULL, 540, 160, 110, 65, 65, 110, 30, 1, 0),
(157, 144, 'Articuno', 'Ice', 'Flying', 580, 90, 85, 100, 95, 125, 85, 1, 1),
(158, 145, 'Zapdos', 'Electric', 'Flying', 580, 90, 90, 85, 125, 90, 100, 1, 1),
(159, 146, 'Moltres', 'Fire', 'Flying', 580, 90, 100, 90, 125, 85, 90, 1, 1),
(160, 147, 'Dratini', 'Dragon', NULL, 300, 41, 64, 45, 50, 50, 50, 1, 0),
(161, 148, 'Dragonair', 'Dragon', NULL, 420, 61, 84, 65, 70, 70, 70, 1, 0),
(162, 149, 'Dragonite', 'Dragon', 'Flying', 600, 91, 134, 95, 100, 100, 80, 1, 0),
(163, 150, 'Mewtwo', 'Psychic', NULL, 680, 106, 110, 90, 154, 90, 130, 1, 1),
(164, 150, 'MewtwoMega Mewtwo X', 'Psychic', 'Fighting', 780, 106, 190, 100, 154, 100, 130, 1, 1),
(165, 150, 'MewtwoMega Mewtwo Y', 'Psychic', NULL, 780, 106, 150, 70, 194, 120, 140, 1, 1),
(166, 151, 'Mew', 'Psychic', NULL, 600, 100, 100, 100, 100, 100, 100, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pokemon_data`
--
ALTER TABLE `pokemon_data`
  ADD PRIMARY KEY (`entry_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pokemon_data`
--
ALTER TABLE `pokemon_data`
  MODIFY `entry_id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
