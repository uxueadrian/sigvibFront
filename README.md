# Integradora SIGVIB

## Para descargar dependencias
>[!NOTE]
> Si clonas el repositorio, solo vuelve a descargar las dependecias con el comando de abajo :relaxed:
```bash
    npm i 
    #o 
    npm install
```

# Trabajar con git

Primero lo que necesitas hacer es descargar tu rama(ya esta en el repo remoto) y para hacerlo, realiza lo siguiente:

```bash
##Este comando crea la rama y busca la que coincida con las que ya estan en github y las descarga 
git checkout -b {nombreDeTuRama} origin/{nombreDeTuRama}
# Ejemplo
git checkout -b enrique origin/enrique
git pull
```

> [!NOTE]
> Todas las ramas las tienen el github, favor de cuando hagan este paso nombren sus ramas igual a la del repo remoto(github)


Obtener cambios de una rama a otra

```bash
##Primero asegurarnos de que estamos en la rama donde queremos tener los cambios:
git checkout main {Rama}
##Para obtener cambios de una rama a otra es asi:
git pull origin {Rama con las modificaciones}


```
