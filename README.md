# modern-web-development

Репозиторий лабораторных работ. На ветке `laba5` `index.html` — страница лабораторной №5 (Vue 3). Ранее в нём была сайт-визитка: статичная вёрстка лабораторной №1, динамическое поведение на jQuery из лабораторной №2 и стили на Sass с темами из лабораторной №3 (см. `main`).

## Автор

- ФИО: Толкачев Иван Андреевич
- Группа: ФИТ-241

## Лабораторная работа №5 — Введение в Vue 3

Одна HTML-страница с семью мини-задачами, каждая оформлена отдельным компонентом Vue 3. Vue подключён из CDN, всё находится в `index.html`, сборка не нужна. В задаче 1 используется Options API, в задачах 2–7 — Composition API (`setup()`).

Запуск: открыть `index.html` в браузере или выполнить `npx serve .` в корне репозитория (нужен доступ к интернету для загрузки Vue с CDN).

Задачи:

1. Привет, Vue! — интерполяция и `v-model` (Options API).
2. Реактивный счётчик — `ref` и `@click`.
3. Условный рендеринг — `v-if` / `v-else`, кнопка «Показать/Скрыть описание».
4. Список элементов — `v-for` и уникальные `:key`, порядковый номер и название.
5. Мини-форма — `v-model`, `@submit.prevent`, добавление записей в массив.
6. Вычисляемые свойства — квадрат и куб числа через `computed`.
7. Watch и жизненный цикл — часы на `onMounted`/`onUnmounted`, `watch` с выводом в консоль, приветствие по часу.

## Деплой

https://andreevich404.github.io/modern-web-development/

## Структура проекта

```
index.html
package.json
package-lock.json
scss/
  utils/        # переменные, функции, миксины
  base/         # reset, типографика, базовые теги
  layout/       # header, nav, секции, сетки, footer
  components/   # button, card, carousel, modal, form ...
  themes/       # светлая и тёмная палитры
  main.scss
dist/           # собранный CSS (в .gitignore)
js/
  script.js
data/
  portfolio.json
images/
README.md
.gitignore     # node_modules/, dist/
```
