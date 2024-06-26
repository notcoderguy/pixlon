# Use an official Node.js runtime as a parent image
FROM node:20.13.1-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --include=optional

# Install dependencies required by exiftool-vendored, Python, and image optimization tools
RUN apk add --no-cache \
    perl \
    make \
    bash \
    curl \
    python3 \
    py3-pip \
    jpegoptim \
    optipng \
    gifsicle \
    libjpeg-turbo-utils

    
# Install sharp with platform-specific support
RUN npm install --platform=linuxmusl --arch=arm64 sharp

# Copy the Python scripts into the app directory
COPY pyscripts ./pyscripts

# Set up a virtual environment and install Pillow
RUN python3 -m venv /opt/venv && \
    . /opt/venv/bin/activate && \
    pip install Pillow piexif

# Ensure the virtual environment is activated when the container starts
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy the rest of the application code
COPY . .

# Build the Next.js app
# RUN npm run build

# Set the working directory
WORKDIR /app

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev" ]
