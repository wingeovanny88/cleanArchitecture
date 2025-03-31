src/                     # Raíz del proyecto
├── application/         # Lógica de negocio y casos de uso
│   ├── use-cases/       # Casos de uso (acciones específicas, ej. crear un item)
│   │   └── create-item.use-case.ts
│   └── dtos/            # Objetos para transferir y validar datos entre capas
│       └── create-item.dto.ts
├── domain/              # Núcleo del negocio, sin dependencias externas
│   ├── entities/        # Entidades que representan los datos y reglas del negocio
│   │   └── item.entity.ts
│   ├── exceptions/      # Excepciones propias del dominio (errores de negocio)
│   │   └── item-not-found.exception.ts
│   ├── repositories/    # Contratos (interfaces) para acceso a datos
│   │   └── item.repository.ts
│   └── services/        # Lógica de negocio pura (reglas y validaciones)
│       └── item.service.ts
├── infrastructure/      # Implementaciones técnicas y adaptadores externos
│   ├── adapters/        # Adaptadores para conectar con otros servicios
│   │   ├── database/    # Implementaciones de persistencia (ej. TypeORM)
│   │   │   └── typeorm-item.repository.ts
│   │   ├── http/        # Clientes HTTP para llamadas a servicios externos
│   │   │   └── axios-client.ts
│   │   └── kafka/       # Adaptador para comunicación con Kafka
│   │       └── kafka.producer.ts
│   ├── config/          # Configuración central (Kafka, base de datos, Redis, etc.)
│   │   ├── database.config.ts
│   │   ├── kafka.config.ts
│   │   └── redis.config.ts
│   ├── controllers/     # Controladores de NestJS para gestionar las solicitudes HTTP
│   │   └── item.controller.ts
│   ├── modules/         # Módulos de NestJS que agrupan y organizan la aplicación
│   │   └── item.module.ts
│   ├── interceptors/    # Interceptores globales (ej. para logging o control de tiempos)
│   ├── middleware/      # Middleware para procesar solicitudes antes de los controladores
│   ├── filters/         # Filtros de excepciones personalizados
│   ├── guards/          # Guards para proteger rutas y controlar el acceso
│   └── exceptions/      # Manejo centralizado de excepciones en la infraestructura
├── utils/               # Funciones genéricas y reutilizables en toda la aplicación
│   ├── date.util.ts
│   └── crypto.util.ts
├── commons/             # Componentes compartidos, como el logger centralizado
│   └── logger.ts
├── main.ts              # Punto de entrada principal de la aplicación
└── app.module.ts        # Módulo raíz que integra toda la aplicación

