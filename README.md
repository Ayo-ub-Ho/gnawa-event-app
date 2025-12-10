# 🎵 La Grande Soirée Gnawa

<div align="center">
  <img src="docs/banner.png" alt="La Grande Soirée Gnawa" width="800"/>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
  [![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg)](https://reactnative.dev/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)
</div>

---

## 📖 Description

Application mobile complète pour la gestion de l'événement culturel "La Grande Soirée Gnawa" à Agadir. Cette solution permet aux utilisateurs de :

- Découvrir les artistes Gnawa participants
- Consulter le programme de la soirée
- Réserver des billets en quelques clics
- Gérer leurs réservations

## 🏗️ Architecture

Ce projet utilise une architecture **monorepo** avec :

### Backend - API REST

- **Framework:** Node.js + Express.js
- **Database:** PostgreSQL avec Sequelize ORM
- **Auth:** JWT (optionnel)
- **Architecture:** MVC Pattern

### Frontend - Application Mobile

- **Framework:** React Native (Expo)
- **State:** Zustand + React Query
- **Navigation:** React Navigation v6
- **Storage:** AsyncStorage
- **Features:** Offline mode, Deep linking

## 📦 Structure du Projet

## 🚀 Installation

### Prérequis

- Node.js v16+
- PostgreSQL v14+
- Expo CLI
- Git

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurer .env avec vos credentials
npm run seed
npm run dev
```

### Mobile

```bash
cd mobile
npm install
npm start
# Scanner le QR code avec Expo Go
```

## 📱 Fonctionnalités

✅ Consultation des informations de l'événement  
✅ Liste des artistes avec photos et biographies  
✅ Réservation de billets (1-10 par transaction)  
✅ Gestion des réservations par email  
✅ Code de confirmation unique  
✅ Partage de réservations  
✅ Mode offline  
✅ Deep linking

## 🧪 Tests

### Backend

```bash
cd backend
# Utiliser la collection Postman dans docs/
```

### Mobile

```bash
cd mobile
npm start
# Tester sur émulateur ou appareil physique
```

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Mobile Documentation](./mobile/README.md)
- [Architecture](./docs/architecture.md)
- [User Stories](./docs/user-stories.md)
- [Postman Collection](./docs/postman-collection.json)

## 🚢 Déploiement

### Backend

- **Hosting:** Render.com / Railway.app
- **Database:** PostgreSQL (Render/Railway)

### Mobile

- **Distribution:** Expo Go (dev) / EAS Build (prod)

## 🤝 Contribution

Ce projet a été développé dans le cadre d'une formation.

## 📄 License

MIT

## 👤 Auteur

**[EL QASRY AYYOUB]**

- GitHub: [@Ayo-ub-Ho](https://github.com/Ayo-ub-Ho)
- Email: elqasryayyoub@email.com

---

<div align="center">
  Développé avec ❤️ pour célébrer la culture Gnawa
</div>
