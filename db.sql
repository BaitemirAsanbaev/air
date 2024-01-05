CREATE TABLE Passenger
(
    id             SERIAL PRIMARY KEY,
    firstName      VARCHAR(50),
    lastName       VARCHAR(50),
    passportNumber VARCHAR(20),
    contactInfo    VARCHAR(100)
);

CREATE TABLE Airline
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE Airport
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(100),
    city      VARCHAR(50),
    country   VARCHAR(50)
);

CREATE TABLE Flight
(
    id                 SERIAL PRIMARY KEY,
    flightNumber       VARCHAR(20) UNIQUE,
    planeID            INT,
    airlineID          INT,
    departureAirportID INT,
    arrivalAirportID   INT,
    departureDate      TIMESTAMP,
    arrivalDate        TIMESTAMP,
    isArrived          BOOLEAN,
    FOREIGN KEY (airlineID) REFERENCES Airline (id),
    FOREIGN KEY (departureAirportID) REFERENCES Airport (id),
    FOREIGN KEY (arrivalAirportID) REFERENCES Airport (id)
);
CREATE TABLE Plane
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(20),
    type       VARCHAR(20),
    airlineID  INT,
    FOREIGN KEY (airlineID) REFERENCES Airline (id)
);

CREATE TABLE Seat
(
    id         SERIAL PRIMARY KEY,
    flightID   INT,
    seatNumber INT,
    class      VARCHAR(20),
    isOccupied BOOLEAN,
    FOREIGN KEY (flightID) REFERENCES Flight (id)
);

CREATE TABLE Ticket
(
    id           SERIAL PRIMARY KEY,
    passengerID  INT,
    flightID     INT,
    seatID       INT,
    FOREIGN KEY (passengerID) REFERENCES Passenger (id),
    FOREIGN KEY (flightID) REFERENCES Flight (id),
    FOREIGN KEY (seatID) REFERENCES Seat (id)
);

CREATE TABLE Employee
(
    id          SERIAL PRIMARY KEY,
    firstName   VARCHAR(50),
    lastName    VARCHAR(50),
    hireDate    DATE,
    salary      DECIMAL(10, 2),
    airlineID   INT,
    FOREIGN KEY (airlineID) REFERENCES Airline (id)
);

