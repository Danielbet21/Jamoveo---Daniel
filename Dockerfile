# ----------- FRONTEND BUILD STAGE -------------
    FROM node:18 as frontend-builder

    WORKDIR /app/frontend
    COPY frontend/package*.json ./
    RUN npm install
    COPY frontend/ .
    RUN npm run build
    
    # ----------- BACKEND STAGE -------------
    FROM python:3.10-slim as backend
    
    WORKDIR /app
    COPY backend/requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    
    COPY backend /app/backend
    COPY --from=frontend-builder /app/frontend/dist /app/backend/static
    
    ENV FLASK_ENV=production
    ENV PORT=10000
    EXPOSE 10000
    
    WORKDIR /app/backend
    CMD ["python", "app.py"]
    