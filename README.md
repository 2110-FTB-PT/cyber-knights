# CyberKights Capstone Project

Aaron Morales Perez | May Wong | Francisco Tran | Kyle Perez

# https://build-a-rock.herokuapp.com/api/health

## DB tables

### users table

**id | username | password**

simple users table to store usernames and passwords in db

### products table

**id | name | description | price | isPublic**

A table to store basic product information

### images table

**id | description | url | "productId"**

an images table to store image href/src links to use in front end
will need to create a JOIN statement SQL to combine image row with product
row or individually grab both with SQL STATEMENTS and add IMAGE information
to a products object in JS

### reviews table

**id | title | description | "userId" | "productId" | isPublic**

table that holds product reviews. Use a JOIN statement with
"userId" and "productId" to attach a user to a review and a review to product.
Or get them through individual SQL queries then add them together in JS

### comments table

**id | comment | "userId" | "reviewId" | isPublic**

comments will be attached to reviews in a similar way as reviews are attached
to products
