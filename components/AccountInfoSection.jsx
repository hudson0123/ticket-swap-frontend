export default function AccountInfoSection({ accountUser, onChange }) {
    return (
      <>
        {["username", "first_name", "last_name", "bio", "email", "phone_number", "snapchat", "instagram", "discord", "groupme"].map((field) => (
          <div className="mb-5" key={field}>
            <label style={{ fontSize: "16px", fontWeight: '600'}}htmlFor={field}>{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label><br />
            <input type="text" id={field} onChange={onChange} value={accountUser[field] || ''} className="border rounded-md bg-gray-200 px-2 w-full" />
          </div>
        ))}
      </>
    )
  }  