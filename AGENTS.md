# AGENTS.md — WoodNest Project Guide for AI Coding Agents

Guía de contexto arquitectónico, convenciones de código, sistema de diseño y flujos de trabajo para agentes de IA que trabajen en el repositorio **WoodNest — Nature's Perfect Hideaways**.

---

## 1. Descripción del Proyecto

**WoodNest** es una landing page inmersiva y experiencia de reserva para cabañas de lujo en la naturaleza (como *Evergreen Pine Family Lodge*). La interfaz opera dentro de un marco a pantalla completa (`ViewportFrame`) con una secuencia de precarga animada (`PreloaderOverlay`) que traza el contorno perimetral en SVG de `0%` a `100%` y enciende progresivamente la iluminación interior cálida de la escena vectorial nocturna (`CabinSceneBackground`), revelando finalmente la barra de navegación (`Navbar`), el titular principal (`HeroSection`), la insignia de reseñas (`RatingBadge`) y la tarjeta de reserva (`BookingCard`).

---

## 2. Stack Tecnológico

- **Framework**: Next.js `^15.1.0` (App Router, compilación `output: "standalone"`, desarrollo con `--turbopack`)
- **UI Runtime**: React `^19.0.0` & React DOM `^19.0.0`
- **Lenguaje**: TypeScript `^5.7.2` (`strict: true`, alias `@/*` -> `./src/*`)
- **Estilos**: Tailwind CSS `^3.4.17` + `clsx` + `tailwind-merge` (`cn()` helper en `src/lib/utils.ts`)
- **Animaciones**: `framer-motion` `^11.15.0` + `requestAnimationFrame` (`usePreloaderProgress`)
- **Iconos**: `lucide-react` `^0.468.0`
- **Tipografía**: `Plus_Jakarta_Sans` (`next/font/google`, variable CSS `--font-jakarta`)
- **Contenedores**: Docker & Docker Compose (`Node 20 Alpine` + `pnpm@9.15.0`)

---

## 3. Arquitectura y Estructura de Directorios

El proyecto sigue una arquitectura **orientada a características (*Feature-Based Architecture*)** con clara separación entre primitivas UI, layout global y módulos de negocio:

```text
src/
├── app/
│   ├── globals.css                     # Directivas de Tailwind y estilos base del body (#0c1a24, overflow-hidden)
│   ├── layout.tsx                      # RootLayout (Server Component), metadatos SEO y fuente Plus Jakarta Sans
│   └── page.tsx                        # Página principal (Server Component) que monta <HeroSection />
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                  # Header animado con navegación, CTA y botón de replay en el logo
│   │   └── ViewportFrame.tsx           # Contenedor 100vw x 100vh con marco redondeado rounded-[28px]
│   └── ui/
│       ├── Button.tsx                  # Primitiva de botón con forwardRef (variants: "primary" | "glass", sizes: "sm" | "md" | "lg")
│       ├── GlassCard.tsx               # Tarjeta translúcida con backdrop-blur-xl y borde sutil
│       └── IconBadge.tsx               # Botón circular translúcido para acciones secundarias con icono
├── features/
│   └── hero-booking/
│       ├── components/
│       │   ├── BookingCard.tsx         # Tarjeta de reserva (fechas, check-in/out, precio/noche, CTA Reserve)
│       │   ├── CabinSceneBackground.tsx# Ilustración SVG multicapa con estado reactivo `isLit`
│       │   ├── HeroSection.tsx         # Orquestador del estado de carga y animaciones de entrada
│       │   ├── PreloaderOverlay.tsx    # Borde SVG animado con strokeDashoffset y contador porcentual
│       │   └── RatingBadge.tsx         # Indicador de calificación con estrella iluminada y total de estancias
│       ├── data/
│       │   └── cabinData.ts            # Constantes tipadas (NAV_ITEMS, HERO_HEADLINE, HERO_STATS, CABIN_BOOKING_DATA)
│       └── types/
│           └── index.ts                # Contratos TypeScript (NavItem, CabinBookingDetails, HeroStats)
├── hooks/
│   └── usePreloaderProgress.ts         # Hook de animación 0-100% con curva easeInOutCubic y función replay()
└── lib/
    └── utils.ts                        # Helper cn(...inputs) combinando clsx y tailwind-merge
```

### Reglas de Organización al Escalar
1. **Nuevas funcionalidades de dominio**: Crear una carpeta dedicada bajo `src/features/<feature-name>/` con subdirectorios `components/`, `data/`, `types/` (y `hooks/` si son exclusivos de esa feature).
2. **Primitivas UI compartidas**: Colocar en `src/components/ui/` únicamente componentes agnósticos de datos del negocio.
3. **Datos y Tipos**: Nunca incrustar textos estáticos extensos o estructuras de datos directamente en el JSX; definirlos tipados en `data/` y `types/`.

---

## 4. Comandos de Desarrollo y Construcción

| Acción | Comando | Notas |
| :--- | :--- | :--- |
| **Servidor de desarrollo** | `npm run dev` / `pnpm run dev` | Ejecuta `next dev --turbopack` en el puerto `3000` |
| **Build de producción** | `npm run build` / `pnpm run build` | Genera la compilación `.next/standalone` y valida tipos |
| **Servidor de producción** | `npm run start` / `pnpm run start` | Inicia `next start` |
| **Linter** | `npm run lint` / `pnpm run lint` | Ejecuta `next lint` |
| **Docker Desarrollo** | `npm run docker:dev` | `docker compose -f docker-compose.dev.yml up --build` |
| **Docker Producción** | `npm run docker:prod` | `docker compose up --build` |

---

## 5. Convenciones de Código

### TypeScript y Módulos
- **Tipado estricto**: Prohibido el uso de `any`. Definir interfaces explícitas para todas las props de componentes y valores de retorno de hooks.
- **Imports**: Usar el alias `@/*` para importaciones entre módulos (ej. `import { cn } from "@/lib/utils"`) e importaciones relativas únicamente dentro de la misma feature (`../types`, `./BookingCard`).
- **Componentes UI**: Extender atributos nativos de HTML (`React.ButtonHTMLAttributes<HTMLButtonElement>`, `React.HTMLAttributes<HTMLDivElement>`) y fusionar clases siempre con `cn()`.

### Next.js App Router (Server vs Client Components)
- Mantener `src/app/layout.tsx` y `src/app/page.tsx` como **Server Components**.
- Añadir la directiva `"use client";` en la primera línea **únicamente** en componentes que utilicen hooks de React (`useState`, `useEffect`, `useCallback`), eventos interactivos (`onClick`) o animaciones de `framer-motion`.
- Evitar re-renderizados infinitos en `useEffect`: usar dependencias primitivas (`durationMs`, `runId`) y limpiar siempre `requestAnimationFrame` y `setTimeout` en el retorno del efecto.

### Estilos y Sistema Visual
- **Paleta Atmosférica**:
  - Fondo base nocturno: `#0c1a24` / `#2b4c5e` y gradientes profundos (`#5c7f8e` -> `#0d1c24`).
  - Acentos cálidos de iluminación: Ámbar y naranja (`#ff9d2e`, `#f59e0b`, `#ea580c`, `#fef08a`) para simular el interior encendido de la cabaña y el indicador del logo.
  - Superficies Glassmorphism: `bg-slate-950/65 backdrop-blur-xl border border-white/15` para tarjetas principales y `bg-white/5 border border-white/10` para celdas internas.
- **Curvas de Animación**:
  - Utilizar curvas bezier suaves (`ease: [0.22, 1, 0.36, 1]`) con retardos escalonados (`delay: 0.1`, `0.18`, `0.3`, `0.38`) sincronizados con el estado `isLoaded` de `usePreloaderProgress`.
- **Iconos**: Importar exclusivamente desde `lucide-react` (excepto ilustraciones escénicas complejas como `CabinSceneBackground.tsx` o trazados de carga en `PreloaderOverlay.tsx`).

---

## 6. Skills de Agente Instaladas (`impeccable`)

Este repositorio cuenta con la skill **`impeccable` (v4.7.0)** instalada en:
- `.agents/skills/impeccable/SKILL.md`
- `skills/impeccable/SKILL.md`

### Uso de la Skill `impeccable` en Tareas de UI/UX
Cuando el usuario solicite diseñar, rediseñar, auditar, pulir, animar o mejorar cualquier superficie frontend:
1. **Lectura obligatoria**: Consultar `skills/impeccable/SKILL.md` y `skills/impeccable/reference/craft-floor.md` antes de realizar ediciones de interfaz.
2. **Inicialización de contexto**: Ejecutar `.agents/skills/impeccable/scripts/impeccable context` una vez por sesión manteniendo el directorio de trabajo en la raíz del proyecto.
3. **Modo de superficie**: La landing page principal de WoodNest opera en modo **Persuade** (el diseño y la atmósfera visual son el producto mismo y guían la conversión de reserva).
4. **Subcomandos disponibles en `skills/impeccable/reference/`**:
   - **Construcción y Arquitectura Visual**: `shape`, `init`, `document`, `extract`
   - **Evaluación**: `critique`, `audit`
   - **Refinamiento**: `polish`, `bolder`, `quieter`, `distill`, `harden`, `onboard`
   - **Mejora Visual y Movimiento**: `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive`
   - **Corrección y Adaptación**: `clarify`, `adapt`, `optimize`

---

## 7. Checklist de Verificación antes de Finalizar Cambios

1. **Integridad de Tipos y Compilación**: Verificar que `npm run build` compile sin errores de TypeScript ni de Next.js.
2. **Preservación de la Coreografía de Carga**: Asegurar que cualquier cambio en `HeroSection`, `Navbar` o `PreloaderOverlay` mantenga funcional el ciclo `progress` -> `isLoaded` y la acción `replay` al hacer clic en el logo de WoodNest.
3. **Responsividad en `ViewportFrame`**: Comprobar que los elementos dentro del contenedor `h-screen w-screen overflow-hidden` se adapten correctamente en pantallas móviles (`sm:`), tablets (`md:`) y escritorio (`lg:`) sin desbordar el marco redondeado.
