# solow-workshop

Este branch es el boilerplate, con la siguiente estructura básica:

```bash
.
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Header
│   │   │   └── index.tsx
│   │   ├── Main
│   │   │   └── index.tsx
│   │   └── common
│   │       └── Button
│   │           └── index.tsx
│   ├── contexts
│   │   └── Web3Context.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

Nuestra aplicación se va a enfocar mas que nada en `src`. Dentro de ella vamos a tener una carpeta de componentes, donde se van a incluir 3 componentes: `Header`, `Main`, y por ahora un componente comun a todos llamado `Button`.

También vamos a crear un contexto de React llamado `Web3Context` el cual va a manejar toda nuestra lógica de conexión y desconexión con Web3, asi como también toda la información relevante. La idea del contexto es poder acceder a toda la información del usuario necesaria para ejecutar acciones.
