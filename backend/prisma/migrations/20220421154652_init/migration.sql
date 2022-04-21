-- CreateTable
CREATE TABLE `almacen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `direccion` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articulo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(50) NOT NULL,
    `referencia` VARCHAR(50) NOT NULL,
    `precio_coste` INTEGER NOT NULL,
    `precio_venta` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `id_categoria` INTEGER NOT NULL,
    `id_almacen` INTEGER NOT NULL,

    INDEX `fk_almacen`(`id_almacen`),
    INDEX `fk_categoria`(`id_categoria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articulo_factura` (
    `serial` VARCHAR(50) NOT NULL,
    `precio` INTEGER NOT NULL,
    `id_articulo` INTEGER NOT NULL,
    `descripcion` VARCHAR(255) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `dto` INTEGER NOT NULL,

    INDEX `fk_articulo_factura`(`id_articulo`),
    INDEX `fk_factura`(`serial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `seccion` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nif` INTEGER NOT NULL,
    `nombre_fiscal` VARCHAR(50) NOT NULL,
    `domicilio` VARCHAR(255) NOT NULL,
    `CP` VARCHAR(10) NOT NULL,
    `poblacion` VARCHAR(50) NOT NULL,
    `provincia` VARCHAR(50) NOT NULL,
    `persona_contacto` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `id_usuario` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `nif`(`nif`),
    INDEX `fk_id_user2`(`id_usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispositivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(50) NOT NULL,
    `marca` VARCHAR(50) NOT NULL,
    `modelo` VARCHAR(50) NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `codigo_desbloqueo` INTEGER NULL,
    `pin_sim` INTEGER NULL,

    INDEX `fk_cliente`(`id_cliente`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factura` (
    `serial` VARCHAR(50) NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `fecha_hora` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_cliente_factura`(`id_cliente`),
    PRIMARY KEY (`serial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proveedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_fiscal` VARCHAR(50) NOT NULL,
    `nombre_comercial` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proveedor_articulo` (
    `id_proveedor` INTEGER NOT NULL,
    `id_articulo` INTEGER NOT NULL,

    INDEX `fk_id_articulo`(`id_articulo`),
    INDEX `fk_id_proveedor`(`id_proveedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reparacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_dispositivo` INTEGER NOT NULL,
    `id_tecnico` INTEGER NOT NULL,
    `id_articulo` INTEGER NOT NULL,
    `estado` VARCHAR(50) NOT NULL,
    `accesorios` VARCHAR(500) NOT NULL,
    `fecha_compromiso` DATETIME(0) NOT NULL,
    `averia` VARCHAR(50) NOT NULL,
    `observaciones` VARCHAR(255) NOT NULL,

    INDEX `fk_id_articulo_reparacion`(`id_articulo`),
    INDEX `fk_id_dispositivo`(`id_dispositivo`),
    INDEX `fk_id_tecnico`(`id_tecnico`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `rol` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tecnico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `id_usuario` VARCHAR(100) NOT NULL,

    INDEX `fk_id_rol1`(`id_usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `registered` DATETIME(0) NULL,
    `last_login` DATETIME(0) NULL,
    `rol` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `fk_almacen` FOREIGN KEY (`id_almacen`) REFERENCES `almacen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articulo_factura` ADD CONSTRAINT `fk_articulo_factura` FOREIGN KEY (`id_articulo`) REFERENCES `articulo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articulo_factura` ADD CONSTRAINT `fk_factura` FOREIGN KEY (`serial`) REFERENCES `factura`(`serial`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `fk_id_user2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispositivo` ADD CONSTRAINT `fk_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factura` ADD CONSTRAINT `fk_cliente_factura` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proveedor_articulo` ADD CONSTRAINT `fk_id_articulo` FOREIGN KEY (`id_articulo`) REFERENCES `articulo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proveedor_articulo` ADD CONSTRAINT `fk_id_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reparacion` ADD CONSTRAINT `fk_id_articulo_reparacion` FOREIGN KEY (`id_articulo`) REFERENCES `articulo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reparacion` ADD CONSTRAINT `fk_id_dispositivo` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reparacion` ADD CONSTRAINT `fk_id_tecnico` FOREIGN KEY (`id_tecnico`) REFERENCES `tecnico`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tecnico` ADD CONSTRAINT `fk_id_rol1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
