export default function AccountInfoSection({ accountUser, onChange, handleLogout }) {
    return (
      <>
        <button className="block hover:underline" onClick={handleLogout}>Logout</button>
        {["username", "first_name", "last_name", "phone_number"].map((field) => (
          <div className="mb-5" key={field}>
            <label htmlFor={field}>{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label><br />
            <input type="text" id={field} onChange={onChange} value={accountUser[field] || ''} className="border rounded px-2 w-full" />
          </div>
        ))}
        <div className="mb-5">
          <label htmlFor="bio">Bio</label><br />
          <textarea id="bio" onChange={onChange} value={accountUser.bio || ''} className="border rounded px-2 w-full" />
        </div>
  
        <div className="mb-5">
          <label htmlFor="profile_picture">Profile Picture</label><br />
          <input type="file" id="profile_picture" accept="image/*" className="border rounded px-2 w-full" />
          {accountUser.profile_picture && (
            <img src={accountUser.profile_picture} alt="Profile" className="mt-2 h-24 rounded" />
          )}
        </div>
  
        <div className="mb-5">
          <label htmlFor="is_verified_uga">UGA Verified:</label>
          <p>{accountUser.is_verified_uga ? "Yes" : "No"}</p>
        </div>
  
        <div className="mb-5">
          <label htmlFor="email">Email</label><br />
          <input type="email" id="email" value={accountUser.email || ''} className="border rounded px-2 w-full" readOnly />
        </div>
      </>
    )
  }  