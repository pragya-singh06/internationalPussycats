import React, { useEffect, useState } from "react";

export default function App() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    city: "",
    instrument: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      setLoading(true);
      const res = await fetch("/api/members");
      if (!res.ok) throw new Error("Failed to load members");
      const data = await res.json();
      setMembers(data);
    } catch (e) {
      console.error(e);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form };
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to join");
      setForm({ firstname: "", lastname: "", city: "", instrument: "" });
      await loadMembers();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="wrapper">
      <header>
        <h1>International Pussycats is a virtual post-punk band</h1>
        <div className="signUp">
          <div className="form-wrapper">
            <form className="form-content" onSubmit={handleSubmit}>
              <label htmlFor="firstName">First Name:</label>
              <input id="firstName" value={form.firstname} onChange={e => setForm({...form, firstname: e.target.value})} required />
              <label htmlFor="lastName">Last Name:</label>
              <input id="lastName" value={form.lastname} onChange={e => setForm({...form, lastname: e.target.value})} required />
              <label htmlFor="city">Location:</label>
              <input id="city" value={form.city} onChange={e => setForm({...form, city: e.target.value})} required />
              <label htmlFor="instrument">Instrument:</label>
              <input id="instrument" value={form.instrument} onChange={e => setForm({...form, instrument: e.target.value})} required />
              <button type="submit">Join Now Pussycat</button>
            </form>
          </div>
        </div>
        <h2>
          We redefine punk not as a Do-It-Yourself effort but as a speculation on what happens if you Don’t-Do-It-At-All. Let’s make the world’s largest punk band that never, not even once, performed. Anyone can join.
        </h2>
        <h3>
          International Pussycats was made by xtine burrough, aka Vocal Purr.
        </h3>
      </header>

      <div className="content-members" role="main">
        <a href="/">
          <img src="/internationalPussycats-final.png" alt="International Pussycats Tshirt" title="you don't have to go home but you can't stay here" />
        </a>
        <div id="membersList">
          <h2>BAND MEMBERS</h2>
          <div id="printMembers">
            {loading ? <p>Loading...</p> :
              members.length === 0 ? <p id="printMembers">t</p> :
              members.map(m => (
                <div key={m.id} className="member-line">
                  {m.firstname} {m.lastname}
                  <span className="membersFrom">from {m.city} on {m.instrument}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
