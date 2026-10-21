# WoodNest — Nature's Perfect Hideaways

Landing page interactiva y experiencia de reserva para **WoodNest**, una plataforma de cabañas de lujo seleccionadas en entornos naturales. Desarrollada con **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS** y **Framer Motion**.

---

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Características Principales](#características-principales)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Arquitectura y Estructura del Proyecto](#arquitectura-y-estructura-del-proyecto)
5. [Requisitos Previos](#requisitos-previos)
6. [Instalación y Ejecución Local](#instalación-y-ejecución-local)
7. [Ejecución con Docker](#ejecución-con-docker)
8. [Scripts Disponibles](#scripts-disponibles)

---

## Descripción General

**WoodNest** presenta una interfaz inmersiva a pantalla completa (`ViewportFrame`) diseñada para destacar alojamientos exclusivos en la naturaleza (como *Evergreen Pine Family Lodge*). La experiencia comienza con una secuencia de precarga animada (`PreloaderOverlay`) que traza el borde del marco en SVG mientras incrementa el progreso con una curva de aceleración cúbica (`easeInOutCubic`). Al completarse la carga:

- La ilustración vectorial nocturna de la cabaña (`CabinSceneBackground`) enciende suavemente su iluminación interior cálida y el reflejo sobre el porche.
- Los elementos de navegación (`Navbar`), el titular principal (`HeroSection`), la insignia de calificaciones (`RatingBadge`) y la tarjeta de reserva con efecto *glassmorphism* (`BookingCard`) entran en escena mediante transiciones escalonadas con **Framer Motion**.
- El logotipo de **WoodNest** permite reiniciar interactivamente toda la secuencia de animación en cualquier momento.

---

## Características Principales

- **Secuencia de Precarga Animada (`usePreloaderProgress` & `PreloaderOverlay`)**:
  - Animación fluida de `0%` a `100%` controlada mediante `requestAnimationFrame` y interpolación `easeInOutCubic`.
  - Trazado progresivo del contorno perimetral SVG (`strokeDashoffset`) sincronizado con el porcentaje de carga.
  - Función de repetición interactiva (`replay`) accesible al hacer clic en el logo de la barra de navegación.
- **Escena Vectorial Dinámica (`CabinSceneBackground`)**:
  - Ilustración SVG multicapa de un bosque de pinos y cabaña alpina con gradientes atmosféricos nocturnos.
  - Transición dinámica de iluminación (`isLit`) que activa el resplandor interior de las ventanas y la luz proyectada sobre el porche al finalizar el preloader.
- **Diseño Glassmorphism y UI Modular**:
  - Componentes reutilizables (`GlassCard`, `Button`, `IconBadge`, `RatingBadge`) con desenfoque de fondo (`backdrop-blur`), bordes translúcidos y tipografía **Plus Jakarta Sans**.
- **Tarjeta de Reserva (`BookingCard`)**:
  - Visualización estructurada de fechas de estancia, horarios de *check-in* / *check-out*, capacidad de huéspedes y tarifa por noche.
- **Soporte Completo para Contenedores (Docker)**:
  - Configuración lista para entornos de desarrollo (con *hot-reloading* vía Watchpack Polling) y producción mediante compilación `standalone` multi-etapa en Node 20 Alpine.

---

## Stack Tecnológico

| Categoría | Tecnología | Versión |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router + Turbopack) | `^15.1.0` |
| **Librería UI** | React / React DOM | `^19.0.0` |
| **Lenguaje** | TypeScript | `^5.7.2` |
| **Estilos** | Tailwind CSS | `^3.4.17` |
| **Animaciones** | Framer Motion | `^11.15.0` |
| **Iconografía** | Lucide React | `^0.468.0` |
| **Utilidades CSS** | `clsx` + `tailwind-merge` | `^2.1.1` / `^2.5.5` |
| **Contenedores** | Docker & Docker Compose (Node 20 Alpine + pnpm) | - |

---

## Arquitectura y Estructura del Proyecto

El proyecto sigue una arquitectura modular orientada a características (*feature-based architecture*), separando los componentes de diseño global, primitivas de UI, hooks personalizados y módulos de dominio:

```text
├── src/
│   ├── app/
│   │   ├── globals.css                     # Estilos base y directivas de Tailwind CSS
│   │   ├── layout.tsx                      # RootLayout, metadatos SEO y fuente Plus Jakarta Sans
│   │   └── page.tsx                        # Punto de entrada principal que renderiza HeroSection
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                  # Barra superior con navegación, CTA y trigger de replay
│   │   │   └── ViewportFrame.tsx           # Contenedor principal a pantalla completa con bordes redondeados
│   │   └── ui/
│   │       ├── Button.tsx                  # Botón reutilizable con variantes y tamaños
│   │       ├── GlassCard.tsx               # Contenedor con efecto glassmorphism
│   │       └── IconBadge.tsx               # Botón circular translúcido para iconos de acción
│   ├── features/
│   │   └── hero-booking/
│   │       ├── components/
│   │       │   ├── BookingCard.tsx         # Tarjeta de resumen y reserva de la cabaña
│   │       │   ├── CabinSceneBackground.tsx# Escena SVG de la cabaña con iluminación reactiva
│   │       │   ├── HeroSection.tsx         # Orquestador de la vista principal y animaciones
│   │       │   ├── PreloaderOverlay.tsx    # Superposición del contador de carga y borde animado SVG
│   │       │   └── RatingBadge.tsx         # Indicador de puntuación y reseñas de clientes
│   │       ├── data/
│   │       │   └── cabinData.ts            # Datos estáticos del hero, navegación y detalles de reserva
│   │       └── types/
│   │           └── index.ts                # Interfaces TypeScript del dominio (NavItem, HeroStats, CabinBookingDetails)
│   ├── hooks/
│   │   └── usePreloaderProgress.ts         # Hook personalizado para el progreso animado con requestAnimationFrame
│   └── lib/
│       └── utils.ts                        # Función helper cn() para combinar clases de Tailwind
├── Dockerfile                              # Build multi-stage optimizado para producción (Next.js standalone)
├── Dockerfile.dev                          # Imagen para entorno de desarrollo
├── docker-compose.yml                      # Orquestación del contenedor en modo producción
├── docker-compose.dev.yml                  # Orquestación del contenedor en modo desarrollo con volúmenes
├── next.config.ts                          # Configuración de Next.js (output: "standalone")
├── tailwind.config.ts                      # Configuración de Tailwind CSS y fuente personalizada
└── tsconfig.json                           # Configuración estricta de TypeScript y alias (@/*)
```

---

## Requisitos Previos

- **Node.js**: `>= 20.x`
- **Gestor de paquetes**: `pnpm` (recomendado, v9.15+), `npm` o `yarn`
- **Docker y Docker Compose** *(opcional, para ejecución en contenedores)*

---

## Instalación y Ejecución Local

1. **Instalar las dependencias**:

   ```bash
   pnpm install
   # o con npm:
   npm install
   ```

2. **Iniciar el servidor de desarrollo (con Turbopack)**:

   ```bash
   pnpm run dev
   # o con npm:
   npm run dev
   ```

3. **Abrir la aplicación en el navegador**:
   Visita [http://localhost:3000](http://localhost:3000).

---

## Ejecución con Docker

El proyecto incluye configuraciones listas tanto para desarrollo como para producción en el puerto `3000`.

### Modo Desarrollo (con recarga en caliente)
```bash
npm run docker:dev
# Equivalente a: docker compose -f docker-compose.dev.yml up --build
```

### Modo Producción (Next.js Standalone Build)
```bash
npm run docker:prod
# Equivalente a: docker compose up --build
```

---

## Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo de Next.js utilizando `--turbopack`. |
| `npm run build` | Genera la compilación optimizada para producción (`.next/standalone`). |
| `npm run start` | Inicia el servidor de producción de Next.js. |
| `npm run lint` | Ejecuta el analizador estático de código (`next lint`). |
| `npm run docker:dev` | Construye y levanta el contenedor de desarrollo con Docker Compose. |
| `npm run docker:prod` | Construye y levanta el contenedor de producción multi-etapa con Docker Compose. |
