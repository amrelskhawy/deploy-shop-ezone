import "./Input.scss"

const Input = ({
  type,
  name,
  ID,
  value,
  ChangeFunc,
  maxLength,
  minLength,
  isRequired,
  label,
  placeholder,
  onBlur,
}) => {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={ID}>
        {label}
      </label>
      <input
        id={ID}
        type={type}
        value={value}
        name={name}
        className="form-input"
        onChange={ChangeFunc}
        minLength={minLength}
        maxLength={maxLength}
        required={isRequired}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    </div>
  )
}

export default Input