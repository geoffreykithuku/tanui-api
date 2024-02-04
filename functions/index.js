const functions = require("firebase-functions");

// Set up an API using express
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const admin = require("firebase-admin");
const serviceAccount = require("./tanui-api-key.json");

// use connection details from the service account key to connect to the firebase database
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Cloud Firestore through Firebase
const db = admin.firestore();

// Test the root path of the API
app.get("/", (req, res) => {
  res.json({ message: "Hello from Firebase!" });
});

// Get all inventory items
app.get("/inventory", (req, res) => {
  db.collection("inventory")
    .get()
    .then((querySnapshot) => {
      // Declare an empty array to store the inventory Item
      const inventory = [];

      // Loop through the data and store it in the inventory array
      querySnapshot.forEach((doc) => {
        inventory.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      // Return the inventory array
      res.json(inventory);
    });
});

// Add a new inventory item
app.post("/inventory", (req, res) => {
  const inventory = req.body;
  db.collection("inventory")
    .add(inventory)
    .then(() => {
      res.json("Inventory added successfully");
    });
});

// Update a specific inventory item
app.put("/inventory/:id", (req, res) => {
  // Extract the id from the request
  const id = req.params.id;
  const inventory = req.body;
  db.collection("inventory")
    .doc(id)
    .update(inventory)
    .then(() => {
      res.send("Inventory updated successfully");
    });
});

// Delete a specific inventory item
app.delete("/inventory/:id", (req, res) => {
  const id = req.params.id;
  db.collection("inventory")
    .doc(id)
    .delete()
    .then(() => {
      res.send("Inventory deleted");
    });
});

// Get a specific inventory item by id
app.get("/inventory/:id", (req, res) => {
  const id = req.params.id;
  db.collection("inventory")
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.send("No such document");
      } else {
        res.json({
          id: doc.id,
          data: doc.data(),
        });
      }
    });
});

// Export the express app as an HTTP Cloud Function
exports.app = functions.https.onRequest(app);
