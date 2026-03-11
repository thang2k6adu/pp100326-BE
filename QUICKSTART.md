# Quick Start Guide

Hướng dẫn nhanh để setup và chạy NestJS Boilerplate.

## 📋 Yêu Cầu Hệ Thống

- **Docker & Docker Compose** (bắt buộc)
- **Node.js**: 20.x trở lên (chỉ cần cho development mode)
- **npm**: 9.x trở lên

## 🐳 Cách 1: Chạy Tất Cả Với Docker Compose (Production)

Chạy toàn bộ ứng dụng trong Docker - phù hợp cho production hoặc test nhanh.

### Bước 1: Start Services

```bash
# Build và start tất cả services
docker-compose up -d

# Kiểm tra services đang chạy
docker-compose ps
```

### Bước 2: Xem Logs

```bash
docker-compose logs -f app
```

### Bước 3: Truy Cập Ứng Dụng

- **API**: http://localhost:3000/api
- **Swagger**: http://localhost:3000/api/docs

### Các Lệnh Thường Dùng

```bash
# Stop services
docker-compose down

# Stop và xóa volumes (⚠️ sẽ xóa database data)
docker-compose down -v

# Rebuild khi có thay đổi code
docker-compose up -d --build
```

---

## 💻 Cách 2: Development Mode (Khuyến Nghị)

Chạy PostgreSQL trong Docker, app chạy local với hot reload.

### Bước 1: Start Database Services

```bash
docker compose up -d db
```

### Bước 2: Cài Đặt Dependencies

```bash
npm install
```

### Bước 3: Cấu Hình Environment

```bash
cp env.example .env
```

Chỉnh sửa file `.env`:

```env
# Application
NODE_ENV=development
PORT=3000

# Database (localhost vì app chạy ngoài Docker)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nest_boilerplate?schema=public

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=2h
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES_IN=7d
```

### Bước 4: Setup Database

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### Bước 5: Start Development Server

```bash
npm run start:dev
```

- **API**: http://localhost:3000/api
- **Swagger**: http://localhost:3000/api/docs

### Stop Services

```bash
docker-compose stop db
```

---

## 🔧 Các Lệnh Thường Dùng

| Lệnh                     | Mô tả                          |
| ------------------------ | ------------------------------ |
| `npm run start:dev`      | Chạy dev server với hot reload |
| `npm run build`          | Build production               |
| `npm run prisma:studio`  | Mở Prisma Studio xem database  |
| `npm run prisma:migrate` | Chạy database migrations       |
| `npm run test`           | Chạy unit tests                |
| `npm run lint`           | Kiểm tra linting               |

---

## 🧪 Test API

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "firstName": "Test", "lastName": "User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

---

## 🔍 Troubleshooting

| Lỗi                         | Giải pháp                                                 |
| --------------------------- | --------------------------------------------------------- |
| Cannot connect to database  | Chạy `docker-compose up -d db` và kiểm tra DATABASE_URL   |
| Port 3000 already in use    | Đổi PORT trong .env hoặc `lsof -ti:3000 \| xargs kill -9` |
| Prisma Client not generated | Chạy `npm run prisma:generate`                            |

---

## 📖 Tài Liệu

- [CODING_GUIDE.md](./CODING_GUIDE.md) - Hướng dẫn phát triển
- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs)
