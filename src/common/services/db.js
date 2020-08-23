import auth from "common/services/auth";
import key from "common/services/gkey";
import { Database } from "firebase-firestore-lite";

const db = new Database({ projectId: key.projectId, auth });

export function save(user, name, url, query) {
  const userRef = db.ref(`users/${user}`);

  /* eslint-disable no-unused-vars */
  const res = userRef
    .get()
    .then((r) => {
      // User is found!
      return r;
    })
    .catch((e) => {
      // User not found. Creating
      return userRef.set({
        id: user,
        configs: [],
      });
    })
    .then((r) => {
      console.log(r, typeof r);
      // Append new object to configs
      const newConfigs = r.configs;
      newConfigs.push({ name, url, query });
      return userRef.update({
        configs: newConfigs,
      });
    })
    .then((r) => {
      console.log("updated state: ", r);
    });
}

export default db;