export default function ContactInfoSection({ accountUser, onChange }) {
    return (
      <>
        {["snapchat", "instagram", "discord", "groupme"].map((field) => (
          <div className="mb-5" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label><br />
            <input type="text" id={field} onChange={onChange} value={accountUser.field || ''} className="border rounded px-2 w-full" />
          </div>
        ))}
      </>
    )
  }
  