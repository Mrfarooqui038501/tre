# Project Style Guide

This document defines coding, naming, and architectural standards
used in this Trello Clone project.

---

## 1. JavaScript & React Standards

- Follow **Google JavaScript Style Guide**
- Enforced using **ESLint**
- Formatting handled by **Prettier**

### Rules
- Use `const` and `let`, never `var`
- Use arrow functions for callbacks
- Prefer async/await over promises
- Avoid inline anonymous functions in JSX

---

## 2. Naming Conventions

### Components
- PascalCase  
  ✅ `AddNewBoard.jsx`  
  ❌ `addNewBoard.jsx`


---

## 3. Folder Structure

```txt
src/
  api/            → API calls
  components/     → Reusable UI components
  pages/          → Route-level components
  layouts/        → App layouts

