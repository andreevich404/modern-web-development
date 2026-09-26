# modern-web-development

Сайт-визитка: статичная вёрстка лабораторной №1, динамическое поведение на jQuery из лабораторной №2 и стили на Sass с темами из лабораторной №3.

## Автор

- ФИО: Толкачев Иван Андреевич
- Группа: ФИТ-241

## Деплой

https://andreevich404.github.io/modern-web-development/

## Лабораторная работа №3 — Sass

Стили переписаны на Sass (SCSS, пакет `sass`), сайт получил переключатель светлой и тёмной темы.

- Модули: `scss/utils`, `base`, `layout`, `components`, `themes`; в каждой папке `_index.scss` с `@forward`, точка входа `scss/main.scss` подключает папки через `@use` (`@import` не используется)
- Переменные и карты: размеры, шрифты, радиусы, слои, брейкпоинты (`$breakpoints`: mobile / tablet / desktop) в `utils/_variables.scss`
- Функции: `rem($px)` (через `math.div`), `z($layer)`
- Миксины: `respond-to($breakpoint)` (`@content` + `@error`), `flex-center`, `focus-ring`, `hover-lift`
- БЭМ: все классы вида `блок__элемент--модификатор`, селекторы в итоговом CSS не длиннее двух уровней; JS работает через `data-*` атрибуты, а не через классы оформления
- Темы: палитры `$theme-light` и `$theme-dark` (карты) через `@each` превращаются в CSS-переменные `--color-*` (`:root` и `[data-theme='dark']`); переключатель на jQuery ставит `data-theme` на `<html>` и сохраняет выбор в `localStorage`, при первом визите учитывается `prefers-color-scheme`
- Компонент `.button`: модификаторы `--primary`, `--outline`, `--small`, `--block`, состояния `:hover`, `:focus-visible`, `:active`, `:disabled`

### Запуск с нуля

```bash
npm install
npm run build      # сжатая сборка в dist/css/main.css
# или при разработке:
npm run sass:dev   # пересборка при изменениях в scss/
```

Затем запустить локальный сервер (в соседнем терминале) и открыть выведенный адрес:

```bash
npx serve .
```

## Лабораторная работа №2 — динамика на jQuery

Подключена библиотека jQuery 3.7.1 (CDN). Реализовано:

- Выпадающее мобильное меню (`slideToggle` по клику на кнопку)
- Форма обратной связи с валидацией имени, email и сообщения
- Симуляция отправки формы через `$.ajax()`
- Модальное окно проекта: закрытие по крестику, оверлею и Escape
- Галерея портфолио загружается из `data/portfolio.json` (`$.getJSON`) и рендерится jQuery
- Анимации: `fadeIn` карточек, `slideToggle` меню, плавный скролл секций
- Карусель навыков с кнопками «Предыдущий» / «Следующий» и автопрокруткой
- Подсветка активного пункта меню при скролле
- Кнопка «Вверх» с плавным возвратом к началу страницы

## Лабораторная работа №1 — статичная страница-визитка

Одностраничный сайт-визитка на HTML5 и CSS3. Семантическая разметка, адаптивный макет на Flexbox/Grid с тремя брейкпоинтами (mobile / tablet / desktop).

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
