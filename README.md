[![Build Status](https://travis-ci.org/Princesso/Send-IT.png?branch=develop)](https://travis-ci.org/Princesso/Send-IT)
[![Coverage Status](https://coveralls.io/repos/github/Princesso/Send-IT/badge.svg?branch=develop)](https://coveralls.io/github/Princesso/Send-IT?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/Princesso/Send-IT/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/Princesso/Send-IT/test_coverage)

# Send-IT
SendIT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories.

## Feature
* There are two types of users admin and regular user
* Users can Register if they have no account or login otherwise
* Users can create a new parcel delivery order by adding required fields
* Users can change the destination of their parcels
* Users can cancel a parcel delivery order
* Users can see a list of delivery orders they have made if they have made any
* Admin can change the status of a delivery order
* Admin can change the location a parcel delivery order

## Technologies Used
* Nodejs: an open source server framework that allows you to run JavaScript on the server.
* Postgresql: open source object-relational database system

## Link to github pages

https://princesso.github.io/Send-IT/UI/index.html

## Link to API endpoints 

https://sendit-pro.herokuapp.com/


## API endpoints

* View all parcel delivery ordes: /api/v1/parcels
* View one parcel delivery order: /api/v1/parcels/<id>
* Cancel a parcel delivery order: /api/v1/parcels/<id>/cancel
* View all users:                 /api/v1/users
* View a single user:             /api/v1/users/<id>
* View parcels belonging to user: /api/v1/users/<id>/parcels


## How to clone the project:

To clone this repository: 

* Ensure you have git installed

* git clone https://github.com/Princesso/Send-IT.git

* Run npm install

* Run npm start to start the server

* Follow the UI directory to view UI pages

## Author

* **Princess Egbuna** - https://github.com/princesso

## Acknowledgments

* The inspiration behind this project is the Andela community
