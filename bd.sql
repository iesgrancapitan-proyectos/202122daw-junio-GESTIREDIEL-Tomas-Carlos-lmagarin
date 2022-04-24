-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-04-2022 a las 15:03:52
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `innovasat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almacen`
--

CREATE TABLE `almacen` (
  `id` int(11) NOT NULL,
  `direccion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

CREATE TABLE `articulo` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `referencia` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_coste` int(11) NOT NULL,
  `precio_venta` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_almacen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo_factura`
--

CREATE TABLE `articulo_factura` (
  `serial` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad` int(11) NOT NULL,
  `dto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seccion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nif` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre_fiscal` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domicilio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CP` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `poblacion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provincia` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `persona_contacto` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_usuario` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `nif`, `nombre_fiscal`, `domicilio`, `CP`, `poblacion`, `provincia`, `persona_contacto`, `id_usuario`) VALUES
(4, '80168877E', 'manuel', 'calle pepe el risas', '14005', 'Córdoba', 'Córdoba', 'tomas', '621c5584-e8d6-4ddb-b1ef-70aab5c561c6'),
(5, '181111231', 'carlos', 'calle pepe el risas', '14005', 'Córdoba', 'Córdoba', 'tomas', '6b467e3c-a580-46d3-a29f-ba19baf3111a'),
(6, '1213', 'carlos', 'calle pepe el risas', '14005', 'Córdoba', 'Córdoba', 'tomas', 'e6693a3f-ed8a-444a-a169-1891006a80c1'),
(7, '1312312', 'carlos', 'calle pepe el risas', '14005', 'Córdoba', 'Córdoba', 'tomas', 'ab84b297-39d4-4ba2-b457-7fc4ba3c52aa'),
(8, '1312w312', 'carlos', 'calle pepe el risas', '14005', 'Córdoba', 'Córdoba', 'tomas', 'e4e04b9a-d61b-44f1-9005-824329248aaf'),
(9, 'awd', 'carlos', 'calle pepe el risas', '14005', 'Córdoba', 'Córdoba', 'tomas', '9e175594-f1b6-4312-8b62-7b5dc0600202'),
(10, 'aftgfwd', 'carlos', 'calle pepe el risas', '14005', 'Córdoba', 'Córdoba', 'tomas', '600b2d2b-bab5-4df7-b2a7-672a57dbadb5'),
(11, 'hfthft', 'carlos', 'calle pepe el risas', '14005', 'Córdoba', 'Córdoba', 'tomas', '82f78277-ae70-40a1-84f1-925375bd2500');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivo`
--

CREATE TABLE `dispositivo` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `marca` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `modelo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `codigo_desbloqueo` int(11) DEFAULT NULL,
  `pin_sim` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `serial` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id` int(11) NOT NULL,
  `nombre_fiscal` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre_comercial` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor_articulo`
--

CREATE TABLE `proveedor_articulo` (
  `id_proveedor` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reparacion`
--

CREATE TABLE `reparacion` (
  `id` int(11) NOT NULL,
  `id_dispositivo` int(11) NOT NULL,
  `id_tecnico` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `estado` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accesorios` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_compromiso` datetime NOT NULL,
  `averia` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observaciones` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnico`
--

CREATE TABLE `tecnico` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_usuario` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered` datetime NOT NULL DEFAULT current_timestamp(),
  `last_login` datetime DEFAULT NULL,
  `rol` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `registered`, `last_login`, `rol`, `email`) VALUES
('2e16212a-6ab5-436b-8336-7549b5626aa1', 'julian', '$2a$10$jkfo1V7b1PXmhrbNEGoBxOWkNelACZeCtLsVBtSfhRKNK.5/s.V32', '2022-04-23 15:37:36', NULL, 'admin', 'julian@gestirediel.com'),
('600b2d2b-bab5-4df7-b2a7-672a57dbadb5', 'carlos', '$2a$10$GhHOdOdjYKFlkepJLDKx3eakBNd7ghymJ.y3AKaDnI.6lG/QF1Aue', '2022-04-24 14:32:02', NULL, 'cliente', 'gy@gestirediel.com'),
('621c5584-e8d6-4ddb-b1ef-70aab5c561c6', 'federico', '$2a$10$JU4iLLRdC8SSg4jhjxGYL.Dg2HGW11g7EFFtbEqtULv5qQ/Bbo9.q', '2022-04-23 16:16:18', NULL, 'cliente', 'carlos@gestirediel.com'),
('6b467e3c-a580-46d3-a29f-ba19baf3111a', 'carlos', '$2a$10$3slppt4WM6r4am0PdVXphurBPVRZiSKRMobHrlf0iPK/as3rhRY0C', '2022-04-23 16:40:32', NULL, 'cliente', 'laura@gestirediel.com'),
('7c0699d1-57ea-4514-9b5a-c835e5208645', 'julian', '$2a$10$qaSIwxd2oa3uOLvXIa58ve/kjZu9nilzoEU3OPlShUKR5bTH/NUX6', '2022-04-23 15:40:03', NULL, 'admin', 'charito@gmail.com'),
('82f78277-ae70-40a1-84f1-925375bd2500', 'carlos', '$2a$10$dFPUSALWudc2wQUXYWXvCeRJMejrgtHh4T1Gdye3xu4a/NZlP84d.', '2022-04-24 14:32:06', NULL, 'cliente', 'hfth@gestirediel.com'),
('9e175594-f1b6-4312-8b62-7b5dc0600202', 'carlos', '$2a$10$NzkdryU0m8HHZ1DigHfitOG6diWH6hxDECG7O2AfzrTT8Wv.U3B3u', '2022-04-24 14:31:58', NULL, 'cliente', 'wd@gestirediel.com'),
('ab84b297-39d4-4ba2-b457-7fc4ba3c52aa', 'carlos', '$2a$10$iit6nT/AJPJQcg4lEv35MuTJicwAKrla3v/xdGTIWnW7OmMyK.6Mm', '2022-04-24 14:31:47', NULL, 'cliente', 'a@gestirediel.com'),
('e4e04b9a-d61b-44f1-9005-824329248aaf', 'carlos', '$2a$10$wAQvh9YghY0I7l7jpbnQXOgDl22pCqGYMGhaT5lkep5qf7wqhZYXu', '2022-04-24 14:31:53', NULL, 'cliente', 'daw@gestirediel.com'),
('e6693a3f-ed8a-444a-a169-1891006a80c1', 'carlos', '$2a$10$lnprlfCtenK86wjugOFVQuq6y.NuBK2knnI4XZFh4tzq0bRZ44AtG', '2022-04-24 14:31:41', NULL, 'cliente', 'c@gestirediel.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('3331b46d-0a6a-4b83-bc55-0891db0458d0', 'cc11eaac4295f01f62aa096bc0abfcfa33c512aaf4761e7566e5f3985f1b2a6c', '2022-04-23 12:49:31.101', '20220423120343_nif_type_change', NULL, NULL, '2022-04-23 12:49:29.991', 1),
('e91f0fcc-9429-4c2a-bead-d8dbcef6fade', '67dd80d8d0f42e7358368ae408102fdb0c623145d8c720d092fcad98215480e2', '2022-04-23 12:49:29.959', '20220421154652_init', NULL, NULL, '2022-04-23 12:49:12.161', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `almacen`
--
ALTER TABLE `almacen`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_almacen` (`id_almacen`),
  ADD KEY `fk_categoria` (`id_categoria`);

--
-- Indices de la tabla `articulo_factura`
--
ALTER TABLE `articulo_factura`
  ADD KEY `fk_articulo_factura` (`id_articulo`),
  ADD KEY `fk_factura` (`serial`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `fk_id_articulo_reparacion` (`id_articulo`),
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
-- AUTO_INCREMENT de la tabla `almacen`
--
ALTER TABLE `almacen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `dispositivo`
--
ALTER TABLE `dispositivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reparacion`
--
ALTER TABLE `reparacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tecnico`
--
ALTER TABLE `tecnico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD CONSTRAINT `fk_almacen` FOREIGN KEY (`id_almacen`) REFERENCES `almacen` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `articulo_factura`
--
ALTER TABLE `articulo_factura`
  ADD CONSTRAINT `fk_articulo_factura` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_factura` FOREIGN KEY (`serial`) REFERENCES `factura` (`serial`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `fk_id_articulo_reparacion` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
