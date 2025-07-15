#  SnailRace

SnailRace es una App informativa dedicada al mundo automotor, donde los usuarios pueden explorar una amplia base de datos de vehículos (autos y motos), así como conocer detalles sobre sus marcas fabricantes. La aplicación fue construida con React para el frontend y una API REST (Node.js + Express) para el backend.

---

##  ¿Cómo levantar la aplicación?

Primero, para levantar el proyecto, vamos a la terminal y en la ruta:

PS C:\Users\ferna\OneDrive\Escritorio\Parcial-Final-AP

```bash
Ponemos el comando:

ls 
```

Ahí veremos dos carpetas: una que es Parcial-n1-2025, que corresponde al backend, y otra que es SnailRace, que corresponde al frontend.

Para levantar las dos partes debemos abrir dos terminales:

En una nos posicionamos en la carpeta Parcial-n1-2025, y para hacerla correr debemos poner el comando:

```bash
npm start
```

En la otra terminal nos posicionamos en la carpeta SnailRace, y para hacerla correr debemos poner:

```bash
npm run dev
```

Si todo salió bien, deberíamos ver en la terminal de la carpeta Parcial-n1-2025 un mensaje que indica que se levantó correctamente en el puerto 3000.

Luego, tenemos que abrir el programa MongoDB Compass y conectar o levantar la conexión del programa.

Volviendo a la terminal de la carpeta Parcial-n1-2025, nos aparecerá un mensaje indicando que se conectó exitosamente con MongoDB.
¡Listo! El backend ya está corriendo.

Ahora vamos por el frontend.
En la terminal de la carpeta SnailRace, nos aparecerá un mensaje con una dirección como:

```bash
http://localhost:5173/
```

Esto nos indica que todo está funcionando correctamente. Copiamos esa URL y la pegamos en nuestro navegador para comenzar a usar la aplicación.

---

## ¿Que pude hacer el usuario en la App? 

### Usuario

el usuario común estará posicionado inicialmente en la vista Home, donde podrá leer y conocer de qué se trata la app y qué le ofrecemos.

Luego, en la barra de navegación de la app, aparecerá la opción "Ver Vehículos".
Cuando el usuario intente acceder a esa vista, será redirigido a la vista Login, ya que aún no ha iniciado sesión.

Como es su primera vez en la app, necesitará crear una cuenta registrándose desde la vista Register.

Una vez registrado, deberá iniciar sesión en la vista Login.
Después de loguearse correctamente, podrá acceder a:

```bash
La vista "Ver Vehículos"

La vista "Ver Marcas"
```

Y también a su propio perfil en Profile

Desde la vista de perfil, podrá actualizar sus datos personales y también cambiar su foto de perfil.

Volviendo a la vista de Vehículos, el usuario podrá:

```bash
Ver información detallada de autos y motos

Utilizar el filtro de búsqueda por modelo

Filtrar por precio máximo
```

De esta manera, SnailRace ofrece una experiencia completa, informativa y personalizada para todos los usuarios.


### Administrador

Funcionalidad para el Administrador
El administrador debe iniciar sesión desde la vista Login, ya que previamente ya está registrado en el sistema.
Es el único usuario con acceso a acciones y vistas exclusivas que no están disponibles para los usuarios comunes.

Vista: Ver Vehículos
En la vista Ver Vehículos, el usuario común puede ver los datos de todos los autos y motos.
Pero el administrador, además de ver esta información, también visualiza botones adicionales que le permiten:

```bash
Crear Vehículo → Navega a la vista VehicleForm

Editar Vehículo

Eliminar Vehículo
```

Vista: Ver Marcas
Del mismo modo, en la vista Ver Marcas, el administrador puede:

```bash
Crear Marca

Editar Marca

Eliminar Marca
```

Además, el administrador también tiene acceso a su vista de perfil (Profile) donde puede modificar sus datos y actualizar su foto de perfil, igual que un usuario común.





