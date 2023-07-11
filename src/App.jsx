import { useState } from "react";
import contacts from "./contacts.json";

function App() {
  const allContacts = contacts;
  const [contactList, setContactList] = useState(allContacts.slice(0, 5));

  // Adding Random Contact
  const addRandomContact = () => {
    if (contactList.length === allContacts.length) {
      return;
    }

    const remainingContacts = allContacts.filter(
      (contact) => !contactList.includes(contact)
    );

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    setContactList([...contactList, randomContact]);
  };

  // Sorting
  const sortByName = () => {
    const sortedContacts = contactList
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    setContactList(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = contactList
      .slice()
      .sort((a, b) => b.popularity - a.popularity);
    setContactList(sortedContacts);
  };

  // removing contacts
  const removeContact = (id) => {
    const updatedContacts = contactList.filter((contact) => contact.id !== id);
    setContactList(updatedContacts);
  };

  return (
    <div>
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort By Popularity</button>
      <button onClick={sortByName}>Sort By Name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} width="100" />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? "🏆" : null}</td>
              <td>{contact.wonEmmy ? "🏆" : null}</td>
              <td>
                <button onClick={() => removeContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
