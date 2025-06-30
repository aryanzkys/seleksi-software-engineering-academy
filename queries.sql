CREATE DATABASE sea_catering;

USE sea_catering;

CREATE TABLE meal_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    plan_id INT NOT NULL,
    meal_types VARCHAR(255) NOT NULL,
    delivery_days VARCHAR(255) NOT NULL,
    allergies TEXT,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (plan_id) REFERENCES meal_plans(id)
);

CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    review_message TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO meal_plans (name, price) VALUES
('Diet Plan', 30000),
('Protein Plan', 40000),
('Royal Plan', 60000);