-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2022 at 04:31 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booklab`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `photo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `photo`) VALUES
(1, 'Kazi nazrul islam', 'kazi@gmail.com', '123456', 'micro-environment.jpg'),
(2, 'Antonio de puto', 'puto@gmail.com', 'tatagoodbye', 'wp6124597.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `uname` text NOT NULL,
  `title` text NOT NULL,
  `cphoto` text NOT NULL,
  `book` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `uid`, `uname`, `title`, `cphoto`, `book`) VALUES
(1, 1, 'Kazi nazrul islam', 'All About History', '1646035053478Cover.jpg', '1646035053478All About History - Book of Greek Mythology - September 2019 (gnv64).pdf'),
(2, 1, 'Kazi nazrul islam', 'You are a badass', '1646049499571Capture.PNG', '1646049499571You Are a Badass_ How to Stop Doubting Your Greatness and Start Living an Awesome Life ( PDFDrive ).pdf'),
(3, 2, 'Antonio de puto', 'Living in the Light', '164605016327942upIkbEsT6em.jpg', '1646050163279Living in the Light_ A guide to personal transformation ( PDFDrive ).pdf'),
(4, 2, 'Antonio de puto', 'How to read a person like a book', '1646050275851567782.jpg', '1646050275851How to Read a Person Like a Book - Gerard I. Nierenberg.pdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
