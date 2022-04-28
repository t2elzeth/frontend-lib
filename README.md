## Как добавить в проект?

- Выполните в корне библиотеки
  - `yarn build`
- Выполните в корне проекта
  - `yarn add frontend-lib@file:../../frontend-lib/dist`

- Вставьте в самый верх `src/index.jsx`(или `src/main.jsx`) в проекте:
  - `import "frontend-lib/style.css";`

## Как использовать в коде?

`import {...} from "frontend-lib/...";`

К примеру:

```
import {MySharedComponent} from "frontend-lib/components";
import {mySharedHook} from "frontend-lib/hooks";
```

## Как применить изменения библиотеки в проекте?

- Запустите команду `yarn build` в библиотеке
- Запустите команду `yarn upgrade frontend-lib` в проекте