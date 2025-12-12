-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Erstellungszeit: 29. Okt 2025 um 09:43
-- Server-Version: 11.8.2-MariaDB-ubu2404
-- PHP-Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `addressbook`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `address`
--

CREATE TABLE `address` (
  `addressID` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `address`
--

INSERT INTO `address` (`addressID`, `name`, `address`, `phone`, `email`) VALUES
(1, 'Steve Dix', 'Mathiasstr 4\n50676 Köln', '02212717731', 'steve@stevedix.de'),
(2, 'Tex Avery', 'Termite Terrace\nWarner Bros', '454545', 'screwy@squirrel.org'),
(3, 'Mickey Mouse', 'C&#x2F;O Walt Disney\nBurbank\nLos Angeles CA', '76543876', 'mickey.mouse@disney.com'),
(4, 'Atom Cat', '34 Wixley Ave\nTomcat Town\nCheshire', '776565434', 'pussy@tomcat.org'),
(5, 'Tom Katt', 'The Kitty House\nBoxstreet\nPurrtown', '4958944', 'tom@katt.org'),
(6, 'Katrina Whippet', 'The Doghouse\n34 Greyhound Lane\nBarking', '0101343434', 'kat@dog.com'),
(7, 'Sherlock Holmes', '221B Baker St\nLondon', '98776665', 'holmes@detective.com'),
(8, 'Dr. Wibble', 'Wibble lane\nWibble Town\nWibbleshire', '3242341', 'beeb@boob.de'),
(9, 'Really Nogger', 'The Nogger\nNogger st\nNoggertown\nNoggershire', '1321123', 'nogger@ice.com'),
(10, 'Dave Small', '122 small st\nSmalltown\nsmallshire', '4564688', 'dave@gmx.de'),
(11, 'Katarznya Obrochta', '34 Oboestr\n50670 Köln', '09980980', 'kasia@obrochta.pl'),
(12, 'Albert Woollett', '45 Heron Lane\nRugeley\nStaffs', '334984473', 'steve@goathead.org'),
(13, 'Lassie Whippet', '29 Heron st\nRugeley\nStaffs\nWS15 2DZ', '585748943', 'lassie@whippet.org'),
(14, 'James Cameron', '34 moon st\nchicago IL', '34534511', 'cameron@moontown.de'),
(15, 'Clyde Tombough', '23 Pluto st.\nObservatory', '45646465', 'pluto@lovell.org'),
(16, 'A Cow', 'Moo street\nMootown\nmooshire', '452456265', 'moo@cow.org'),
(17, 'Alex Barkley', 'The Doghouse\nWoofton\nBarkshire', '39384938484', 'bark@woof.com'),
(18, 'Doctor Who', 'The Tardis\nEverywhere\nAll at once\nc&#x2F;o UNIT', '01010101010', 'thedoctor@tardis.org'),
(19, 'Barry James', '34 Smith st\nStavely\nGonk', '121345456', 'james@gmx.co.uk'),
(20, 'Barry Dalek', 'Dun Exterminatin&#x27;\nDalek City\nSkaro', '23243656787', 'dalek@skaro.com'),
(21, 'Philip Katt', 'remy Demy\nFrog Trans\nmoo Cow', '567567567', 'katt@meow.com'),
(22, 'William Shatner', 'The Bridge\nDuntrekkin', '4563456', 'bill@shatner.org'),
(23, 'Gary Gibson', '12343 Bent Court\nHackney\nLondon', '33456456', 'gibson@test.de'),
(24, 'Patrick McGoohan', 'Number Six\nThe Village\nPortmeirion', '66666666', 'mcgoohan@portmeirion.org'),
(25, 'David Turtle', '454 Brown St.\nGreenville', '1236771213', 'turtle@green.de');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `address`
--
ALTER TABLE `address`
  MODIFY `addressID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
