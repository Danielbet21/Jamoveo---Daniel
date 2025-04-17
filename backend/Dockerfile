# Use official Python image
FROM python:3.10-slim

# Set working directory inside the container
WORKDIR /app

# Install system dependencies (eventlet requires build tools)
RUN apt-get update && apt-get install -y \
    gcc \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the files into the container
COPY . .

# Install requirement
RUN pip install --no-cache-dir -r requirements.txt

# Expose Flask default port
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]