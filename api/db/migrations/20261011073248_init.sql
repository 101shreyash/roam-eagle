-- migrate:up


CREATE  TYPE user_role AS ENUM ('landlord' , 'applicant');

CREATE TYPE  user_religion AS ENUM ('islam' , 'hinduism' , 'unaffiliated' , 'buddhism' , 'christianity' ,  'other');

CREATE TYPE  rental_status AS ENUM ('for_rent' , 'rented');

CREATE TABLE users(

userid SERIAL PRIMARY KEY,
email TEXT UNIQUE NOT NULL,
hash_password TEXT NOT NULL,
role user_role NOT NULL DEFAULT 'applicant',
joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE user_info (

userid INT NOT NULL PRIMARY KEY REFERENCES users (userid) ON DELETE CASCADE ,
profession VARCHAR (100) NOT NULL,
country  VARCHAR (100) NOT NULL ,
city TEXT NOT NULL ,
full_name TEXT NOT NULL ,
religion user_religion NOT NULL DEFAULT 'unaffiliated',
native_language TEXT NOT NULL,
profile_picture TEXT NOT NULL

);


CREATE TABLE property_info (

userid INT NOT NULL REFERENCES users (userid) ON DELETE CASCADE,
property_id SERIAL PRIMARY KEY ,
property_status rental_status NOT NULL DEFAULT 'for_rent',
title VARCHAR (100) NOT NULL,
description TEXT NOT NULL,
total_room INT NOT NULL,
country TEXT NOT NULL,
city TEXT NOT NULL ,
postal_code TEXT NOT NULL,
monthly_price NUMERIC (10 , 2)

);


CREATE TABLE  property_visual (

property_id INT NOT NULL REFERENCES property_info (property_id) ON DELETE CASCADE,
visual_id SERIAL PRIMARY KEY,
property_image_url TEXT NOT NULL,
property_video_url TEXT NOT NULL

);


-- migrate:down

