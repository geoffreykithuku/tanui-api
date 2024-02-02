const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();


exports.addInventory = functions.https.onRequest((req, res) => {

  const inventory = req.body;
  db.collection("inventory")
    .add(inventory)
    .then((ref) => {
      res.send(ref.id);
    });
});

exports.getInventory = functions.https.onRequest((req, res) => {
    db.collection("inventory")
        .get()
        .then((snapshot) => {
        let inventory = [];
        snapshot.forEach((doc) => {
            inventory.push({ id: doc.id, ...doc.data() });
        });
        res.send(inventory);
        });
});
    
exports.updateInventory = functions.https.onRequest((req, res) => {
    const id = req.query.id;
    const
        inventory = req.body;
    db.collection("inventory")
        .doc(id)
        .update(inventory)
        .then(() => {
        res.send("Inventory updated");
        });
}
);

exports.deleteInventory = functions.https.onRequest((req, res) => {
    const id = req.query.id;
    db.collection("inventory")
        .doc(id)
        .delete()
        .then(() => {
        res.send("Inventory deleted");
        });
}
);

exports.getInventoryById = functions.https.onRequest((req, res) => {
    const id = req.query.id;
    db.collection("inventory")
        .doc(id)
        .get()
        .then((doc) => {
        res.send(doc.data());
        });
}
);
