# 🔮 Приглашение для Ведьмочки

Интерактивное приглашение на встречу в стиле пастельного гримуара: печать на гримуаре → магический шар → вопрос с убегающим «Нет» → выбор зелья (бильярд / кино / коньки) → календарь и время → карта Таро → ответ в Telegram. По экранам спрятаны 5 клубничек 🍓.

## ⚠️ Перед деплоем

Весь текст — в `src/config.js`. Проверь:
- тексты квиза, зелий и клубничек
- рамки календаря (`dateRange`) и времени (`timeRange`)
- `telegramUsername`

## Локально

```bash
npm install
npm run dev
```

## Деплой на GitHub Pages

1. Создай **пустой** репозиторий `Invite` на github.com (без README).
2. `git remote add origin https://github.com/nezatop/Invite.git`
3. `git push -u origin main`
4. В репозитории: **Settings → Pages → Source: GitHub Actions**.
5. Через минуту сайт будет на `https://nezatop.github.io/Invite/`.

Если репозиторий называется иначе — поменяй `base` в `vite.config.js`.
