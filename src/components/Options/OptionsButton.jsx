export default function OptionsButton({ handlers, children, type }) {
    return (
      <button onClick={() => handlers(type)}>
        {children}
      </button>
    );
  }