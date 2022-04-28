## Как создать новый проект на vite?

Удалите старый ClientApp (если он есть) и запустите команду `yarn create vite ClientApp`

Vite.js из коробки называет входную точку проекта `main.jsx` и кладет его в папку `src/`.
Переименуйте этот файл в `index.jsx`. P.S.`index.html` обращается к этому файлу, не забудьте там поменять.

## Как добавить в проект?

- Установите dependencies:
    - `yarn add @fortawesome/fontawesome-free@^5.15.4 bootstrap@5.1.3 prop-types@15.8.1 react@17.0.2 react-dom@17.0.2 react-router@6.2.1 react-router-dom@6.2.1 react-image-crop@^9.1.1 react-bootstrap@^2.3.0 sweetalert2@11.4.9 react-flatpickr@^3.10.11`


- Установите devDependencies
    - `yarn add vite@^2.8.6 @vitejs/plugin-react@1.3.1 -D`


- Установите библиотеку
    - `yarn add frontend-lib@file:../../frontend-lib`


- Вставьте в самый верх `src/index.jsx`:
    ```
    import "bootstrap/dist/css/bootstrap.css";
    import "@fortawesome/fontawesome-free/css/all.css";
    import "flatpickr/dist/themes/material_green.css";
    import "sweetalert2/dist/sweetalert2.min.css";
    ```

- Скопируйте файл `jsconfig.json` из библиотеки в корень проекта

## Как использовать в коде?

`import {...} from "frontend-lib/...";`

К примеру:

```
import {MySharedComponent} from "frontend-lib/components";
import {mySharedHook} from "frontend-lib/hooks";
```

## Как применить изменения библиотеки в проекте?

- Запустите команду `yarn upgrade frontend-lib` в проекте