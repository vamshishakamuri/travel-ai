# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source code
COPY . .

# Expose the FastAPI app on port 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
