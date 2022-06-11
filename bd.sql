-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 07-06-2022 a las 12:31:32
-- Versión del servidor: 8.0.13-4
-- Versión de PHP: 7.2.24-0ubuntu0.18.04.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;



CREATE TABLE `articulo` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `referencia` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `precio_coste` int(11) NOT NULL,
  `precio_venta` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `articulo`
--

INSERT INTO `articulo` (`id`, `descripcion`, `referencia`, `precio_coste`, `precio_venta`, `id_categoria`) VALUES
(19, 'el nuevo pepinaco', 'RTWER4', 11, 11, 4),
(26, 'Arreglar pantalla de nintendo DS', NULL, 50, 90, 7),
(28, 'Instalar wi11', NULL, 0, 10, 5),
(30, 'mac', 'macnuevo', 100, 200, 4),
(31, 'pc top++', 'ASPDAPSMD', 300, 600, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo_factura`
--

CREATE TABLE `articulo_factura` (
  `serial` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad` int(11) NOT NULL,
  `dto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo_reparacion`
--

CREATE TABLE `articulo_reparacion` (
  `id_reparacion` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `cantidad` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `articulo_reparacion`
--

INSERT INTO `articulo_reparacion` (`id_reparacion`, `id_articulo`, `cantidad`) VALUES
(42, 19, 2),
(42, 26, 1),
(42, 28, 5),
(42, 30, 2),
(42, 31, 1),
(45, 19, 1),
(45, 26, 1),
(45, 28, 1),
(45, 30, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(7, 'ds'),
(6, 'nueva categoria'),
(4, 'Ordenadores mac'),
(3, 'Ordenadores windows'),
(8, 'pepe'),
(5, 'Servicios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nif` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre_fiscal` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domicilio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CP` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `poblacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `provincia` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `persona_contacto` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_usuario` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `nif`, `nombre_fiscal`, `telefono`, `domicilio`, `CP`, `poblacion`, `provincia`, `persona_contacto`, `id_usuario`) VALUES
(4, '31880317V', 'Juan Valderrama', '656980764', 'Cordoba', '14007', 'Cordoba', 'Cordoba', 'Córdoba', '2279718b-b6b4-4b5c-9d26-3430492a4d25'),
(12, '28246960Q', 'carlos', '666666666', 'calle pepe el risas', '14005', 'Córdoba', 'Córdoba', 'tomas', '39d755e1-17ca-49bd-b424-865498ffa0fd'),
(20, '12345678K', 'Juan Valderrama', '656980764', 'Cordoba', '14009', 'Cordoba', 'Cordoba', 'Tomas', 'fc4cefbf-c360-4738-88f5-07c5f5b2df3b'),
(22, '54354353A', 'carlostomascarlostomascarlostomas', '678980998', 'carlostomascarlostomascarlostomas', '12345', 'Barcelona', 'Barcelona', 'Tomás', 'cf636fdd-9127-44bf-9873-1b7580b80134'),
(24, '73559470L', 'asdas', '677232411', 'laura', '14011', 'córdoba', 'córdoba', 'carlos', 'f65cc3c0-709f-412c-bb3f-914b7ad1d739'),
(26, '06196248W', 'pepe', '677232411', 'calle pepe pepe el risas', '14011', 'córdoba', 'córdoba', 'calle pepe pepe el risas', 'e40b0c18-2345-4489-8bdb-f81970d630cd'),
(28, '62322139M', 'Josefa Maria Perez', '656727255', 'Cordoba', '14007', 'Cordoba', 'Cordoba', 'Tomás', '8e33b1a7-e3ab-4cc1-811a-d739490dcb51'),
(29, '31803123A', 'Cliente Fiel', '656356363', 'Cordoba', '14007', 'Cordoba', 'Cadiz', 'Tomás', 'null'),
(31, '32731909B', 'Marcos Rigal', '656899881', 'Cordoba', '14409', 'Cordoba', 'Cordoba', 'Tomás', 'db80bb6f-e1ba-40cf-9832-6f612fa76385'),
(32, '06506828J', 'Juan Maria', '656565645', 'Cordoba', '14009', 'Cordoba', 'Cordoba', 'Tomás', 'd1b2c7f1-b538-4668-838c-d0dcc08d74d3'),
(33, '46338199F', 'pepe', '677232411', 'calle del campo 20', '14011', 'Córdoba', 'Córdoba', 'pepepe', 'a357ff09-40ea-471c-bc3a-5115adfe12be'),
(34, '56436988W', 'Juanito Perez', '656727253', 'Córdoba', '14009', 'Córdoba', 'Córdoba', 'Tomás', '0c03babd-6aba-424c-bde4-ae6578d6969b');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivo`
--

CREATE TABLE `dispositivo` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `marca` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `modelo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `codigo_desbloqueo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pin_sim` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_serie` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `dispositivo`
--

INSERT INTO `dispositivo` (`id`, `tipo`, `marca`, `modelo`, `id_cliente`, `codigo_desbloqueo`, `pin_sim`, `numero_serie`) VALUES
(8, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(9, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(10, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(11, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(12, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(13, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(14, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(15, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(16, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(17, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(18, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(19, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(20, 'movil', 'apple', 'iphone x', 22, '1234', '1234', '1212121'),
(21, 'carlos', 'carlos', 'iphone x', 22, '1234', '1234', '1212121'),
(22, 'movil', 'apple', 'Alfombra 3060', 22, '1234', '1234', '1212121'),
(24, 'movil', 'apple', 'iphone x', 22, '', '', '1212121'),
(28, 'pc', 'HP', 'Lenovo 20003', 26, '', '', '1212121'),
(31, 'casd', 'adsa', 'dasdas', 32, NULL, NULL, '555'),
(32, 'pc', 'HP', 'Alfombra 3060', 20, '', '', '1212121'),
(33, 'pc', 'HP', 'Alfombra 3060', 12, '', '', '151532626151ew'),
(34, 'pc', 'HP', 'Alfombra 3060', 33, '', '', '1212121'),
(35, 'pc', 'HP', 'iphone x', 12, '', '', '1212121'),
(36, 'Consola', 'Sony', 'PS5 Slim', 34, '144', '2321', '65654');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `serial` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id` int(11) NOT NULL,
  `nombre_fiscal` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre_comercial` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cif` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cp` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id`, `nombre_fiscal`, `nombre_comercial`, `cif`, `cp`, `direccion`, `telefono`, `email`) VALUES
(13, 'Proveedor móviles y otros', 'Proveedor móviles y otros', 'D93706915', '14005', 'calle del demoni', '666777888', 'carloshidalgorisco@gmail.com'),
(16, 'E21788674 ', 'E21788674 ', 'E21788674 ', '14005', 'calle de H52675626', '666555444', 'carloshidalgorisco@gmail.com'),
(22, 'E21788674q', 'E21788674 ', 'D16518656', 'E21788674 ', 'E21788674 ', 'E21788674 ', 'E21788674@gmaol.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor_articulo`
--

CREATE TABLE `proveedor_articulo` (
  `id_proveedor` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `proveedor_articulo`
--

INSERT INTO `proveedor_articulo` (`id_proveedor`, `id_articulo`, `stock`) VALUES
(13, 19, 0),
(16, 19, 0),
(16, 26, 1),
(22, 19, 0),
(16, 28, 72),
(22, 28, 1),
(13, 31, 55),
(13, 30, 47);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reparacion`
--

CREATE TABLE `reparacion` (
  `id` int(11) NOT NULL,
  `id_dispositivo` int(11) NOT NULL,
  `id_tecnico` int(11) NOT NULL,
  `estado` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `accesorios` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_compromiso` datetime NOT NULL,
  `averia` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `observaciones` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reparacion`
--

INSERT INTO `reparacion` (`id`, `id_dispositivo`, `id_tecnico`, `estado`, `accesorios`, `fecha_compromiso`, `averia`, `observaciones`) VALUES
(42, 32, 9, 'pendiente', 'cargador, cable', '2022-05-22 23:55:00', 'Batería falla', ''),
(43, 9, 9, 'pendiente', 'cargador', '2022-05-22 21:55:00', 'No funciona', ''),
(44, 32, 9, 'pendiente', 'ja', '2022-05-22 00:57:00', 'Batería falla', 'jaja'),
(45, 33, 10, 'pendiente', '', '2022-05-22 00:09:00', 'No funca bien', ''),
(46, 34, 9, 'pendiente', '', '2022-05-24 23:53:00', 'Batería falla', ''),
(49, 36, 11, 'Pendiente', 'Herramientas premium y cargador y nuevo pack ram', '2022-06-23 00:00:00', 'Reparacion GB RAM', 'Hay que cambiar modulos de RAM por otros nuevos'),
(50, 36, 11, 'Pendiente', 'Herramientas premium y cargador y nuevo pack ram', '2022-06-23 00:00:00', 'Reparacion GB RAM', 'Hay que cambiar modulos de RAM por otros nuevos'),
(51, 36, 11, 'Pendiente', 'Herramientas premium y cargador y nuevo pack ram', '2022-06-23 00:00:00', 'Reparacion GB RAM', 'Hay que cambiar modulos de RAM por otros nuevos'),
(52, 36, 11, 'Pendiente', 'Herramientas premium y cargador y nuevo pack ram', '2022-06-23 00:00:00', 'Reparacion GB RAM', 'Hay que cambiar modulos de RAM por otros nuevos'),
(53, 36, 11, 'Pendiente', 'Herramientas premium y cargador y nuevo pack ram', '2022-06-23 00:00:00', 'Reparacion GB RAM', 'Hay que cambiar modulos de RAM por otros nuevos'),
(54, 33, 10, 'pendiente', '', '2022-06-07 15:25:00', 'Batería falla', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnico`
--

CREATE TABLE `tecnico` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_usuario` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tecnico`
--

INSERT INTO `tecnico` (`id`, `nombre`, `id_usuario`) VALUES
(9, 'carlos hidalgo', '32e9ae90-b168-4a61-b20f-f60e418afb8e'),
(10, 'Laura Hidalgo Rivera', 'ff0c9251-1f84-4ea4-a119-4b16dbe4b729'),
(11, 'oscar risco', 'b77691f7-8b9f-4c6f-8a1f-4012fec82bc1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL,
  `rol` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `last_login`, `rol`, `email`) VALUES
('', 'maria12', '974a2be4c0f6db85c78778e367e905f6f4c1b3524505872ade3ddae1d9ef43b8', NULL, 'cliente', 'maria12@gmail.com'),
('0c03babd-6aba-424c-bde4-ae6578d6969b', 'juanito1234', '$2a$10$XRjL.imJMyhGDuNzlMo7AuMNXcz1aTe4nD/cn7HwXnC.X1UBT/NH6', '2022-06-05 19:44:31', 'cliente', 'a20himato@iesgrancapitan.org'),
('2279718b-b6b4-4b5c-9d26-3430492a4d25', 'Juan', '$2a$10$RIpFAhWr0Hc6YX8zhxaGQeCNJ9KNW8bPgplXhSvnBvgi8HFouSmN6', NULL, 'cliente', 'juan1252@gmail.com'),
('32e9ae90-b168-4a61-b20f-f60e418afb8e', 'carloshr', '$2a$10$HelXHj/EmL4S7.PslgP85uQ7nYtdHZuejbwV9rVtjxtNwNzohVu8i', '2022-05-22 12:20:51', 'tecnico', 'carloshidalgorisco@gmail.com'),
('39d755e1-17ca-49bd-b424-865498ffa0fd', 'carlos', '$2a$10$o.eRlLuuCGql8pD56eXq8OFwHB/HrSgagCpGZI7Pp7JKmUtgN3GQq', NULL, 'cliente', 'hfth@gestirediel.com'),
('3e57b314-ea8c-46bc-b617-044ed9c59851', 'carlos', '$2a$10$i9gUKp2Ai3KU5IOmvMxSJ.ceSbMwCa8fW6TUD4TdV8oITknF3EDIK', '2022-05-06 19:14:08', 'admin', 'carlos@gmail.com'),
('47d6986e-bc95-4ac7-9a73-95a7470486b5', 'sadsa', '', NULL, 'cliente', 'sda@gms.es'),
('8e33b1a7-e3ab-4cc1-811a-d739490dcb51', 'josefa21', '', NULL, 'cliente', 'josefa@gmail.com'),
('a1fe45ca-0c70-4619-b954-a7fa2c9cd80e', 'tomashm', '$2a$10$6b9S4g2PYyRMV9y8JmshOeIPoGZEWYLmyCLCKr4xKbd6aXMS9GgNC', '2022-05-07 12:59:56', 'admin', 'tomashidalgomartin@gmail.com'),
('a357ff09-40ea-471c-bc3a-5115adfe12be', 'tacho', '$2a$10$KUF67uR9sOJyaLVnuhZAdeafVUqijD9ItRbnSLO8lGl6xwZZmnNNa', '2022-05-24 19:49:50', 'cliente', 'tach000ficial@gmail.com'),
('b77691f7-8b9f-4c6f-8a1f-4012fec82bc1', 'pepe', '$2a$10$UqIGw3wm/Xqs319/DGfVb.POgICh9EAuSdwc6ljukDeL9qLqMAria', NULL, 'tecnico', 'sdasdasdasdas@pepeelpepe.com'),
('c8769fd3-680e-4213-824a-6ddd5b81ec10', 'carlos', '$2a$10$x6eTDH4VjuzRc1hGwbLR2.FtJU1YH2Y9.JAQElq79HuVUbES2XVPS', '2022-05-08 15:20:25', 'cliente', 'pepe@gestirediel.com'),
('cf636fdd-9127-44bf-9873-1b7580b80134', 'carlostomas', '', NULL, 'cliente', 'pepepepa@gmail.com'),
('d1b2c7f1-b538-4668-838c-d0dcc08d74d3', 'juanamaria15', '$2a$04$98K3oPj6EQKT/.J8TY8So.I4ZCG/q6m/PluBlCVdJxot./EkKZyyi', '2022-05-22 17:29:00', 'cliente', 'juanamaria@gmail.com'),
('db80bb6f-e1ba-40cf-9832-6f612fa76385', 'marcos12', '$2a$10$hqGIxM/b0iG6HzJIKn39b.pk/iqC5Bh79WKz94FwoSYVXH9pK5Are', '2022-05-20 08:58:26', 'cliente', 'riveragavilanmarcos@gmail.com'),
('e40b0c18-2345-4489-8bdb-f81970d630cd', 'ANGEL', '', NULL, 'cliente', 'asdasda@geasdasdasdasstirediel.com'),
('f65cc3c0-709f-412c-bb3f-914b7ad1d739', 'juan', '', NULL, 'cliente', 'hhhfth@gestirediel.com'),
('fc4cefbf-c360-4738-88f5-07c5f5b2df3b', 'Juan', '', NULL, 'cliente', 'juan12@gmail.com'),
('ff0c9251-1f84-4ea4-a119-4b16dbe4b729', 'laura', '$2a$10$.OC6jauvMMn.qB1UzImLy.p9OHbd1OkQjI0nkAFD2cQ1LGeBYPkf.', NULL, 'tecnico', 'laurasdalsdmalsmdlamsldmalsmdlams@lmalsmdlamsldmasldmalsmdo.com'),
('null', 'clienteChulo', '$2a$04$CwTB/6Ih9rub5oa0auVrweQHqpxxYlpn.sOJJINgKlvwQiV1SsPaK', '2022-05-18 21:51:00', 'cliente', 'clientito@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `applied_steps_count`) VALUES
('7eafdd32-47f9-40bf-875c-f698912b0836', '6a9d0820cc5edba6e8382ddf1708075e602d71f7630ae6baa59e499abbb0733a', '2022-05-03 20:23:23.739', '20220503202310_init', NULL, NULL, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `referencia` (`referencia`),
  ADD KEY `fk_categoria` (`id_categoria`);

--
-- Indices de la tabla `articulo_factura`
--
ALTER TABLE `articulo_factura`
  ADD KEY `fk_articulo_factura` (`id_articulo`),
  ADD KEY `fk_factura` (`serial`);

--
-- Indices de la tabla `articulo_reparacion`
--
ALTER TABLE `articulo_reparacion`
  ADD UNIQUE KEY `id_reparacion` (`id_reparacion`,`id_articulo`),
  ADD KEY `fk_id_articulo1` (`id_articulo`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nif` (`nif`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD KEY `fk_id_user2` (`id_usuario`);

--
-- Indices de la tabla `dispositivo`
--
ALTER TABLE `dispositivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cliente` (`id_cliente`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`serial`),
  ADD KEY `fk_cliente_factura` (`id_cliente`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_fiscal` (`nombre_fiscal`),
  ADD UNIQUE KEY `cif` (`cif`);

--
-- Indices de la tabla `proveedor_articulo`
--
ALTER TABLE `proveedor_articulo`
  ADD KEY `fk_id_articulo` (`id_articulo`),
  ADD KEY `fk_id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `reparacion`
--
ALTER TABLE `reparacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_dispositivo` (`id_dispositivo`),
  ADD KEY `fk_id_tecnico` (`id_tecnico`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol`);

--
-- Indices de la tabla `tecnico`
--
ALTER TABLE `tecnico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_rol1` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `dispositivo`
--
ALTER TABLE `dispositivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `reparacion`
--
ALTER TABLE `reparacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `tecnico`
--
ALTER TABLE `tecnico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `articulo_factura`
--
ALTER TABLE `articulo_factura`
  ADD CONSTRAINT `fk_articulo_factura` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_factura` FOREIGN KEY (`serial`) REFERENCES `factura` (`serial`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `articulo_reparacion`
--
ALTER TABLE `articulo_reparacion`
  ADD CONSTRAINT `fk_id_articulo1` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idreparacion` FOREIGN KEY (`id_reparacion`) REFERENCES `reparacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_id_user2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `dispositivo`
--
ALTER TABLE `dispositivo`
  ADD CONSTRAINT `fk_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `fk_cliente_factura` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proveedor_articulo`
--
ALTER TABLE `proveedor_articulo`
  ADD CONSTRAINT `fk_id_articulo` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reparacion`
--
ALTER TABLE `reparacion`
  ADD CONSTRAINT `fk_id_dispositivo` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_tecnico` FOREIGN KEY (`id_tecnico`) REFERENCES `tecnico` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tecnico`
--
ALTER TABLE `tecnico`
  ADD CONSTRAINT `fk_id_rol1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
