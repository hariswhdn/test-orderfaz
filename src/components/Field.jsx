function Field({ name, placeholder, value, onChange, onKeyDown, children }) {
  return (
    <label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        spellCheck="false"
        autoComplete="off"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {children}
    </label>
  )
}

export default Field
