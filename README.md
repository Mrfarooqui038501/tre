# 🧩 Trello Clone (React + Trello API)

A fully functional Trello Clone built using React, Material UI, and the Trello REST API. This project replicates core Trello features such as Boards, Lists, Cards, Checklists, and Check Items, following real-world API-driven architecture.

## 🚀 Features

### ✅ Boards
* View all Trello boards
* Create new boards
* Open individual boards with their lists and cards
* Uses Trello backgrounds automatically

### ✅ Lists
* Display all lists inside a board
* Create new lists
* Archive (close) lists
* Clean Trello-like UI

### ✅ Cards
* Display all cards in a list
* Create new cards
* Archive cards
* Open card details in a modal

### ✅ Checklists
* Display all checklists in a card
* Create new checklists
* Delete checklists


### ✅ Check Items
* Display check items inside a checklist
* Create new check items
* Delete check items
* Check / uncheck items
* Progress updates automatically

### ✅ UX Enhancements
* Keyboard support (`Enter` to submit)
* Modal-based card details
* Responsive UI
* Clean dark/light contrast for readability

## 🛠 Tech Stack

### Frontend
* React (Vite)
* Material UI (MUI)
* React Router
* Axios

### API
* Trello REST API

## 📂 Project Structure
```
src/
├── api/
│   └── Apicalls.js
├── components/
│   ├── AddCard.jsx
│   ├── AddCheckItem.jsx
│   ├── AddCheckList.jsx
│   ├── AddList.jsx
│   ├── AddNewBoard.jsx
│   ├── Board.jsx
│   ├── BoardList.jsx
│   ├── Boards.jsx
│   ├── CardItem.jsx
│   ├── CardModal.jsx
│   ├── CheckItem.jsx
│   ├── CheckList.jsx
│   ├── CheckListItem.jsx
│   ├── ListCard.jsx
│   ├── Navbar.jsx
│   └── Sidebar.jsx
├── pages/
│   ├── BoardsPage.jsx
│   └── BoardPage.jsx
├── layouts/
│   └── HomeLayout.jsx
├── App.jsx
└── main.jsx
```

## 🔐 Environment Variables

Create a `.env` file in the project root:
```env
VITE_TRELLO_KEY=your_trello_api_key
VITE_TRELLO_TOKEN=your_trello_token
```

### How to get Trello API Key & Token:
1. Visit: https://trello.com/app-key
2. Copy your API Key
3. Generate a Token
4. Paste them into `.env`

## 📦 Installation & Setup
```bash
# Clone the repository
git clone https://gitlab.com/armanfarooqui/trello-react-arman.git

# Navigate to project
cd trello-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

App will run at:
```
http://localhost:5173
```

## Live Application Link
https://trello-react-arman.vercel.app/boards

## ⚠️ Important Notes (Trello API Behavior)

* Boards cannot be permanently deleted via Trello API
* Boards are closed (archived) instead
* Data is always synced with your real Trello account
* Any board created here will appear in Trello and vice-versa

## 🎯 Learning Outcomes

This project demonstrates:
* Real-world API integration
* REST API handling with Axios
* Component-based architecture
* State lifting and refresh patterns
* UI/UX consistency
* Error handling & edge cases
* Professional React folder structure



## 🔮 Future Enhancements

* Drag & drop (lists & cards)
* Board starring (favorites)
* User authentication
* Offline support
* Activity logs
* Comments on cards

## 👨‍💻 Author

**Arman**

## 📄 License

This project is open-source and available for learning purposes.

---

